// main.ts — Angka Nusantara entry builder (make.fun bounty
// best-national-statistics-site-20261126-0539).
//
// Copies app/ and screenshots/ into the output directory and writes
// dossier.json there via buildDossier from vendor/makefun-frontend.ts.
// Node 22, standard library only, no build step: `node main.ts`.
//
// The grader runs this with /output as the output directory. Outside the
// grader, set MAKEFUN_OUTPUT_DIR to build somewhere else, e.g.:
//   MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = dirname(fileURLToPath(import.meta.url));

// The grader's output directory is /output; anything else is chosen with
// MAKEFUN_OUTPUT_DIR so a local build never needs to write outside the repo.
const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');

const appDir = join(repoRoot, 'app');
const shotsDir = join(repoRoot, 'screenshots');

if (!existsSync(appDir)) {
  throw new Error(`main.ts: no app/ directory in ${repoRoot}`);
}
if (!existsSync(shotsDir)) {
  throw new Error(`main.ts: no screenshots/ directory in ${repoRoot}`);
}

mkdirSync(outDir, { recursive: true });

// Clear any previous copy so stale files from an older build cannot leak
// into the dossier.
for (const sub of ['app', 'screenshots']) {
  rmSync(join(outDir, sub), { recursive: true, force: true });
}

cpSync(appDir, join(outDir, 'app'), { recursive: true });
cpSync(shotsDir, join(outDir, 'screenshots'), { recursive: true });

// Caps from the bounty gate: at most 4 screenshots, each at most 256 KiB,
// text capped at 160 KiB, app at most 993 files / 16 MiB, paths at most
// 1000 bytes. buildDossier refuses where the scorer would refuse, so a
// local build that passes here matches what the scorer accepts.
const dossier = buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
  app_path_max_bytes: 1000,
});

writeFileSync(join(outDir, 'dossier.json'), dossier);

console.log(`main.ts: wrote ${join(outDir, 'dossier.json')} (${dossier.length} bytes)`);
