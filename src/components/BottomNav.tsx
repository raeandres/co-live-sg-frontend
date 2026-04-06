import { MapPin, Grid, FileText, MessageSquare } from "lucide-react";

type Tab = "map" | "explore" | "interest" | "testimonials";

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs = [
  { id: "map" as Tab, label: "Map", icon: MapPin },
  { id: "explore" as Tab, label: "Explore", icon: Grid },
  { id: "interest" as Tab, label: "Interest", icon: FileText },
  { id: "testimonials" as Tab, label: "Reviews", icon: MessageSquare },
];

function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#e8e4f0]"
      style={{ boxShadow: "0 -2px 12px rgba(0,0,0,0.06)" }}
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-0.5 px-4 py-2 transition-all duration-200"
              style={{ transform: isActive ? "scale(1)" : "scale(0.97)" }}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 1.8}
                style={{ color: isActive ? "#E63946" : "#9e97b0" }}
              />
              <span
                className="text-[10px] font-semibold tracking-wide"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: isActive ? "#E63946" : "#9e97b0",
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
