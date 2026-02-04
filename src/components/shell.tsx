import { cn } from "@/lib/utils";

export function Shell({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-h-screen", className)}>
      <header className="sticky top-0 z-10 border-b border-white/5 bg-farm-bg/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <div className="text-lg font-semibold tracking-tight">{title}</div>
            {subtitle ? (
              <div className="text-sm text-farm-subtext">{subtitle}</div>
            ) : null}
          </div>
          <div className="text-xs text-farm-muted">The Farm System</div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
