'use client';
import { loadEnv } from 'vite';
import { GoogleMap, Marker, useLoadScript, Circle, StandaloneSearchBox } from '@react-google-maps/api';
import { useMemo, useState, useEffect, useRef } from 'react';


const GoogleMaps = ({
  radius,
  address,
  setAddress,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  style,
  
}) => {
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

    return(
      <div className="relative w-full h-screen bg-[#faf8ff] overflow-hidden">
        {
          !isLoaded ? (
            <h1>Loading...</h1>
          ) : (
            <GoogleMap
            mapContainerClassName='map-container'
            center={center}
            zoom={15}
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

              {/* <Marker
                draggable
                onAnimationChanged={google.maps.Animation.DROP}
                onDragEnd={changeCoordinate}
                position={{lat: latitude, lng: longitude}}/>
               */}

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
      </div>
    )
}

export default GoogleMaps;