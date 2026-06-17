import { Separator } from "@/components/ui/separator";

const links = [
  { label: "The Artist", href: "#artist" },
  { label: "The Book", href: "#book" },
  { label: "The Author", href: "#author" },
  { label: "Purchase", href: "#purchase" },
];

export function SiteNav() {
  return (
    <header className="w-full bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          {/* ACVA grid mark */}
          <div className="grid grid-cols-2 gap-px w-6 h-6">
            {["A", "C", "V", "A"].map((l, i) => (
              <div
                key={i}
                className="bg-foreground flex items-center justify-center">
                <span className="text-background text-[6px] font-bold font-sans leading-none">
                  {l}
                </span>
              </div>
            ))}
          </div>
          <span className="font-heading text-sm tracking-wide hidden sm:block">
            Ambrose Patterson
          </span>
        </a>
        <nav className="flex items-center gap-1">
          {links.map((link, i) => (
            <span key={link.href} className="flex items-center gap-1">
              {i > 0 && (
                <Separator
                  orientation="vertical"
                  className="h-3 mx-1 opacity-40"
                />
              )}
              <a
                href={link.href}
                className="font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors">
                {link.label}
              </a>
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
}
