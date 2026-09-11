"use client";

import { useCallback, useEffect, useState } from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  PauseIcon,
  PlayIcon,
  XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MANIFEST_URL, type MediaItem } from "./types";

const POLL_MS = 20_000;
const AUTOPLAY_MS = 5_000;

// Deterministic per-id "randomness" so a card's tilt/tape stay stable across
// reloads and manifest polls (no reshuffling every 20s as new photos land).
function hash(str: string, seed: number): number {
  let h = seed;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(h, 31) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

// Alternate left/right lean by grid position (so it doesn't come down to
// chance and skew mostly one way), with a randomized amount of tilt per photo.
// Alternate rows also start on the opposite lean, so column 1 isn't always
// leaning the same way every row.
function rotationFor(id: string, index: number, columns: number): number {
  const col = index % columns;
  const row = Math.floor(index / columns);
  const baseSign = col % 2 === 0 ? -1 : 1;
  const sign = row % 2 === 0 ? baseSign : -baseSign;
  const magnitude = 2.5 + (hash(id, 1) % 400) / 100; // 2.5..6.5deg
  return sign * magnitude;
}

// Matches the grid's Tailwind breakpoints (grid-cols-2 / sm:grid-cols-3 / md:grid-cols-4).
function useColumns(): number {
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const mqSm = window.matchMedia("(min-width: 640px)");
    const mqMd = window.matchMedia("(min-width: 768px)");
    function update() {
      setColumns(mqMd.matches ? 4 : mqSm.matches ? 3 : 2);
    }
    update();
    mqSm.addEventListener("change", update);
    mqMd.addEventListener("change", update);
    return () => {
      mqSm.removeEventListener("change", update);
      mqMd.removeEventListener("change", update);
    };
  }, []);

  return columns;
}

function tapeRotationFor(id: string): number {
  return (hash(id, 2) % 3000) / 100 - 15; // -15..15deg
}

function tapeSideFor(id: string): "left" | "center" | "right" {
  return (["left", "center", "right"] as const)[hash(id, 3) % 3];
}

function useManifest() {
  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(MANIFEST_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        if (cancelled) return;
        setItems(Array.isArray(data.items) ? data.items : []);
        setUpdatedAt(data.updatedAt ?? null);
        setError(null);
      } catch {
        if (!cancelled) {
          setError("Couldn't load photos right now — check back shortly.");
        }
      }
    }

    load();
    const interval = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { items, updatedAt, error };
}

function PolaroidCard({
  item,
  index,
  columns,
  onOpen,
}: {
  item: MediaItem;
  index: number;
  columns: number;
  onOpen: () => void;
}) {
  const rotate = rotationFor(item.id, index, columns);
  const tapeRotate = tapeRotationFor(item.id);
  const tapeSide = tapeSideFor(item.id);
  const thumbSrc =
    item.type === "video"
      ? (item.poster ?? item.src)
      : (item.thumb ?? item.src);

  return (
    <button
      type="button"
      onClick={onOpen}
      style={{ "--polaroid-rotate": `${rotate}deg` } as React.CSSProperties}
      className="polaroid-card group relative z-0 -mt-14 block bg-white p-3 pb-9 text-left shadow-[0_6px_16px_-4px_rgba(40,25,10,0.35)] hover:z-20 hover:shadow-[0_16px_30px_-8px_rgba(40,25,10,0.45)] focus-visible:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:-mt-20">
      <span
        aria-hidden
        style={{ "--tape-rotate": `${tapeRotate}deg` } as React.CSSProperties}
        className={cn(
          "polaroid-tape pointer-events-none absolute -top-3 h-6 w-16 bg-[oklch(0.93_0.03_95_/_0.8)] shadow-[0_2px_4px_rgba(0,0,0,0.15)]",
          tapeSide === "left" && "left-5",
          tapeSide === "center" && "left-1/2 -translate-x-1/2",
          tapeSide === "right" && "right-5",
        )}
      />
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbSrc}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {item.type === "video" && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/15 transition-colors group-hover:bg-black/5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white">
              <PlayIcon
                className="h-4 w-4 translate-x-[1px]"
                fill="currentColor"
              />
            </span>
          </span>
        )}
      </div>
    </button>
  );
}

