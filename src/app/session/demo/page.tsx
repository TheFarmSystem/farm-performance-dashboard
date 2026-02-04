// src/app/session/[id]/page.tsx
import Link from "next/link";

/** ---------- Small UI helpers ---------- */

const FARM_RED = "#FF2B2B";
const WHITE_70 = "rgba(255,255,255,0.70)";
const WHITE_50 = "rgba(255,255,255,0.50)";
const WHITE_20 = "rgba(255,255,255,0.20)";
const WHITE_10 = "rgba(255,255,255,0.10)";

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

function StickyNav() {
  return (
    <div className="sticky top-0 z-20 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-between gap-4 px-4 py-3 lg:max-w-6xl">
        <div className="text-sm font-semibold text-white">
          Farm Performance Dashboard
        </div>

        <div className="hidden items-center gap-4 text-xs text-white/60 sm:flex">
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

        <div className="flex items-center gap-3 text-xs text-white/60 sm:hidden">
          <Link href="#overview" className="hover:text-white">
            Overview
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
    <div className="mx-auto max-w-md px-4 pt-6 lg:max-w-6xl">
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
    <div className="mx-auto mt-4 grid max-w-md grid-cols-1 gap-3 px-4 sm:grid-cols-3 lg:max-w-6xl">
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
        <div className="text-xs text-white/60">on-plane window</div>
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

function TwoCol({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid max-w-md grid-cols-1 gap-3 px-4 sm:grid-cols-2 lg:max-w-6xl">
      {left}
      {right}
    </div>
  );
}

/** ---------- Tiny chart primitives (SVG, no deps) ---------- */

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

function Sparkline({
  values,
  height = 84,
  stroke = FARM_RED,
}: {
  values: number[];
  height?: number;
  stroke?: string;
}) {
  const w = 320;
  const h = height;
  const pad = 8;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const pts = values.map((v, i) => {
    const x = pad + (i * (w - pad * 2)) / (values.length - 1);
    const y = pad + (1 - (v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  });

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={stroke} stopOpacity="0.35" />
          <stop offset="1" stopColor={stroke} stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* grid */}
      <line x1="0" y1={h - 1} x2={w} y2={h - 1} stroke={WHITE_10} />
      <line x1="0" y1={1} x2={w} y2={1} stroke={WHITE_10} />

      {/* area */}
      <path
        d={`M ${pts[0]} L ${pts.join(" L ")} L ${w - 8},${h - 8} L 8,${
          h - 8
        } Z`}
        fill="url(#sparkFill)"
      />
      {/* line */}
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke={stroke}
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* last point */}
      <circle
        cx={pts[pts.length - 1].split(",")[0]}
        cy={pts[pts.length - 1].split(",")[1]}
        r="4.5"
        fill={stroke}
      />
    </svg>
  );
}

function Histogram({
  bins,
  height = 120,
  avgBinIndex,
  peakBinIndex,
  labelLeft,
  labelRight,
}: {
  bins: number[];
  height?: number;
  avgBinIndex?: number;
  peakBinIndex?: number;
  labelLeft?: string;
  labelRight?: string;
}) {
  const w = 360;
  const h = height;
  const pad = 10;

  const max = Math.max(...bins) || 1;
  const barW = (w - pad * 2) / bins.length;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {/* baseline */}
        <line
          x1={pad}
          y1={h - pad}
          x2={w - pad}
          y2={h - pad}
          stroke={WHITE_20}
        />

        {/* bars */}
        {bins.map((v, i) => {
          const bh = ((h - pad * 2) * v) / max;
          const x = pad + i * barW + 2;
          const y = h - pad - bh;
          const bw = Math.max(2, barW - 4);

          // subtle highlight near peak
          const isPeak = peakBinIndex === i;
          const fill = isPeak ? FARM_RED : "rgba(255,255,255,0.18)";

          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={bw}
              height={bh}
              rx="4"
              fill={fill}
            />
          );
        })}

        {/* avg marker */}
        {typeof avgBinIndex === "number" ? (
          <line
            x1={pad + avgBinIndex * barW + barW / 2}
            y1={pad}
            x2={pad + avgBinIndex * barW + barW / 2}
            y2={h - pad}
            stroke={FARM_RED}
            strokeWidth="2"
            opacity="0.9"
          />
        ) : null}

        {/* peak marker */}
        {typeof peakBinIndex === "number" ? (
          <circle
            cx={pad + peakBinIndex * barW + barW / 2}
            cy={pad + 8}
            r="5"
            fill={FARM_RED}
          />
        ) : null}
      </svg>

      <div className="mt-2 flex items-center justify-between text-xs text-white/50">
        <span>{labelLeft ?? "Lower"}</span>
        <span>{labelRight ?? "Higher"}</span>
      </div>
    </div>
  );
}

