import React, { useState } from "react";
import BottomNav from "./BottomNav";
import MapView from "./MapView";
import GoogleMaps from "./GoogleMaps";
import ExploreView from "./ExploreView";
import InterestForm from "./InterestForm";
import Testimonials from "./Testimonials";
import ChatbotDrawer from "./ChatbotDrawer";
import PropertySheet from "./PropertySheet";
import { Property } from "@/data/properties";

type Tab = "map" | "explore" | "interest" | "testimonials";

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("map");
  const [selectedPropertyId, setSelectedPropertyId] = useState<
    string | undefined
  >();
  const [chatOpen, setChatOpen] = useState(false);
  const [exploreSelectedProperty, setExploreSelectedProperty] =
    useState<Property | null>(null);

  const handleInterestClick = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    setActiveTab("interest");
  };

  const handleChatClick = () => {
    setChatOpen(true);
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab !== "interest") setSelectedPropertyId(undefined);
    setExploreSelectedProperty(null);
  };

  const handlePropertySelectFromExplore = (property: Property) => {
    setExploreSelectedProperty(property);
  };

  const [form, setForm] = useState({
    name: "",
    address: "",
    latitude: null,
    longitude: null,
    radius: 500,
  });

  const [latitude, setLatitude] = useState(1.2956358);
  const [longitude, setLongitude] = useState(103.8338737);
  const [address, setAddress] = useState("");

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
          // <MapView
          //   onInterestClick={handleInterestClick}
          //   onChatClick={handleChatClick}
          // />

          <GoogleMaps
          radius={form.radius}
          address={address}
          setAddress={setAddress}
          latitude={latitude}
          longitude={longitude}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          style='`w-full h-full px-4 py-2 border-b-[1px] border-[#E5E5E3]`'
          onInterestClick={handleInterestClick}
          onChatClick={handleChatClick}
        />
        // <div className="flex flex-col">
        //   <span className="text-xl">Address: ${address}</span>
        //   <span className="text-xl">Latitude: ${latitude}</span>
        //   <span className="text-xl">Longitude: ${longitude}</span>
        // </div>
         
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
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Chatbot Drawer */}
      <ChatbotDrawer isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
};

export default Home;
