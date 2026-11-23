import { Search, Globe, BrainCircuit, FileText } from "lucide-react";
import { Panel, Reveal } from "./ui/primitives";

const STEPS = [
  { icon: Search, title: "Query", body: "Name any company — public, private, startup or enterprise." },
  { icon: Globe, title: "Ground", body: "Live Google Search results anchor the analysis in real sources." },
  { icon: BrainCircuit, title: "Reason", body: "Gemini maps the business, its challenges and AI leverage points." },
  { icon: FileText, title: "Deliver", body: "A structured dossier with an executive-ready CEO pitch." },
];

/** "How it works" — shown when there is no report on screen. */
export default function EmptyState({ hasHistory }: { hasHistory: boolean }) {
  return (
    <Reveal>
      <Panel className="overflow-hidden">
        <div className="flex flex-wrap items-end justify-between gap-3 px-5 sm:px-8 pt-7">
          <div>
            <p className="eyebrow mb-1.5">{hasHistory ? "Ready when you are" : "No research yet"}</p>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-ink">
              From a company name to a{" "}
              <span className="font-display italic font-normal text-gradient">boardroom dossier</span>
            </h2>
          </div>
          <p className="text-[13px] text-ink-3 max-w-sm">
            {hasHistory
              ? "Run a new analysis above, or reopen a company from your archive below."
              : "Your first report will appear here. Every report is saved to your archive automatically."}
          </p>
        </div>

        <ol className="relative grid sm:grid-cols-2 lg:grid-cols-4 mt-7 border-t border-line">
          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <li
              key={title}
              className="relative p-5 sm:p-7 border-line [&:not(:last-child)]:border-b sm:[&:nth-child(odd)]:border-r lg:[&:not(:last-child)]:border-r lg:border-b-0"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex w-9 h-9 items-center justify-center rounded-lg border border-line-strong bg-white/[0.03]">
                  <Icon className="w-4 h-4 text-iris" />
                </span>
                <span className="font-display text-4xl text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.16)" }}>
                  0{i + 1}
                </span>
              </div>
              <p className="text-[15px] font-medium text-ink">{title}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-3">{body}</p>
            </li>
          ))}
        </ol>
      </Panel>
    </Reveal>
  );
}
