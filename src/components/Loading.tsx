import { useState, useEffect } from "react";

const STEPS = [
  "Researching Company...",
  "Analyzing Business...",
  "Generating AI Recommendations...",
  "Please wait...",
];

export default function Loading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % STEPS.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-8">

      {/* Spinner */}
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-200 animate-pulse" />
        </div>
      </div>

      {/* Text */}
      <div className="text-center space-y-2">
        <p
          className="text-lg font-semibold text-blue-700 tracking-tight"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {STEPS[index]}
        </p>
        <p
          className="text-sm text-gray-400"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Our AI is running a deep analysis — this may take up to 60 seconds.
        </p>
      </div>

      {/* Step dots */}
      <div className="flex gap-2">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === index
                ? "bg-blue-600 scale-125"
                : "bg-blue-200"
            }`}
          />
        ))}
      </div>

    </div>
  );
}
