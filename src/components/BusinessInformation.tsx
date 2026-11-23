import { Package, Activity, Navigation, Info } from "lucide-react";
import { SectionHeading } from "./ui/primitives";

interface BusinessInfoData {
  majorOfferings?: string[];
  recentDevelopments?: string[];
  expansionPlans?: string[];
  importantPublicInformation?: string[];
}

interface Props {
  data: BusinessInfoData;
  index?: string;
}

// ─── Sub-component for each list section ─────────────────────────────────────

interface SectionProps {
  icon: React.ElementType;
  title: string;
  items?: string[];
  color: string;
}

function InfoSection({ icon: Icon, title, items, color }: SectionProps) {
  if (!items || items.length === 0) return null;
  return (
    <div className="relative p-5 sm:p-7">
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <span
            className="inline-flex w-8 h-8 items-center justify-center rounded-lg"
            style={{ background: `${color}1f`, boxShadow: `inset 0 0 0 1px ${color}40` }}
          >
            <Icon className="w-4 h-4" style={{ color }} />
          </span>
          <h3 className="text-[15px] font-medium text-ink">{title}</h3>
        </div>
        <span className="font-mono text-[11px] text-ink-4 tabular-nums">
          {String(items.length).padStart(2, "0")}
        </span>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-[14px] leading-relaxed text-ink-2">
            <span className="mt-[9px] w-3 h-px shrink-0" style={{ background: color }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BusinessInformation({ data, index }: Props) {
  const blocks = [
    { icon: Package, title: "Major Offerings", items: data.majorOfferings, color: "#8f7dff" },
    { icon: Activity, title: "Recent Developments", items: data.recentDevelopments, color: "#5cc8ff" },
    { icon: Navigation, title: "Expansion Plans", items: data.expansionPlans, color: "#4fe3c1" },
    { icon: Info, title: "Important Public Information", items: data.importantPublicInformation, color: "#ffb547" },
  ].filter((b) => b.items && b.items.length > 0);

  return (
    <div>
      <SectionHeading index={index} eyebrow="Business Profile" title="Business Information" />
      {blocks.length > 0 && (
        <div className="panel overflow-hidden grid md:grid-cols-2 [&>*]:border-line [&>*:not(:last-child)]:border-b md:[&>*:not(:last-child)]:border-b-0 md:[&>*:nth-child(odd)]:border-r md:[&>*:nth-child(-n+2)]:border-b">
          {blocks.map((b) => (
            <InfoSection key={b.title} {...b} />
          ))}
        </div>
      )}
    </div>
  );
}
