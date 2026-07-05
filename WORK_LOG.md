# SEO Work Log — ambrosepatterson.com.au

Started 2026-07-04. Site is Next.js (App Router) on Netlify. Live domain
is `https://ambrosepatterson.com.au` — confirmed no analytics/GSC wiring
exists yet, which is why Google is pointing you at Search Console.

Legend: `[ ]` todo · `[x]` done · `[~]` in progress

---

## P0 — Critical technical fixes (blocking indexing/sharing, do first)

These are bugs, not "nice to have SEO polish." Fixed 2026-07-04.

- [x] **Fix the domain typo in metadata** — `src/app/layout.tsx` had
      `SITE_URL = "https://ambrosepatterson.com"` (missing `.au`, and that
      domain doesn't resolve at all). Every `og:url`, `og:image`,
      `twitter:image` on the live site was pointing at a dead host. Fixed
      to `https://ambrosepatterson.com.au`. Also fixed the hardcoded
      `domain:` string and example `og:url` in `src/app/ui/og/page.tsx`.
- [x] **Add the missing OG image** — `/public/og-image.jpg` didn't exist
      (`404` live), so every social share (Slack, iMessage, Facebook,
      X/Twitter, LinkedIn, Discord) showed a broken image. Composited a
      real 1200×630 image from the actual front cover
      (`src/assets/images/ambrose-patterson-cover.jpeg`) on the site's
      dark/cream/gold palette and dropped it in `/public/og-image.jpg`.
- [x] **Add `robots.txt`** — `src/app/robots.ts` now allows `/` and
      disallows `/ui`, `/ui/og`, `/reviews`, `/launch` (all dummy/internal
      content right now — only the homepage is real), and points to the
      sitemap.
- [x] **Add `sitemap.xml`** — `src/app/sitemap.ts` lists just the
      homepage for now. `/reviews`, `/launch`, `/ui`, `/ui/og` are
      excluded until they have real content. Note: `#artist`/`#book`/
      `#author` are sections of the same page, not separate documents, so
      they can't be (and shouldn't be) listed as their own sitemap URLs —
      see the JSON-LD note below for how that's handled instead.
- [x] **Noindex the dummy/showcase pages** — `/ui`, `/ui/og`, and
      `/reviews` now export `robots: { index: false, follow: false }`
      (matching what `/launch` already had) plus self-referential
      canonicals, on top of the robots.txt disallow above.
- [x] **Add canonical tags** — root layout now sets
      `alternates: { canonical: "/" }`; `/reviews` and `/launch` set their
      own self-canonical.
- [x] **Highlight the homepage's four sections for search** — the nav
      already linked to `#artist`/`#book`/`#author` with matching
      `id`-bearing `<section>`s and `<h2>` headings (Google's usual recipe
      for auto-generating "jump to section" links under a search result)
      — no code change needed there. Added explicit `WebPage` JSON-LD to
      `src/app/page.tsx` with a `hasPart` entry per section as a
      reinforcing signal. This is a hint, not a guarantee — Google decides
      whether to actually render section jump-links.

## P1 — Search Console & submission (this week, after P0 lands)

This is the actual "webmaster tools" flow Google pointed you at.

- [x] **Verify the property in Google Search Console** for
      `https://ambrosepatterson.com.au` (domain property via DNS TXT
      record is preferable to URL-prefix — covers www/non-www and
      http/https in one go).
- [x] **Submit the sitemap** (`/sitemap.xml`) in Search Console once P0
      is deployed.
- [X] **Request indexing** for `/` manually via URL Inspection to speed
      up first crawl rather than waiting. (`/reviews` once it has real
      content — see P2.)
- [x] **Set the same property up in Bing Webmaster Tools** (free, 5
      minutes, can import verification from GSC) — small extra reach.
- [x] **Set up IndexNow** (2026-07-05) — Bing's push protocol so new/changed
      pages get crawled without waiting on Bing's own schedule. Key file
      lives at `public/548bc64a079548b5140935eeba0c9b8d.txt` (served at
      `https://ambrosepatterson.com.au/548bc64a079548b5140935eeba0c9b8d.txt`
      once deployed — verified it serves correctly from a local prod
      build). To notify Bing/Yandex/Seznam after any content change:
      ```
      curl "https://api.indexnow.org/indexnow?url=https://ambrosepatterson.com.au/&key=548bc64a079548b5140935eeba0c9b8d&keyLocation=https://ambrosepatterson.com.au/548bc64a079548b5140935eeba0c9b8d.txt"
      ```
      A `200`/`202` response means it was accepted. Run this once right
      after deploying the key file, then again any time homepage content
      changes materially.
- [ ] **Diagnosis, 2026-07-04**: Bing Webmaster Tools reported the
      homepage as "Discovered but not crawled" / "URL cannot appear on
      Bing", discovered 06 Feb 2026. Checked live: `200` for browser/
      Googlebot/bingbot UAs alike, fast TTFB (~58ms), full content in raw
      HTML (no JS-only rendering), correct canonical/redirects, valid
      robots.txt + sitemap now deployed — no live technical blocker found.
      Most likely cause: a stale discovery from before today's fixes
      existed, combined with Bing deprioritizing crawl frequency for a
      new, low-authority domain. Fix: use "Request indexing" in both GSC
      and Bing Webmaster Tools now that the real fixes are live, and the
      IndexNow ping above. Re-check in a few days — see the two waiting
      links below.

