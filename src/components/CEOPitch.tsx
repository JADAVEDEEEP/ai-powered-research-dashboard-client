import { useState } from "react";
import { Mail, Copy, Check } from "lucide-react";
import { SectionHeading } from "./ui/primitives";

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
  index?: string;
}

export default function CEOPitch({ data, companyName, index }: Props) {
  const [copied, setCopied] = useState(false);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const to = `CEO / Executive Leadership${companyName ? `, ${companyName}` : ""}`;
  const subject = data.subject ?? "AI Transformation Opportunity";

  const sections = [
    { key: "introduction", label: "Introduction", value: data.introduction },
    { key: "opportunities", label: "Opportunities", value: data.opportunities },
    { key: "recommendations", label: "Recommendations", value: data.recommendations, highlight: true },
    { key: "conclusion", label: "Conclusion", value: data.conclusion },
  ];

  const copy = async () => {
    const text = [
      `To: ${to}`,
      `Subject: ${subject}`,
      `Date: ${today}`,
      "",
      ...sections.filter((s) => s.value).map((s) => s.value as string),
      "",
      "— AI Research Agent",
    ].join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div>
      <SectionHeading
        index={index}
        eyebrow="Executive Communication"
        title="CEO Pitch Letter"
        aside={
          <button
            type="button"
            onClick={copy}
            className="no-print inline-flex items-center gap-2 rounded-lg border border-line-strong px-3 py-2 text-[12.5px] text-ink-2 hover:text-ink hover:border-iris/50 hover:bg-iris/10 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-mint" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy letter"}
          </button>
        }
      />

      <div className="relative">
        {/* stacked-paper graphic */}
        <div aria-hidden className="absolute inset-x-6 -bottom-2 top-4 rounded-xl bg-[#d9d3c6]/20 rotate-[0.6deg]" />
        <div aria-hidden className="absolute -inset-8 bg-[radial-gradient(closest-side,rgba(143,125,255,0.25),transparent)] blur-2xl" />

        <article className="relative overflow-hidden rounded-xl bg-[#f4f1ea] text-[#1b1d26] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
          {/* letterhead */}
          <header className="flex items-center justify-between gap-4 px-6 sm:px-12 pt-8 sm:pt-10">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-[#1b1d26] text-[#f4f1ea]">
                <Mail className="w-4 h-4" />
              </span>
              <span className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-[#6b6a66]">
                Confidential · Executive brief
              </span>
            </div>
            <span className="hidden sm:block font-display italic text-2xl text-[#6a56f5]">Research Agent</span>
          </header>

          {/* metadata */}
          <dl className="mx-6 sm:mx-12 mt-7 border-y border-[#1b1d26]/10 divide-y divide-[#1b1d26]/10">
            {[
              { label: "To", value: to },
              { label: "Subject", value: subject, strong: true },
              { label: "Date", value: today },
            ].map(({ label, value, strong }) => (
              <div key={label} className="grid grid-cols-[84px_1fr] gap-3 py-2.5 text-[14px]">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-[#8a877f] pt-0.5">{label}</dt>
                <dd className={strong ? "font-semibold" : "text-[#3b3d47]"}>{value}</dd>
              </div>
            ))}
          </dl>

          {/* body */}
          <div className="px-6 sm:px-12 py-8 sm:py-10 space-y-7 max-w-3xl">
            <h3 className="font-display text-3xl sm:text-4xl leading-tight tracking-[-0.01em]">{subject}</h3>
            {sections.map(({ key, label, value, highlight }) =>
              value ? (
                highlight ? (
                  <blockquote key={key} className="relative border-l-[3px] border-[#6a56f5] bg-[#6a56f5]/[0.07] rounded-r-lg py-4 pl-5 pr-4">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#6a56f5] mb-2">{label}</p>
                    <p className="text-[15px] leading-[1.75] text-[#1b1d26]">{value}</p>
                  </blockquote>
                ) : (
                  <section key={key}>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#8a877f] mb-2">{label}</p>
                    <p className="text-[15px] leading-[1.75] text-[#3b3d47]">{value}</p>
                  </section>
                )
              ) : null
            )}

            {/* signature */}
            <div className="pt-6 border-t border-[#1b1d26]/10">
              <p className="font-display italic text-3xl text-[#1b1d26]">AI Research Agent</p>
              <p className="mt-1 text-[12.5px] text-[#8a877f]">Powered by Advanced AI Analysis</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
