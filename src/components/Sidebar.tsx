import { useEffect } from "react";
import {
  Radar,
  History,
  X,
  LayoutGrid,
  Building2,
  AlertTriangle,
  Sparkles,
  Mail,
  Link2,
  Plus,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { HistoryItem } from "../pages/Home";
import type { ReportSection } from "../lib/insights";
import { cx, LiveDot, Monogram } from "./ui/primitives";

const SECTION_ICONS: Record<string, React.ElementType> = {
  "sec-overview": LayoutGrid,
  "sec-business": Building2,
  "sec-challenges": AlertTriangle,
  "sec-opportunities": Sparkles,
  "sec-pitch": Mail,
  "sec-sources": Link2,
};

interface Props {
  open: boolean;
  onClose: () => void;
  sections: ReportSection[];
  activeSection: string | null;
  companyName?: string;
  history: HistoryItem[];
  onSelectHistory: (name: string) => void;
  onNewResearch: () => void;
  isLoading: boolean;
}

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="relative inline-flex w-8 h-8 items-center justify-center rounded-lg bg-gradient-to-br from-iris to-iris-2 glow-iris">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="white" strokeWidth={2}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
          <circle cx="12" cy="12" r="7.5" strokeOpacity={0.5} />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block text-[15px] font-semibold tracking-tight text-ink">
          AI Research <span className="text-iris">Agent</span>
        </span>
        <span className="block font-mono text-[10px] text-ink-4 mt-1 tracking-wider">INTELLIGENCE SUITE</span>
      </span>
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  active,
  count,
  onClick,
  href,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  count?: number;
  onClick?: () => void;
  href?: string;
}) {
  const cls = cx(
    "group relative flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] transition-colors",
    active
      ? "bg-gradient-to-r from-iris/20 to-iris/[0.04] text-ink"
      : "text-ink-3 hover:text-ink hover:bg-white/[0.04]"
  );
  const inner = (
    <>
      {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full bg-iris" />}
      <Icon className={cx("w-4 h-4 shrink-0", active ? "text-iris" : "text-ink-4 group-hover:text-ink-2")} />
      <span className="truncate flex-1 text-left">{label}</span>
      {count !== undefined && (
        <span className="font-mono text-[10.5px] text-ink-4 tabular-nums">{count}</span>
      )}
    </>
  );
  return href ? (
    <a href={href} onClick={onClick} className={cls} aria-current={active ? "true" : undefined}>
      {inner}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow !text-[10px] px-3 mb-2 mt-6 first:mt-0">{children}</p>;
}

function SidebarBody({
  onClose,
  sections,
  activeSection,
  companyName,
  history,
  onSelectHistory,
  onNewResearch,
  isLoading,
}: Omit<Props, "open">) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 h-16 shrink-0">
        <Logo />
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden p-2 -mr-2 rounded-md text-ink-3 hover:text-ink hover:bg-white/5"
          aria-label="Close navigation"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="px-3">
        <button
          type="button"
          onClick={() => {
            onNewResearch();
            onClose();
          }}
          className="w-full flex items-center justify-center gap-2 rounded-lg border border-line-strong bg-white/[0.03] px-3 py-2.5 text-[13px] font-medium text-ink hover:bg-white/[0.07] hover:border-iris/50 transition-colors"
        >
          <Plus className="w-4 h-4 text-iris" />
          New research
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-6" aria-label="Primary">
        <GroupLabel>Workspace</GroupLabel>
        <div className="space-y-0.5">
          <NavItem icon={Radar} label="Research console" href="#top" onClick={onClose} active={!activeSection} />
          <NavItem icon={History} label="Research archive" href="#history" onClick={onClose} count={history.length} />
        </div>

        {sections.length > 0 && (
          <>
            <GroupLabel>
              Report{companyName ? ` · ${companyName}` : ""}
            </GroupLabel>
            <div className="space-y-0.5">
              {sections.map((s) => (
                <NavItem
                  key={s.id}
                  icon={SECTION_ICONS[s.id] ?? LayoutGrid}
                  label={s.label}
                  count={s.count}
                  href={`#${s.id}`}
                  active={activeSection === s.id}
                  onClick={onClose}
                />
              ))}
            </div>
          </>
        )}

        {history.length > 0 && (
          <>
            <GroupLabel>Recent</GroupLabel>
            <div className="space-y-0.5">
              {history.slice(0, 5).map((h) => (
                <button
                  key={h._id}
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    onSelectHistory(h.companyName);
                    onClose();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-[13px] text-ink-3 hover:text-ink hover:bg-white/[0.04] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Monogram name={h.companyName} size={20} />
                  <span className="truncate">{h.companyName}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </nav>

      <div className="p-3 shrink-0">
        <div className="relative overflow-hidden rounded-xl border border-line p-4 bg-gradient-to-br from-iris/15 via-panel-2 to-panel">
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-iris/30 blur-2xl" aria-hidden />
          <div className="relative flex items-center gap-2 mb-2">
            <LiveDot />
            <span className="font-mono text-[10.5px] tracking-wider text-mint">AGENT ONLINE</span>
          </div>
          <p className="relative text-[12.5px] leading-relaxed text-ink-2">
            Gemini reasoning with Google Search grounding for every report.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar(props: Props) {
  const { open, onClose } = props;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      {/* Desktop */}
      <aside className="no-print hidden lg:block fixed inset-y-0 left-0 z-40 w-[264px] border-r border-line bg-panel/80 backdrop-blur-xl">
        <SidebarBody {...props} />
      </aside>

      {/* Mobile / tablet drawer */}
      <AnimatePresence>
        {open && (
          <div className="lg:hidden fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Navigation">
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.aside
              className="absolute inset-y-0 left-0 w-[284px] max-w-[85vw] border-r border-line bg-panel"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
            >
              <SidebarBody {...props} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
