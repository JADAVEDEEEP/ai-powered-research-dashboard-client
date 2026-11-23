import { FileText, Building2, Clock3, Activity } from "lucide-react";
import type { HistoryItem } from "../pages/Home";
import {
  activitySeries,
  uniqueCompanies,
  latestDate,
  relativeTime,
  ACCENTS,
} from "../lib/insights";
import { ActivityArea, BarStrip, DotMatrix, Ring } from "./charts";
import { Panel, Reveal } from "./ui/primitives";

// All numbers below are computed from the real GET /history response.
export default function WorkspaceStats({ history }: { history: HistoryItem[] }) {
  if (history.length === 0) return null;

  const series = activitySeries(history, 14);
  const last14 = series.reduce((a, b) => a + b.value, 0);
  const unique = uniqueCompanies(history);
  const latest = latestDate(history);
  const repeat = history.length - unique;

  return (
    <section aria-label="Workspace statistics" className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <Reveal>
        <Panel className="h-full p-5 flex flex-col">
          <div className="flex items-center justify-between">
            <p className="text-[13px] text-ink-2">Reports generated</p>
            <FileText className="w-4 h-4 text-ink-4" />
          </div>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-ink tabular-nums">{history.length}</p>
          <p className="mt-1 font-mono text-[11px] text-ink-4">
            <span className="text-mint">{last14}</span> in last 14 days
          </p>
          <div className="mt-auto pt-4">
            <BarStrip values={series.map((s) => s.value)} color={ACCENTS.iris} height={44} />
          </div>
        </Panel>
      </Reveal>

      <Reveal delay={0.05}>
        <Panel className="h-full p-5 flex flex-col">
          <div className="flex items-center justify-between">
            <p className="text-[13px] text-ink-2">Companies researched</p>
            <Building2 className="w-4 h-4 text-ink-4" />
          </div>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-ink tabular-nums">{unique}</p>
          <p className="mt-1 font-mono text-[11px] text-ink-4">
            {repeat > 0 ? (
              <>
                <span className="text-sky">{repeat}</span> repeat report{repeat === 1 ? "" : "s"}
              </>
            ) : (
              "all unique"
            )}
          </p>
          <div className="mt-auto pt-4">
            <DotMatrix value={Math.min(unique, 36)} total={Math.min(36, Math.max(24, unique))} color={ACCENTS.sky} cols={12} />
          </div>
        </Panel>
      </Reveal>

      <Reveal delay={0.1} className="col-span-2 lg:col-span-1">
        <Panel className="h-full p-5 flex items-center gap-4">
          <div className="relative">
            <Ring value={unique} max={history.length} color={ACCENTS.mint} size={76} label="Unique companies ratio" />
            <span className="absolute inset-0 flex items-center justify-center font-mono text-[12px] text-ink tabular-nums">
              {Math.round((unique / history.length) * 100)}%
            </span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[13px] text-ink-2">
              <Clock3 className="w-4 h-4 text-ink-4" /> Last research
            </div>
            <p className="mt-1.5 text-xl font-semibold tracking-tight text-ink truncate">
              {latest ? relativeTime(latest) : "—"}
            </p>
            <p className="mt-0.5 font-mono text-[11px] text-ink-4 truncate">
              {history[0]?.companyName ?? ""} · unique ratio
            </p>
          </div>
        </Panel>
      </Reveal>

      <Reveal delay={0.15} className="col-span-2 lg:col-span-1">
        <Panel className="h-full p-5 flex flex-col min-h-[168px]">
          <div className="flex items-center justify-between">
            <p className="text-[13px] text-ink-2">Research activity</p>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] text-ink-4">
              <Activity className="w-3.5 h-3.5" /> 14D
            </span>
          </div>
          <div className="flex-1 -mx-1 mt-2 min-h-[100px]">
            <ActivityArea data={series} />
          </div>
        </Panel>
      </Reveal>
    </section>
  );
}
