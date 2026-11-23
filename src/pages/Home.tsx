import { useState, useEffect, useCallback } from "react";
import { AlertCircle, X, FileBarChart2, RotateCcw } from "lucide-react";

import Navbar, { focusSearch } from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Hero from "../components/Hero";
import WorkspaceStats from "../components/WorkspaceStats";
import EmptyState from "../components/EmptyState";
import HistoryArchive from "../components/HistoryArchive";
import Loading from "../components/Loading";
import OverviewCard from "../components/OverviewCard";
import BusinessInformation from "../components/BusinessInformation";
import BusinessChallenges from "../components/BusinessChallenges";
import AIOpportunities from "../components/AIOpportunities";
import CEOPitch from "../components/CEOPitch";
import Sources from "../components/Sources";
import ReportInsights from "../components/report/ReportInsights";
import { Panel, Tag } from "../components/ui/primitives";
import { reportSections, formatDate } from "../lib/insights";
import { useActiveSection } from "../hooks/useActiveSection";

import { researchCompany, getHistory, deleteHistory } from "../services/api";

type SourceItem =
  | string
  | {
      title?: string;
      url?: string;
    };

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Report {
  _id?: string;
  companyName?: string;
  createdAt?: string;
  overview?: {
    companyName?: string;
    summary?: string;
    industry?: string;
    scale?: string;
    geographicPresence?: string;
  };
  businessInformation?: {
    majorOfferings?: string[];
    recentDevelopments?: string[];
    expansionPlans?: string[];
    importantPublicInformation?: string[];
  };
  businessChallenges?: Array<{
    title?: string;
    description?: string;
    reasoning?: string;
  }>;
  aiOpportunities?: Array<{
    department?: string;
    problem?: string;
    solution?: string;
    expectedImpact?: string;
  }>;
  ceoPitch?: {
    subject?: string;
    introduction?: string;
    opportunities?: string;
    recommendations?: string;
    conclusion?: string;
  };
  sources?: SourceItem[];
}

