import { Layers, TrendingUp, MapPin, Sparkles } from "lucide-react";
import { Tag } from "./ui/primitives";

interface OverviewData {
  companyName?: string;
  summary?: string;
  industry?: string;
  scale?: string;
  geographicPresence?: string;
}

interface Props {
  data: OverviewData;
  generatedAt?: string;
}

export default function OverviewCard({ data, generatedAt }: Props) {
  const stats = [
    { icon: Layers, label: "Industry", value: data.industry, color: "var(--iris)" },
    { icon: TrendingUp, label: "Scale", value: data.scale, color: "var(--mint)" },
    { icon: MapPin, label: "Geographic Presence", value: data.geographicPresence, color: "var(--sky)" },
  ].filter((s) => s.value);

  return (
    <div className="panel overflow-hidden">
      {/* Cover band */}
      <div className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(800px_300px_at_85%_0%,rgba(106,86,245,0.55),transparent_60%),radial-gradient(500px_260px_at_10%_120%,rgba(79,227,193,0.22),transparent_60%)]" />
        <div aria-hidden className="absolute inset-0 dot-grid opacity-60 [mask-image:linear-gradient(90deg,transparent,black_60%)]" />
        {/* concentric arcs */}
        <svg aria-hidden className="absolute -right-24 -top-24 w-[420px] h-[420px] opacity-60" viewBox="0 0 400 400">
          {[190, 150, 110, 70].map((r) => (
            <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="rgba(255,255,255,0.12)" />
          ))}
          <circle cx="200" cy="200" r="190" fill="none" stroke="#4fe3c1" strokeWidth="2" strokeDasharray="120 1200" className="anim-dash" />
        </svg>

        <div className="relative px-5 sm:px-10 pt-8 pb-9 sm:pt-10 sm:pb-12">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Tag color="#8f7dff">
              <Sparkles className="w-3 h-3" /> AI Analysis
            </Tag>
            <Tag>Company Overview</Tag>
            {generatedAt && <Tag>{generatedAt}</Tag>}
          </div>
          <h1 className="font-display text-[44px] sm:text-7xl lg:text-[88px] leading-[0.95] tracking-[-0.02em] text-ink break-words">
            {data.companyName ?? "—"}
          </h1>
        </div>
      </div>

      {/* Data cells */}
      {stats.length > 0 && (
        <dl className="grid sm:grid-cols-3 border-b border-line">
          {stats.map(({ icon: Icon, label, value, color }, i) => (
            <div
              key={label}
              className={`px-5 sm:px-8 py-5 ${i < stats.length - 1 ? "border-b sm:border-b-0 sm:border-r border-line" : ""}`}
            >
              <dt className="flex items-center gap-2 eyebrow !text-[10.5px]">
                <Icon className="w-3.5 h-3.5" style={{ color }} />
                {label}
              </dt>
              <dd className="mt-2 text-[15px] font-medium leading-snug text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      {/* Summary */}
      {data.summary && (
        <div className="grid lg:grid-cols-[180px_1fr] gap-3 lg:gap-8 px-5 sm:px-8 py-7">
          <p className="eyebrow pt-1">Executive summary</p>
          <p className="text-[17px] sm:text-lg leading-[1.7] text-ink-2 max-w-3xl first-letter:font-display first-letter:text-5xl first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-[0.8] first-letter:text-ink">
            {data.summary}
          </p>
        </div>
      )}
    </div>
  );
}
