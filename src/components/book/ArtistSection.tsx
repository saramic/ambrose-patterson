import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "./SectionHeader";

const milestones = [
  { year: "1877", label: "Born, Australia" },
  { year: "1903", label: "Salon d'Automne, Paris" },
  { year: "1905", label: "Salons des Fauves" },
  { year: "1910", label: "Returns to Australia" },
  { year: "1916", label: "Seattle — NW Modernism" },
  { year: "1966", label: "Passed away" },
];

export function ArtistSection() {
  return (
    <section id="artist" className="bg-secondary/8 border-y border-border">
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-24 flex flex-col gap-14">
        <SectionHeader
          label="1877–1966"
          title="The Artist"
          subtitle="A protégé of Nellie Melba, a peer of Matisse — and one of the most overlooked figures in Australian modernism."
        />
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="flex flex-col gap-4">
            <p className="font-sans text-sm leading-[1.85] text-foreground/80">
              The life and work of painter, printmaker and teacher Ambrose
              Patterson is ripe for the telling. A protégé of diva Nellie Melba
              at the fin de siècle, and substantially French academy trained,
              the young Australian artist was ensconced in bohemian Paris during
              one of its most significant epochs.
            </p>
            <p className="font-sans text-sm leading-[1.85] text-foreground/80">
              At the first infamous Salon d&apos;Automne in 1903 he exhibited
              alongside Matisse, Bonnard and Rouault, and in the 1905 salon he
              was in the thick of it when the Fauves burst onto the scene.
              Influenced by the first-generation French Impressionists,
              Patterson&apos;s critical reception was extraordinary —
              distinguishing him from most of his contemporaries.
            </p>
            <p className="font-sans text-sm leading-[1.85] text-foreground/80">
              By 1916 he had moved to Hawaii, San Francisco and finally Seattle,
              where he became the Pacific Northwest&apos;s first modernist link
              to Europe. Seldom predictable, perpetually curious, he tried
              murals, Cubism, Abstraction — and in his last years returned full
              circle to Impressionism, producing remarkable paintings of
              light-filled studio interiors and still lifes.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-sans text-xs tracking-[0.18em] uppercase text-muted-foreground mb-1">
              Career Timeline
            </p>
            {milestones.map(({ year, label }) => (
              <div key={year} className="flex items-center gap-4">
                <span className="font-heading text-base text-primary w-12 shrink-0">
                  {year}
                </span>
                <span className="h-px flex-1 bg-border" />
                <span className="font-sans text-xs text-foreground/70 text-right">
                  {label}
                </span>
              </div>
            ))}
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="font-sans text-xs tracking-wide">
                Impressionism
              </Badge>
              <Badge
                variant="outline"
                className="font-sans text-xs tracking-wide">
                Post-Impressionism
              </Badge>
              <Badge
                variant="outline"
                className="font-sans text-xs tracking-wide">
                Fauvism
              </Badge>
              <Badge
                variant="outline"
                className="font-sans text-xs tracking-wide">
                Printmaking
              </Badge>
              <Badge
                variant="outline"
                className="font-sans text-xs tracking-wide">
                Muralism
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
