import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type POI = {
  _id: string;
  title: string;
  description: string;
  location: { coordinates: [number, number] };
};

const ManagePOI = () => {
  const [pois, setPOIs] = useState<POI[]>([]);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Manage POIs</h2>
      {pois.map((poi) => (
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
