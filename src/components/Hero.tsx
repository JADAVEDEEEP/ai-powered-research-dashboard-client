import { motion } from "motion/react";
import SearchBar from "./SearchBar";
import { LiveDot } from "./ui/primitives";

interface Props {
  onSearch: (company: string) => void;
  isLoading: boolean;
}

// Report modules the agent produces — orbit labels (descriptive, not data).
const MODULES = [
  { label: "Overview", angle: -90, r: 0.94, c: "#8f7dff" },
  { label: "Business", angle: -28, r: 0.68, c: "#5cc8ff" },
  { label: "Challenges", angle: 32, r: 0.9, c: "#ff6b8b" },
  { label: "AI Opps", angle: 96, r: 0.62, c: "#4fe3c1" },
  { label: "CEO Pitch", angle: 158, r: 0.92, c: "#ffb547" },
  { label: "Sources", angle: 214, r: 0.66, c: "#c9a8ff" },
];

function RadarGraphic() {
  const S = 420;
  const C = S / 2;
  const R = C - 18;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]" aria-hidden>
      {/* glow */}
      <div className="absolute inset-[12%] rounded-full bg-iris/25 blur-3xl" />
      <svg viewBox={`0 0 ${S} ${S}`} className="relative w-full h-full">
        <defs>
          <radialGradient id="rg-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8f7dff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8f7dff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="rg-sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4fe3c1" stopOpacity="0" />
            <stop offset="100%" stopColor="#4fe3c1" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        {/* rings */}
        {[1, 0.78, 0.56, 0.34].map((k, i) => (
          <circle
            key={k}
            cx={C}
            cy={C}
            r={R * k}
            fill="none"
            stroke="rgba(255,255,255,0.09)"
            strokeDasharray={i % 2 ? "2 6" : undefined}
          />
        ))}
        {/* cross hairs */}
        {[0, 45, 90, 135].map((a) => (
          <line
            key={a}
            x1={C + R * Math.cos((a * Math.PI) / 180)}
            y1={C + R * Math.sin((a * Math.PI) / 180)}
            x2={C - R * Math.cos((a * Math.PI) / 180)}
            y2={C - R * Math.sin((a * Math.PI) / 180)}
            stroke="rgba(255,255,255,0.05)"
          />
        ))}
        {/* tick marks */}
        {Array.from({ length: 72 }).map((_, i) => {
          const a = (i * 5 * Math.PI) / 180;
          const l = i % 6 === 0 ? 10 : 4;
          return (
            <line
              key={i}
              x1={C + R * Math.cos(a)}
              y1={C + R * Math.sin(a)}
              x2={C + (R - l) * Math.cos(a)}
              y2={C + (R - l) * Math.sin(a)}
              stroke="rgba(255,255,255,0.18)"
            />
          );
        })}

        {/* sweep */}
        <g className="anim-sweep" style={{ transformOrigin: `${C}px ${C}px` }}>
          <path
            d={`M ${C} ${C} L ${C + R} ${C} A ${R} ${R} 0 0 0 ${C + R * Math.cos(-Math.PI / 4)} ${C + R * Math.sin(-Math.PI / 4)} Z`}
            fill="url(#rg-sweep)"
            opacity={0.5}
          />
          <line x1={C} y1={C} x2={C + R} y2={C} stroke="#4fe3c1" strokeOpacity={0.8} />
        </g>

        {/* connection lines */}
        {MODULES.map((m) => {
          const a = (m.angle * Math.PI) / 180;
          return (
            <line
              key={`l-${m.label}`}
              x1={C}
              y1={C}
              x2={C + R * m.r * Math.cos(a)}
              y2={C + R * m.r * Math.sin(a)}
              stroke={m.c}
              strokeOpacity={0.35}
              strokeDasharray="3 5"
              className="anim-dash"
            />
          );
        })}

        <circle cx={C} cy={C} r={R * 0.3} fill="url(#rg-core)" />
        <circle cx={C} cy={C} r={7} fill="#fff" />
        <circle cx={C} cy={C} r={14} fill="none" stroke="#fff" strokeOpacity={0.3} />
      </svg>

      {/* nodes */}
      {MODULES.map((m, i) => {
        const a = (m.angle * Math.PI) / 180;
        const x = 50 + ((R * m.r) / S) * 100 * Math.cos(a);
        const y = 50 + ((R * m.r) / S) * 100 * Math.sin(a);
        return (
          <motion.div
            key={m.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="flex items-center gap-1.5 rounded-md border border-line-strong bg-panel-2/90 backdrop-blur px-2 py-1 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: m.c, boxShadow: `0 0 8px ${m.c}` }} />
              <span className="font-mono text-[10px] text-ink-2 whitespace-nowrap">{m.label}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

const CAPABILITIES = [
  "Deep Research",
  "Google Search Grounding",
  "Gemini Reasoning",
  "AI Analysis",
  "Risk Assessment",
  "Strategic Opportunities",
  "CEO-Ready Insights",
  "Cited Sources",
];

export default function Hero({ onSearch, isLoading }: Props) {
  return (
    <section id="top" className="relative scroll-mt-24">
      <div className="panel overflow-hidden">
        <div className="absolute inset-0 line-grid [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_75%)]" aria-hidden />
        <div className="absolute -top-40 right-[-10%] w-[560px] h-[560px] rounded-full bg-gradient-to-br from-iris-2/40 via-sky/10 to-transparent blur-3xl" aria-hidden />

        <div className="relative grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-4 items-center px-5 sm:px-10 lg:px-12 pt-10 sm:pt-14 pb-8 lg:py-14">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] px-3 py-1.5 mb-7"
            >
              <LiveDot />
              <span className="font-mono text-[11px] tracking-wider text-ink-2">AI-POWERED BUSINESS INTELLIGENCE</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[40px] leading-[1.02] sm:text-6xl lg:text-[68px] font-semibold tracking-[-0.035em] text-ink"
            >
              AI-Powered{" "}
              <span className="font-display italic font-normal tracking-[-0.01em] text-gradient pr-1">Research</span>
              <br className="hidden sm:block" /> &amp;{" "}
              <span className="font-display italic font-normal tracking-[-0.01em] text-gradient pr-1">Recommendation</span>{" "}
              Agent
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.7 }}
              className="mt-6 text-base sm:text-lg leading-relaxed text-ink-3 max-w-xl"
            >
              Enter any company name and receive a comprehensive AI-generated business
              analysis, strategic opportunities, and an executive-ready pitch letter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-9"
            >
              <SearchBar onSearch={onSearch} isLoading={isLoading} />
            </motion.div>
          </div>

          <div className="hidden sm:block anim-float">
            <RadarGraphic />
          </div>
        </div>

        {/* capability marquee */}
        <div className="relative border-t border-line overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max anim-marquee">
            {[...CAPABILITIES, ...CAPABILITIES].map((c, i) => (
              <span key={i} className="flex items-center gap-3 px-5 font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3 whitespace-nowrap">
                <span className="text-iris">✦</span>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
