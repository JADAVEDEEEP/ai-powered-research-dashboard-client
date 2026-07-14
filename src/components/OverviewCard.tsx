import { FiLayers, FiTrendingUp, FiMapPin } from "react-icons/fi";

interface OverviewData {
  companyName?: string;
  summary?: string;
  industry?: string;
  scale?: string;
  geographicPresence?: string;
}

interface Props {
  data: OverviewData;
}

export default function OverviewCard({ data }: Props) {
  const stats = [
    { icon: FiLayers,     label: "Industry",             value: data.industry },
    { icon: FiTrendingUp, label: "Scale",                value: data.scale },
    { icon: FiMapPin,     label: "Geographic Presence",  value: data.geographicPresence },
  ];

  return (
    <div className="bg-white rounded-3xl border border-blue-50 shadow-xl shadow-blue-50/50 overflow-hidden">

      {/* Gradient header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-7">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p
              className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-1"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Company Overview
            </p>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {data.companyName ?? "—"}
            </h2>
          </div>
          <span
            className="text-xs bg-white/20 text-white px-3 py-1.5 rounded-full font-medium border border-white/10"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            AI Analysis
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-8 space-y-6">

        {/* Summary */}
        {data.summary && (
          <p
            className="text-gray-600 leading-relaxed text-base"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {data.summary}
          </p>
        )}

        {/* Stat chips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map(({ icon: Icon, label, value }) =>
            value ? (
              <div
                key={label}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-blue-600 shrink-0" />
                  <span
                    className="text-xs font-semibold text-blue-600 uppercase tracking-wider"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {label}
                  </span>
                </div>
                <p
                  className="text-gray-800 font-semibold text-sm leading-snug"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {value}
                </p>
              </div>
            ) : null
          )}
        </div>

      </div>
    </div>
  );
}
