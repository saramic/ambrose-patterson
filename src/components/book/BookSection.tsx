import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "./SectionHeader";

const specs = [
  { value: "240", label: "Pages" },
  { value: "100+", label: "Illustrations" },
  { value: "18", label: "Chapters" },
  { value: "100k+", label: "Words" },
];

const credits = [
  { role: "Publication Manager", name: "Jane Alexander" },
  { role: "Citation & Copy Editor", name: "Dr Alice Helme" },
  { role: "Design & Pre-Press", name: "Annabel Sayers · Linton Design" },
  { role: "Production & Printing", name: "The Australian Book Connection" },
  { role: "Stock", name: "157 gsm Matt Art" },
  { role: "ISBN", name: "978-0-6467-3365-4 (hard-cover)" },
];

export function BookSection() {
  return (
    <section id="book" className="bg-background">
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-24 flex flex-col gap-14">
        <SectionHeader
          label="Monograph"
          title="The Book"
          subtitle="A high-quality hard-cover monograph richly illustrated and painstakingly researched — the first authoritative reference on Ambrose Patterson."
        />

        {/* Stat bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {specs.map(({ value, label }) => (
            <Card
              key={label}
              className="border-border/60 bg-card text-center py-6 px-4 flex flex-col items-center gap-1">
              <CardContent className="p-0 flex flex-col items-center gap-1">
                <span className="font-heading text-4xl text-primary">
                  {value}
                </span>
                <span className="font-sans text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  {label}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Description + credits */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <p className="font-sans text-sm leading-[1.85] text-foreground/80">
            Represented in more than twenty public galleries and museums around
            the world, Patterson has never been the subject of a comprehensive
            reference — until now. With unfettered access to family archives and
            thousands of primary sources, this scholarly publication draws
            extensively upon myriad institutional archives. A must-have for
            collectors, researchers and critics.
          </p>
          <div className="flex flex-col gap-3 bg-muted/40 rounded-sm p-6 border border-border/50">
            <p className="font-sans text-xs tracking-[0.18em] uppercase text-muted-foreground mb-1">
              Production Credits
            </p>
            {credits.map(({ role, name }) => (
              <div
                key={role}
                className="flex justify-between gap-4 border-b border-border/40 pb-2 last:border-0 last:pb-0">
                <span className="font-sans text-xs text-muted-foreground shrink-0">
                  {role}
                </span>
                <span className="font-sans text-xs text-foreground text-right">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
