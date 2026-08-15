import type { Metadata } from "next";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { PhotoWall } from "@/components/opening-event/PhotoWall";

export const metadata: Metadata = {
  title: "Opening Night",
  robots: { index: false, follow: false },
};

export default function OpeningEventPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 border-b border-border bg-muted/30 backdrop-blur-sm">
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              Opening Night
            </span>
            <Separator orientation="vertical" className="h-4 opacity-40" />
            <span className="text-xs text-muted-foreground">
              Photos &amp; video from the exhibition opening
            </span>
          </div>
          <Link
            href="/"
            className="text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary">
            ← Live site
          </Link>
        </div>
      </div>

      <PhotoWall />
    </div>
  );
}
