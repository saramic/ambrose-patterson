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
- [x] **Request indexing** for `/` manually via URL Inspection to speed
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

      ```sh
      curl "https://api.indexnow.org/indexnow?url=https://ambrosepatterson.com.au/&key=548bc64a079548b5140935eeba0c9b8d&keyLocation=https://ambrosepatterson.com.au/548bc64a079548b5140935eeba0c9b8d.txt"
      ````

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

## P4 — More indexable content: game/interactive pages (first one shipped, 2026-07-22)

Idea raised 2026-07-05: build small interactive/game pages (e.g. art
quizzes) as additional indexable content while waiting on real reviews.
Unblocked 2026-07-22 with a concrete list of 10 ideas, tagged by mood
(Relaxing / Educational / Competitive / Social), plus 4 more specific
to Patterson. First one — **Paris to Seattle** — is now live.

### Shipped: Paris to Seattle (2026-07-22)

- [x] `/games` — the hub page all future games link from. Lists every
      idea in the backlog below as a real, described card — "coming
      soon" for the unbuilt ones, so the hub itself is never thin
      content and doesn't need to change shape as more get built.
      Data lives in `src/content/games.ts` (`games` array — set
      `href` once a game has a real page, sitemap picks it up
      automatically).
- [x] `/games/paris-to-seattle` — the actual game: a stop-by-stop
      journey (Melbourne → Paris → Australia → Hawaii/San Francisco →
      Seattle), each stop using facts already published elsewhere on
      the site (`ArtistSection` milestones, `content/interview.ts`,
      `content/relatedArtists.ts`) rather than re-derived, so nothing
      drifts out of sync. Cross-links into the Bernard Hall, Hugh
      Ramsay, and George W. Lambert pages from P5, and back to `/press`
      at the Seattle stop — real internal linking, not an orphan page.
      Content in `src/content/parisToSeattleGame.ts`, rendered by
      `src/components/book/JourneySection.tsx`.
- [x] Linked from the bottom of `/press` ("Play: games & interactives
      →") alongside the existing "around the web" link.
- [x] Both routes added to `src/app/sitemap.ts`.
- [x] Added an actual OpenStreetMap/Leaflet map above the stop list
      (2026-07-22) — `leaflet` + `@types/leaflet` as deps,
      `src/components/book/JourneyMap.tsx`, loaded via `next/dynamic`
      with `ssr: false` from `JourneySection.tsx` (Leaflet touches
      `window` at import time, so it can't run during SSG). The stop
      text itself stays server-rendered regardless — the map is a
      progressive enhancement on top of it, not a replacement, so the
      crawlable-content point below still holds even though a mapping
      dependency was added after all.
  - Marker icons are served from `/public/leaflet/` (copied from
    `node_modules/leaflet/dist/images/`), not imported directly —
    Turbopack doesn't resolve leaflet's `dist/images/*.png` imports to
    the `{src}` object Next's static-image handling normally produces,
    which left `iconUrl`/`iconRetinaUrl`/`shadowUrl` undefined and threw
    at runtime ("iconUrl not set in Icon options").
  - Longitude is unwrapped stop-to-stop (`unwrapLongitudes` in
    `JourneyMap.tsx`) so the Pacific crossing draws east through Hawaii
    rather than west through the Atlantic — plain lat/lng has no
    concept of "shorter direction around the globe."
  - Each leg is drawn as a quadratic-bezier arc bowed to the left of
    its own direction of travel (`curvedArc`), not a straight line —
    reversing a leg's endpoints (the Paris → Australia return matches
    Melbourne → Paris exactly) flips the bow to the other side, so
    outbound and return no longer draw as one overlapping line.
  - Verified with a Playwright driver script (no project run-skill
    existed for this repo yet) — 5 markers, 4 curved polyline segments,
    working popups, zero console errors.

### Idea backlog (13 remaining, none built yet)

1. **Sliding jigsaw** *(Relaxing)* — the painting chopped into a grid
   of tiles, one removed. Slide pieces into place. Difficulty scales
   by grid size (3×3 → 6×6).
2. **Paint by numbers** *(Relaxing)* — simplified regions of the
   painting numbered and colour-coded. Click a region, pick the
   matching colour from a swatch, fill it in.
3. **Spot the difference** *(Competitive)* — two versions of the
   painting side by side, one subtly altered (extra fruit, missing
   bottle, shifted flower). Find all 5 changes before time runs out.
4. **Zoom & guess** *(Competitive)* — a heavily cropped detail fills
   the screen and zooms out slowly. Guess the object before time
   expires — fruit, vase, window panel, etc.
5. **Colour match** *(Educational)* — an eyedropper samples a pixel
   from the painting. Drag RGB / hue-saturation sliders to recreate
   the exact colour. Score based on closeness.
6. **Memory pairs** *(Relaxing)* — 12–16 face-down cards, each a
   cropped region of the painting. Flip and match identical pairs.
   Fewest flips wins.
7. **Restoration studio** *(Relaxing)* — the painting shown with
   random "damage" patches (greyed-out blobs). Brush over them to
   reveal the colour underneath — satisfying reveal mechanic.
8. **Art historian quiz** *(Educational)* — multiple-choice questions
   about the painting (style, period, objects depicted, artist
   biography). Hints reveal zoomed-in details. Builds art literacy.
9. **Impressionist filter lab** *(Educational)* — sliders adjust
   blur, saturation, colour temperature, and brushstroke strength on
   a copy of the painting, to explain how Impressionist technique
   works visually.
10. **Caption battle** *(Social)* — players write a caption for the
    painting; submissions shown anonymously, everyone votes, most
    upvoted wins. Needs a group/multiplayer session, not just
    solo/SSR content — different build shape from 1–9.

Ideas worth adding, specific to Patterson rather than generic
"a painting" games (better long-tail SEO targeting, and cross-links
into the new related-artist pages from P5):

11. **Life timeline sequencing** *(Educational)* — drag key events
    (Melbourne → Paris → Salon d'Automne 1905 → Hawaii → Seattle → UW
    School of Painting and Design founded) into correct chronological
    order. Targets biography-shaped searches directly.
12. **Spot the Fauve** *(Educational/Competitive)* — a lineup of
    paintings from the 1905 Salon d'Automne "cage aux fauves" show
    (Matisse, Derain, Vlaminck, Patterson); guess which is Patterson's.
    Directly targets "Fauvism" search traffic, same angle as idea #9
    on P4's original note.
13. **Who painted whom?** *(Educational)* — match a portrait to its
    subject/painter pair (Ramsay's portrait of Patterson, Lambert's
    group self-portrait). Cross-promotes the P5 related-artist pages
    (Hugh Ramsay, George W. Lambert) directly from a game page.

~~14. Paris to Seattle map~~ — **shipped**, see above.

Once ideas are prioritized, the structure to use for whichever ship
first:

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

## P5 — Related-artist pages (long-tail name searches, 2026-07-22)

Idea: capture searches for the Australian expat painters in Patterson's
circle (e.g. "hugh ramsay") by giving each their own dedicated page that
explains the real connection to Patterson, rather than just a generic
"around the web" entry buried in his own page.

- [x] Researched each artist with `scripts/search-engine/insights_for.ts`
      (Gemini + Google Search grounding) — raw output in
      `scripts/search-engine/output/<slug>.json`, hand-reviewed before
      landing in code, same pattern as the original Patterson research.
- [x] Added `src/content/relatedArtists.ts` — per-artist bio, a
      `connectionToPatterson` blurb, and a resource directory (biography,
      galleries/museums, image sources, influences, further reading,
      news/press).
- [x] New dynamic route `src/app/press/around-the-web/[artist]/page.tsx`
      — dedicated title/description/canonical per artist (e.g. "Hugh
      Ramsay and Ambrose Patterson"), `Person` JSON-LD, statically
      generated for all four slugs.
- [x] Shipped for: **Hugh Ramsay**, **George W. Lambert**, **Rupert
      Bunny**, **E. Phillips Fox**.
- [x] Linked from `/press/around-the-web` (new "Related Artists" section)
      so the pages aren't orphaned, and added all four to
      `src/app/sitemap.ts`.
- [ ] Run the IndexNow ping (see P1) for each new URL once deployed.
- [x] Second tier shipped 2026-07-22: **Iso Rae**, **John Longstaff**,
      **Bernard Hall**. Hall is framed differently from the others —
      he was Patterson's *teacher* at the National Gallery School, not
      a peer, and taught Ramsay/Longstaff/Rae/Fox too, so his page
      leans on that as the connective thread. No code changes needed
      beyond the new `relatedArtists.ts` entries — the `/press/around-the-web`
      listing and `sitemap.ts` both derive from that array automatically.
- [ ] Next candidates if this keeps performing: none identified yet —
      revisit once there's ranking data on the current seven.

### Hugh Ramsay video page (2026-07-22)

Sourced from a real find: the NGA posted a reel of curator Dr. Deborah
Hart discussing Hugh Ramsay
(`https://www.facebook.com/reel/2408506749401178`), analyzed with
`scripts/ai-video-analysis`

- [x] New page `src/app/press/around-the-web/hugh-ramsay/video` — chapters
      and quotable highlights from the video, with a "Watch the original
      on Facebook" link out (no embedded iframe — Facebook's video plugin
      doesn't reliably support Reels embeds, and every other external
      resource on this site links out rather than embeds, so this matches
      the established pattern instead of shipping something fragile).
      Content lives in `src/content/hughRamsayVideo.ts`.
- [x] Linked from the main Hugh Ramsay page
      (`src/content/relatedArtists.ts` → `video` field, rendered by
      `RelatedArtistSection`) and added to `sitemap.ts`.

---

## Notes

- `netlify.toml` / Netlify Next.js plugin already handles the build —
  no server-side redirect config needed for any of the above.
- `/launch` is intentionally `robots: { index: false, follow: false }`
  already — correct, don't touch until the embargo lifts.
- Images already use `next/image` with descriptive `alt` text
  (`BookCover.tsx`) and the homepage has a single clean `<h1>` — no
  action needed there.
