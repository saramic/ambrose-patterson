# scripts/

One-off processing scripts that support the site but aren't part of the Next.js
app itself — AI video review, site/content scraping for research, etc.

## Conventions

- Each script lives in its own folder (`ai-video-analysis/`, `web-content-analysis/`, ...)
  with its **own** `package.json` and lockfile. Nothing in here is a workspace of the
  root app — `npm install` at the repo root never touches these, and these folders
  never affect `npm run build` / Netlify.
- Each folder manages its own dependencies: `cd scripts/<name> && npm install`.
- Secrets go in a gitignored `.env` inside the folder (see that folder's `.env.example`).
  Root `.gitignore` already ignores `.env*` everywhere in the repo.
- Large inputs/outputs (videos, scraped HTML dumps, generated reports) go in that
  folder's `tmp/` or `output/` dir, both gitignored.
- Add a short README in each folder explaining what it does and how to run it.

## Folders

- [`ai-video-analysis/`](ai-video-analysis/) — send an MP4 to Gemini to pull timestamped
  chapters and highlight-worthy excerpts.
- `web-content-analysis/` — not built yet. For scraping other Ambrose Patterson sites
  to build an overview/comparison graph.