export interface HistoryItem {
  _id: string;
  companyName: string;
  createdAt?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Home() {
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ── Fetch history on mount ─────────────────────────────────────────────────
  const fetchHistory = async () => {
    try {
      const data = await getHistory();
      const items: HistoryItem[] = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.history)
        ? data.history
        : [];
      setHistory(items);
    } catch {
      // history is non-critical; silently ignore
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // ── Search / Analyze ───────────────────────────────────────────────────────
  const handleSearch = async (companyName: string) => {
    setIsLoading(true);
    setError(null);
    setReport(null);
    try {
      const data = await researchCompany(companyName);
      if (data?.success && data?.report) {
        setReport(data.report);
        fetchHistory();
        setTimeout(() => {
          document.getElementById("report-section")?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        setError(data?.message ?? "Failed to generate the report. Please try again.");
      }
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(
        axiosErr?.response?.data?.message ??
          "Cannot reach the server. Make sure the backend is running on port 5000."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ── Delete history item ────────────────────────────────────────────────────
  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingId(id);
    try {
      await deleteHistory(id);
      setHistory((prev) => prev.filter((h) => h._id !== id));
    } catch {
      // silently ignore
    } finally {
      setDeletingId(null);
    }
  };

  const companyName =
    report?.overview?.companyName ?? report?.companyName ?? "";

  // ── UI-only state (layout / navigation) ────────────────────────────────────
  const [navOpen, setNavOpen] = useState(false);
  const closeNav = useCallback(() => setNavOpen(false), []);
  const sections = report && !isLoading ? reportSections(report) : [];
  const activeSection = useActiveSection(sections.map((s) => s.id));
  const sectionIndex = (id: string) => {
    const n = sections.findIndex((s) => s.id === id);
    return n >= 0 ? String(n + 1).padStart(2, "0") : undefined;
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen">
      <Sidebar
        open={navOpen}
        onClose={closeNav}
        sections={sections}
        activeSection={activeSection}
        companyName={report && !isLoading ? companyName : undefined}
        history={history}
        onSelectHistory={handleSearch}
        onNewResearch={focusSearch}
        isLoading={isLoading}
      />

      <div className="lg:pl-[264px] min-w-0 overflow-x-clip">
        <Navbar
          onMenu={() => setNavOpen(true)}
          companyName={report && !isLoading ? companyName : undefined}
          isLoading={isLoading}
          hasReport={!!report && !isLoading}
        />

        <main className="px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-3 max-w-[1440px] mx-auto">
          {/* ── Hero / search console ── */}
          <Hero onSearch={handleSearch} isLoading={isLoading} />

          {/* ── Loading ── */}
          {isLoading && (
            <Panel className="overflow-hidden">
              <Loading />
            </Panel>
          )}

          {/* ── Error ── */}
          {error && !isLoading && (
            <div
              role="alert"
              className="panel relative overflow-hidden flex items-start gap-4 p-5 sm:p-6 border-rose/30"
            >
              <span aria-hidden className="absolute left-0 inset-y-0 w-[3px] bg-rose" />
              <span aria-hidden className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-rose/15 blur-3xl" />
              <span className="relative inline-flex w-10 h-10 shrink-0 items-center justify-center rounded-lg bg-rose/10 border border-rose/30">
                <AlertCircle className="w-5 h-5 text-rose" />
              </span>
              <div className="relative flex-1 min-w-0">
                <h4 className="text-[15px] font-medium text-ink">Research Failed</h4>
                <p className="mt-1 text-[14px] leading-relaxed text-ink-2">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-3 text-[13px] font-medium text-iris hover:underline"
                >
                  Dismiss
                </button>
              </div>
              <button
                onClick={() => setError(null)}
                className="relative p-1.5 rounded-md text-ink-4 hover:text-ink hover:bg-white/5"
                aria-label="Dismiss error"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ── Report ── */}
          {report && !isLoading && (
            <section id="report-section" className="scroll-mt-24 pt-6 space-y-3">
              {/* Report label */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-1 pb-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-b from-iris to-iris-2 px-3 py-1.5 text-[13px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
                    <FileBarChart2 className="w-4 h-4" />
                    Research Report
                  </span>
                  {companyName && (
                    <span className="text-[14px] text-ink-3">
                      for <strong className="font-medium text-ink">{companyName}</strong>
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => companyName && handleSearch(companyName)}
                  disabled={!companyName}
                  className="no-print inline-flex items-center gap-2 rounded-lg border border-line px-3 py-1.5 text-[12.5px] text-ink-3 hover:text-ink hover:border-line-strong disabled:opacity-40"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Re-run analysis
                </button>
              </div>

              {/* Mobile / tablet section jump bar */}
              {sections.length > 1 && (
                <nav
                  aria-label="Report sections"
                  className="no-print lg:hidden sticky top-16 z-20 -mx-3 sm:-mx-6 px-3 sm:px-6 py-2 bg-canvas/80 backdrop-blur-xl border-b border-line overflow-x-auto"
                >
                  <div className="flex gap-1.5 w-max">
                    {sections.map((s) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        className={`rounded-md px-3 py-1.5 text-[12.5px] whitespace-nowrap transition-colors ${
                          activeSection === s.id ? "bg-iris/20 text-ink" : "text-ink-3 hover:text-ink"
                        }`}
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </nav>
              )}

              {report.overview && (
                <div id="sec-overview" className="scroll-mt-24">
                  <OverviewCard
                    data={report.overview}
                    generatedAt={formatDate(report.createdAt) || undefined}
                  />
                </div>
              )}

              <ReportInsights report={report} />

              {report.businessInformation && (
                <div id="sec-business" className="scroll-mt-24 pt-10">
                  <BusinessInformation data={report.businessInformation} index={sectionIndex("sec-business")} />
                </div>
              )}
              {report.businessChallenges && report.businessChallenges.length > 0 && (
                <div id="sec-challenges" className="scroll-mt-24 pt-10">
                  <BusinessChallenges data={report.businessChallenges} index={sectionIndex("sec-challenges")} />
                </div>
              )}
              {report.aiOpportunities && report.aiOpportunities.length > 0 && (
                <div id="sec-opportunities" className="scroll-mt-24 pt-10">
                  <AIOpportunities data={report.aiOpportunities} index={sectionIndex("sec-opportunities")} />
                </div>
              )}
              {report.ceoPitch && (
                <div id="sec-pitch" className="scroll-mt-24 pt-10">
                  <CEOPitch data={report.ceoPitch} companyName={companyName} index={sectionIndex("sec-pitch")} />
                </div>
              )}
              {report.sources && report.sources.length > 0 && (
                <div id="sec-sources" className="scroll-mt-24 pt-10">
                  <Sources data={report.sources} index={sectionIndex("sec-sources")} />
                </div>
              )}
            </section>
          )}

          {/* ── Workspace overview (no report on screen) ── */}
          {!report && !isLoading && (
            <>
              <WorkspaceStats history={history} />
              <EmptyState hasHistory={history.length > 0} />
            </>
          )}

          {/* ── History ── */}
          {history.length > 0 && (
            <div className={report && !isLoading ? "pt-10" : ""}>
              <HistoryArchive
                history={history}
                onSelect={handleSearch}
                onDelete={handleDelete}
                deletingId={deletingId}
                isLoading={isLoading}
              />
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
