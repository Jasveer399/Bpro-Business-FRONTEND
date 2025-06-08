import React, { useEffect, useRef, useState } from "react";

const Map = ({
  streetNo = "",
  areaName = "",
  city = "",
  state = "",
  country = "",
  pincode = "",
  width = "100%",
  height = "400px",
}) => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Construct full address
  const fullAddress = [streetNo, areaName, city, state, country, pincode]
    .filter(Boolean)
    .join(", ");

  useEffect(() => {
    // Load Google Maps script
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setMapLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }&libraries=places`;
      script.async = true;
      script.onload = () => setMapLoaded(true);
      script.onerror = () => setError("Failed to load Google Maps");
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  useEffect(() => {
    if (!mapLoaded || !mapRef.current || !fullAddress) return;

    const initMap = () => {
      try {
        // Default to a center location (you can adjust this)
        const defaultCenter = { lat: 28.6139, lng: 77.209 }; // Delhi, India

        const map = new window.google.maps.Map(mapRef.current, {
          zoom: 13,
          center: defaultCenter,
          mapTypeId: "roadmap",
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        // Geocode the address
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: fullAddress }, (results, status) => {
          if (status === "OK" && results[0]) {
            const location = results[0].geometry.location;
            map.setCenter(location);

            // Create marker
            const marker = new window.google.maps.Marker({
              position: location,
              map: map,
              title: "Dealer Location",
              animation: window.google.maps.Animation.DROP,
            });

            // Create info window
            const infoWindow = new window.google.maps.InfoWindow({
              content: `
                <div style="font-family: Arial, sans-serif; max-width: 200px;">
                  <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px;">Dealer Location</h3>
                  <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.4;">
                    ${fullAddress}
                  </p>
                </div>
              `,
            });

            marker.addListener("click", () => {
              infoWindow.open(map, marker);
            });

            // Auto-open info window
            infoWindow.open(map, marker);
          } else {
            setError("Unable to geocode the provided address");
          }
        });
      } catch (err) {
        setError("Error initializing map: " + err.message);
      }
    };

    initMap();
  }, [mapLoaded, fullAddress]);

  if (error) {
    return (
      <div
        style={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          border: "1px solid #ddd",
          borderRadius: "8px",
          color: "#666",
          fontSize: "14px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ marginBottom: "8px", fontSize: "18px" }}>🗺️</div>
          <div>{error}</div>
          <div style={{ fontSize: "12px", marginTop: "4px" }}>
            Please add your Google Maps API key
          </div>
        </div>
      </div>
    );
  }

  if (!mapLoaded) {
    return (
      <div
        style={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          border: "1px solid #ddd",
          borderRadius: "8px",
          color: "#666",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ marginBottom: "8px", fontSize: "18px" }}>🔄</div>
          <div>Loading map...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width, height, position: "relative" }}>
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      />

      {/* Address display overlay */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          padding: "8px 12px",
          borderRadius: "6px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          fontSize: "12px",
          color: "#333",
          maxWidth: "250px",
          zIndex: 1000,
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
          Dealer Address:
        </div>
        <div>{fullAddress || "No address provided"}</div>
      </div>
    </div>
  );
};

export default Map;
