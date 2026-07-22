// Idea backlog from WORK_LOG.md P4. Each entry is real, indexable copy —
// even the "coming soon" ones — so the /games hub itself is never thin
// content. `href` is only set once a game actually exists.

export type GameMood = "Relaxing" | "Educational" | "Competitive" | "Social";

export interface GameEntry {
  slug: string;
  title: string;
  mood: GameMood;
  description: string;
  href?: string;
}

export const games: GameEntry[] = [
  {
    slug: "paris-to-seattle",
    title: "Paris to Seattle",
    mood: "Educational",
    description:
      "Follow Ambrose Patterson's actual route — Melbourne, Paris, Hawaii, Seattle — with the real events at each stop.",
    href: "/games/paris-to-seattle",
  },
  {
    slug: "life-timeline",
    title: "Life Timeline",
    mood: "Educational",
    description:
      "Drag the key events of Patterson's life — Melbourne, the 1905 Salon d'Automne, Hawaii, founding the UW School of Painting and Design — into the correct order.",
  },
  {
    slug: "spot-the-fauve",
    title: "Spot the Fauve",
    mood: "Educational",
    description:
      "A lineup of paintings from the 1905 Salon d'Automne — Matisse, Derain, Vlaminck, Patterson. Guess which one is his.",
  },
  {
    slug: "who-painted-whom",
    title: "Who Painted Whom?",
    mood: "Educational",
    description:
      "Match each portrait to its subject and painter — Hugh Ramsay's portrait of Patterson, George W. Lambert's group self-portrait, and more.",
  },
  {
    slug: "sliding-jigsaw",
    title: "Sliding Jigsaw",
    mood: "Relaxing",
    description:
      "A Patterson painting chopped into a grid of tiles, one removed. Slide pieces into place. Difficulty scales with grid size.",
    href: "/games/sliding-jigsaw",
  },
  {
    slug: "paint-by-numbers",
    title: "Paint by Numbers",
    mood: "Relaxing",
    description:
      "Simplified, numbered regions of a painting. Pick the matching colour from a swatch and fill it in.",
  },
  {
    slug: "memory-pairs",
    title: "Memory Pairs",
    mood: "Relaxing",
    description:
      "Flip cards showing cropped regions of a painting and match identical pairs. Fewest flips wins.",
  },
  {
    slug: "restoration-studio",
    title: "Restoration Studio",
    mood: "Relaxing",
    description:
      "A painting shown with patches of \"damage.\" Brush over them to reveal the real colour underneath.",
  },
  {
    slug: "spot-the-difference",
    title: "Spot the Difference",
    mood: "Competitive",
    description:
      "Two versions of a painting side by side, one subtly altered. Find all 5 changes before time runs out.",
  },
  {
    slug: "zoom-and-guess",
    title: "Zoom & Guess",
    mood: "Competitive",
    description:
      "A heavily cropped detail fills the screen and slowly zooms out. Guess the object before time expires.",
  },
  {
    slug: "colour-match",
    title: "Colour Match",
    mood: "Educational",
    description:
      "An eyedropper samples a colour from a painting. Recreate it with RGB / hue-saturation sliders — score based on closeness.",
  },
  {
    slug: "art-historian-quiz",
    title: "Art Historian Quiz",
    mood: "Educational",
    description:
      "Multiple-choice questions on a painting's style, period, and subject matter, with zoomed-in detail hints along the way.",
  },
  {
    slug: "impressionist-filter-lab",
    title: "Impressionist Filter Lab",
    mood: "Educational",
    description:
      "Adjust blur, saturation, colour temperature and brushstroke strength on a copy of a painting, to see how Impressionist technique actually works.",
  },
  {
    slug: "caption-battle",
    title: "Caption Battle",
    mood: "Social",
    description:
      "Write a caption for a painting, then vote anonymously on everyone else's. Most upvoted caption wins.",
  },
];
