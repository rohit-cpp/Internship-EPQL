import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import { Button } from "@/components/ui/button";

// Fix default icon issue in Leaflet + React
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

interface LatLng {
  lat: number;
  lng: number;
}

const defaultPosition: LatLng = {
  lat: 18.5204,
  lng: 73.8567,
};

export default function SearchPOI() {
  const [position, setPosition] = useState<LatLng>(defaultPosition);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleSubmit = () => {
    console.log("Selected Location:", position);
    // Send to backend if needed
  };

  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await res.json();

      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setPosition({ lat: parseFloat(lat), lng: parseFloat(lon) });
        setSearchResult(display_name);
      } else {
        alert("No results found.");
      }
    } catch (error) {
      alert("Failed to fetch location.");
    }
  };

  // Map click component (hook inside MapContainer)
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
        setSearchResult(null);
      },
    });

    return (
      <Marker position={position}>
        <Popup>Selected Location</Popup>
      </Marker>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Select a Point of Interest</h2>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
          placeholder="Search a location (e.g., India Gate)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
        scrollWheelZoom
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>

      <div className="text-sm text-muted-foreground">
        Selected Coordinates:{" "}
        <strong>
          {position.lat}, {position.lng}
        </strong>
        {searchResult && (
          <div className="text-xs mt-1 text-gray-500">
            Result: <em>{searchResult}</em>
          </div>
        )}
      </div>

      <Button className="w-full" onClick={handleSubmit}>
        Confirm Location
      </Button>
    </div>
  );
}
