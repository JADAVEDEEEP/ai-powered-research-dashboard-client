import { useEffect } from "react";
import { Menu, Search, Github, ChevronRight, Printer } from "lucide-react";
import { LiveDot } from "./ui/primitives";

interface Props {
  onMenu: () => void;
  companyName?: string;
  isLoading: boolean;
  hasReport: boolean;
}

export const focusSearch = () => {
  document.getElementById("top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => document.getElementById("hero-search")?.focus({ preventScroll: true }), 250);
};

export default function Navbar({ onMenu, companyName, isLoading, hasReport }: Props) {
  // ⌘K / Ctrl+K → jump to search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        focusSearch();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="no-print sticky top-0 z-30 border-b border-line bg-canvas/70 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenu}
          className="lg:hidden -ml-1 p-2 rounded-md text-ink-2 hover:text-ink hover:bg-white/5"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-[13px] min-w-0">
          <span className="text-ink-3">Workspace</span>
          <ChevronRight className="w-3.5 h-3.5 text-ink-4" />
          <span className="text-ink truncate max-w-[220px]">
            {isLoading ? "Researching…" : companyName ? companyName : "Research console"}
          </span>
        </nav>

        {/* Quick search trigger */}
        <button
          type="button"
          onClick={focusSearch}
          className="ml-auto sm:ml-6 flex flex-1 sm:flex-none sm:w-64 lg:w-80 items-center gap-2.5 rounded-lg border border-line bg-white/[0.03] px-3 py-2 text-left text-[13px] text-ink-4 hover:border-line-strong hover:text-ink-3 transition-colors"
        >
          <Search className="w-4 h-4" />
          <span className="flex-1 truncate">Search a company…</span>
          <kbd className="hidden sm:inline font-mono text-[10px] rounded border border-line-strong px-1.5 py-0.5">⌘K</kbd>
        </button>

        <div className="hidden md:flex items-center gap-2 ml-auto rounded-lg border border-line px-3 py-2 text-[12px] text-ink-3">
          <LiveDot color={isLoading ? "var(--amber)" : "var(--mint)"} />
          <span className="font-mono">{isLoading ? "ANALYZING" : today.toUpperCase()}</span>
        </div>

        {hasReport && (
          <button
            type="button"
            onClick={() => window.print()}
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-gradient-to-b from-iris to-iris-2 px-3.5 py-2 text-[13px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] hover:brightness-110"
          >
            <Printer className="w-4 h-4" />
            Export
          </button>
        )}

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg text-ink-3 hover:text-ink hover:bg-white/5 transition-colors"
          aria-label="GitHub"
        >
          <Github className="w-[18px] h-[18px]" />
        </a>
      </div>
    </header>
  );
}