function BandGauge({
  value01,
  bandStart01,
  bandEnd01,
  label,
}: {
  value01: number;
  bandStart01: number;
  bandEnd01: number;
  label: string;
}) {
  const w = 360;
  const h = 56;
  const pad = 10;

  const x0 = pad;
  const x1 = w - pad;

  const bandX = x0 + (x1 - x0) * clamp01(bandStart01);
  const bandW = (x1 - x0) * clamp01(bandEnd01 - bandStart01);

  const markerX = x0 + (x1 - x0) * clamp01(value01);

  return (
    <div className="w-full">
      <div className="mb-2 text-xs uppercase tracking-widest text-white/50">
        {label}
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {/* track */}
        <rect
          x={x0}
          y={22}
          width={x1 - x0}
          height={10}
          rx={6}
          fill="rgba(255,255,255,0.10)"
        />
        {/* target band */}
        <rect
          x={bandX}
          y={22}
          width={bandW}
          height={10}
          rx={6}
          fill={FARM_RED}
          opacity="0.55"
        />
        {/* marker */}
        <circle cx={markerX} cy={27} r={9} fill={FARM_RED} />
        <circle
          cx={markerX}
          cy={27}
          r={14}
          fill={FARM_RED}
          opacity="0.18"
        />
      </svg>
      <div className="mt-1 text-xs text-white/60">
        Target window highlighted. Marker shows your current median.
      </div>
    </div>
  );
}

function SprayChart({
  points,
  title,
}: {
  points: { x: number; y: number; q: number }[]; // x,y in [-1..1], y forward is +1
  title: string;
}) {
  const w = 360;
  const h = 260;
  const pad = 14;

  const cx = w / 2;
  const cy = h - pad;

  // simple "field" arc
  const r = h * 0.92;

  return (
    <div className="w-full">
      <div className="mb-2 text-xs uppercase tracking-widest text-white/50">
        {title}
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {/* field lines */}
        <path
          d={`M ${cx},${cy} L ${pad},${pad} M ${cx},${cy} L ${w - pad},${pad}`}
          stroke={WHITE_20}
          strokeWidth="2"
        />
        <path
          d={describeArc(cx, cy, r, 210, 330)}
          fill="none"
          stroke={WHITE_10}
          strokeWidth="2"
        />
        <path
          d={describeArc(cx, cy, r * 0.75, 210, 330)}
          fill="none"
          stroke={WHITE_10}
          strokeWidth="2"
        />
        <path
          d={describeArc(cx, cy, r * 0.5, 210, 330)}
          fill="none"
          stroke={WHITE_10}
          strokeWidth="2"
        />

        {/* points */}
        {points.map((p, i) => {
          const px = cx + p.x * (w * 0.42);
          const py = cy - p.y * (h * 0.82);
          const rr = 4 + p.q * 3;
          const op = 0.35 + p.q * 0.55;
          return (
            <g key={i}>
              <circle cx={px} cy={py} r={rr * 2} fill={FARM_RED} opacity={op * 0.18} />
              <circle cx={px} cy={py} r={rr} fill={FARM_RED} opacity={op} />
            </g>
          );
        })}

        {/* home plate dot */}
        <circle cx={cx} cy={cy} r={3.5} fill={WHITE_70} opacity="0.8" />
      </svg>
      <div className="mt-1 text-xs text-white/60">
        Each dot is a batted ball. Larger/brighter = higher quality contact.
      </div>
    </div>
  );
}

