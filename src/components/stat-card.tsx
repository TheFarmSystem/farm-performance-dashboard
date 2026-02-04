import { Card, CardBody, CardHeader } from "@/components/ui/card";

export function StatCard({
  title,
  value,
  subtitle,
  accent = false,
}: {
  title: string;
  value: string;
  subtitle: string;
  accent?: boolean;
}) {
  return (
    <Card className="relative overflow-hidden">
      <div
        className={
          accent
            ? "pointer-events-none absolute inset-x-0 top-0 h-1 bg-farm-red"
            : "pointer-events-none absolute inset-x-0 top-0 h-1 bg-white/5"
        }
      />
      <CardHeader title={title} />
      <CardBody>
        <div className="text-3xl font-semibold tracking-tight">{value}</div>
        <div className="mt-1 text-sm text-farm-subtext">{subtitle}</div>
      </CardBody>
    </Card>
  );
}
