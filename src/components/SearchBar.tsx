import { useState, FormEvent } from "react";
import { FiSearch, FiLoader } from "react-icons/fi";

interface SearchBarProps {
  onSearch: (company: string) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
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
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError("");
            }}
            placeholder="Enter company name (e.g. Tesla, Apple, OpenAI)"
            disabled={isLoading}
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-blue-100 shadow-lg shadow-blue-50/80 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-300 transition-all duration-200 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-2xl shadow-lg shadow-blue-200 hover:shadow-blue-300/60 transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {isLoading ? (
            <FiLoader className="w-5 h-5 animate-spin" />
          ) : (
            <FiSearch className="w-5 h-5" />
          )}
          <span className="hidden sm:inline">
            {isLoading ? "Analyzing..." : "Analyze"}
          </span>
        </button>
      </div>

      {error && (
        <p
          className="mt-2.5 ml-1 text-sm text-red-500 flex items-center gap-1.5"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <span className="text-base">!</span>
          {error}
        </p>
      )}
    </form>
  );
}
