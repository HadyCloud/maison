/**
 * Hero video pipeline — `pnpm assets:video [--poster=<seconds>]`
 * Content is not altered: no recut, no regrade beyond a very light desaturation (0.92) so the
 * warm footage sits on the graphite UI. Audio is dropped. A 0.6 s crossfade makes the loop seamless.
 * Outputs (public/video): hero-1080.{mp4,webm}, hero-720.{mp4,webm}, hero-poster[-960].{avif,webp,jpg}
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import sharp from "sharp";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC_DIR = join(ROOT, "video");
const BACKUP_DIR = join(SRC_DIR, "original");
const CACHE = join(ROOT, ".cache/video");
const OUT = join(ROOT, "public/video");
const FADE = 0.6;
const FPS = 24; // the source is 24p stored in a 60 fps container
const SATURATION = 0.92;
const POSTER_MAX_BYTES = 150 * 1024;

const tiers = [
  { name: "1080", height: 1080, maxBytes: 6 * 1024 * 1024, vp9Bitrate: "3600k" },
  { name: "720", height: 720, maxBytes: 2.5 * 1024 * 1024, vp9Bitrate: "1500k" },
] as const;

const run = (args: string[]) => execFileSync("ffmpeg", ["-v", "error", "-y", ...args], { stdio: "inherit" });
const probe = (file: string, entries: string) =>
  execFileSync("ffprobe", ["-v", "error", "-show_entries", entries, "-of", "csv=p=0", file])
    .toString()
    .trim();
const size = (file: string) => statSync(file).size;
const mb = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

function findSource(): string | null {
  if (!existsSync(SRC_DIR)) return null;
  const file = readdirSync(SRC_DIR).find((f) =>
    [".mp4", ".mov", ".webm", ".m4v"].includes(extname(f).toLowerCase()),
  );
  return file ? join(SRC_DIR, file) : null;
}

/** Seamless loop: the body [F, D] crossfades at its end into the head [0, F]. Output length D − F. */
function buildMaster(src: string): string {
  const master = join(CACHE, "master.mp4");
  const duration = Number(probe(src, "format=duration"));
  const offset = (duration - 2 * FADE).toFixed(3);
  const graph = [
    `[0:v]fps=${FPS},eq=saturation=${SATURATION},split[a][b]`,
    `[a]trim=start=${FADE},setpts=PTS-STARTPTS[body]`,
    `[b]trim=end=${FADE},setpts=PTS-STARTPTS[head]`,
    `[body][head]xfade=transition=fade:duration=${FADE}:offset=${offset},format=yuv420p[v]`,
  ].join(";");
  run([
    "-i",
    src,
    "-filter_complex",
    graph,
    "-map",
    "[v]",
    "-an",
    "-c:v",
    "libx264",
    "-crf",
    "10",
    "-preset",
    "slow",
    master,
  ]);
  return master;
}

function encodeH264(master: string, height: number, maxBytes: number, out: string) {
  for (let crf = 22; crf <= 34; crf += 1) {
    run([
      "-i",
      master,
      "-an",
      "-vf",
      `scale=-2:${height}:flags=lanczos`,
      "-c:v",
      "libx264",
      "-profile:v",
      "high",
      "-preset",
      "veryslow",
      "-crf",
      String(crf),
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      out,
    ]);
    if (size(out) <= maxBytes) return crf;
  }
  throw new Error(`${out} still exceeds ${mb(maxBytes)} at CRF 34`);
}

function encodeVP9(master: string, height: number, bitrate: string, out: string) {
  const common = [
    "-i",
    master,
    "-an",
    "-vf",
    `scale=-2:${height}:flags=lanczos`,
    "-c:v",
    "libvpx-vp9",
    "-b:v",
    bitrate,
    "-row-mt",
    "1",
    "-tile-columns",
    "2",
    "-deadline",
    "good",
    "-cpu-used",
    "2",
    "-pix_fmt",
    "yuv420p",
  ];
  const log = join(CACHE, `vp9-${height}`);
  run([...common, "-pass", "1", "-passlogfile", log, "-f", "webm", "/dev/null"]);
  run([...common, "-pass", "2", "-passlogfile", log, out]);
}

async function writePoster(master: string, seconds: number) {
  const frame = join(CACHE, "poster.png");
  run(["-ss", String(seconds), "-i", master, "-frames:v", "1", "-vf", "scale=-2:1080:flags=lanczos", frame]);
  for (const [suffix, width] of [
    ["", 1440],
    ["-960", 960],
  ] as const) {
    const img = sharp(frame).resize({ width });
    for (let q = 72; q >= 30; q -= 6) {
      const jpg = await img.clone().jpeg({ quality: q, mozjpeg: true, progressive: true }).toBuffer();
      if (jpg.length > POSTER_MAX_BYTES && q > 30) continue;
      await sharp(jpg).toFile(join(OUT, `hero-poster${suffix}.jpg`));
      await img
        .clone()
        .webp({ quality: Math.min(q + 4, 80) })
        .toFile(join(OUT, `hero-poster${suffix}.webp`));
      await img
        .clone()
        .avif({ quality: Math.max(q - 22, 30), effort: 6 })
        .toFile(join(OUT, `hero-poster${suffix}.avif`));
      console.log(`  ✓ hero-poster${suffix} (jpeg q${q}, ${(jpg.length / 1024).toFixed(0)} KB)`);
      break;
    }
  }
}

/** Contact sheet of 8 candidate frames to choose the poster by eye. */
function posterCandidates(master: string) {
  const d = Number(probe(master, "format=duration"));
  run([
    "-i",
    master,
    "-vf",
    `fps=8/${d.toFixed(2)},scale=480:-2,tile=4x2`,
    "-frames:v",
    "1",
    join(CACHE, "poster-candidates.jpg"),
  ]);
  console.log(`  candidates: .cache/video/poster-candidates.jpg (frame n ≈ ${(d / 8).toFixed(2)} × n s)`);
}

async function main() {
  mkdirSync(CACHE, { recursive: true });
  mkdirSync(OUT, { recursive: true });
  const src = findSource();
  if (!src) {
    console.warn("No video in video/ — the hero falls back to the interior photo poster.");
    return;
  }
  mkdirSync(BACKUP_DIR, { recursive: true });
  const backup = join(BACKUP_DIR, src.split("/").at(-1) ?? "hero");
  if (!existsSync(backup)) copyFileSync(src, backup);

  console.log(`Source: ${src}`);
  const master = buildMaster(src);
  posterCandidates(master);
  const posterArg = process.argv.find((a) => a.startsWith("--poster="));
  if (process.argv.includes("--candidates-only")) return;

  for (const t of tiers) {
    const mp4 = join(OUT, `hero-${t.name}.mp4`);
    const crf = encodeH264(master, t.height, t.maxBytes, mp4);
    console.log(`  ✓ hero-${t.name}.mp4 CRF ${crf} — ${mb(size(mp4))}`);
    const webm = join(OUT, `hero-${t.name}.webm`);
    encodeVP9(master, t.height, t.vp9Bitrate, webm);
    console.log(`  ✓ hero-${t.name}.webm — ${mb(size(webm))}`);
  }
  await writePoster(master, posterArg ? Number(posterArg.split("=")[1]) : 0.2);
}

await main();
