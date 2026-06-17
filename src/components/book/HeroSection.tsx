import { buttonVariants } from "@/components/ui/button";
import { BookCoverMockup } from "./BookCoverMockup";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle painted-canvas texture via layered gradients */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 50%, oklch(0.78 0.11 80 / 0.4) 0%, transparent 70%), radial-gradient(ellipse 50% 80% at 20% 30%, oklch(0.60 0.075 120 / 0.3) 0%, transparent 60%)",
        }}
      />
      <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-center gap-14">
        <BookCoverMockup />
        <div className="flex flex-col gap-6 md:gap-7 max-w-lg">
          <div className="flex flex-col gap-1">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-primary">
              New Release · ACVA
            </span>
            <h1 className="font-heading text-5xl md:text-6xl leading-[1.05] text-foreground">
              Ambrose
              <br />
              Patterson
            </h1>
            <p className="font-heading text-2xl md:text-3xl italic text-muted-foreground mt-1">
              His Life &amp; Art
            </p>
          </div>
          <p className="font-sans text-sm text-muted-foreground leading-relaxed">
            The first authoritative monograph on the significant
            Australian-American modernist — from bohemian Paris at the fin de
            siècle to the Pacific Northwest, tracing a life lived entirely in
            paint.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href="#book"
              className={buttonVariants({
                size: "lg",
                className: "font-sans tracking-wider uppercase text-xs px-8",
              })}>
              About the book
            </a>
            <a
              href="mailto:jane.alexander.acva@gmail.com"
              className="font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors underline underline-offset-4">
              Enquire
            </a>
          </div>
          <p className="font-sans text-xs text-muted-foreground/60 tracking-wide">
            By Jane Alexander · ISBN 978-0-6467-3365-4
          </p>
        </div>
      </div>
    </section>
  );
}
