import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}>
      <span className="font-sans text-xs tracking-[0.2em] uppercase text-primary font-medium">
        {label}
      </span>
      <div
        className={cn(
          "flex items-center gap-4",
          align === "center" && "justify-center",
        )}>
        <span className="h-px w-12 bg-primary/30" />
        <h2 className="font-heading text-3xl md:text-4xl text-foreground leading-tight">
          {title}
        </h2>
        <span className="h-px w-12 bg-primary/30" />
      </div>
      {subtitle && (
        <p className="font-sans text-muted-foreground text-base max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
