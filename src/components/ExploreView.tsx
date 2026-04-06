import { useState } from "react";
import { Search, Star, Flame, MapPin, Train, ChevronRight, Filter, SlidersHorizontal } from "lucide-react";
import { PROPERTIES, Property } from "@/data/properties";

interface ExploreViewProps {
  onPropertySelect: (property: Property) => void;
  onInterestClick: (propertyId: string) => void;
}

function ExploreView({ onPropertySelect, onInterestClick }: ExploreViewProps) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"demand" | "price-asc" | "price-desc" | "commute">("demand");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = PROPERTIES.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.address.toLowerCase().includes(search.toLowerCase()) ||
    p.mrt.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    switch (sortBy) {
      case "demand": return b.demandScore - a.demandScore;
      case "price-asc": return a.roomTypes[0].price - b.roomTypes[0].price;
      case "price-desc": return b.roomTypes[0].price - a.roomTypes[0].price;
      case "commute": return parseInt(a.totalTravelTime) - parseInt(b.totalTravelTime);
      default: return 0;
    }
  });

  const lowestPrice = (p: Property) => Math.min(...p.roomTypes.map(r => r.price));

  return (
    <div className="min-h-screen bg-[#faf8ff] pb-24">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1
          className="text-2xl font-bold text-[#2d2540] mb-1"
          style={{ fontFamily: "'Newsreader', serif" }}
        >
          Explore Properties
        </h1>
        <p
          className="text-sm text-[#9e97b0]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {PROPERTIES.length} co-living spaces across Singapore
        </p>
      </div>

      {/* Search + Filter */}
      <div className="px-5 mb-4 flex gap-2">
        <div
          className="flex-1 bg-white rounded-[10px] flex items-center px-3.5 py-2.5 gap-2"
          style={{ boxShadow: "0 2px 8px rgba(100,80,140,0.08)" }}
        >
          <Search size={15} className="text-[#9e97b0]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, area, MRT..."
            className="flex-1 text-sm outline-none bg-transparent text-[#2d2540] placeholder:text-[#9e97b0]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-10 h-10 rounded-[10px] flex items-center justify-center transition-all duration-200 active:scale-90"
          style={{
            background: showFilters ? "#E63946" : "white",
            boxShadow: "0 2px 8px rgba(100,80,140,0.08)",
          }}
        >
          <SlidersHorizontal size={15} className={showFilters ? "text-white" : "text-[#9e97b0]"} />
        </button>
      </div>

      {/* Sort Options */}
      {showFilters && (
        <div className="px-5 mb-4">
          <div
            className="bg-white rounded-[10px] p-3"
            style={{ boxShadow: "0 2px 8px rgba(100,80,140,0.08)" }}
          >
            <p
              className="text-xs font-bold text-[#9e97b0] uppercase tracking-wide mb-2"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Sort by
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { value: "demand", label: "🔥 Most Popular" },
                { value: "price-asc", label: "💰 Price: Low" },
                { value: "price-desc", label: "💎 Price: High" },
                { value: "commute", label: "🚇 Best Commute" },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSortBy(opt.value as typeof sortBy)}
                  className="px-3 py-1.5 rounded-[5px] text-xs font-semibold transition-all duration-200"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    background: sortBy === opt.value ? "#E63946" : "#faf8ff",
                    color: sortBy === opt.value ? "white" : "#2d2540",
                    border: `1px solid ${sortBy === opt.value ? "#E63946" : "#e8e4f0"}`,
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Property Cards */}
      <div className="px-5 flex flex-col gap-4">
        {filtered.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-[10px] overflow-hidden transition-all duration-200"
            style={{ boxShadow: "0 5px 20px rgba(100,80,140,0.08)" }}
          >
            {/* Property Image */}
            <div className="relative" style={{ height: "160px" }}>
              <img
                src={property.images[0]}
                alt={property.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span
                  className="px-2 py-1 rounded-[5px] text-[10px] font-bold text-white flex items-center gap-1"
                  style={{
                    background: property.demandLabel === "High" ? "#E63946" : property.demandLabel === "Medium" ? "#f97316" : "#2a9d8f",
                  }}
                >
                  <Flame size={9} />
                  {property.demandLabel}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span
                  className="px-2 py-1 rounded-[5px] text-[10px] font-bold bg-white/90 backdrop-blur-sm text-[#2d2540]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  From S${lowestPrice(property).toLocaleString()}/mo
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-base font-bold text-[#2d2540] leading-tight"
                    style={{ fontFamily: "'Newsreader', serif" }}
                  >
                    {property.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin size={10} className="text-[#9e97b0]" />
                    <p
                      className="text-xs text-[#9e97b0] truncate"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {property.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span
                  className="px-2 py-0.5 rounded-[5px] text-[10px] font-semibold bg-[#2a9d8f]/10 text-[#2a9d8f] flex items-center gap-1"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <Train size={9} />
                  {property.mrt}
                </span>
                <span
                  className="px-2 py-0.5 rounded-[5px] text-[10px] font-semibold bg-[#faf8ff] text-[#9e97b0]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", border: "1px solid #e8e4f0" }}
                >
                  {property.totalTravelTime} to CBD
                </span>
                <span
                  className="px-2 py-0.5 rounded-[5px] text-[10px] font-semibold bg-[#faf8ff] text-[#9e97b0]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", border: "1px solid #e8e4f0" }}
                >
                  {property.roomTypes.filter(r => r.available).length} rooms avail.
                </span>
              </div>

              <p
                className="text-xs text-[#9e97b0] leading-relaxed mb-3 line-clamp-2"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {property.description}
              </p>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => onPropertySelect(property)}
                  className="flex-1 py-2.5 rounded-[10px] text-sm font-bold transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-1"
                  style={{
                    background: "#faf8ff",
                    border: "1.5px solid #e8e4f0",
                    color: "#2d2540",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  View Details
                  <ChevronRight size={13} />
                </button>
                <button
                  onClick={() => onInterestClick(property.id)}
                  className="flex-1 py-2.5 rounded-[10px] text-white text-sm font-bold transition-all duration-200 active:scale-[0.97]"
                  style={{
                    background: "#E63946",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    boxShadow: "0 3px 12px rgba(230,57,70,0.25)",
                  }}
                >
                  I'm Interested
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreView;
