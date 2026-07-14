import { useState, useEffect } from "react";
import { FiAlertCircle, FiClock, FiTrash2, FiChevronRight, FiBarChart2 } from "react-icons/fi";

import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import OverviewCard from "../components/OverviewCard";
import BusinessInformation from "../components/BusinessInformation";
import BusinessChallenges from "../components/BusinessChallenges";
import AIOpportunities from "../components/AIOpportunities";
import CEOPitch from "../components/CEOPitch";
import Sources from "../components/Sources";

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

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Gradient blobs */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[480px] rounded-full bg-gradient-to-b from-blue-200/50 via-indigo-100/30 to-transparent blur-3xl" />
          <div className="absolute top-16 left-4 w-60 h-60 rounded-full bg-blue-300/20 blur-2xl" />
          <div className="absolute top-16 right-4 w-72 h-72 rounded-full bg-indigo-300/20 blur-2xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 bg-white border border-blue-100 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full shadow-sm"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            AI-Powered Business Intelligence
          </div>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            AI-Powered{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              Research
            </span>{" "}
            &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">
              Recommendation
            </span>{" "}
            Agent
          </h1>

          {/* Sub-heading */}
          <p
            className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Enter any company name and receive a comprehensive AI-generated business
            analysis, strategic opportunities, and an executive-ready pitch letter.
          </p>

          {/* Search */}
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />

          {/* Chips */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
            {["Deep Research", "AI Analysis", "CEO-Ready Insights"].map((tag) => (
              <span key={tag} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Loading ── */}
      {isLoading && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="bg-white rounded-3xl border border-blue-50 shadow-xl shadow-blue-50/50">
            <Loading />
          </div>
        </section>
      )}

      {/* ── Error ── */}
      {error && !isLoading && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="bg-white rounded-3xl border border-red-100 shadow-xl p-8 flex items-start gap-4">
            <div className="shrink-0 w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center">
              <FiAlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex-1">
              <h4
                className="font-bold text-gray-900 mb-1"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Research Failed
              </h4>
              <p
                className="text-gray-600 text-sm leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {error}
              </p>
              <button
                onClick={() => setError(null)}
                className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── Report ── */}
      {report && !isLoading && (
        <section
          id="report-section"
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-6"
        >
          {/* Report label */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full shadow-md shadow-blue-200"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <FiBarChart2 className="w-4 h-4" />
              Research Report
            </div>
            {companyName && (
              <span
                className="text-gray-500 text-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                for{" "}
                <strong className="text-gray-800 font-semibold">{companyName}</strong>
              </span>
            )}
          </div>

          {report.overview && <OverviewCard data={report.overview} />}
          {report.businessInformation && (
            <BusinessInformation data={report.businessInformation} />
          )}
          {report.businessChallenges && (
            <BusinessChallenges data={report.businessChallenges} />
          )}
          {report.aiOpportunities && (
            <AIOpportunities data={report.aiOpportunities} />
          )}
          {report.ceoPitch && (
            <CEOPitch data={report.ceoPitch} companyName={companyName} />
          )}
          {report.sources && report.sources.length > 0 && (
            <Sources data={report.sources} />
          )}
        </section>
      )}

      {/* ── History ── */}
      {history.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="bg-white rounded-3xl border border-blue-50 shadow-xl shadow-blue-50/50 p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <FiClock className="text-blue-600 w-4 h-4" />
              </div>
              <div>
                <h3
                  className="font-bold text-gray-900 leading-tight"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Recent Searches
                </h3>
                <p className="text-xs text-gray-400">Click any company to re-run the analysis</p>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {history.slice(0, 12).map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleSearch(item.companyName)}
                  className="group flex items-center justify-between gap-2 p-3.5 rounded-2xl border border-blue-50 bg-blue-50/20 hover:bg-blue-50 hover:border-blue-100 cursor-pointer transition-all duration-200"
                >
                  {/* Avatar + name */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {item.companyName?.[0]?.toUpperCase() ?? "?"}
                    </div>
                    <div className="min-w-0">
                      <p
                        className="text-sm font-semibold text-gray-800 truncate"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {item.companyName}
                      </p>
                      {item.createdAt && (
                        <p className="text-xs text-gray-400 truncate">
                          {new Date(item.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => handleDelete(item._id, e)}
                      disabled={deletingId === item._id}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200 disabled:cursor-not-allowed"
                      title="Delete"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                    <FiChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition-colors duration-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
