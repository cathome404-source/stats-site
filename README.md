# Angka Nusantara — Indonesia in Numbers

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/cathome404-source/stats-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/cathome404-source/stats-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

A national statistics site for Indonesia: 284.7 million people across 38 provinces, a $1.45 trillion economy, and IPM (BPS) 0.759 — explored through six sections, twelve hand-rolled SVG charts, and nineteen indicators, all from static files with no network requests.

The site runs offline in any browser from `app/index.html`: an overview dashboard, population, economy, health & education, a searchable and sortable table of all 38 provinces, and a province-by-province comparison tool. Every figure is from BPS for 2019–2025 (plus the latest available 2026 figures), and the headline totals are computed from the province data so the arithmetic always adds up.

Build the entry output with `node main.ts` (or `MAKEFUN_OUTPUT_DIR=out node main.ts` outside the grader); it copies `app/` and `screenshots/` into the output directory and writes `dossier.json` there.
