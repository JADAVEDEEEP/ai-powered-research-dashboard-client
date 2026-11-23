import { Cpu, Target, Zap, TrendingUp, ArrowDown } from "lucide-react";
import { getDeptColor } from "../lib/insights";
import { SectionHeading } from "./ui/primitives";

interface Opportunity {
  department?: string;
  problem?: string;
  solution?: string;
  expectedImpact?: string;
}

interface Props {
  data: Opportunity[];
  index?: string;
}

export default function AIOpportunities({ data, index }: Props) {
  if (!data || data.length === 0) return null;

  return (
    <div>
      <SectionHeading
        index={index}
        eyebrow="Strategic Intelligence"
        title="AI Opportunities"
        aside={<span className="font-mono text-[11px] text-ink-4">{data.length} recommendations</span>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {data.map((opp, i) => {
          const c = getDeptColor(opp.department);
          return (
            <article
              key={i}
              className="panel group overflow-hidden transition-[border-color,transform] duration-300 hover:-translate-y-0.5"
              style={{ ["--c" as string]: c }}
            >
              {/* glow */}
              <div
                aria-hidden
                className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-25 group-hover:opacity-40 transition-opacity"
                style={{ background: c }}
              />
              <div aria-hidden className="absolute top-0 inset-x-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${c}, transparent)` }} />

              {/* Header */}
              <header className="relative flex items-center justify-between gap-3 px-5 sm:px-6 pt-5 pb-4">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="inline-flex w-8 h-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${c}22`, boxShadow: `inset 0 0 0 1px ${c}55` }}
                  >
                    <Cpu className="w-4 h-4" style={{ color: c }} />
                  </span>
                  <h3 className="text-[15px] font-medium text-ink truncate">
                    {opp.department ?? `Opportunity ${i + 1}`}
                  </h3>
                </div>
                <span className="font-mono text-[11px] text-ink-4">#{String(i + 1).padStart(2, "0")}</span>
              </header>

              {/* Flow */}
              <div className="relative px-5 sm:px-6 pb-6 space-y-1">
                {opp.problem && (
                  <div className="rounded-lg border border-line bg-white/[0.02] p-4">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Target className="w-3.5 h-3.5 text-rose" />
                      <span className="eyebrow !text-[10px] !text-rose">Problem</span>
                    </div>
                    <p className="text-[13.5px] leading-relaxed text-ink-2">{opp.problem}</p>
                  </div>
                )}

                {opp.problem && opp.solution && (
                  <div className="flex justify-center py-0.5" aria-hidden>
                    <ArrowDown className="w-3.5 h-3.5 text-ink-4" />
                  </div>
                )}

                {opp.solution && (
                  <div className="rounded-lg border p-4" style={{ borderColor: `${c}40`, background: `${c}0d` }}>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Zap className="w-3.5 h-3.5" style={{ color: c }} />
                      <span className="eyebrow !text-[10px]" style={{ color: c }}>Solution</span>
                    </div>
                    <p className="text-[13.5px] leading-relaxed text-ink">{opp.solution}</p>
                  </div>
                )}

                {opp.expectedImpact && (
                  <div className="mt-3 flex items-start gap-3 rounded-lg bg-gradient-to-r from-mint/[0.12] to-transparent p-4 border-l-2 border-mint">
                    <TrendingUp className="w-4 h-4 mt-0.5 text-mint shrink-0" />
                    <div>
                      <span className="eyebrow !text-[10px] !text-mint">Expected Impact</span>
                      <p className="mt-1 text-[13.5px] font-medium leading-relaxed text-ink">{opp.expectedImpact}</p>
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
