import { FiExternalLink, FiLink } from "react-icons/fi";

interface Props {
  data: SourceItem[];
}

type SourceItem =
  | string
  | {
      title?: string;
      url?: string;
    };

// Extract a readable domain from a URL
const getDomain = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

const getSourceUrl = (source: SourceItem): string => {
  return typeof source === "string" ? source : source.url ?? "";
};

const getSourceTitle = (source: SourceItem): string => {
  if (typeof source === "string") return getDomain(source);

  return source.title || getDomain(source.url ?? "");
};

export default function Sources({ data }: Props) {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl border border-blue-50 shadow-xl shadow-blue-50/50 p-8">

      {/* Header */}
      <div className="mb-7">
        <p
          className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-1"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Research Sources
        </p>
        <h3
          className="text-xl font-bold text-gray-900"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Sources & References
        </h3>
      </div>

      {/* Link grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {data.map((source, i) => {
          const url = getSourceUrl(source);
          const title = getSourceTitle(source);

          if (!url) return null;

          return (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-2xl border border-blue-100 bg-blue-50/30 hover:bg-blue-50 hover:border-blue-200 hover:shadow-md hover:shadow-blue-50 transition-all duration-200 group"
          >
            {/* Icon */}
            <div className="shrink-0 w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
              <FiLink className="w-4 h-4 text-blue-600" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-semibold text-blue-700 truncate group-hover:text-blue-800 transition-colors"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {title}
              </p>
              <p
                className="text-xs text-gray-400 truncate"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {url}
              </p>
            </div>

            {/* External arrow */}
            <FiExternalLink className="shrink-0 w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors duration-200" />
          </a>
          );
        })}
      </div>

    </div>
  );
}
