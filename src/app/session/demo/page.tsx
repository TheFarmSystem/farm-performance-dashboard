// src/app/session/[id]/page.tsx
import Link from "next/link";

function SectionTitle({
  kicker,
  title,
  subtitle,
  id,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  id: string;
}) {
  return (
    <div id={id} className="scroll-mt-24">
      <div className="text-xs uppercase tracking-widest text-white/50">
        {kicker}
      </div>
      <div className="mt-2 text-2xl font-semibold text-white">{title}</div>
      {subtitle ? (
        <div className="mt-2 text-sm leading-relaxed text-white/60">
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}

function Card({
  title,
  children,
  right,
}: {
  title: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-medium uppercase tracking-widest text-white/50">
          {title}
        </div>
        {right ? <div className="text-white/60">{right}</div> : null}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function HeroVisual({ label }: { label: string }) {
  // Placeholder for the “big graphic” per section
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5">
      <div className="text-xs font-medium uppercase tracking-widest text-white/50">
        {label}
      </div>

      <div className="mt-4 h-44 w-full rounded-xl border border-white/10 bg-black/40" />

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <div className="text-[11px] uppercase tracking-widest text-white/50">
            Insight
          </div>
          <div className="mt-2 text-sm text-white/80">
            Placeholder explanation in client language.
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <div className="text-[11px] uppercase tracking-widest text-white/50">
            Priority
          </div>
          <div className="mt-2 text-sm text-white/80">
            One clear focus area for the next training block.
          </div>
        </div>
      </div>
    </div>
  );
}

function StickyNav() {
  return (
    <div className="sticky top-0 z-20 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
        <div className="text-sm font-semibold text-white">
          Farm Performance Dashboard
        </div>
        <div className="flex items-center gap-3 text-xs text-white/60">
          <Link href="#overview" className="hover:text-white">
            Overview
          </Link>
          <Link href="#creation" className="hover:text-white">
            Creation
          </Link>
          <Link href="#flight" className="hover:text-white">
            Flight
          </Link>
          <Link href="#next" className="hover:text-white">
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}

function AthleteHeader({
  athlete,
  date,
  tags,
}: {
  athlete: string;
  date: string;
  tags: string[];
}) {
  return (
    <div className="mx-auto max-w-md px-4 pt-6">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <div className="text-xs uppercase tracking-widest text-white/50">
          Client Report
        </div>
        <div className="mt-2 text-xl font-semibold text-white">{athlete}</div>
        <div className="mt-1 text-sm text-white/60">{date}</div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function KPIGrid() {
  return (
    <div className="mx-auto mt-4 grid max-w-md grid-cols-3 gap-3 px-4">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <div className="text-[11px] uppercase tracking-widest text-white/50">
          Creation
        </div>
        <div className="mt-2 text-lg font-semibold text-white">71.7</div>
        <div className="text-xs text-white/60">mph (bat speed)</div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <div className="text-[11px] uppercase tracking-widest text-white/50">
          Efficiency
        </div>
        <div className="mt-2 text-lg font-semibold text-white">66%</div>
        <div className="text-xs text-white/60">on-plane</div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <div className="text-[11px] uppercase tracking-widest text-white/50">
          Outcome
        </div>
        <div className="mt-2 text-lg font-semibold text-white">Ball Flight</div>
        <div className="text-xs text-white/60">contact quality</div>
      </div>
    </div>
  );
}

function TwoCol({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="mx-auto grid max-w-md grid-cols-1 gap-3 px-4 sm:grid-cols-2">
      {left}
      {right}
    </div>
  );
}

export default async function SessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Demo placeholders for structure.
  // Next step: replace with real parsed Rapsodo + Blast session data.
  const athlete = id === "demo" ? "Riley Valentine" : `Session: ${id}`;
  const date = "Jan 27, 2026";
  const tags = ["Blast", "Rapsodo", "Hitting Eval"];

  return (
    <main className="min-h-screen bg-black">
      <StickyNav />
      <AthleteHeader athlete={athlete} date={date} tags={tags} />
      <KPIGrid />

      <div className="mx-auto max-w-md px-4 pb-20 pt-8">
        {/* OVERVIEW */}
        <div className="space-y-4">
          <SectionTitle
            id="overview"
            kicker="Overview"
            title="Performance Summary"
            subtitle="A clear view of what you do well, what’s holding you back, and what we’re targeting next."
          />
          <HeroVisual label="Performance Signature (overview graphic)" />
          <TwoCol
            left={
              <Card title="Top Wins">
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• Strong bat speed ceiling</li>
                  <li>• Efficient contact window when on time</li>
                  <li>• Best outcomes to pull-side middle</li>
                </ul>
              </Card>
            }
            right={
              <Card title="Primary Focus">
                <div className="text-sm text-white/80">
                  Tighten consistency so your “best swings” show up more often.
                </div>
                <div className="mt-3 text-xs text-white/50">
                  This will later map to 1–2 measurable metrics.
                </div>
              </Card>
            }
          />
        </div>

        {/* CREATION */}
        <div className="mt-10 space-y-4">
          <SectionTitle
            id="creation"
            kicker="Swing Creation"
            title="How you produce speed"
            subtitle="Blast-based visuals that explain how your swing creates bat speed and how consistent that creation is."
          />
          <HeroVisual label="Bat Speed Distribution (hero chart)" />
          <TwoCol
            left={
              <Card title="Bat Speed Profile">
                <div className="h-24 rounded-xl border border-white/10 bg-black/40" />
                <div className="mt-3 text-xs text-white/60">
                  Distribution + peak/avg markers.
                </div>
              </Card>
            }
            right={
              <Card title="Rotational Accel">
                <div className="h-24 rounded-xl border border-white/10 bg-black/40" />
                <div className="mt-3 text-xs text-white/60">
                  Accel + time-to-contact style visual.
                </div>
              </Card>
            }
          />
          <Card title="Client Insight">
            <div className="text-sm text-white/80">
              When your timing is right, your creation is elite. The goal is to
              raise the floor so “good” swings become your normal.
            </div>
          </Card>
        </div>

        {/* BALL FLIGHT */}
        <div className="mt-10 space-y-4">
          <SectionTitle
            id="flight"
            kicker="Ball Flight"
            title="What the ball did"
            subtitle="Rapsodo-style visuals that show how contact quality and launch conditions translate into results."
          />
          <HeroVisual label="Spray + Quality Map (hero visual)" />
          <TwoCol
            left={
              <Card title="Exit Velo Distribution">
                <div className="h-24 rounded-xl border border-white/10 bg-black/40" />
                <div className="mt-3 text-xs text-white/60">
                  Pop chart with “target band” overlay.
                </div>
              </Card>
            }
            right={
              <Card title="Launch Angle Distribution">
                <div className="h-24 rounded-xl border border-white/10 bg-black/40" />
                <div className="mt-3 text-xs text-white/60">
                  Your launch window, shown clearly.
                </div>
              </Card>
            }
          />
          <Card title="Client Insight">
            <div className="text-sm text-white/80">
              The ball flight shows a strong middle window. We’re aiming to
              reduce the “miss” outcomes by improving consistency in contact
              conditions.
            </div>
          </Card>
        </div>

        {/* NEXT STEPS */}
        <div className="mt-10 space-y-4">
          <SectionTitle
            id="next"
            kicker="Next Steps"
            title="What we do from here"
            subtitle="Simple, actionable steps based on what your data showed, without drowning you in coach-speak."
          />
          <TwoCol
            left={
              <Card title="3 Action Items">
                <ol className="space-y-2 text-sm text-white/80">
                  <li>1) Build a repeatable timing routine</li>
                  <li>2) Train the contact window you’re best in</li>
                  <li>3) Reinforce consistency under fatigue</li>
                </ol>
              </Card>
            }
            right={
              <Card title="What to Watch For">
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• More similar ball flights across swings</li>
                  <li>• Fewer “leak” misses</li>
                  <li>• Higher average outcomes, not just peaks</li>
                </ul>
              </Card>
            }
          />
          <Card title="Coach Note">
            <div className="text-sm text-white/80">
              This dashboard is your “after” view. The deep technical breakdown
              lives behind it, but the plan stays simple.
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
