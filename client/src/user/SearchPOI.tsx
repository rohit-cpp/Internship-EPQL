import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Search,
  MapPin,
  Crosshair,
  Eye,
  Lock,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { usePOIStore } from "@/store/usePoiStore";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

interface SearchForm {
  longitude: string;
  latitude: string;
  distance: number;
}

const SearchPOI = () => {
  const { queryPOIsInRange, pois, loading, decryptPOIData, decryptedPOIData } =
    usePOIStore();
  const [form, setForm] = useState<SearchForm>({
    longitude: "",
    latitude: "",
    distance: 5000,
  });
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedPOI, setSelectedPOI] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDistanceChange = (value: number[]) => {
    setForm((prev) => ({ ...prev, distance: value[0] }));
  };

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setForm((prev) => ({
            ...prev,
            longitude: position.coords.longitude.toString(),
            latitude: position.coords.latitude.toString(),
          }));
          setIsGettingLocation(false);
          toast.success("Current location obtained successfully");
        },
        () => {
          setIsGettingLocation(false);
          toast.error("Failed to get current location");
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      toast.error("Geolocation is not supported by this browser");
    }
  };

  const handleSearch = async () => {
    const { longitude, latitude, distance } = form;

    if (!longitude.trim() || !latitude.trim()) {
      toast.error("Please provide both latitude and longitude");
      return;
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || lat < -90 || lat > 90) {
      toast.error("Latitude must be between -90 and 90");
      return;
    }

    if (isNaN(lng) || lng < -180 || lng > 180) {
      toast.error("Longitude must be between -180 and 180");
      return;
    }

    await queryPOIsInRange({
      longitude: lng,
      latitude: lat,
      distance: distance,
    });

    setSearchPerformed(true);
    setSelectedPOI(null);
  };

  const handleDecrypt = async (poiId: string) => {
    setSelectedPOI(poiId);
    await decryptPOIData(poiId);
  };

  const formatDistance = (meters: number) => {
    if (meters < 1000) return `${meters}m`;
    return `${(meters / 1000).toFixed(1)}km`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-6 w-6" />
            Search Points of Interest
          </CardTitle>
          <p className="text-muted-foreground">
            Find encrypted POIs within a specified radius of your location
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Location Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Latitude</label>
              <Input
                name="latitude"
                placeholder="e.g., 40.7128"
                value={form.latitude}
                onChange={handleChange}
                type="number"
                step="any"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Longitude</label>
              <Input
                name="longitude"
                placeholder="e.g., -74.0060"
                value={form.longitude}
                onChange={handleChange}
                type="number"
                step="any"
              />
            </div>
          </div>

          {/* Get Current Location */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={getCurrentLocation}
              disabled={isGettingLocation}
              className="flex items-center gap-2"
            >
              {isGettingLocation ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Crosshair className="h-4 w-4" />
              )}
              Use Current Location
            </Button>
          </div>

          {/* Distance Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Search Radius</label>
              <Badge variant="outline">{formatDistance(form.distance)}</Badge>
            </div>
            <Slider
              value={[form.distance]}
              onValueChange={handleDistanceChange}
              max={50000}
              min={100}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>100m</span>
              <span>50km</span>
            </div>
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search POIs
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchPerformed && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Search Results
              </span>
              <Badge variant="secondary">
                {pois.length} POI{pois.length !== 1 ? "s" : ""} found
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pois.length === 0 ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  No POIs found in the specified area. Try expanding your search
                  radius or checking a different location.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="grid gap-4">
                {pois.map((poi) => (
                  <div
                    key={poi._id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{poi.title}</h3>
                        <p className="text-muted-foreground">
                          {poi.description}
                        </p>
                      </div>
                      <Badge variant={poi.isActive ? "default" : "secondary"}>
                        {poi.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Lat: {poi.location.coordinates[1].toFixed(5)}, Lng:{" "}
                        {poi.location.coordinates[0].toFixed(5)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Lock className="h-4 w-4" />
                        <span>Data encrypted</span>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDecrypt(poi._id)}
                        disabled={loading}
                      >
                        {selectedPOI === poi._id && loading ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <Eye className="h-4 w-4 mr-2" />
                        )}
                        Decrypt Data
                      </Button>
                    </div>

                    {/* Decrypted Data Display */}
                    {selectedPOI === poi._id && decryptedPOIData && (
                      <div className="mt-4 p-3 bg-gray-50 rounded border-l-4 border-green-500">
                        <h4 className="font-medium text-sm mb-2 text-green-800">
                          Decrypted Data:
                        </h4>
                        <pre className="text-sm whitespace-pre-wrap text-gray-700">
                          {decryptedPOIData}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchPOI;
