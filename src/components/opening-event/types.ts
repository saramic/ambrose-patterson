export type MediaItem = {
  id: string;
  type: "image" | "video";
  src: string;
  thumb?: string;
  poster?: string;
  original?: string;
};

export type Manifest = {
  event: string;
  updatedAt: string;
  items: MediaItem[];
};

export const MANIFEST_URL =
  "https://ambrose-patterson.s3.ap-southeast-2.amazonaws.com/opening-event/manifest.json";
