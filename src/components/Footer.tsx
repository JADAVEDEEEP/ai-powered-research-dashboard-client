export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="no-print relative mt-16 border-t border-line overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <p
          aria-hidden
          className="font-display italic leading-none tracking-tight text-transparent select-none text-[17vw] lg:text-[11vw] -mb-[2vw]"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.08)" }}
        >
          Research Agent
        </p>
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 border-t border-line text-[12.5px] text-ink-4">
          <span className="text-ink-3">
            AI Research Agent <span className="text-ink-4">— built with React &amp; AI</span>
          </span>
          <span className="font-mono">(c) {year} AI Research Agent</span>
        </div>
      </div>
    </footer>
  );
}
