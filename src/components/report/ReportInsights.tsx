import { AlertTriangle, Sparkles, Link2, Building2 } from "lucide-react";
import type { Report } from "../../pages/Home";
import {
  coverage,
  businessSignals,
  departmentMix,
  sourceDomains,
  validSources,
  len,
  ACCENTS,
} from "../../lib/insights";
import { BarList, DotMatrix, Donut } from "../charts";
import { Panel, Reveal } from "../ui/primitives";

/**
 * Visual summary of the report. Every figure is a count/grouping of fields
 * present in the API response — no synthetic scores.
 */
export default function ReportInsights({ report }: { report: Report }) {
  const signals = businessSignals(report).reduce((a, b) => a + b.value, 0);
  const kpis = [
    { label: "Business signals", value: signals, icon: Building2, color: ACCENTS.sky },
    { label: "Challenges identified", value: len(report.businessChallenges), icon: AlertTriangle, color: ACCENTS.rose },
    { label: "AI opportunities", value: len(report.aiOpportunities), icon: Sparkles, color: ACCENTS.iris },
    { label: "Sources cited", value: validSources(report.sources).length, icon: Link2, color: ACCENTS.mint },
  ];

  const cov = coverage(report).filter((c) => c.value > 0);
  const depts = departmentMix(report);
  const domains = sourceDomains(report.sources).slice(0, 5);

  return (
    <div className="space-y-3">
      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map(({ label, value, icon: Icon, color }, i) => (
          <Reveal key={label} delay={i * 0.04}>
            <Panel className="h-full p-5">
              <div className="flex items-center justify-between">
                <p className="text-[13px] text-ink-2">{label}</p>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-ink tabular-nums">{value}</p>
              <div className="mt-4">
                <DotMatrix value={Math.min(value, 24)} total={24} color={color} cols={12} />
              </div>
            </Panel>
          </Reveal>
        ))}
      </div>

      {/* Charts */}
      {cov.length > 0 && (
        <div className="grid lg:grid-cols-3 gap-3">
          <Reveal>
            <Panel className="h-full p-5 sm:p-6">
              <p className="eyebrow mb-1">Intelligence coverage</p>
              <p className="text-[15px] font-medium text-ink mb-5">Items returned per dimension</p>
              <BarList data={cov.map((c) => ({ name: c.label, value: c.value, color: c.color }))} />
            </Panel>
          </Reveal>

          {depts.length > 0 && (
            <Reveal delay={0.05}>
              <Panel className="h-full p-5 sm:p-6">
                <p className="eyebrow mb-1">Opportunity mix</p>
                <p className="text-[15px] font-medium text-ink mb-5">AI opportunities by department</p>
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-6">
                  <Donut
                    data={depts}
                    size={150}
                    centerTop={String(len(report.aiOpportunities))}
                    centerBottom="opportunities"
                  />
                  <ul className="w-full space-y-2.5 min-w-0">
                    {depts.map((d) => (
                      <li key={d.name} className="flex items-center gap-2.5 text-[13px]">
                        <span className="w-2 h-2 rounded-sm shrink-0" style={{ background: d.color }} />
                        <span className="text-ink-2 truncate flex-1">{d.name}</span>
                        <span className="font-mono text-ink tabular-nums">{d.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Panel>
            </Reveal>
          )}

          {domains.length > 0 && (
            <Reveal delay={0.1}>
              <Panel className="h-full p-5 sm:p-6">
                <p className="eyebrow mb-1">Evidence base</p>
                <p className="text-[15px] font-medium text-ink mb-5">Most-cited source domains</p>
                <BarList data={domains} color={ACCENTS.mint} />
              </Panel>
            </Reveal>
          )}
        </div>
      )}
    </div>
  );
}