function SignatureTriangle({
  a,
  b,
  c,
  labels,
}: {
  a: number; // 0..1
  b: number; // 0..1
  c: number; // 0..1
  labels: [string, string, string];
}) {
  const w = 360;
  const h = 260;

  // triangle vertices
  const pTop = { x: w / 2, y: 28 };
  const pL = { x: 38, y: h - 34 };
  const pR = { x: w - 38, y: h - 34 };

  // helper to lerp from center to vertex
  const center = { x: w / 2, y: h * 0.58 };

  const A = lerpPoint(center, pTop, clamp01(a));
  const B = lerpPoint(center, pL, clamp01(b));
  const C = lerpPoint(center, pR, clamp01(c));

  return (
    <div className="w-full">
      <div className="mb-2 text-xs uppercase tracking-widest text-white/50">
        Performance Signature
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {/* outer triangle */}
        <polygon
          points={`${pTop.x},${pTop.y} ${pL.x},${pL.y} ${pR.x},${pR.y}`}
          fill="rgba(255,255,255,0.03)"
          stroke={WHITE_10}
          strokeWidth="2"
        />
        {/* inner grid */}
        {[0.33, 0.66].map((t) => {
          const tA = lerpPoint(center, pTop, t);
          const tB = lerpPoint(center, pL, t);
          const tC = lerpPoint(center, pR, t);
          return (
            <polygon
              key={t}
              points={`${tA.x},${tA.y} ${tB.x},${tB.y} ${tC.x},${tC.y}`}
              fill="none"
              stroke={WHITE_10}
              strokeWidth="2"
              opacity="0.9"
            />
          );
        })}

        {/* signature shape */}
        <polygon
          points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
          fill={FARM_RED}
          opacity="0.18"
          stroke={FARM_RED}
          strokeWidth="3"
        />
        {/* points */}
        {[A, B, C].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={6} fill={FARM_RED} />
        ))}

        {/* labels */}
        <text
          x={pTop.x}
          y={pTop.y - 10}
          textAnchor="middle"
          fill={WHITE_70}
          fontSize="12"
        >
          {labels[0]}
        </text>
        <text
          x={pL.x - 4}
          y={pL.y + 16}
          textAnchor="start"
          fill={WHITE_70}
          fontSize="12"
        >
          {labels[1]}
        </text>
        <text
          x={pR.x + 4}
          y={pR.y + 16}
          textAnchor="end"
          fill={WHITE_70}
          fontSize="12"
        >
          {labels[2]}
        </text>
      </svg>

      <div className="mt-1 text-xs text-white/60">
        This shape summarizes your evaluation. Bigger and more balanced is more
        repeatable performance.
      </div>
    </div>
  );
}

