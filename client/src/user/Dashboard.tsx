import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { usePOIStore } from "@/store/usePoiStore";
import { useQueryLogStore } from "@/store/useQueryLogStore";

const UserDashboard = () => {
  const { queryPOIsInRange, pois } = usePOIStore();
  const { logs, getUserLogs } = useQueryLogStore();
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    setSearching(true);
    // Example: Search at a default location or get from user input
    await queryPOIsInRange({
      longitude: 73.8567,
      latitude: 18.5204,
      distance: 5000,
    });
    setSearching(false);
  };

  const handleViewHistory = async () => {
    await getUserLogs();
    // You should handle displaying logs elsewhere or add state to show logs here
  };

  // Decrypt button can trigger a decrypt in DecryptPage or modal with POI selected.

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-lg font-semibold">Search POIs</p>
            <Button
              className="mt-4 w-full"
              variant="default"
              onClick={handleSearch}
              disabled={searching}
            >
              {searching ? "Searching..." : "Search"}
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-lg font-semibold">Decrypt Results</p>
            <Button className="mt-4 w-full" variant="outline">
              Decrypt
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-lg font-semibold">Query History</p>
            <Button
              className="mt-4 w-full"
              variant="ghost"
              onClick={handleViewHistory}
            >
              View History
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
