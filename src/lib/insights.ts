// Pure helpers that derive visual metrics from REAL report / history data.
// Nothing here invents numbers — every value is a count or grouping of
// fields returned by the backend.

import type { Report, HistoryItem } from "../pages/Home";

export type SourceItem = string | { title?: string; url?: string };

export const ACCENTS = {
  iris: "#8f7dff",
  mint: "#4fe3c1",
  sky: "#5cc8ff",
  amber: "#ffb547",
  rose: "#ff6b8b",
  lilac: "#c9a8ff",
  teal: "#2fb7a8",
  slate: "#8a93a8",
};

export const PALETTE = [
  ACCENTS.iris,
  ACCENTS.mint,
  ACCENTS.sky,
  ACCENTS.amber,
  ACCENTS.rose,
  ACCENTS.lilac,
  ACCENTS.teal,
  ACCENTS.slate,
];

// ── Department colours (same mapping keys as the original component) ────────
const DEPT_COLORS: Record<string, string> = {
  sales: ACCENTS.iris,
  marketing: ACCENTS.rose,
  operations: ACCENTS.sky,
  hr: ACCENTS.teal,
  finance: ACCENTS.mint,
  engineering: ACCENTS.lilac,
  product: ACCENTS.amber,
  customer: "#7aa7ff",
  legal: ACCENTS.slate,
  it: "#b78bff",
};

export const getDeptColor = (dept?: string): string => {
  if (!dept) return ACCENTS.iris;
  const key = dept.toLowerCase().split(/[\s/]/)[0];
  return DEPT_COLORS[key] ?? ACCENTS.iris;
};

// ── Sources ─────────────────────────────────────────────────────────────────
export const getDomain = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

export const getSourceUrl = (source: SourceItem): string =>
  typeof source === "string" ? source : source.url ?? "";

export const getSourceTitle = (source: SourceItem): string => {
  if (typeof source === "string") return getDomain(source);
  return source.title || getDomain(source.url ?? "");
};

export const validSources = (sources?: SourceItem[]) =>
  (sources ?? []).filter((s) => !!getSourceUrl(s));

/** Group sources by domain → [{ name, value }] sorted desc. */
export const sourceDomains = (sources?: SourceItem[]) => {
  const map = new Map<string, number>();
  validSources(sources).forEach((s) => {
    const d = getDomain(getSourceUrl(s));
    map.set(d, (map.get(d) ?? 0) + 1);
  });
  return [...map.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

// ── Report-level metrics ────────────────────────────────────────────────────
export const len = (a?: unknown[]) => (Array.isArray(a) ? a.length : 0);

export const businessSignals = (r: Report) => {
  const b = r.businessInformation;
  return [
    { key: "offerings", label: "Offerings", value: len(b?.majorOfferings), color: ACCENTS.iris },
    { key: "developments", label: "Developments", value: len(b?.recentDevelopments), color: ACCENTS.sky },
    { key: "expansion", label: "Expansion", value: len(b?.expansionPlans), color: ACCENTS.mint },
    { key: "public", label: "Public info", value: len(b?.importantPublicInformation), color: ACCENTS.amber },
  ];
};

export const coverage = (r: Report) => [
  ...businessSignals(r),
  { key: "challenges", label: "Challenges", value: len(r.businessChallenges), color: ACCENTS.rose },
  { key: "opportunities", label: "AI opportunities", value: len(r.aiOpportunities), color: ACCENTS.lilac },
  { key: "sources", label: "Sources", value: validSources(r.sources).length, color: ACCENTS.teal },
];

/** Opportunities grouped by department. */
export const departmentMix = (r: Report) => {
  const map = new Map<string, number>();
  (r.aiOpportunities ?? []).forEach((o) => {
    const d = o.department?.trim() || "General";
    map.set(d, (map.get(d) ?? 0) + 1);
  });
  return [...map.entries()].map(([name, value]) => ({
    name,
    value,
    color: getDeptColor(name),
  }));
};

export interface ReportSection {
  id: string;
  label: string;
  count?: number;
}

/** Sections that actually exist in this report (mirrors render conditions). */
export const reportSections = (r: Report): ReportSection[] => {
  const s: ReportSection[] = [];
  if (r.overview) s.push({ id: "sec-overview", label: "Overview" });
  if (r.businessInformation)
    s.push({
      id: "sec-business",
      label: "Business profile",
      count: businessSignals(r).reduce((a, b) => a + b.value, 0),
    });
  if (r.businessChallenges && r.businessChallenges.length > 0)
    s.push({ id: "sec-challenges", label: "Challenges", count: r.businessChallenges.length });
  if (r.aiOpportunities && r.aiOpportunities.length > 0)
    s.push({ id: "sec-opportunities", label: "AI opportunities", count: r.aiOpportunities.length });
  if (r.ceoPitch) s.push({ id: "sec-pitch", label: "CEO pitch" });
  if (r.sources && r.sources.length > 0)
    s.push({ id: "sec-sources", label: "Sources", count: validSources(r.sources).length });
  return s;
};

// ── History metrics ─────────────────────────────────────────────────────────
const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Reports created per day over the last `days` days (from createdAt). */
export const activitySeries = (history: HistoryItem[], days = 14) => {
  const counts = new Map<string, number>();
  history.forEach((h) => {
    if (!h.createdAt) return;
    const d = new Date(h.createdAt);
    if (isNaN(d.getTime())) return;
    const k = dayKey(d);
    counts.set(k, (counts.get(k) ?? 0) + 1);
  });
  const out: { key: string; label: string; value: number }[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const k = dayKey(d);
    out.push({
      key: k,
      label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: counts.get(k) ?? 0,
    });
  }
  return out;
};

export const uniqueCompanies = (history: HistoryItem[]) =>
  new Set(history.map((h) => h.companyName?.trim().toLowerCase()).filter(Boolean)).size;

export const latestDate = (history: HistoryItem[]) => {
  const ts = history
    .map((h) => (h.createdAt ? new Date(h.createdAt).getTime() : NaN))
    .filter((t) => !isNaN(t));
  return ts.length ? new Date(Math.max(...ts)) : null;
};

export const relativeTime = (date: Date) => {
  const diff = (Date.now() - date.getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 86400 * 30) return `${Math.floor(diff / 86400)}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export const formatDate = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

/** Deterministic hue for a company monogram. */
export const monogramColor = (name = "") => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return PALETTE[h % 6];
};
