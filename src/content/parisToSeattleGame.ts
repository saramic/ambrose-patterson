// Stops are drawn from facts already published elsewhere on this site
// (src/components/book/ArtistSection.tsx milestones, src/content/interview.ts,
// src/content/relatedArtists.ts) — kept consistent rather than re-derived.

export interface JourneyStop {
  place: string;
  years: string;
  /** [latitude, longitude] for the map marker. */
  coords: [number, number];
  body: string;
  relatedLinks?: { label: string; href: string }[];
}

export const PARIS_TO_SEATTLE_INTRO =
  "Ambrose Patterson's life ran from Melbourne to Paris to Hawaii to Seattle — a genuinely unusual route for an Australian painter of his generation. Follow it stop by stop.";

export const parisToSeattleStops: JourneyStop[] = [
  {
    place: "Melbourne, Australia",
    years: "1877",
    coords: [-37.8136, 144.9631],
    body: "Born in 1877, Patterson trained at the National Gallery School in Melbourne under Bernard Hall — the same teacher who shaped Hugh Ramsay, John Longstaff, Iso Rae, and E. Phillips Fox, all part of the same generation of Australian artists who went on to Paris.",
    relatedLinks: [
      {
        label: "More on Bernard Hall →",
        href: "/press/around-the-web/bernard-hall",
      },
    ],
  },
  {
    place: "Paris, France",
    years: "1900s",
    coords: [48.8566, 2.3522],
    body: "Substantially French-academy trained, Patterson was ensconced in bohemian Paris at the fin de siècle. At the first infamous Salon d'Automne in 1903 he exhibited alongside Matisse, Bonnard, and Rouault, and in the 1905 salon he was in the thick of it as the Fauves burst onto the scene. His close friend Hugh Ramsay painted his portrait there in 1901–02, and George W. Lambert included him in a group self-portrait with the wider circle of Australian expatriates.",
    relatedLinks: [
      { label: "Hugh Ramsay →", href: "/press/around-the-web/hugh-ramsay" },
      {
        label: "George W. Lambert →",
        href: "/press/around-the-web/george-w-lambert",
      },
    ],
  },
  {
    place: "Australia",
    years: "1910",
    coords: [-37.8136, 144.9631],
    body: "Patterson returned to Australia in 1910, before setting out again for the Pacific within a few years.",
  },
  {
    place: "Hawaii & San Francisco",
    years: "mid-1910s",
    coords: [21.3069, -157.8583],
    body: "By 1916 he had moved on to Hawaii and then San Francisco, en route to the Pacific Northwest.",
  },
  {
    place: "Seattle, USA",
    years: "1916–1966",
    coords: [47.6062, -122.3321],
    body: "In Seattle, Patterson became the Pacific Northwest's first modernist link to Europe. He was seldom predictable and perpetually curious — trying murals, Cubism, and Abstraction — and in his last years returned full circle to Impressionism, producing light-filled studio interiors and still lifes. He helped establish the University of Washington's School of Painting and Design, and remained in Seattle until his death in 1966.",
    relatedLinks: [{ label: "Read the full story →", href: "/press" }],
  },
];
