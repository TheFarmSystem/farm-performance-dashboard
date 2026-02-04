import { Card } from "@/components/ui/card";

export function InsightStrip({ text }: { text: string }) {
  return (
    <Card className="border border-farm-red/25 bg-gradient-to-r from-farm-card to-farm-card/70">
      <div className="px-5 py-4">
        <div className="text-sm text-farm-subtext">
          <span className="font-semibold text-white">Insight:</span>{" "}
          {text}
        </div>
      </div>
    </Card>
  );
}
