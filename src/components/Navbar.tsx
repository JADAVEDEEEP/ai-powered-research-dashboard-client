import { FiGithub, FiZap } from "react-icons/fi";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-blue-200">
              <FiZap className="text-white w-4 h-4" />
            </div>
            <span
              className="text-base font-bold text-gray-900 tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              AI Research Agent
            </span>
          </div>

          {/* GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors duration-200 px-3 py-2 rounded-xl hover:bg-blue-50"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <FiGithub className="w-5 h-5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

        </div>
      </div>
    </nav>
  );
}
