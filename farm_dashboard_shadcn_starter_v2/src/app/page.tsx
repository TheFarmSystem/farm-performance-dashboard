import Link from "next/link";
import { Shell } from "@/components/shell";
import { Card, CardBody, CardHeader } from "@/components/ui/card";

export default function Home() {
  return (
    <Shell title="Farm Dashboard" subtitle="Shad-style starter (MVP)">
      <Card>
        <CardHeader title="Start here" description="Open the demo client session dashboard." />
        <CardBody>
          <Link
            className="inline-flex items-center rounded-xl bg-farm-red px-4 py-2 text-sm font-semibold text-white"
            href="/session/demo"
          >
            Open Demo Dashboard
          </Link>
          <div className="mt-4 text-sm text-farm-subtext">
            Next: wire real data ingestion (Blast + Rapsodo) and build the remaining dashboard sections.
          </div>
        </CardBody>
      </Card>
    </Shell>
  );
}
