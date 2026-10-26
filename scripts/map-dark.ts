/**
 * Dark variant of the street plan — `node scripts/map-dark.ts` (run after `pnpm assets:map`).
 * Re-colours public/images/plan-gambetta.svg into plan-gambetta-dark.svg: deep olive ground, olive streets,
 * Gambetta in oak gold. Used on phones, where the Infos band is a rich cream-and-green.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const src = readFileSync(join(ROOT, "public/images/plan-gambetta.svg"), "utf8");

const swaps: [string, string][] = [
  ['<rect width="1240" height="920" fill="#EDE3CC"/>', '<rect width="1240" height="920" fill="#2A3A17"/>'],
  ['fill="#CBD5AC"', 'fill="#36491F"'],
  ['stroke="#E4D9C0" stroke-width="3"', 'stroke="#3A4D26" stroke-width="3"'],
  ['stroke="#F8F3E6" stroke-width="7"', 'stroke="#3F5429" stroke-width="7"'],
  ['stroke="#D9CBAB" stroke-width="1.2"', 'stroke="#566C3B" stroke-width="1.2"'],
  ['stroke="#F8F3E6" stroke-width="12"', 'stroke="#496130" stroke-width="12"'],
  ['stroke="#C9B791" stroke-width="1.6"', 'stroke="#6C854A" stroke-width="1.6"'],
  ['stroke="#8A5A33" stroke-opacity=".2" stroke-width="22"', 'stroke="#D2AE7C" stroke-opacity=".22" stroke-width="22"'],
  ['stroke="#8A5A33" stroke-width="7"', 'stroke="#D2AE7C" stroke-width="7"'],
  ['stroke="#F4EEE1" stroke-width="1.6" stroke-dasharray="1 7"', 'stroke="#2A3A17" stroke-width="1.6" stroke-dasharray="1 7"'],
  ['<circle r="17" fill="#2E431A"/>', '<circle r="17" fill="#F4EEE1"/>'],
  ['stroke="#F4EEE1" stroke-width="2.4"', 'stroke="#2E431A" stroke-width="2.4"'],
  ['<circle r="50" fill="#2E431A" fill-opacity=".12"/>', '<circle r="50" fill="#D2AE7C" fill-opacity=".2"/>'],
  ['<circle r="24" fill="#2E431A"/>', '<circle r="24" fill="#D2AE7C"/>'],
  ['<circle r="24" fill="none" stroke="#F4EEE1" stroke-width="3.5"/>', '<circle r="24" fill="none" stroke="#2A3A17" stroke-width="3.5"/>'],
  ['<circle r="7" fill="#F4EEE1"/>', '<circle r="7" fill="#2A3A17"/>'],
];

let out = src;
for (const [from, to] of swaps) {
  if (!out.includes(from)) throw new Error(`Palette entry not found: ${from}`);
  out = out.split(from).join(to);
}
writeFileSync(join(ROOT, "public/images/plan-gambetta-dark.svg"), out);
console.log(`Wrote public/images/plan-gambetta-dark.svg — ${(out.length / 1024).toFixed(1)} KB`);