- [x] waiting on https://search.google.com/search-console/index?resource_id=sc-domain%3Aambrosepatterson.com.au
      — indexed 2026-07-05.
- [x] waiting on https://www.bing.com/webmasters/urlinspection?siteUrl=https://ambrosepatterson.com.au/
      — indexed 2026-07-05.

## P2 — Structured data & content (next 1–2 weeks)

Higher-value, not urgent — do after the plumbing above is live.

- [ ] **Add `Book` JSON-LD schema** to the homepage — author Jane
      Alexander, ISBN 978-0-6467-3365-4, publisher ACVA Pty Ltd. Makes
      the book eligible for book-specific rich results.
- [ ] **Add `Review`/`AggregateRating` JSON-LD** to `src/app/reviews/page.tsx`
      once the reviews are real (currently placeholder/dummy content,
      hence `noindex` above) — near-zero-cost way to get star ratings
      showing in Google search results. Remove the `noindex` at the same
      time the content goes live.
- [ ] **Add `Organization` JSON-LD** for ACVA Pty Ltd (publisher) on the
      homepage.
- [ ] Verify unique `<title>`/`<meta description>` per page (homepage and
      `/reviews` are fine already; just confirm after P0 changes).

## P3 — Off-page / ongoing (2026-07-05: this is now the higher-leverage
work — homepage is indexed on both Google and Bing, but a single
homepage only really ranks for branded searches like "Ambrose Patterson
book". Real backlinks raise the whole domain's authority far more than
any further on-page tweak would.)

- [ ] Check whether the reviews on `/reviews` are from real, published
      outlets — if so, get backlinks from the original articles (a link
      from e.g. a real Sydney Morning Herald piece is worth far more
      than any on-page fix above).
- [ ] **Get the book listed on directories/catalogues, each linking back
      to ambrosepatterson.com.au** — prioritize these first:
  - [ ] **Goodreads** — book page + author profile for Jane Alexander.
  - [ ] **Trove** (National Library of Australia aggregator,
        trove.nla.gov.au) — Australian-content discovery, strong
        domestic authority.
  - [ ] **DAAO** — Design and Art Australia Online (daao.org.au) —
        directly relevant art-history directory; Patterson may already
        have an entry worth linking/updating.
  - [ ] **WorldCat** (worldcat.org) — library catalogue aggregator, picks
        up ISBN 978-0-6467-3365-4 once cataloged by any member library.
  - [ ] Australian book retailers — **Booktopia**, **Readings**,
        **Dymocks** — product listing pages with a publisher/author link.
  - [ ] **Amazon** book listing (author page linking out, if permitted).
  - [ ] State/public library catalogues (e.g. **State Library of
        Victoria**) — natural fit given the Melbourne launch.
  - [ ] The public galleries/museums holding Patterson's work (the
        homepage already says "represented in more than twenty public
        galleries and museums") — a link from an artist bio page on any
        of these is high-authority and highly relevant.
  - [ ] **Wikipedia** — check if Ambrose Patterson has an existing
        article; if so, the book is a citable secondary source (adds a
        reference link, not a promotional link — follow Wikipedia's
        conflict-of-interest/notability rules here).
- [ ] Consider a Google Business Profile for the 15 Aug 2026 Melbourne
      launch event once it's public (currently correctly `noindex`'d —
      leave it that way until the invite embargo lifts).
- [ ] Re-check Search Console weekly for coverage errors / manual
      actions once submitted.

## P4 — More indexable content: game/interactive pages (blocked — pending specifics)

Idea raised 2026-07-05: build small interactive/game pages (e.g. art
quizzes) as additional indexable content while waiting on real reviews.
**Blocked on**: what the actual game ideas are — need specifics before
sketching routes/pages. Once known, the structure to use:

- [ ] Treat the homepage as the pillar page (targets the branded query,
      "Ambrose Patterson book"); each game targets its own distinct
      long-tail query (e.g. "Fauvism quiz") — no keyword overlap, so
      games don't compete with the homepage for the same searches.
- [ ] Nav/homepage links out to each game; each game page links back to
      the homepage/book with real anchor text — reinforces the homepage
      as the hub (same pattern that produces sitelinks, see the
      `#artist`/`#book`/`#author` JSON-LD note in P0).
- [ ] Note: there's no actual mechanism to tell Google/Bing to "index
      the core page first" — sitemap `priority` is essentially ignored
      by both. Ranking priority comes from internal linking + backlinks,
      not a config flag.
- [ ] Real risk to watch: thin/low-effort game pages can drag down
      Google's site-wide quality assessment. Only ship these if they're
      genuinely good content (real text content server-rendered, not
      client-only widgets with nothing for a crawler to read).
- [ ] Each game page will need its own metadata (title/description),
      and should be added to `src/app/sitemap.ts` once real (same
      pattern as the homepage entry — see P0).

---

## Notes

- `netlify.toml` / Netlify Next.js plugin already handles the build —
  no server-side redirect config needed for any of the above.
- `/launch` is intentionally `robots: { index: false, follow: false }`
  already — correct, don't touch until the embargo lifts.
- Images already use `next/image` with descriptive `alt` text
  (`BookCover.tsx`) and the homepage has a single clean `<h1>` — no
  action needed there.