/** ---------- Geometry helpers for SprayChart ---------- */
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180.0;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}
function lerpPoint(a: { x: number; y: number }, b: { x: number; y: number }, t: number) {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

/** ---------- Page ---------- */

export default async function SessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Demo placeholders for now.
  // Next step: replace with real parsed Rapsodo + Blast session data.
  const athlete = id === "demo" ? "Riley Valentine" : `Session: ${id}`;
  const date = "Jan 27, 2026";
  const tags = ["Blast", "Rapsodo", "Hitting Eval"];

  // Demo data (looks real enough to communicate structure)
  const batSpeedBins = [1, 2, 4, 7, 10, 11, 9, 7, 4, 2, 1];
  const evBins = [1, 3, 5, 7, 9, 10, 8, 6, 3, 2, 1];
  const accelSeries = [38, 42, 41, 47, 45, 52, 49, 55, 53, 57, 60, 58];

  const sprayPts = Array.from({ length: 26 }).map((_, i) => {
    // favor pull/middle cluster
    const x = (Math.random() * 2 - 1) * 0.65 + 0.18;
    const y = clamp01(Math.random() * 0.9 + 0.08);
    const q = clamp01(Math.random() * 0.9);
    return { x, y, q };
  });

  return (
    <main className="min-h-screen bg-black">
      <StickyNav />
      <AthleteHeader athlete={athlete} date={date} tags={tags} />
      <KPIGrid />

      <div className="mx-auto max-w-md px-4 pb-20 pt-8 lg:max-w-6xl">
        {/* OVERVIEW */}
        <div className="space-y-4">
          <SectionTitle
            id="overview"
            kicker="Overview"
            title="Performance Summary"
            subtitle="A clear view of what you do well, what’s holding you back, and what we’re targeting next."
          />

          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <SignatureTriangle
                  a={0.72}
                  b={0.63}
                  c={0.68}
                  labels={["Creation", "Efficiency", "Outcome"]}
                />
              </div>
              <div className="space-y-3">
                <Card title="Top Wins">
                  <ul className="space-y-2 text-sm text-white/80">
                    <li>• Strong bat speed ceiling</li>
                    <li>• Best contact window shows repeatable patterns</li>
                    <li>• Highest outcomes cluster in one lane</li>
                  </ul>
                </Card>
                <Card title="Primary Focus">
                  <div className="text-sm text-white/80">
                    Raise the floor. Your best swings are already there. We want
                    them to show up more often.
                  </div>
                  <div className="mt-3 text-xs text-white/50">
                    (Next: we’ll map this to 1–2 real metrics.)
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* CREATION */}
        <div className="mt-10 space-y-4">
          <SectionTitle
            id="creation"
            kicker="Swing Creation"
            title="How you produce speed"
            subtitle="Blast-style visuals that explain bat speed creation and consistency, without drowning the client in tech."
          />

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="text-xs font-medium uppercase tracking-widest text-white/50">
                Bat Speed Distribution
              </div>
              <div className="mt-3">
                <Histogram
                  bins={batSpeedBins}
                  height={140}
                  avgBinIndex={6}
                  peakBinIndex={5}
                  labelLeft="Lower bat speed"
                  labelRight="Higher bat speed"
                />
              </div>
              <div className="mt-2 text-sm text-white/70">
                Your average is strong. The goal is to tighten variance so more
                swings live near the top end.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <BandGauge
                label="Consistency Band"
                bandStart01={0.52}
                bandEnd01={0.78}
                value01={0.67}
              />
            </div>
          </div>

          <TwoCol
            left={
              <Card title="Rotational Acceleration">
                <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                  <Sparkline values={accelSeries} height={96} />
                </div>
                <div className="mt-3 text-xs text-white/60">
                  We’ll later label this with real accel units + peak timing.
                </div>
              </Card>
            }
            right={
              <Card title="Client Insight">
                <div className="text-sm text-white/80">
                  When timing is right, your creation is high-level. The plan is
                  simple: make your “good” swings more repeatable.
                </div>
              </Card>
            }
          />
        </div>

        {/* BALL FLIGHT */}
        <div className="mt-10 space-y-4">
          <SectionTitle
            id="flight"
            kicker="Ball Flight"
            title="What the ball did"
            subtitle="Rapsodo-style visuals that show how contact quality and launch conditions translate into outcomes."
          />

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <SprayChart
                title="Directional Pattern (Spray)"
                points={sprayPts}
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <BandGauge
                label="Launch Window"
                bandStart01={0.40}
                bandEnd01={0.68}
                value01={0.56}
              />
              <div className="mt-5">
                <div className="text-xs font-medium uppercase tracking-widest text-white/50">
                  Exit Velo Distribution
                </div>
                <div className="mt-2">
                  <Histogram
                    bins={evBins}
                    height={110}
                    avgBinIndex={6}
                    peakBinIndex={5}
                    labelLeft="Lower EV"
                    labelRight="Higher EV"
                  />
                </div>
              </div>
            </div>
          </div>

          <Card title="Client Insight">
            <div className="text-sm text-white/80">
              Your best outcomes cluster in a lane. We’re aiming to reduce the
              miss outcomes by improving consistency in the contact conditions
              that create that lane.
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
                  <li>• Fewer leak misses</li>
                  <li>• Higher average outcomes, not just peaks</li>
                </ul>
              </Card>
            }
          />

          <Card title="Coach Note">
            <div className="text-sm text-white/80">
              This dashboard is your after view. The deeper technical breakdown
              lives behind it, but the plan stays simple.
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
