import React, { useState, useRef, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Clock,
  Train,
  Bus,
  Footprints,
  ShoppingCart,
  UtensilsCrossed,
  ShoppingBag,
  MessageCircle,
  Heart,
  Flame,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { Property, TransitStep } from "@/data/properties";

interface PropertySheetProps {
  property: Property;
  onClose: () => void;
  onInterestClick: (propertyId: string) => void;
  onChatClick: () => void;
}

const DEMAND_COLORS: Record<string, { bg: string; text: string }> = {
  High: { bg: "#E63946/10", text: "#E63946" },
  Medium: { bg: "#f97316/10", text: "#f97316" },
  Low: { bg: "#2a9d8f/10", text: "#2a9d8f" },
};

const PropertySheet: React.FC<PropertySheetProps> = ({
  property,
  onClose,
  onInterestClick,
  onChatClick,
}) => {
  const [activeImage, setActiveImage] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const touchStartY = useRef<number | null>(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta > 0) setTranslateY(delta);
  };

  const handleTouchEnd = () => {
    if (translateY > 100) {
      handleClose();
    } else {
      setTranslateY(0);
    }
    touchStartY.current = null;
  };

  const amenityIcon = (type: string) => {
    switch (type) {
      case "grocery": return <ShoppingCart size={12} />;
      case "food": return <UtensilsCrossed size={12} />;
      case "mall": return <ShoppingBag size={12} />;
      default: return <MapPin size={12} />;
    }
  };

  const transitIcon = (mode: string) => {
    switch (mode) {
      case "MRT": return <Train size={12} />;
      case "Bus": return <Bus size={12} />;
      case "Walk": return <Footprints size={12} />;
      default: return <MapPin size={12} />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-30"
        style={{
          background: "rgba(45,37,64,0.4)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 200ms ease",
        }}
        onClick={handleClose}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="absolute bottom-0 left-0 right-0 z-40 overflow-hidden"
        style={{
          borderRadius: "15px 15px 0 0",
          background: "#ffffff",
          boxShadow: "0 10px 36px rgba(0,0,0,0.05)",
          transform: `translateY(${isVisible ? translateY : "100%"}px)`,
          transition: translateY > 0 ? "none" : "transform 200ms ease",
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-[#e8e4f0]" />
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          {/* Photo Carousel */}
          <div className="relative">
            <div className="relative overflow-hidden" style={{ height: "220px" }}>
              {property.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${property.name} ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
                  style={{ opacity: activeImage === i ? 1 : 0 }}
                />
              ))}
            </div>

            {/* Navigation arrows */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImage((prev) => (prev - 1 + property.images.length) % property.images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
                >
                  <ChevronLeft size={16} className="text-[#2d2540]" />
                </button>
                <button
                  onClick={() => setActiveImage((prev) => (prev + 1) % property.images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
                >
                  <ChevronRight size={16} className="text-[#2d2540]" />
                </button>
              </>
            )}

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {property.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width: activeImage === i ? "20px" : "6px",
                    height: "6px",
                    background: activeImage === i ? "#E63946" : "rgba(255,255,255,0.7)",
                  }}
                />
              ))}
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
            >
              <X size={16} className="text-[#2d2540]" />
            </button>

            {/* Demand Badge */}
            <div className="absolute top-3 left-3">
              <span
                className="flex items-center gap-1 px-2.5 py-1 rounded-[5px] text-xs font-bold"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  background: property.demandLabel === "High" ? "#E63946" : property.demandLabel === "Medium" ? "#f97316" : "#2a9d8f",
                  color: "white",
                }}
              >
                <Flame size={10} />
                {property.demandLabel} Demand
              </span>
            </div>
          </div>

          {/* Property Info */}
          <div className="px-5 pt-4 pb-2">
            <h2
              className="text-xl font-bold text-[#2d2540] leading-tight"
              style={{ fontFamily: "'Newsreader', serif" }}
            >
              {property.name}
            </h2>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin size={12} className="text-[#9e97b0]" />
              <p className="text-xs text-[#9e97b0]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {property.address}
              </p>
            </div>

            {/* Demand Score Bar */}
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-[#f0edf8] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${property.demandScore * 10}%`,
                    background: property.demandScore >= 8 ? "#E63946" : property.demandScore >= 6 ? "#f97316" : "#2a9d8f",
                  }}
                />
              </div>
              <span className="text-xs font-semibold text-[#9e97b0]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {property.demandScore}/10
              </span>
            </div>

            <p className="mt-3 text-sm text-[#2d2540]/70 leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {property.description}
            </p>
          </div>

          {/* Room Types */}
          <div className="px-5 pt-2 pb-4">
            <h3 className="text-sm font-bold text-[#2d2540] mb-3 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <DollarSign size={14} className="text-[#E63946]" />
              Room Types & Pricing (SGD)
            </h3>
            <div className="flex flex-col gap-2">
              {property.roomTypes.map((room) => (
                <div
                  key={room.name}
                  className="flex items-center justify-between p-3 rounded-[10px]"
                  style={{
                    background: room.available ? "#faf8ff" : "#f5f4f8",
                    opacity: room.available ? 1 : 0.6,
                  }}
                >
                  <div>
                    <span className="text-sm font-semibold text-[#2d2540]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {room.name}
                    </span>
                    {!room.available && (
                      <span className="ml-2 text-[10px] text-[#9e97b0] bg-[#e8e4f0] px-1.5 py-0.5 rounded-[3px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Unavailable
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-[#E63946]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      S${room.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#9e97b0]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>/mo</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transit Route */}
          <div className="px-5 pb-4">
            <h3 className="text-sm font-bold text-[#2d2540] mb-3 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <Train size={14} className="text-[#2a9d8f]" />
              Commute Route
            </h3>
            <div
              className="p-3 rounded-[10px]"
              style={{ background: "#f0faf8" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-bold text-[#2a9d8f]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {property.totalTravelTime}
                </span>
                <span className="text-xs text-[#9e97b0]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>total travel time</span>
                <span className="ml-auto text-sm font-bold text-[#2d2540]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  S${property.estimatedFare.toFixed(2)}
                </span>
                <span className="text-xs text-[#9e97b0]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>est. fare</span>
              </div>
              {property.transitSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3 mb-2 last:mb-0">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: step.mode === "MRT" ? "#2a9d8f" : step.mode === "Bus" ? "#f97316" : "#9e97b0",
                    }}
                  >
                    <span className="text-white">{transitIcon(step.mode)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-[#2d2540]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {step.instruction}
                    </p>
                    <p className="text-[10px] text-[#9e97b0]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {step.duration}
                      {step.line && ` · ${step.line}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="px-5 pb-4">
            <h3 className="text-sm font-bold text-[#2d2540] mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Nearby Amenities
            </h3>
            <div className="flex flex-col gap-2">
              {property.amenities.map((amenity) => (
                <div
                  key={amenity.name}
                  className="flex items-center gap-3 p-2.5 rounded-[10px]"
                  style={{ background: "#faf8ff" }}
                >
                  <div
                    className="w-7 h-7 rounded-[5px] flex items-center justify-center flex-shrink-0"
                    style={{
                      background: amenity.type === "grocery" ? "#2a9d8f20" : amenity.type === "food" ? "#f9731620" : "#E6394620",
                      color: amenity.type === "grocery" ? "#2a9d8f" : amenity.type === "food" ? "#f97316" : "#E63946",
                    }}
                  >
                    {amenityIcon(amenity.type)}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-[#2d2540]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {amenity.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#9e97b0]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {amenity.distance}
                    </p>
                    <p className="text-[10px] text-[#2a9d8f] font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {amenity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="px-5 pb-8 flex gap-3">
            <button
              onClick={() => onInterestClick(property.id)}
              className="flex-1 py-3.5 rounded-[10px] text-white font-bold text-sm transition-all duration-200 active:scale-[0.97]"
              style={{
                background: "#E63946",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxShadow: "0 5px 20px rgba(230,57,70,0.3)",
              }}
            >
              I'm Interested
            </button>
            <button
              onClick={onChatClick}
              className="flex-1 py-3.5 rounded-[10px] font-bold text-sm transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-2"
              style={{
                background: "#faf8ff",
                border: "1.5px solid #e8e4f0",
                color: "#2d2540",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              <MessageCircle size={14} />
              Chat with Us
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertySheet;
