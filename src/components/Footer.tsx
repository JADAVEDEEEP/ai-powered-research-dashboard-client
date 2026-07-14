import { FiZap, FiHeart } from "react-icons/fi";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-blue-100/80 bg-white/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
              <FiZap className="text-white w-3.5 h-3.5" />
            </div>
            <span
              className="text-sm font-bold text-gray-700"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              AI Research Agent
            </span>
          </div>

          <p
            className="text-sm text-gray-400 flex items-center gap-1.5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Built with{" "}
            <FiHeart className="text-red-400 w-3.5 h-3.5" />{" "}
            using React & AI
          </p>

          <p
            className="text-xs text-gray-400"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            (c) {year} AI Research Agent
          </p>
        </div>
      </div>
    </footer>
  );
}
