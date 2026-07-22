// Source: National Gallery of Australia's "Hugh Ramsay" reel —
// https://www.facebook.com/reel/2408506749401178
// AI review used to draft this page:
// scripts/ai-video-analysis/output/National_Gallery_of_Australia_Hugh_Ramsay-ai-review.json
// Reviewed by hand before landing here.

export const HUGH_RAMSAY_VIDEO_URL =
  "https://www.facebook.com/reel/2408506749401178";
export const HUGH_RAMSAY_VIDEO_SOURCE = "National Gallery of Australia";
export const HUGH_RAMSAY_VIDEO_SPEAKER =
  "Dr. Deborah Hart, Curator & Head of Australian Art, National Gallery of Australia";

export const HUGH_RAMSAY_VIDEO_TITLE = "Hugh Ramsay: A Short, Brilliant Life";

export const HUGH_RAMSAY_VIDEO_SUMMARY =
  "National Gallery of Australia curator Dr. Deborah Hart on Hugh Ramsay's early promise, his triumphant years in Paris, and the defiant burst of work — culminating in 'Two Girls in White' — that he produced after his tuberculosis diagnosis.";

export interface VideoChapter {
  start: string;
  end: string;
  title: string;
  summary: string;
}

export const hughRamsayVideoChapters: VideoChapter[] = [
  {
    start: "00:00",
    end: "00:16",
    title: "Introduction to Hugh Ramsay and the Exhibition",
    summary:
      "An introduction to Hugh Ramsay, an often-overlooked but remarkable artist whose breadth of work the NGA's exhibition aims to bring to public attention.",
  },
  {
    start: "00:16",
    end: "00:40",
    title: "Early Artistic Talent and Prodigy",
    summary:
      "Ramsay's dedication to art began at a very young age — his earliest exhibited work was a kookaburra painting completed at 14, and he entered art school at just 16.",
  },
  {
    start: "00:40",
    end: "01:12",
    title: "Paris, Inspiration, and Self-Portraits",
    summary:
      "In 1901, Ramsay arrived in Paris — a dream come true. Inspired by the city's art scene and museums, he began painting numerous self-portraits, using himself as a ready model.",
  },
  {
    start: "01:12",
    end: "02:45",
    title: "Self-Portraits and Salon Success",
    summary:
      "His self-portraits reveal an evolving style and playful emulation of masters like John Singer Sargent. Four of his works were accepted into the prestigious New Salon in Paris — a phenomenal early success for an Australian artist in his 20s.",
  },
  {
    start: "02:45",
    end: "03:52",
    title: "Dame Nellie Melba and Child Portraits",
    summary:
      "A pivotal moment: meeting Dame Nellie Melba, who commissioned him to paint her niece, Miss Nellie Patterson — one of his most celebrated child portraits.",
  },
  {
    start: "03:52",
    end: "05:32",
    title: "Defiance in Illness and the Masterpiece 'Two Girls in White'",
    summary:
      "Diagnosed with tuberculosis at the peak of his career, Ramsay defiantly kept painting — his largest work, 'The Equestrian Portrait', and his masterpiece 'Two Girls in White', a poignant homage to his sisters.",
  },
  {
    start: "05:32",
    end: "06:30",
    title: "Legacy of a Brilliant Artist",
    summary:
      "The curator reflects on working on Ramsay's exhibition, his dedication and true vision, and hopes his legacy is now fully appreciated.",
  },
];

export type VideoHighlightType =
  | "strong_opening"
  | "key_insight"
  | "quotable_moment"
  | "emotional_moment"
  | "strong_closing";

const HIGHLIGHT_LABELS: Record<VideoHighlightType, string> = {
  strong_opening: "Opening",
  key_insight: "Key insight",
  quotable_moment: "Quotable moment",
  emotional_moment: "Personal moment",
  strong_closing: "Closing",
};

export function hughRamsayHighlightLabel(type: VideoHighlightType): string {
  return HIGHLIGHT_LABELS[type];
}

export interface VideoHighlight {
  start: string;
  end: string;
  type: VideoHighlightType;
  speaker: string;
  displayQuote: string;
}

export const hughRamsayVideoHighlights: VideoHighlight[] = [
  {
    start: "00:06",
    end: "00:11",
    type: "strong_opening",
    speaker: "Dr. Deborah Hart",
    displayQuote:
      "Hugh Ramsay was a remarkable artist. He's really not very well known, and that's something we want to achieve in this exhibition.",
  },
  {
    start: "00:32",
    end: "00:40",
    type: "key_insight",
    speaker: "Dr. Deborah Hart",
    displayQuote:
      "There's really this sense of a prodigy, a child prodigy, because we've got to remember that he was only 16 when he went to art school.",
  },
  {
    start: "00:43",
    end: "00:51",
    type: "quotable_moment",
    speaker: "Dr. Deborah Hart",
    displayQuote:
      "In 1901, Hugh arrives in Paris, and it's really a dream come true. He's in the metropolis where artists from all over the world have come together.",
  },
  {
    start: "02:15",
    end: "02:26",
    type: "key_insight",
    speaker: "Dr. Deborah Hart",
    displayQuote:
      "Hugh sends in a number of works to the New Salon, and he gets four accepted. This is just phenomenal, because it's really unusual, let alone for an Australian artist in his 20s exhibiting virtually for the first time.",
  },
  {
    start: "03:52",
    end: "04:00",
    type: "emotional_moment",
    speaker: "Dr. Deborah Hart",
    displayQuote:
      "His doctor tells him he's got to rest. His whole family is very upset and worried for him. He's really quite sick, but he decides he's not going to give up.",
  },
  {
    start: "04:26",
    end: "04:33",
    type: "quotable_moment",
    speaker: "Dr. Deborah Hart",
    displayQuote:
      "I think what he was really trying to do, he knew he only had a short time to live. So, what the heck, just go for it, give it my best shot.",
  },
  {
    start: "05:07",
    end: "05:32",
    type: "key_insight",
    speaker: "Dr. Deborah Hart",
    displayQuote:
      "What he does that is really different, I think, is he brings them close to us again. There's that real feeling that we're in their presence. He paints with this kind of alacrity, he paints the dresses so beautifully, but it's that connection between him and his siblings, that closeness to family that was right there in the beginning is there towards the end, and you really feel it in this incredible painting.",
  },
  {
    start: "06:04",
    end: "06:16",
    type: "strong_closing",
    speaker: "Dr. Deborah Hart",
    displayQuote:
      "God, I hope you're looking down and you can see what you achieved. For me, that has been one of the great things — just to work on an artist who gave so much of himself in a short life, but a really brilliant one.",
  },
];
