/**
 * Map pipeline — `pnpm assets:map`
 * Fetches the streets around the restaurant from OpenStreetMap (Overpass API, ODbL) once and turns them
 * into a static, greyscale SVG plan (public/images/plan-gambetta.svg). No map library or tile server at runtime.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { site } from "../src/config/site.ts";

const ROOT = new URL("..", import.meta.url).pathname;
const OUT = join(ROOT, "public/images/plan-gambetta.svg");
const { lat, lng } = site.address.geo;
const HALF_W = 620; // metres each side
const HALF_H = 460;
const M_PER_DEG_LAT = 111_320;
const M_PER_DEG_LNG = 111_320 * Math.cos((lat * Math.PI) / 180);

const bbox = [
  lat - HALF_H / M_PER_DEG_LAT,
  lng - HALF_W / M_PER_DEG_LNG,
  lat + HALF_H / M_PER_DEG_LAT,
  lng + HALF_W / M_PER_DEG_LNG,
].map((n) => n.toFixed(6));

const query = `[out:json][timeout:25];
(
  way["highway"~"^(primary|secondary|tertiary|residential|unclassified|living_street|pedestrian)$"](${bbox});
  way["leisure"="park"](${bbox});
  node["railway"="station"]["station"="subway"](${bbox});
);
out geom;`;

type Way = { type: "way"; tags: Record<string, string>; geometry: { lat: number; lon: number }[] };
type Node = { type: "node"; tags: Record<string, string>; lat: number; lon: number };

const project = (la: number, lo: number) => ({
  x: Math.round(((lo - lng) * M_PER_DEG_LNG + HALF_W) * 10) / 10,
  y: Math.round((HALF_H - (la - lat) * M_PER_DEG_LAT) * 10) / 10,
});

const RANK: Record<string, "major" | "minor" | "path"> = {
  primary: "major",
  secondary: "major",
  tertiary: "major",
  residential: "minor",
  unclassified: "minor",
  living_street: "minor",
  pedestrian: "path",
  service: "path",
  footway: "path",
};

const UA = "maison-l-site/1.0 (one-off static map build)";
const ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
];

async function fetchOverpass(): Promise<{ elements: (Way | Node)[] } | null> {
  for (const url of ENDPOINTS) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": UA },
      body: `data=${encodeURIComponent(query)}`,
      signal: AbortSignal.timeout(40_000),
    }).catch(() => null);
    if (res?.ok) return (await res.json()) as { elements: (Way | Node)[] };
    console.warn(`  ${url} → ${res?.status ?? "network error"}, trying next source`);
  }
  return null;
}

/** Fallback: one bbox request to the main OSM API (XML), reshaped like an Overpass `out geom` answer. */
async function fetchOsmApi(): Promise<{ elements: (Way | Node)[] }> {
  const [s, w, n, e] = bbox;
  const res = await fetch(`https://api.openstreetmap.org/api/0.6/map?bbox=${w},${s},${e},${n}`, {
    headers: { "User-Agent": UA },
    signal: AbortSignal.timeout(60_000),
  });
  if (!res.ok) throw new Error(`OSM API ${res.status}`);
  const xml = await res.text();
  const attr = (tag: string, name: string) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? "";
  const tagsOf = (body: string) =>
    Object.fromEntries([...body.matchAll(/<tag k="([^"]*)" v="([^"]*)"/g)].map((m) => [m[1], m[2]]));
  const nodes = new Map<string, { lat: number; lon: number }>();
  const elements: (Way | Node)[] = [];
  for (const m of xml.matchAll(/<node ([^>]*?)(\/>|>([\s\S]*?)<\/node>)/g)) {
    const head = m[1] ?? "";
    const pos = { lat: Number(attr(head, "lat")), lon: Number(attr(head, "lon")) };
    nodes.set(attr(head, "id"), pos);
    const tags = tagsOf(m[3] ?? "");
    if (tags.railway === "station" && tags.station === "subway")
      elements.push({ type: "node", tags, ...pos });
  }
  for (const m of xml.matchAll(/<way ([^>]*?)>([\s\S]*?)<\/way>/g)) {
    const body = m[2] ?? "";
    const tags = tagsOf(body);
    if (!(tags.highway && RANK[tags.highway]) && tags.leisure !== "park") continue;
    const geometry = [...body.matchAll(/<nd ref="(\d+)"/g)]
      .map((r) => nodes.get(r[1] ?? ""))
      .filter((p) => p !== undefined);
    if (geometry.length > 1) elements.push({ type: "way", tags, geometry });
  }
  return { elements };
}

