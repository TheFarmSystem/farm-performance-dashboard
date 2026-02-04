import { Shell } from "@/components/shell";
import { StatCard } from "@/components/stat-card";
import { InsightStrip } from "@/components/insight-strip";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { SignatureTriangle } from "@/components/charts/signature-triangle";
import { DistributionChart } from "@/components/charts/distribution";
import { CapacityBand } from "@/components/charts/capacity-band";
import { OnPlaneWindow } from "@/components/charts/on-plane-window";
import { VariabilitySpark } from "@/components/charts/variability-spark";
import { SprayTendency } from "@/components/charts/spray-tendency";
import { demoSession } from "@/data/demo-session";

export default function DemoSessionPage() {
  const s = demoSession;
  return (
    <Shell
      title="Client Dashboard"
      subtitle={`${s.athlete.name} • ${s.athlete.date} • Bats: ${s.athlete.bats}`}
    >
      <div className="grid gap-4">
        {/* KPI Row */}
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="Creation"
            value={s.kpis.creation.value}
            subtitle={`${s.kpis.creation.label} • ${s.kpis.creation.sub}`}
          />
          <StatCard
            title="Efficiency"
            value={s.kpis.efficiency.value}
            subtitle={`${s.kpis.efficiency.label} • ${s.kpis.efficiency.sub}`}
            accent
          />
          <StatCard
            title="Outcome"
            value={s.kpis.outcome.value}
            subtitle={`${s.kpis.outcome.label} • ${s.kpis.outcome.sub}`}
          />
        </div>

        {/* Hero */}
        <Card>
          <CardHeader
            title="Performance Signature"
            description="A visual summary of how swing qualities convert into outcome."
          />
          <CardBody>
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <SignatureTriangle {...s.signature} />
              <div className="space-y-3">
                <div className="text-sm text-farm-subtext">
                  This is your dashboard view after a deep technical evaluation.
                  The goal is clarity: what matters most for getting better.
                </div>
                <InsightStrip text={s.insights.overview} />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Creation */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader
              title="Bat Speed Distribution"
              description="Repeatability matters more than a single best swing."
            />
            <CardBody>
              <DistributionChart
                title="Bat Speed"
                values={s.charts.batSpeed.values}
                avg={s.charts.batSpeed.avg}
                peak={s.charts.batSpeed.peak}
              />
              <div className="mt-3 text-sm text-farm-subtext">
                White line is average. Red line is peak.
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="Rotational Acceleration"
              description="How quickly force is applied during the turn."
            />
            <CardBody>
              <CapacityBand
                min={s.charts.rotAccel.min}
                max={s.charts.rotAccel.max}
                avg={s.charts.rotAccel.avg}
                peak={s.charts.rotAccel.peak}
                label="Avg (white) • Peak (red)"
              />
              <div className="mt-4">
                <InsightStrip text={s.insights.creation} />
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Efficiency */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader
              title="Efficiency & Control"
              description="Bigger window = more adjustability and more playable contact."
            />
            <CardBody>
              <div className="grid gap-4 md:grid-cols-2 md:items-center">
                <OnPlaneWindow
                  windowStart={s.charts.onPlane.windowStart}
                  windowEnd={s.charts.onPlane.windowEnd}
                  contactPoint={s.charts.onPlane.contactPoint}
                />
                <VariabilitySpark
                  values={s.charts.attackAngle.values}
                  targetLow={s.charts.attackAngle.targetLow}
                  targetHigh={s.charts.attackAngle.targetHigh}
                  label="Attack Angle Variability"
                />
              </div>
              <div className="mt-4">
                <InsightStrip text={s.insights.efficiency} />
              </div>
            </CardBody>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader title="What this means" description="Client language, not coach jargon." />
            <CardBody>
              <div className="space-y-3 text-sm text-farm-subtext">
                <div>
                  <span className="font-semibold text-white">Window</span> is how long the barrel stays
                  lined up to the ball path.
                </div>
                <div>
                  <span className="font-semibold text-white">Variability</span> shows how consistent your
                  swing is across reps.
                </div>
                <div className="rounded-xl border border-white/5 bg-white/5 p-3">
                  Goal: widen the window and reduce big swings in angle, so your best hits happen more often.
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Outcome */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader
              title="Outcome"
              description="How hard and where the ball leaves the bat."
            />
            <CardBody>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-white/5 bg-white/5 p-1">
                  <DistributionChart
                    title="Exit Velocity"
                    values={s.charts.exitVelo.values}
                    avg={s.charts.exitVelo.avg}
                    peak={s.charts.exitVelo.peak}
                  />
                  <div className="px-2 pb-2 text-sm text-farm-subtext">White = avg • Red = peak</div>
                </div>
                <div>
                  <CapacityBand
                    min={s.charts.launchAngle.min}
                    max={s.charts.launchAngle.max}
                    avg={s.charts.launchAngle.avg}
                    peak={s.charts.launchAngle.peak}
                    label="Launch Angle Band"
                  />
                  <div className="mt-4">
                    <SprayTendency points={s.charts.spray.points} />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <InsightStrip text={s.insights.outcome} />
              </div>
            </CardBody>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader title="Next steps" description="Actionable, not overwhelming." />
            <CardBody>
              <div className="space-y-3 text-sm text-farm-subtext">
                <div className="rounded-xl border border-farm-red/20 bg-farm-red/10 p-3">
                  <div className="text-white font-semibold">Training focus</div>
                  <div className="mt-1">
                    Increase the number of swings that land in your hot contact cluster.
                  </div>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/5 p-3">
                  <div className="text-white font-semibold">How we’ll do it</div>
                  <div className="mt-1">
                    We’ll target the biggest lever from the signature graphic and measure change session to session.
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Source */}
        <Card>
          <CardHeader title="Source Data" description="Rapsodo pages swipeable gallery (coming next)." />
          <CardBody>
            <div className="text-sm text-farm-subtext">
              Next build: render every page of the Rapsodo PDF as images, then show them here in a mobile swipe gallery.
            </div>
          </CardBody>
        </Card>
      </div>
    </Shell>
  );
}
