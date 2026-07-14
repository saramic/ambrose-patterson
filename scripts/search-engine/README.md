# search-engine

Researches a topic across the web using Gemini + Google Search grounding, and
writes out a categorized directory of resources: biography/background,
galleries & museums, image sources, influences/related topics, further
reading, and news/press.

Gemini runs real Google searches internally as part of answering, so this
needs no separate search API key — just `GEMINI_API_KEY`. Uses
`gemini-pro-latest` by default (override with `GEMINI_MODEL` in `.env`).

## Setup

```sh
cd scripts/search-engine
npm install
cp .env.example .env   # fill in GEMINI_API_KEY
```

## Usage

```sh
node insights_for.ts "ambrose patterson"
```

Results print to stdout and are saved to `output/<topic-slug>.json`, which
includes:

- `categories` — the directory itself, each entry with a `url`, `summary`,
  and whether the page has useful images. Any Google Search redirect link
  Gemini returns gets resolved to its real destination URL before saving.
- `sources_consulted` / `search_queries_used` — best-effort raw grounding
  data (which pages/queries the search tool actually used), for cross-checking
  the categorized URLs above. The Gemini API doesn't always attach this
  metadata to the final response, so these are frequently empty — that's
  normal, not a bug, and doesn't affect the quality of `categories`.

Re-run with a different topic any time — nothing here is specific to Ambrose
Patterson:

```sh
node insights_for.ts "some other topic"
```
