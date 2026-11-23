import type { ReactNode, ElementType } from "react";
import { motion } from "motion/react";
import { monogramColor } from "../../lib/insights";

export const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

// ── Panel ────────────────────────────────────────────────────────────────────
export function Panel({
  children,
  className,
  as: As = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
}) {
  return (
    <As id={id} className={cx("panel", className)}>
      {children}
    </As>
  );
}

// ── Reveal (scroll-in animation, auto-disabled by MotionConfig reducedMotion) ─
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Section heading used across the report ──────────────────────────────────
export function SectionHeading({
  index,
  eyebrow,
  title,
  aside,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
      <div className="flex items-end gap-4 min-w-0">
        {index && (
          <span
            aria-hidden
            className="font-display text-5xl sm:text-6xl leading-[0.8] text-transparent select-none"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.18)" }}
          >
            {index}
          </span>
        )}
        <div className="min-w-0">
          <p className="eyebrow mb-1.5">{eyebrow}</p>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-ink leading-tight">
            {title}
          </h2>
        </div>
      </div>
      {aside}
    </div>
  );
}

// ── Pill / tag ───────────────────────────────────────────────────────────────
export function Tag({
  children,
  color,
  className,
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[11px] leading-5",
        className
      )}
      style={
        color
          ? { color, borderColor: `${color}40`, background: `${color}14` }
          : { color: "var(--ink-2)", borderColor: "var(--line-strong)", background: "rgba(255,255,255,0.03)" }
      }
    >
      {children}
    </span>
  );
}

// ── Monogram avatar ─────────────────────────────────────────────────────────
export function Monogram({ name, size = 32 }: { name?: string; size?: number }) {
  const c = monogramColor(name);
  return (
    <span
      aria-hidden
      className="shrink-0 inline-flex items-center justify-center rounded-lg font-semibold text-[#0b0c12]"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.42,
        background: `linear-gradient(135deg, ${c}, ${c}aa)`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.35), 0 6px 18px -8px ${c}`,
      }}
    >
      {name?.[0]?.toUpperCase() ?? "?"}
    </span>
  );
}

// ── Live status dot ─────────────────────────────────────────────────────────
export function LiveDot({ color = "var(--mint)" }: { color?: string }) {
  return (
    <span className="relative inline-flex w-2 h-2">
      <span className="absolute inset-0 rounded-full anim-pulse-ring" style={{ background: color }} />
      <span className="relative w-2 h-2 rounded-full" style={{ background: color }} />
    </span>
  );
}