function Lightbox({
  items,
  index,
  onIndexChange,
  onClose,
}: {
  items: MediaItem[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  const [autoplay, setAutoplay] = useState(false);
  const item = items[index];

  const go = useCallback(
    (delta: number) => {
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [autoplay, go]);

  if (!item) return null;

  return (
    <DialogPrimitive.Root open onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/90 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Popup className="fixed inset-0 z-50 flex flex-col outline-none data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0">
          <DialogPrimitive.Title className="sr-only">
            Opening night photo {index + 1} of {items.length}
          </DialogPrimitive.Title>

          <div
            className="absolute inset-0 flex items-center justify-center p-4 sm:p-10"
            onClick={(e) => e.target === e.currentTarget && onClose()}>
            {item.type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.src}
                alt=""
                className="max-h-full max-w-full object-contain select-none"
              />
            ) : (
              <video
                key={item.src}
                src={item.src}
                poster={item.poster}
                controls
                playsInline
                className="max-h-full max-w-full object-contain"
              />
            )}
          </div>

          <button
            type="button"
            aria-label="Previous"
            onClick={() => go(-1)}
            className="absolute inset-y-0 left-0 z-10 flex w-1/5 items-center justify-start pl-3 text-white/70 transition-colors hover:text-white sm:pl-6">
            <ChevronLeftIcon className="h-8 w-8" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => go(1)}
            className="absolute inset-y-0 right-0 z-10 flex w-1/5 items-center justify-end pr-3 text-white/70 transition-colors hover:text-white sm:pr-6">
            <ChevronRightIcon className="h-8 w-8" />
          </button>

          <div className="relative z-10 flex items-center justify-between gap-4 p-4 text-xs tracking-widest text-white/70 uppercase">
            <span>
              {index + 1} / {items.length}
            </span>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setAutoplay((v) => !v)}
                className="flex items-center gap-1.5 transition-colors hover:text-white">
                {autoplay ? (
                  <PauseIcon className="h-4 w-4" />
                ) : (
                  <PlayIcon className="h-4 w-4" />
                )}
                {autoplay ? "Pause" : "Slideshow"}
              </button>
              {item.original && (
                <a
                  href={item.original}
                  download
                  className="flex items-center gap-1.5 transition-colors hover:text-white">
                  <DownloadIcon className="h-4 w-4" />
                  Original
                </a>
              )}
              <DialogPrimitive.Close
                aria-label="Close"
                className="flex items-center gap-1.5 transition-colors hover:text-white">
                <XIcon className="h-4 w-4" />
                Close
              </DialogPrimitive.Close>
            </div>
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export function PhotoWall() {
  const { items, updatedAt, error } = useManifest();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const columns = useColumns();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
      <header className="flex flex-col gap-2 text-center">
        <h1 className="font-heading text-3xl text-foreground sm:text-4xl">
          Opening Night
        </h1>
        <p className="text-sm text-muted-foreground">
          Photos &amp; video from the exhibition opening — tap any photo to view
          it full-screen or start a slideshow.
        </p>
        {updatedAt && (
          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground/70">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
            Live — updated {new Date(updatedAt).toLocaleTimeString()}
          </p>
        )}
      </header>

      {error && <p className="text-center text-sm text-destructive">{error}</p>}

      {items === null && !error && (
        <p className="text-center text-sm text-muted-foreground">
          Loading photos…
        </p>
      )}

      {items && items.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Photos will start appearing here once the event gets underway — check
          back soon.
        </p>
      )}

      {items && items.length > 0 && (
        <div className="grid grid-cols-2 gap-x-4 pt-16 sm:grid-cols-3 sm:gap-x-6 sm:pt-24 md:grid-cols-4">
          {items.map((item, i) => (
            <PolaroidCard
              key={item.id}
              item={item}
              index={i}
              columns={columns}
              onOpen={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}

      {items && activeIndex !== null && (
        <Lightbox
          items={items}
          index={activeIndex}
          onIndexChange={setActiveIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </div>
  );
}
