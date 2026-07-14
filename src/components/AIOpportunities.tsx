import { FiCpu, FiTarget, FiZap, FiTrendingUp } from "react-icons/fi";

interface Opportunity {
  department?: string;
  problem?: string;
  solution?: string;
  expectedImpact?: string;
}

interface Props {
  data: Opportunity[];
}

// Maps first word of department name to a Tailwind bg color
const DEPT_COLORS: Record<string, string> = {
  sales:       "bg-blue-600",
  marketing:   "bg-indigo-600",
  operations:  "bg-cyan-600",
  hr:          "bg-teal-600",
  finance:     "bg-emerald-600",
  engineering: "bg-blue-700",
  product:     "bg-violet-600",
  customer:    "bg-sky-600",
  legal:       "bg-slate-600",
  it:          "bg-purple-600",
};

const getDeptColor = (dept?: string): string => {
  if (!dept) return "bg-blue-600";
  const key = dept.toLowerCase().split(/[\s/]/)[0];
  return DEPT_COLORS[key] ?? "bg-blue-600";
};

export default function AIOpportunities({ data }: Props) {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl border border-blue-50 shadow-xl shadow-blue-50/50 p-8">

      {/* Header */}
      <div className="mb-7">
        <p
          className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-1"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Strategic Intelligence
        </p>
        <h3
          className="text-xl font-bold text-gray-900"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          AI Opportunities
        </h3>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {data.map((opp, i) => (
          <div
            key={i}
            className="rounded-2xl border border-blue-50 overflow-hidden hover:shadow-lg hover:shadow-blue-50/80 transition-all duration-200"
          >
            {/* Coloured header strip */}
            <div className={`${getDeptColor(opp.department)} px-5 py-3.5 flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <FiCpu className="text-white/80 w-4 h-4" />
                <span
                  className="text-white font-semibold text-sm"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {opp.department ?? `Opportunity ${i + 1}`}
                </span>
              </div>
              <span
                className="text-white/50 text-xs"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                #{String(i + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4 bg-gradient-to-b from-blue-50/20 to-white">

              {/* Problem */}
              {opp.problem && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <FiTarget className="w-3.5 h-3.5 text-red-400" />
                    <span
                      className="text-xs font-semibold text-red-500 uppercase tracking-wider"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      Problem
                    </span>
                  </div>
                  <p
                    className="text-sm text-gray-600 leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {opp.problem}
                  </p>
                </div>
              )}

              {/* Solution */}
              {opp.solution && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <FiZap className="w-3.5 h-3.5 text-blue-500" />
                    <span
                      className="text-xs font-semibold text-blue-500 uppercase tracking-wider"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      Solution
                    </span>
                  </div>
                  <p
                    className="text-sm text-gray-600 leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {opp.solution}
                  </p>
                </div>
              )}

              {/* Expected Impact */}
              {opp.expectedImpact && (
                <div className="bg-emerald-50 rounded-xl p-3.5 border border-emerald-100">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <FiTrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span
                      className="text-xs font-semibold text-emerald-600 uppercase tracking-wider"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      Expected Impact
                    </span>
                  </div>
                  <p
                    className="text-sm text-emerald-700 font-medium leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {opp.expectedImpact}
                  </p>
                </div>
              )}

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
