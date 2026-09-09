import { cn } from "@/lib/utils"; // اگر تابع cn نداری، پایین‌تر کدش رو گذاشتم

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: "default" | "muted" | "glow";
}

export function Section({ children, className, variant = "default", ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden py-16 md:py-24  transition-colors",
        variant === "muted" && "bg-muted-bg/60",
        className
      )}
      {...props}
    >
      {/* افکت نور محیطی (Ambient Glow) اگر variant روی glow باشه */}
      {variant === "glow" && (
        <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
          <div className="h-[300px] w-[500px] rounded-full bg-gradient-to-tr from-brand-primary/20 to-brand-accent/10 blur-[120px]" />
        </div>
      )}

      <div className="container mx-auto px-6 ">
        {children}
      </div>
    </section>
  );
}