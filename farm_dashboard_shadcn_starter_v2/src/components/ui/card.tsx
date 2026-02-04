import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl bg-farm-card shadow-soft border border-white/5",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  description,
  right,
}: {
  title: string;
  description?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 px-5 pt-5">
      <div>
        <div className="text-xs font-medium tracking-widest text-farm-muted">
          {title.toUpperCase()}
        </div>
        {description ? (
          <div className="mt-1 text-sm text-farm-subtext">{description}</div>
        ) : null}
      </div>
      {right ? <div className="pt-1">{right}</div> : null}
    </div>
  );
}

export function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="px-5 pb-5 pt-4">{children}</div>;
}
