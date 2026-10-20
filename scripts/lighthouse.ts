/**
 * `node scripts/lighthouse.ts [baseUrl] [runs]` — Lighthouse mobile (default throttling) on / and /menu,
 * median of N runs. Writes reports/lighthouse-<page>.json (median run) and prints the scores.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, renameSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const BASE = process.argv[2] ?? "http://localhost:3200";
const RUNS = Number(process.argv[3] ?? 3);
const BIN = join(ROOT, "node_modules/.bin/lighthouse");
mkdirSync(join(ROOT, "reports"), { recursive: true });

type Report = {
  categories: Record<string, { score: number }>;
  audits: Record<string, { displayValue?: string; numericValue?: number }>;
};

for (const [name, path] of [
  ["home", "/"],
  ["menu", "/menu"],
] as const) {
  const runs: { file: string; perf: number; r: Report }[] = [];
  for (let i = 0; i < RUNS; i++) {
    const file = join(ROOT, `reports/lighthouse-${name}-${i}.json`);
    execFileSync(
      BIN,
      [
        BASE + path,
        "--quiet",
        "--chrome-flags=--headless=new",
        "--only-categories=performance,accessibility,best-practices,seo",
        "--output=json",
        `--output-path=${file}`,
      ],
      { stdio: "ignore" },
    );
    const r = JSON.parse(readFileSync(file, "utf8")) as Report;
    runs.push({ file, perf: r.categories.performance?.score ?? 0, r });
  }
  runs.sort((a, b) => a.perf - b.perf);
  const median = runs[Math.floor(runs.length / 2)];
  if (!median) continue;
  renameSync(median.file, join(ROOT, `reports/lighthouse-${name}.json`));
  const { categories: c, audits: a } = median.r;
  const pct = (k: string) => Math.round((c[k]?.score ?? 0) * 100);
  console.log(
    `${name}: perf ${pct("performance")} (runs ${runs.map((x) => Math.round(x.perf * 100)).join("/")}) · a11y ${pct("accessibility")} · bp ${pct("best-practices")} · seo ${pct("seo")}` +
      ` | LCP ${a["largest-contentful-paint"]?.displayValue} · CLS ${a["cumulative-layout-shift"]?.displayValue} · TBT ${a["total-blocking-time"]?.displayValue} · FCP ${a["first-contentful-paint"]?.displayValue}`,
  );
}
