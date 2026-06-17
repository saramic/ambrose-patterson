import { SiteNav } from "@/components/book/SiteNav";
import { HeroSection } from "@/components/book/HeroSection";
import { ArtistSection } from "@/components/book/ArtistSection";
import { BookSection } from "@/components/book/BookSection";
import { AuthorSection } from "@/components/book/AuthorSection";
import { PurchaseSection } from "@/components/book/PurchaseSection";
import { SiteFooter } from "@/components/book/SiteFooter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1">
        <HeroSection />
        <ArtistSection />
        <BookSection />
        <AuthorSection />
        <PurchaseSection />
      </main>
      <SiteFooter />
    </div>
  );
}
