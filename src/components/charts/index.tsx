// Lightweight chart primitives. Every chart renders values passed in from
// real report/history data — none of these generate numbers on their own.
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ── Dot matrix: one lit dot per item (count visual) ─────────────────────────
export function DotMatrix({
  value,
  total = 24,
  color,
  cols = 12,
}: {
  value: number;
  total?: number;
  color: string;
  cols?: number;
}) {
  const cells = Math.max(total, value);
  return (
    <div
      className="grid gap-[5px]"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      role="img"
      aria-label={`${value} items`}
    >
      {Array.from({ length: cells }).map((_, i) => (
        <span
          key={i}
          className="aspect-square rounded-[2px] transition-colors"
          style={{
            background: i < value ? color : "rgba(255,255,255,0.06)",
            boxShadow: i < value ? `0 0 8px -1px ${color}` : undefined,
            opacity: i < value ? 1 - (i / cells) * 0.35 : 1,
          }}
        />
      ))}
    </div>
  );
}

// ── Vertical bar strip ──────────────────────────────────────────────────────
export function BarStrip({
  values,
  color,
  height = 56,
}: {
  values: number[];
  color: string;
  height?: number;
}) {
  const max = Math.max(1, ...values);
  return (
    <div className="flex items-end gap-[3px] w-full" style={{ height }} aria-hidden>
      {values.map((v, i) => (
        <span
          key={i}
          className="flex-1 rounded-t-[2px]"
          style={{
            height: `${Math.max(6, (v / max) * 100)}%`,
            background: v > 0 ? `linear-gradient(180deg, ${color}, ${color}55)` : "rgba(255,255,255,0.06)",
          }}
        />
      ))}
    </div>
  );
}

// ── Ring gauge (value / max) ────────────────────────────────────────────────
export function Ring({
  value,
  max,
  size = 64,
  stroke = 7,
  color,
  label,
}: {
  value: number;
  max: number;
  size?: number;
  stroke?: number;
  color: string;
  label?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = max > 0 ? Math.min(1, value / max) : 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${c * pct} ${c}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ filter: `drop-shadow(0 0 6px ${color}88)`, transition: "stroke-dasharray .8s ease" }}
      />
    </svg>
  );
}

// ── Activity area chart ─────────────────────────────────────────────────────
export function ActivityArea({ data }: { data: { label: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: 4 }}>
        <defs>
          <linearGradient id="actFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4fe3c1" stopOpacity={0.45} />
            <stop offset="100%" stopColor="#4fe3c1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="label"
          tick={{ fill: "#555c6e", fontSize: 10, fontFamily: "Geist Mono" }}
          tickLine={false}
          axisLine={false}
          interval="preserveStartEnd"
          minTickGap={24}
        />
        <Tooltip
          cursor={{ stroke: "rgba(255,255,255,0.15)" }}
          contentStyle={{
            background: "#12151e",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 8,
            fontSize: 12,
            color: "#eef0f6",
          }}
          labelStyle={{ color: "#7d8599" }}
          formatter={(v: number) => [`${v} report${v === 1 ? "" : "s"}`, ""]}
          separator=""
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#4fe3c1"
          strokeWidth={2}
          fill="url(#actFill)"
          isAnimationActive
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ── Donut ───────────────────────────────────────────────────────────────────
export function Donut({
  data,
  size = 168,
  centerTop,
  centerBottom,
}: {
  data: { name: string; value: number; color: string }[];
  size?: number;
  centerTop?: string;
  centerBottom?: string;
}) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="68%"
            outerRadius="100%"
            paddingAngle={data.length > 1 ? 3 : 0}
            stroke="none"
            cornerRadius={3}
          >
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#12151e",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 8,
              fontSize: 12,
            }}
            itemStyle={{ color: "#eef0f6" }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        {centerTop && <span className="text-2xl font-semibold text-ink tabular-nums">{centerTop}</span>}
        {centerBottom && <span className="eyebrow !text-[10px] mt-0.5">{centerBottom}</span>}
      </div>
    </div>
  );
}

// ── Horizontal bar list ─────────────────────────────────────────────────────
export function BarList({
  data,
  color,
}: {
  data: { name: string; value: number; color?: string }[];
  color?: string;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <ul className="space-y-3">
      {data.map((d) => (
        <li key={d.name}>
          <div className="flex items-center justify-between gap-3 text-[13px] mb-1.5">
            <span className="text-ink-2 truncate">{d.name}</span>
            <span className="font-mono text-ink tabular-nums">{d.value}</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${(d.value / max) * 100}%`,
                background: `linear-gradient(90deg, ${(d.color ?? color)}66, ${d.color ?? color})`,
                transition: "width .8s cubic-bezier(.22,1,.36,1)",
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
