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

- [ ] **Verify the property in Google Search Console** for
      `https://ambrosepatterson.com.au` (domain property via DNS TXT
      record is preferable to URL-prefix — covers www/non-www and
      http/https in one go).
- [ ] **Submit the sitemap** (`/sitemap.xml`) in Search Console once P0
      is deployed.
- [ ] **Request indexing** for `/` manually via URL Inspection to speed
      up first crawl rather than waiting. (`/reviews` once it has real
      content — see P2.)
- [ ] **Set the same property up in Bing Webmaster Tools** (free, 5
      minutes, can import verification from GSC) — small extra reach.

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

## P3 — Off-page / ongoing

- [ ] Check whether the reviews on `/reviews` are from real, published
      outlets — if so, get backlinks from the original articles (a link
      from e.g. a real Sydney Morning Herald piece is worth far more
      than any on-page fix above).
- [ ] List the book on Goodreads / relevant book-retailer and library
      catalogue pages, each linking back to ambrosepatterson.com.au.
- [ ] Consider a Google Business Profile for the 15 Aug 2026 Melbourne
      launch event once it's public (currently correctly `noindex`'d —
      leave it that way until the invite embargo lifts).
- [ ] Re-check Search Console weekly for coverage errors / manual
      actions once submitted.

---

## Notes

- `netlify.toml` / Netlify Next.js plugin already handles the build —
  no server-side redirect config needed for any of the above.
- `/launch` is intentionally `robots: { index: false, follow: false }`
  already — correct, don't touch until the embargo lifts.
- Images already use `next/image` with descriptive `alt` text
  (`BookCover.tsx`) and the homepage has a single clean `<h1>` — no
  action needed there.
