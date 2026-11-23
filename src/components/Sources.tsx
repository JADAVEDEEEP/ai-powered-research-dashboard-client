import { ArrowUpRight } from "lucide-react";
import { getDomain, getSourceTitle, getSourceUrl, type SourceItem, monogramColor } from "../lib/insights";
import { SectionHeading } from "./ui/primitives";

interface Props {
  data: SourceItem[];
  index?: string;
}

export default function Sources({ data, index }: Props) {
  if (!data || data.length === 0) return null;

  const items = data
    .map((source) => ({ url: getSourceUrl(source), title: getSourceTitle(source) }))
    .filter((s) => !!s.url);

  return (
    <div>
      <SectionHeading
        index={index}
        eyebrow="Research Sources"
        title="Sources & References"
        aside={<span className="font-mono text-[11px] text-ink-4">{items.length} links</span>}
      />

      <ol className="panel overflow-hidden grid md:grid-cols-2">
        {items.map(({ url, title }, i) => {
          const domain = getDomain(url);
          const c = monogramColor(domain);
          return (
            <li key={i} className="border-line border-b md:[&:nth-child(odd)]:border-r">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.03] focus-visible:bg-white/[0.03]"
              >
                <span className="font-mono text-[11px] text-ink-4 w-5 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span
                  aria-hidden
                  className="inline-flex w-8 h-8 shrink-0 items-center justify-center rounded-md font-mono text-[12px] font-medium"
                  style={{ color: c, background: `${c}18`, boxShadow: `inset 0 0 0 1px ${c}35` }}
                >
                  {domain[0]?.toUpperCase()}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[14px] font-medium text-ink truncate group-hover:text-iris transition-colors">
                    {title}
                  </span>
                  <span className="block font-mono text-[11px] text-ink-4 truncate">{url}</span>
                </span>
                <ArrowUpRight className="w-4 h-4 shrink-0 text-ink-4 transition-transform group-hover:text-iris group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
