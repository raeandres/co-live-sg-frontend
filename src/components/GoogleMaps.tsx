'use client';
import { loadEnv } from 'vite';
import { GoogleMap, Marker, useLoadScript, Circle, StandaloneSearchBox } from '@react-google-maps/api';
import { useMemo, useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, Clock, Navigation, ChevronLeft, ChevronRight } from "lucide-react";
import { PROPERTIES, Property } from "@/data/properties";
import PropertySheet from "./PropertySheet";



// Locations

interface MapViewProps {
  onInterestClick: (propertyId: string) => void;
  onChatClick: () => void;
}

// Singapore neighborhood suggestions for the search
const SUGGESTIONS = [
  "Orchard Road, Singapore",
  "Marina Bay, Singapore",
  "Raffles Place, Singapore",
  "Bugis, Singapore",
  "Novena, Singapore",
  "Tiong Bahru, Singapore",
  "Jurong East, Singapore",
  "Tampines, Singapore",
  "Changi Business Park, Singapore",
  "One-North, Singapore",
];





const GoogleMaps = ({
  radius,
  address,
  setAddress,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  style,
  onInterestClick, 
  onChatClick
  
}) => {
  // Google map implementation
  const [map, setMap] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_PUBLIC_MAPS_API_KEY,
    
    libraries: ["places"],

  })

  const center = useMemo(() => ({ lat:latitude, lng: longitude}), [latitude, longitude])

  const changeCoordinate = (coord, index) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    setLatitude(lat);
    setLongitude(lng);

  }

    useEffect(() => {
      map?.panTo({ lat:latitude, lng: longitude})
    }, [latitude, longitude]);

    const inputRef = useRef(null);
    
    
    const handlePlaceChange = () => {
       const [place] = inputRef.current.getPlaces();


       if (place){
        setAddress(place.formatted_address)
        setLatitude(place.geometry.location.lat())
        setLongitude(place.geometry.location.lng())
       }
    }



    // SG Colive domain

     const [searchQuery, setSearchQuery] = useState("");
      const [showSuggestions, setShowSuggestions] = useState(false);
      const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
      const [showSheet, setShowSheet] = useState(false);
      const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
      const [showRail, setShowRail] = useState(false);
      const [rankedProperties, setRankedProperties] = useState<Property[]>([]);
      const [activePin, setActivePin] = useState<string | null>(null);
      const searchRef = useRef<HTMLInputElement>(null);
    
      const filteredSuggestions = searchQuery.length > 1
        ? SUGGESTIONS.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
        : SUGGESTIONS;
    
      const handleSelectDestination = (place: string) => {
        setSearchQuery(place);
        setSelectedDestination(place);
        setShowSuggestions(false);
        // Simulate ranked recommendations
        const shuffled = [...PROPERTIES].sort((a, b) => a.estimatedFare - b.estimatedFare);
        setRankedProperties(shuffled);
        setShowRail(true);
      };
    
      const handlePinClick = (property: Property) => {
        setActivePin(property.id);
        setSelectedProperty(property);
        setShowSheet(true);
      };
    
      const handleSheetClose = () => {
        setShowSheet(false);
        setActivePin(null);
      };
    
      const handleCardClick = (property: Property) => {
        setSelectedProperty(property);
        setShowSheet(true);
        setActivePin(property.id);
      };
    
      const clearSearch = () => {
        setSearchQuery("");
        setSelectedDestination(null);
        setShowRail(false);
        setRankedProperties([]);
      };
    
      // Custom map pins rendered as SVG overlays on a static map image
      const mapPins = PROPERTIES.map((p) => {
        // Approximate pixel positions for Singapore map
        const relLng = (p.lng - 103.60) / (104.05 - 103.60);
        const relLat = 1 - (p.lat - 1.20) / (1.48 - 1.20);
        return { ...p, x: relLng * 100, y: relLat * 100 };
      });




    return(
      <div className="relative w-full h-screen bg-[#faf8ff] overflow-hidden">
        {
          !isLoaded ? (
            <h1>Loading...</h1>
          ) : (
            <GoogleMap
            mapContainerClassName='map-container'
            center={center}
            zoom={12}
            onLoad={(map) => setMap(map)}
            >
              
              <StandaloneSearchBox
              onLoad={(ref) => (inputRef.current = ref)} 
              onPlacesChanged={handlePlaceChange}
              >
                <div className="relative ml-48 mt-[10px] w-[500px]">
                  <input
                    type="text"
                    className={`form-control text-black rounded-full bg-white ${style}`}
                    value={address}
                    placeholder="Search Location"
                    onChange={(e) => setAddress(e.target.value)}
                  />

                </div>
              </StandaloneSearchBox>

              <button
                className="z-50 flex justify-center items-center w-12 h-12 transition duration-300 rounded-full hover:bg-stone-100 border-2 border-cyan-400 absolute right-[60px] top-[17px]"
                onClick={() => map.panTo({ lat: latitude, lng: longitude})}
              >
                <span className="text-xs text-black">Click Me!</span>
              </button>

              {/* Google maps marker
            
              <Marker
                draggable
                onAnimationChanged={google.maps.Animation.DROP}
                onDragEnd={changeCoordinate}
                position={{lat: 1.2946, lng: 103.8329}}/>

              <Marker
                draggable
                onAnimationChanged={google.maps.Animation.DROP}
                onDragEnd={changeCoordinate}
                position={{lat:1.3453, lng: 103.8732}}/>  


                <Marker
                draggable
                onAnimationChanged={google.maps.Animation.DROP}
                onDragEnd={changeCoordinate}
                position={{lat: 1.3204, lng: 103.7766724}}/>  

                <Marker
                draggable
                onAnimationChanged={google.maps.Animation.DROP}
                onDragEnd={changeCoordinate}
                position={{lat: 1.3184, lng: 103.8392}}/>  

                <Marker
                draggable
                onAnimationChanged={google.maps.Animation.DROP}
                onDragEnd={changeCoordinate}
                position={{lat: 1.2787, lng: 103.7844}}/>  

                <Marker
                draggable
                onAnimationChanged={google.maps.Animation.DROP}
                onDragEnd={changeCoordinate}
                position={{lat: 1.34537, lng: 103.96384}}/>  


                <Marker
                draggable
                onAnimationChanged={google.maps.Animation.DROP}
                onDragEnd={changeCoordinate}
                position={{lat: 1.3588780, lng: 103.9685244}}/> */}
              

              <Circle
                options={{
                  fillColor: "#FF0000",
                  strokeOpacity: 0.8,
                  strokeColor: "#FF0000",
                  strokeWeight: 2,
                  fillOpacity: 0.35,
                }}
              />

            </GoogleMap>
          )
        }


        // DOMAIN

        {/* Cream overlay to desaturate map look */}
        <div className="absolute inset-0 bg-[#faf8ff]/30" />

        {/* Property Pins */}
        {mapPins.map((pin, index) => {
          const isActive = activePin === pin.id;
          return (
            <button
              key={pin.id}
              onClick={() => handlePinClick(pin)}
              className="absolute transition-all duration-200"
              style={{
                left: `${pin.x}%`,
                top: `${pin.y}%`,
                transform: `translate(-50%, -100%) scale(${isActive ? 1.3 : 1})`,
                animationDelay: `${index * 80}ms`,
                filter: isActive ? "drop-shadow(0 0 8px #E63946)" : "none",
              }}
            >
              {/* Teardrop SVG pin */}
              <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
                <path
                  d="M18 0C8.06 0 0 8.06 0 18C0 31.5 18 44 18 44C18 44 36 31.5 36 18C36 8.06 27.94 0 18 0Z"
                  fill={isActive ? "#E63946" : "#2a9d8f"}
                />
                <circle cx="18" cy="18" r="7" fill="white" />
              </svg>
              {/* Rank badge if destination selected */}
              {showRail && rankedProperties.findIndex(rp => rp.id === pin.id) !== -1 && (
                <div
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#E63946] text-white text-[9px] font-bold flex items-center justify-center"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {rankedProperties.findIndex(rp => rp.id === pin.id) + 1}
                </div>
              )}
            </button>
          );
        })}

        {/* Search Bar */}
              <div className="absolute top-4 left-4 right-4 z-20">
                <div
                  className="bg-white rounded-[10px] flex items-center px-4 py-3 gap-3"
                  style={{ boxShadow: "0 5px 20px rgba(100,80,140,0.12)" }}
                >
                  <Search size={18} className="text-[#9e97b0] shrink-0" />
                  <input
                    ref={searchRef}
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Where do you work or commute to?"
                    className="flex-1 text-sm outline-none bg-transparent text-[#2d2540] placeholder:text-[#9e97b0]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  />
                  {searchQuery && (
                    <button onClick={clearSearch} className="text-[#9e97b0] hover:text-[#2d2540] transition-colors">
                      <X size={16} />
                    </button>
                  )}
                </div>
        
                {/* Autocomplete Suggestions */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div
                    className="mt-2 bg-white rounded-[10px] overflow-hidden"
                    style={{ boxShadow: "0 10px 36px rgba(0,0,0,0.1)" }}
                  >
                    {filteredSuggestions.slice(0, 6).map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSelectDestination(s)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#faf8ff] transition-colors text-left border-b border-[#e8e4f0] last:border-b-0"
                      >
                        <MapPin size={14} className="text-[#E63946] shrink-0" />
                        <span
                          className="text-sm text-[#2d2540]"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          {s}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Click outside to close suggestions */}
      {showSuggestions && (
        <div
          className="absolute inset-0 z-10"
          onClick={() => setShowSuggestions(false)}
        />
      )}

       {/* Singapore label */}
      <div className="absolute top-4 right-4 z-10">
        <div
          className="bg-white/90 backdrop-blur-sm rounded-[5px] px-3 py-1.5"
          style={{ boxShadow: "0 2px 8px rgba(100,80,140,0.1)" }}
        >
          <span
            className="text-xs font-semibold text-[#2a9d8f]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            🇸🇬 Singapore
          </span>
        </div>
      </div>


      {/* Destination Selected Info */}
            {selectedDestination && (
              <div className="absolute top-20 left-4 right-4 z-20">
                <div
                  className="bg-white rounded-[10px] px-4 py-3 flex items-center gap-3"
                  style={{ boxShadow: "0 5px 20px rgba(100,80,140,0.1)" }}
                >
                  <Navigation size={16} className="text-[#E63946] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#9e97b0]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Commute from</p>
                    <p className="text-sm font-semibold text-[#2d2540] truncate" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {selectedDestination}
                    </p>
                  </div>
                  <span className="text-xs bg-[#E63946]/10 text-[#E63946] px-2 py-1 rounded-[5px] font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {rankedProperties.length} options
                  </span>
                </div>
              </div>
            )}


 {/* Recommendation Rail */}
      {showRail && rankedProperties.length > 0 && !showSheet && (
        <div
          className="absolute bottom-20 left-0 right-0 z-20 pb-2"
          style={{
            transform: "translateY(0)",
            animation: "slideUp 200ms ease",
          }}
        >
          <div className="px-4 mb-2">
            <p className="text-xs font-semibold text-[#9e97b0]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              NEAREST BY COMMUTE TIME
            </p>
          </div>
          <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
            {rankedProperties.map((prop, i) => (
              <button
                key={prop.id}
                onClick={() => handleCardClick(prop)}
                className="flex-shrink-0 bg-white rounded-[10px] p-3 text-left transition-all duration-200 hover:scale-[1.02]"
                style={{
                  width: "200px",
                  boxShadow: "0 5px 20px rgba(100,80,140,0.1)",
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <span
                    className="text-[10px] font-bold text-white bg-[#E63946] rounded-[5px] px-1.5 py-0.5"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    #{i + 1}
                  </span>
                  <span
                    className="text-[10px] font-semibold text-[#2a9d8f] bg-[#2a9d8f]/10 rounded-[5px] px-1.5 py-0.5"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {prop.totalTravelTime}
                  </span>
                </div>
                <h4
                  className="text-sm font-bold text-[#2d2540] leading-tight mb-1"
                  style={{ fontFamily: "'Newsreader', serif" }}
                >
                  {prop.name.replace("CoLive @ ", "")}
                </h4>
                <p className="text-xs text-[#9e97b0]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {prop.mrt}
                </p>
                <div className="mt-2 flex items-center gap-1">
                  <Clock size={10} className="text-[#9e97b0]" />
                  <span className="text-[10px] text-[#9e97b0]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    From S${prop.roomTypes[0].price}/mo
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}


      {/* Property Count badge */}
            {!showRail && (
              <div
                className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20"
              >
                <div
                  className="bg-[#2d2540] text-white rounded-full px-4 py-2 text-xs font-semibold flex items-center gap-2"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: "0 5px 20px rgba(45,37,64,0.3)" }}
                >
                  <MapPin size={12} />
                  {PROPERTIES.length} co-living spaces
                </div>
              </div>
            )}


            {/* Property Detail Bottom Sheet */}
      {showSheet && selectedProperty && (
        <PropertySheet
          property={selectedProperty}
          onClose={handleSheetClose}
          onInterestClick={onInterestClick}
          onChatClick={onChatClick}
        />
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      </div>

    );


}

export default GoogleMaps;