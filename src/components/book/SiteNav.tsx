import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { AcvaLogo } from "./AcvaLogo";

const links = [
  { label: "The Artist", href: "/#artist" },
  { label: "The Book", href: "/#book" },
  { label: "The Author", href: "/#author" },
  { label: "In the Press", href: "/press" },
];

export function SiteNav() {
  return (
    <header className="w-full bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <AcvaLogo size={32} className="text-foreground" />
          <span className="font-heading text-sm tracking-wide hidden sm:block">
            Ambrose Patterson
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((link, i) => (
            <span key={link.href} className="flex items-center gap-1">
              {i > 0 && (
                <Separator
                  orientation="vertical"
                  className="h-3 mx-1 opacity-40"
                />
              )}
              <Link
                href={link.href}
                className="font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors">
                {link.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
}
