# VARK — แบบประเมินสไตล์การเรียนรู้

Single-page VARK learning-preference assessment in Thai, built for corporate L&D
sessions. 16 workplace-scenario questions, multi-select, scored with the VARK
stepping-distance rule. Static site, no backend, no data collection.

Live: https://dragonkorn.github.io/VARK

## About the instrument

- The **VARK model** (Visual / Aural / Read-Write / Kinesthetic, Neil Fleming) is
  used as the conceptual framework.
- The **questions are original**, written for this project. The official VARK
  Questionnaire wording is copyrighted and is not reproduced here.
- Scoring: raw tally per modality → sort descending → stepping distance derived
  from the total score → preference set. 15 possible results, from `V` to `VARK`.
- The result page carries an explicit note that VARK measures *preference*, and
  that matching teaching to learning style is not strongly evidenced.

## Stack

Vite · React 19 · TypeScript · Tailwind 4 · React Router · Vitest · html-to-image

## Commands

```bash
npm install
npm run dev      # local dev at /VARK/
npm test         # scoring unit tests
npm run build    # typecheck + build + prerender 15 result pages + 404.html
npm run og       # regenerate the static OG images (needs sharp, run locally)
npm run preview  # serve the built site
```

## How it fits together

| Path | Purpose |
| --- | --- |
| `src/data/questions.ts` | The 16 items and their V/A/R/K option mapping |
| `src/data/modalities.json` | All result copy — read by both the app and the prerender script |
| `src/lib/scoring.ts` | Tally, stepping distance, preference set, result keys |
| `src/lib/scoring.test.ts` | Unit tests, including that all 15 result keys are reachable |
| `scripts/prerender.mjs` | Post-build: per-result HTML with OG tags, plus `404.html` |
| `scripts/og.mjs` | Generates the 5 static OG images (committed to the repo) |

Notes:

- Answers autosave to `localStorage`, so a refresh mid-quiz does not lose progress.
- Results are shareable at `/result/:key`; the share button renders a 1080×1080
  PNG client-side and hands it to the native share sheet on mobile (LINE, etc.),
  falling back to a PNG download on desktop.
- Noto Sans Thai is self-hosted in `public/fonts` — the share-image capture
  inlines fonts, and a cross-origin font would render as tofu.

## Deployment

Push to `main`; GitHub Actions builds and deploys to Pages (Settings → Pages →
Source: GitHub Actions). `npm run deploy` also works as a manual `gh-pages` push.

## License

MIT. See `LICENSE`.
