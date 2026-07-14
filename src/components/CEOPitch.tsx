import { FiMail, FiUser } from "react-icons/fi";

interface CEOPitchData {
  subject?: string;
  introduction?: string;
  opportunities?: string;
  recommendations?: string;
  conclusion?: string;
}

interface Props {
  data: CEOPitchData;
  companyName?: string;
}

export default function CEOPitch({ data, companyName }: Props) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-3xl border border-blue-50 shadow-xl shadow-blue-50/50 overflow-hidden">

      {/* Gradient header */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-blue-700 px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/10">
            <FiMail className="text-white w-5 h-5" />
          </div>
          <div>
            <p
              className="text-blue-200 text-xs font-semibold uppercase tracking-widest"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Executive Communication
            </p>
            <h3
              className="text-xl font-bold text-white"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              CEO Pitch Letter
            </h3>
          </div>
        </div>
      </div>

      {/* Letter body */}
      <div className="p-8">
        <div className="max-w-3xl mx-auto border border-blue-100 rounded-2xl overflow-hidden">

          {/* Email header metadata */}
          <div className="bg-blue-50/60 px-6 py-4 border-b border-blue-100 space-y-2">
            {[
              {
                label: "To:",
                value: `CEO / Executive Leadership${companyName ? `, ${companyName}` : ""}`,
              },
              {
                label: "Subject:",
                value: data.subject ?? "AI Transformation Opportunity",
              },
              {
                label: "Date:",
                value: today,
              },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-start gap-3 text-sm">
                <span
                  className="shrink-0 w-20 text-blue-500 font-semibold"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {label}
                </span>
                <span
                  className={`text-gray-800 ${label === "Subject:" ? "font-semibold" : ""}`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Letter sections */}
          <div className="px-6 py-7 space-y-6 bg-gradient-to-b from-blue-50/10 to-white">

            {[
              { key: "introduction",   label: "Introduction",   value: data.introduction   },
              { key: "opportunities",  label: "Opportunities",  value: data.opportunities  },
              { key: "recommendations",label: "Recommendations", value: data.recommendations, highlight: true },
              { key: "conclusion",     label: "Conclusion",     value: data.conclusion     },
            ].map(({ key, label, value, highlight }) =>
              value ? (
                <div key={key} className={highlight ? "bg-blue-50 rounded-xl p-4 border border-blue-100" : ""}>
                  <p
                    className={`text-xs font-semibold uppercase tracking-widest mb-2 ${
                      highlight ? "text-blue-600" : "text-blue-400"
                    }`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-sm text-gray-700 leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {value}
                  </p>
                </div>
              ) : null
            )}

            {/* Signature */}
            <div className="pt-4 border-t border-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
                  <FiUser className="text-white w-4 h-4" />
                </div>
                <div>
                  <p
                    className="text-sm font-bold text-gray-900"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    AI Research Agent
                  </p>
                  <p
                    className="text-xs text-gray-400"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Powered by Advanced AI Analysis
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
