import { AlertTriangle } from "lucide-react";
import { SectionHeading } from "./ui/primitives";

interface Challenge {
  title?: string;
  description?: string;
  reasoning?: string;
}

interface Props {
  data: Challenge[];
  index?: string;
}

// Accent cycles per row (purely decorative — not a severity rating)
const ACCENT = ["#ff6b8b", "#ffb547", "#c9a8ff", "#ff8f6b", "#8a93a8"];

export default function BusinessChallenges({ data, index }: Props) {
  if (!data || data.length === 0) return null;

  return (
    <div>
      <SectionHeading
        index={index}
        eyebrow="Risk Assessment"
        title="Business Challenges"
        aside={<span className="font-mono text-[11px] text-ink-4">{data.length} identified</span>}
      />

      <ol className="panel overflow-hidden">
        {data.map((challenge, i) => {
          const c = ACCENT[i % ACCENT.length];
          return (
            <li
              key={i}
              className="group relative grid md:grid-cols-[72px_1fr_1fr] gap-x-8 gap-y-3 px-5 sm:px-7 py-6 border-line [&:not(:last-child)]:border-b transition-colors hover:bg-white/[0.015]"
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 bottom-0 w-[2px] opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(${c}, transparent)` }}
              />
              <div className="flex md:flex-col items-center md:items-start gap-3">
                <span className="font-display text-4xl leading-none" style={{ color: c }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <AlertTriangle className="w-4 h-4 md:mt-2" style={{ color: c }} />
              </div>

              <div className="min-w-0">
                <h3 className="text-[16px] font-medium leading-snug text-ink">
                  {challenge.title ?? `Challenge ${i + 1}`}
                </h3>
                {challenge.description && (
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{challenge.description}</p>
                )}
              </div>

              {challenge.reasoning && (
                <div className="min-w-0 md:border-l md:border-line md:pl-6">
                  <p className="eyebrow !text-[10px] mb-2">Reasoning</p>
                  <p className="text-[13.5px] leading-relaxed text-ink-3">{challenge.reasoning}</p>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
