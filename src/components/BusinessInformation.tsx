import { FiPackage, FiActivity, FiNavigation, FiInfo } from "react-icons/fi";

interface BusinessInfoData {
  majorOfferings?: string[];
  recentDevelopments?: string[];
  expansionPlans?: string[];
  importantPublicInformation?: string[];
}

interface Props {
  data: BusinessInfoData;
}

// ─── Sub-component for each list section ─────────────────────────────────────

interface SectionProps {
  icon: React.ElementType;
  title: string;
  items?: string[];
  iconBg: string;
}

function InfoSection({ icon: Icon, title, items, iconBg }: SectionProps) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-7 h-7 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
          <Icon className="w-3.5 h-3.5 text-white" />
        </div>
        <h4
          className="font-semibold text-gray-800 text-sm"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {title}
        </h4>
      </div>
      <ul className="space-y-2 pl-1">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-300 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BusinessInformation({ data }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-blue-50 shadow-xl shadow-blue-50/50 p-8">

      {/* Header */}
      <div className="mb-7">
        <p
          className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-1"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Business Profile
        </p>
        <h3
          className="text-xl font-bold text-gray-900"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Business Information
        </h3>
      </div>

      {/* 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InfoSection
          icon={FiPackage}
          title="Major Offerings"
          items={data.majorOfferings}
          iconBg="bg-blue-600"
        />
        <InfoSection
          icon={FiActivity}
          title="Recent Developments"
          items={data.recentDevelopments}
          iconBg="bg-indigo-600"
        />
        <InfoSection
          icon={FiNavigation}
          title="Expansion Plans"
          items={data.expansionPlans}
          iconBg="bg-violet-600"
        />
        <InfoSection
          icon={FiInfo}
          title="Important Public Information"
          items={data.importantPublicInformation}
          iconBg="bg-cyan-600"
        />
      </div>

    </div>
  );
}
