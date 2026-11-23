import { useMemo, useState } from "react";
import { Trash2, ArrowRight, Search, Loader2, History } from "lucide-react";
import type { HistoryItem } from "../pages/Home";
import { formatDate, relativeTime } from "../lib/insights";
import { Monogram, Panel, Reveal } from "./ui/primitives";

interface Props {
  history: HistoryItem[];
  onSelect: (companyName: string) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  deletingId: string | null;
  isLoading: boolean;
}

const DEFAULT_VISIBLE = 12;

export default function HistoryArchive({ history, onSelect, onDelete, deletingId, isLoading }: Props) {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? history.filter((h) => h.companyName?.toLowerCase().includes(q)) : history;
  }, [history, query]);

  const visible = showAll || query ? filtered : filtered.slice(0, DEFAULT_VISIBLE);

  return (
    <section id="history" className="scroll-mt-24" aria-labelledby="history-title">
      <Reveal>
        <Panel className="overflow-hidden">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-5 sm:px-7 py-5 border-b border-line">
            <div className="flex items-center gap-3">
              <span className="inline-flex w-9 h-9 items-center justify-center rounded-lg border border-line-strong bg-white/[0.03]">
                <History className="w-4 h-4 text-iris" />
              </span>
              <div>
                <h2 id="history-title" className="text-[16px] font-medium text-ink leading-tight">
                  Recent Searches
                </h2>
                <p className="text-[12.5px] text-ink-4">Click any company to re-run the analysis</p>
              </div>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-4" />
              <label htmlFor="archive-filter" className="sr-only">Filter archive</label>
              <input
                id="archive-filter"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter archive…"
                className="w-full rounded-lg border border-line bg-white/[0.03] py-2 pl-9 pr-3 text-[13px] text-ink placeholder:text-ink-4 focus:outline-none focus:border-iris/60"
              />
            </div>
          </div>

          {/* Column headings */}
          <div className="hidden sm:grid grid-cols-[1fr_140px_110px_96px] gap-4 px-7 py-2.5 border-b border-line">
            {["Company", "Researched", "Age", ""].map((h) => (
              <span key={h} className="eyebrow !text-[10px]">{h}</span>
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="px-7 py-10 text-center text-[13px] text-ink-4">No companies match “{query}”.</p>
          ) : (
            <ul>
              {visible.map((item) => {
                const d = item.createdAt ? new Date(item.createdAt) : null;
                const valid = d && !isNaN(d.getTime());
                return (
                  <li key={item._id} className="group relative border-b border-line last:border-b-0">
                    <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_140px_110px_96px] items-center gap-4 px-5 sm:px-7 py-3 transition-colors group-hover:bg-white/[0.025]">
                      <button
                        type="button"
                        onClick={() => onSelect(item.companyName)}
                        disabled={isLoading}
                        className="flex items-center gap-3 min-w-0 text-left disabled:cursor-not-allowed after:absolute after:inset-0 after:content-['']"
                        aria-label={`Re-run analysis for ${item.companyName}`}
                      >
                        <Monogram name={item.companyName} size={32} />
                        <span className="min-w-0">
                          <span className="block text-[14px] font-medium text-ink truncate">{item.companyName}</span>
                          {valid && (
                            <span className="sm:hidden block font-mono text-[11px] text-ink-4">
                              {formatDate(item.createdAt)}
                            </span>
                          )}
                        </span>
                      </button>
                      <span className="hidden sm:block font-mono text-[12px] text-ink-3">
                        {valid ? formatDate(item.createdAt) : "—"}
                      </span>
                      <span className="hidden sm:block">
                        {valid && (
                          <span className="inline-flex rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-ink-3">
                            {relativeTime(d!)}
                          </span>
                        )}
                      </span>
                      <span className="relative z-10 flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={(e) => onDelete(item._id, e)}
                          disabled={deletingId === item._id}
                          className="inline-flex w-8 h-8 items-center justify-center rounded-md text-ink-4 hover:text-rose hover:bg-rose/10 transition-colors sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100 disabled:cursor-not-allowed disabled:opacity-100"
                          title="Delete"
                          aria-label={`Delete ${item.companyName} from history`}
                        >
                          {deletingId === item._id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <ArrowRight className="w-4 h-4 text-ink-4 group-hover:text-iris group-hover:translate-x-0.5 transition-all" aria-hidden />
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {!query && filtered.length > DEFAULT_VISIBLE && (
            <div className="border-t border-line px-7 py-3 text-center">
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="text-[12.5px] text-ink-3 hover:text-ink transition-colors"
              >
                {showAll ? "Show recent only" : `Show all ${filtered.length} reports`}
              </button>
            </div>
          )}
        </Panel>
      </Reveal>
    </section>
  );
}
