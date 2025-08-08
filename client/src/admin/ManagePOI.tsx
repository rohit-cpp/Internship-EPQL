import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePOIStore } from "@/store/usePoiStore";

const ManagePOI = () => {
  const { pois, listAllPOIs, loading } = usePOIStore();

  useEffect(() => {
    listAllPOIs();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Manage POIs</h2>

      {loading && <p>Loading POIs...</p>}

      {!loading && pois.length === 0 && <p>No POIs available.</p>}

      {!loading &&
        pois.map((poi) => (
          <Card key={poi._id}>
            <CardHeader>
              <CardTitle>{poi.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{poi.description}</p>
              <p>
                📍 Lat: {poi.location.coordinates[1]}, Lng:{" "}
                {poi.location.coordinates[0]}
              </p>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default ManagePOI;
