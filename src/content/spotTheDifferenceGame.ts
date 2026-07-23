// Both images are cropped from src/assets/images/ambrose-patterson-cover.jpeg
// (the front cover of "Ambrose Patterson: His Life & Art", already licensed
// and displayed on this site) with the title text cropped out, then 5
// differences composited in with scripts/PIL — see WORK_LOG.md for the
// generation notes. Coordinates below are percentages of the 960×760
// source image, so hotspots line up regardless of the rendered size.

export const SPOT_IMAGE_ORIGINAL = "/images/spot-diff-original.jpg";
export const SPOT_IMAGE_ALTERED = "/images/spot-diff-altered.jpg";

export interface SpotDifference {
  id: string;
  label: string;
  xPct: number;
  yPct: number;
  radiusPct: number;
}

export const spotDifferences: SpotDifference[] = [
  {
    id: "missing-circle",
    label: "A circle is missing from the patterned screen",
    xPct: 91.6,
    yPct: 62.2,
    radiusPct: 4.7,
  },
  {
    id: "recoloured-box",
    label: "The small box on the table has changed colour",
    xPct: 90.9,
    yPct: 94.7,
    radiusPct: 5.7,
  },
  {
    id: "recoloured-cap",
    label: "The bottle's cap has changed colour",
    xPct: 77.1,
    yPct: 64.7,
    radiusPct: 3.5,
  },
  {
    id: "extra-bloom",
    label: "An extra flower bloom has appeared on the wall",
    xPct: 27.6,
    yPct: 41.5,
    radiusPct: 3.7,
  },
  {
    id: "highlighted-leaves",
    label: "A patch of leaves has changed tone",
    xPct: 44.0,
    yPct: 55.5,
    radiusPct: 4.7,
  },
];
