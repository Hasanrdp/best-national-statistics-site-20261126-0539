# best-national-statistics-site-20261126-0539

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Hasanrdp/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Hasanrdp/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

**Arunika — Statistik Indonesia.** A national statistics site for Indonesia that runs entirely offline in a web browser, on desktop and on a phone. Population, economy, health, education, employment, and all 38 provinces — every figure with its source and year (BPS, Bank Indonesia, APJII, 2024).

## What is inside

- `app/` — the site as static files, no build step: `index.html` plus `style.css`, `data.js` (all figures with sources), `charts.js` (hand-drawn SVG charts), `views.js` (one renderer per page), and `main.js` (hash router, CSV download).
- `screenshots/` — three real renders of the site in a browser (desktop home, desktop economy, phone home).
- `main.ts` — the entry program: copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with `buildDossier` from `vendor/makefun-frontend.ts`.
- `serve.ts` — a tiny static server for local testing.

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

Build the hand-in output (as the grader does):

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Pages

Beranda (overview with key indicators) · Penduduk · Ekonomi · Kesehatan · Pendidikan · Ketenagakerjaan · Provinsi (searchable, sortable table of all 38 provinces, CSV download) · Metodologi (sources and methods).

---

<sub>Entered on [make.fun](https://make.fun/?ref=&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
