import { Separator } from "@/components/ui/separator";
import { AcvaLogo } from "./AcvaLogo";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between gap-6 items-start">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <AcvaLogo size={36} className="text-background" />
              <span className="font-heading text-background/90 text-sm">
                Alexander Calder Visual Arts
              </span>
            </div>
            <p className="font-sans text-xs text-background/50 max-w-xs leading-relaxed">
              ACVA Pty Ltd was established by Jane Alexander in 2020 to support
              photographic, curatorial and publishing projects.
            </p>
          </div>
        </div>
        <Separator className="opacity-20" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-sans text-background/40">
          <p>© {new Date().getFullYear()} Jane Alexander · ACVA Pty Ltd</p>
          <p>
            <span className="uppercase">Ambrose Patterson</span>
            <em>: His Life &amp; Art</em> · ISBN 978-0-6467-3365-4
          </p>
        </div>
      </div>
    </footer>
  );
}