async function main() {
  const data = (await fetchOverpass()) ?? (await fetchOsmApi());

  const layers = {
    major: [] as string[],
    minor: [] as string[],
    path: [] as string[],
    park: [] as string[],
    gambetta: [] as string[],
  };
  let metro: { x: number; y: number; name: string } | null = null;

  for (const el of data.elements) {
    if (el.type === "node") {
      if (!metro || el.tags.name === "Gambetta")
        metro = { ...project(el.lat, el.lon), name: el.tags.name ?? "" };
      continue;
    }
    const d = el.geometry
      .map((p, i) => {
        const { x, y } = project(p.lat, p.lon);
        return `${i ? "L" : "M"}${x} ${y}`;
      })
      .join("");
    if (el.tags.leisure === "park") layers.park.push(`${d}Z`);
    else if (/Léon Gambetta/i.test(el.tags.name ?? "")) layers.gambetta.push(d);
    else {
      const rank = RANK[el.tags.highway ?? ""];
      if (rank) layers[rank].push(d);
    }
  }

  const W = HALF_W * 2;
  const H = HALF_H * 2;
  const metroMark = metro
    ? `<g transform="translate(${metro.x} ${metro.y})"><circle r="17" fill="#2E431A"/><path d="M-7 6V-6L0 2 7-6V6" fill="none" stroke="#F4EEE1" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></g>`
    : "";
  // Static, lazy-loaded SVG (keeps ~40 KB of path data out of the HTML and the RSC payload).
  // Palette: sand ground, oak streets, Gambetta in walnut, brand-green pin.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<title>Plan, Maison L, 324 rue Léon Gambetta, Lille (© OpenStreetMap contributors, ODbL)</title>
<rect width="${W}" height="${H}" fill="#EDE3CC"/>
<path d="${layers.park.join("")}" fill="#CBD5AC"/>
<g fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="${layers.path.join("")}" stroke="#E4D9C0" stroke-width="3"/>
<path d="${layers.minor.join("")}" stroke="#F8F3E6" stroke-width="7"/>
<path d="${layers.minor.join("")}" stroke="#D9CBAB" stroke-width="1.2"/>
<path d="${layers.major.join("")}" stroke="#F8F3E6" stroke-width="12"/>
<path d="${layers.major.join("")}" stroke="#C9B791" stroke-width="1.6"/>
<path d="${layers.gambetta.join("")}" stroke="#8A5A33" stroke-opacity=".2" stroke-width="22"/>
<path d="${layers.gambetta.join("")}" stroke="#8A5A33" stroke-width="7"/>
<path d="${layers.gambetta.join("")}" stroke="#F4EEE1" stroke-width="1.6" stroke-dasharray="1 7"/>
</g>
${metroMark}
<g transform="translate(${HALF_W} ${HALF_H})"><circle r="50" fill="#2E431A" fill-opacity=".12"/><circle r="24" fill="#2E431A"/><circle r="24" fill="none" stroke="#F4EEE1" stroke-width="3.5"/><circle r="7" fill="#F4EEE1"/></g>
</svg>
`;
  writeFileSync(OUT, svg);
  console.log(
    `Wrote ${OUT.replace(ROOT, "")} — ${(svg.length / 1024).toFixed(1)} KB, metro: ${metro?.name ?? "none"}`,
  );
}

await main();
