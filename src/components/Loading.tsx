import { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { cx } from "./ui/primitives";

const STEPS = [
  "Researching Company...",
  "Analyzing Business...",
  "Generating AI Recommendations...",
  "Please wait...",
];

export default function Loading() {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Bring the pipeline into view when analysis starts (UI only).
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % STEPS.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={ref} className="grid md:grid-cols-[260px_1fr] gap-8 md:gap-10 items-center p-6 sm:p-10" role="status" aria-live="polite">
      {/* Scanner graphic */}
      <div className="relative mx-auto w-52 h-52 sm:w-60 sm:h-60" aria-hidden>
        <div className="absolute inset-6 rounded-full bg-iris/30 blur-2xl" />
        <svg viewBox="0 0 200 200" className="relative w-full h-full">
          <defs>
            <linearGradient id="ld-sweep" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8f7dff" stopOpacity="0" />
              <stop offset="100%" stopColor="#8f7dff" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          {[90, 68, 46, 24].map((r, i) => (
            <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeDasharray={i % 2 ? "2 5" : undefined} />
          ))}
          <g className="anim-sweep" style={{ transformOrigin: "100px 100px", animationDuration: "2.4s" }}>
            <path d="M100 100 L190 100 A90 90 0 0 0 163.6 36.4 Z" fill="url(#ld-sweep)" />
          </g>
          <circle cx="100" cy="100" r="5" fill="#fff" />
        </svg>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-mint anim-pulse-ring" />
      </div>

      {/* Pipeline */}
      <div className="min-w-0">
        <p className="eyebrow mb-2">Agent pipeline · live</p>
        <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink" key={index}>
          {STEPS[index]}
        </p>
        <p className="mt-2 text-sm text-ink-3">
          Our AI is running a deep analysis — this may take up to 60 seconds.
        </p>

        {/* progress rail */}
        <div className="relative mt-7 h-1 rounded-full bg-white/[0.06] overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-iris via-sky to-mint transition-[width] duration-700"
            style={{ width: `${((index + 1) / STEPS.length) * 100}%` }}
          />
          <div className="absolute inset-0 anim-scan bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>

        <ol className="mt-6 grid sm:grid-cols-2 gap-2">
          {STEPS.map((s, i) => (
            <li
              key={s}
              className={cx(
                "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-[13px] transition-colors duration-300",
                i === index
                  ? "border-iris/50 bg-iris/10 text-ink"
                  : i < index
                  ? "border-line text-ink-2"
                  : "border-line text-ink-4"
              )}
            >
              <span
                className={cx(
                  "inline-flex w-5 h-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px]",
                  i < index ? "bg-mint/20 text-mint" : i === index ? "bg-iris text-white" : "bg-white/[0.05]"
                )}
              >
                {i < index ? <Check className="w-3 h-3" /> : i + 1}
              </span>
              <span className="truncate">{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
