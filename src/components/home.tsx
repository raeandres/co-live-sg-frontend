import { useState, useCallback } from "react";
import BottomNav from "./BottomNav";
import ExploreView from "./ExploreView";
import InterestForm from "./InterestForm";
import Testimonials from "./Testimonials";
import ChatbotDrawer from "./ChatbotDrawer";
import PropertySheet from "./PropertySheet";
import { Property } from "@/data/properties";
import MapView from "./MapView";

type Tab = "map" | "explore" | "interest" | "testimonials";

/**
 * Custom hook for managing tab navigation state
 * @param initialTab - The default tab to show on mount
 */
function useTabNavigation(initialTab: Tab = "map") {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  const handleTabChange = useCallback((tab: Tab) => {
    setActiveTab(tab);
  }, []);

  return { activeTab, setActiveTab, handleTabChange };
}

/**
 * Custom hook for managing property selection state
 */
function usePropertySelection() {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | undefined>();
  const [exploreSelectedProperty, setExploreSelectedProperty] = useState<Property | null>(null);

  const clearPropertySelection = useCallback(() => {
    setSelectedPropertyId(undefined);
    setExploreSelectedProperty(null);
  }, []);

  return {
    selectedPropertyId,
    setSelectedPropertyId,
    exploreSelectedProperty,
    setExploreSelectedProperty,
    clearPropertySelection,
  };
}

function Home() {
  const { activeTab, setActiveTab, handleTabChange } = useTabNavigation();
  const {
    selectedPropertyId,
    setSelectedPropertyId,
    exploreSelectedProperty,
    setExploreSelectedProperty,
    clearPropertySelection,
  } = usePropertySelection();
  const [chatOpen, setChatOpen] = useState(false);

  const handleInterestClick = useCallback((propertyId: string) => {
    setSelectedPropertyId(propertyId);
    setActiveTab("interest");
  }, [setSelectedPropertyId, setActiveTab]);

  const handleChatClick = useCallback(() => {
    setChatOpen(true);
  }, []);

  const handleTabChangeWithReset = useCallback((tab: Tab) => {
    handleTabChange(tab);
    if (tab !== "interest") {
      clearPropertySelection();
    }
  }, [handleTabChange, clearPropertySelection]);

  const handlePropertySelectFromExplore = useCallback((property: Property) => {
    setExploreSelectedProperty(property);
  }, [setExploreSelectedProperty]);

  return (
    <div
      className="w-full h-full overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#faf8ff" }}
    >
      {/* Main Content */}
      <div
        className={`absolute inset-0 ${activeTab !== "map" ? "overflow-y-auto" : "overflow-hidden"}`}
      >
        {activeTab === "map" && (
           <MapView
            onInterestClick={handleInterestClick}
            onChatClick={handleChatClick}
          />
        )}
        {activeTab === "explore" && (
          <div className="relative">
            <ExploreView
              onPropertySelect={handlePropertySelectFromExplore}
              onInterestClick={handleInterestClick}
            />
            {/* Explore bottom sheet */}
            {exploreSelectedProperty && (
              <div className="fixed inset-0 z-50">
                <PropertySheet
                  property={exploreSelectedProperty}
                  onClose={() => setExploreSelectedProperty(null)}
                  onInterestClick={handleInterestClick}
                  onChatClick={handleChatClick}
                />
              </div>
            )}
          </div>
        )}
        {activeTab === "interest" && (
          <InterestForm
            propertyId={selectedPropertyId}
            onBack={() => setActiveTab("map")}
          />
        )}
        {activeTab === "testimonials" && <Testimonials />}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChangeWithReset} />

      {/* Chatbot Drawer */}
      <ChatbotDrawer isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}

export default Home;
