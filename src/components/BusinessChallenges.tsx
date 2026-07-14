import { FiAlertTriangle } from "react-icons/fi";

interface Challenge {
  title?: string;
  description?: string;
  reasoning?: string;
}

interface Props {
  data: Challenge[];
}

// Colour palettes cycle per card index
const CARD_STYLES = [
  { bg: "from-red-50 to-orange-50",   border: "border-red-100",    icon: "text-red-500"    },
  { bg: "from-amber-50 to-yellow-50", border: "border-amber-100",  icon: "text-amber-500"  },
  { bg: "from-purple-50 to-violet-50",border: "border-purple-100", icon: "text-purple-500" },
  { bg: "from-rose-50 to-pink-50",    border: "border-rose-100",   icon: "text-rose-500"   },
  { bg: "from-slate-50 to-gray-50",   border: "border-slate-100",  icon: "text-slate-500"  },
];

export default function BusinessChallenges({ data }: Props) {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl border border-blue-50 shadow-xl shadow-blue-50/50 p-8">

      {/* Header */}
      <div className="mb-7">
        <p
          className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-1"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Risk Assessment
        </p>
        <h3
          className="text-xl font-bold text-gray-900"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Business Challenges
        </h3>
      </div>

      {/* Challenge cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((challenge, i) => {
          const style = CARD_STYLES[i % CARD_STYLES.length];
          return (
            <div
              key={i}
              className={`bg-gradient-to-br ${style.bg} ${style.border} border rounded-2xl p-5 hover:shadow-md transition-shadow duration-200`}
            >
              {/* Title row */}
              <div className="flex items-start gap-3 mb-3">
                <FiAlertTriangle className={`w-5 h-5 mt-0.5 shrink-0 ${style.icon}`} />
                <h4
                  className="font-bold text-gray-900 text-sm leading-snug"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {challenge.title ?? `Challenge ${i + 1}`}
                </h4>
              </div>

              {/* Description */}
              {challenge.description && (
                <p
                  className="text-gray-600 text-sm leading-relaxed mb-3"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {challenge.description}
                </p>
              )}

              {/* Reasoning */}
              {challenge.reasoning && (
                <div className="border-t border-black/5 pt-3">
                  <p
                    className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Reasoning
                  </p>
                  <p
                    className="text-gray-600 text-sm leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {challenge.reasoning}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
