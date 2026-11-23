import { useState, FormEvent } from "react";
import { Search, Loader2, ArrowRight, CornerDownLeft } from "lucide-react";

interface SearchBarProps {
  onSearch: (company: string) => void;
  isLoading: boolean;
  inputId?: string;
}

const EXAMPLES = ["Tesla", "Apple", "OpenAI"];

export default function SearchBar({ onSearch, isLoading, inputId = "hero-search" }: SearchBarProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmed = value.trim();
    if (!trimmed) {
      setError("Company name cannot be empty.");
      return;
    }

    setError("");
    onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full" noValidate>
      <div className="group relative">
        {/* animated gradient rim */}
        <div
          aria-hidden
          className="absolute -inset-px rounded-[14px] bg-gradient-to-r from-iris/60 via-sky/30 to-mint/50 opacity-40 blur-[1px] transition-opacity duration-300 group-focus-within:opacity-100"
        />
        <div className="relative flex items-center gap-2 rounded-[13px] bg-panel-2/95 backdrop-blur-xl p-1.5 pl-4 shadow-[0_20px_60px_-20px_rgba(106,86,245,0.5)]">
          <Search className="w-5 h-5 text-ink-3 shrink-0" aria-hidden />
          <label htmlFor={inputId} className="sr-only">
            Company name
          </label>
          <input
            id={inputId}
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError("");
            }}
            placeholder="Enter company name (e.g. Tesla, Apple, OpenAI)"
            disabled={isLoading}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent py-3 text-[15px] sm:text-base text-ink placeholder:text-ink-4 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
          />
          <kbd className="hidden md:inline-flex items-center gap-1 rounded-md border border-line-strong px-1.5 py-1 font-mono text-[10px] text-ink-4">
            <CornerDownLeft className="w-3 h-3" /> enter
          </kbd>
          <button
            type="submit"
            disabled={isLoading}
            className="relative inline-flex items-center gap-2 overflow-hidden rounded-[10px] bg-gradient-to-b from-iris to-iris-2 px-4 sm:px-5 py-3 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-[transform,filter] hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">{isLoading ? "Analyzing..." : "Analyze"}</span>
            <span className="sr-only sm:hidden">{isLoading ? "Analyzing" : "Analyze"}</span>
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 min-h-[28px]">
        {error ? (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="flex items-center gap-2 text-sm text-rose"
          >
            <span className="inline-flex w-4 h-4 items-center justify-center rounded-full bg-rose/15 text-[11px] font-bold">!</span>
            {error}
          </p>
        ) : (
          <>
            <span className="font-mono text-[11px] text-ink-4 mr-1">TRY</span>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                disabled={isLoading}
                onClick={() => {
                  setValue(ex);
                  document.getElementById(inputId)?.focus();
                }}
                className="rounded-md border border-line px-2.5 py-1 text-xs text-ink-3 hover:text-ink hover:border-iris/50 hover:bg-iris/10 transition-colors disabled:opacity-50"
              >
                {ex}
              </button>
            ))}
          </>
        )}
      </div>
    </form>
  );
}
