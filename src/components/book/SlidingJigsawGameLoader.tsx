"use client";

import dynamic from "next/dynamic";

// The board's initial shuffle uses Math.random(), which would differ
// between the server render and the client hydration render and throw
// a hydration mismatch — same class of issue as JourneyMap's Leaflet
// import. The surrounding page already carries the crawlable text
// content, so loading the game client-only (no SSR) costs nothing.
const SlidingJigsawGame = dynamic(
  () => import("./SlidingJigsawGame").then((mod) => mod.SlidingJigsawGame),
  {
    ssr: false,
    loading: () => (
      <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-sm ring-1 ring-border bg-muted/40 flex items-center justify-center">
        <p className="font-sans text-xs tracking-[0.18em] uppercase text-muted-foreground">
          Loading puzzle…
        </p>
      </div>
    ),
  },
);

export function SlidingJigsawGameLoader() {
  return <SlidingJigsawGame />;
}
