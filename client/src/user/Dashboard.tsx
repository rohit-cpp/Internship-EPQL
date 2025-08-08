import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Search,
  History,
  Shield,
  TrendingUp,
  Clock,
  Eye,
} from "lucide-react";
import { usePOIStore } from "@/store/usePoiStore";
import { useUserStore } from "@/store/useUserStore";
import { useQueryLogStore } from "@/store/useQueryLogStore";

const UserDashboard = () => {
  const { user, checkAuthentication } = useUserStore();
  const { pois, queryPOIsInRange } = usePOIStore();
  const { logs, getUserLogs, hasFetchedLogs } = useQueryLogStore();
  const [nearbyPOIs, setNearbyPOIs] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeDashboard = async () => {
      if (isInitialized) return;

      // await checkAuthentication();

      if (!hasFetchedLogs) {
        await getUserLogs();
      }

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          await queryPOIsInRange({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            distance: 5000,
          });
        });
      }

      setIsInitialized(true);
    };

    initializeDashboard();
  }, [isInitialized, hasFetchedLogs]);
  useEffect(() => {
    // Remove duplicates and set nearby POIs count
    const uniquePOIs =
      pois?.filter(
        (poi, index, self) => index === self.findIndex((p) => p._id === poi._id)
      ) || [];
    setNearbyPOIs(uniquePOIs.length);
  }, [pois]);

  // Remove duplicate logs
  const uniqueLogs =
    logs?.filter(
      (log, index, self) => index === self.findIndex((l) => l._id === log._id)
    ) || [];

  const recentQueries = uniqueLogs.slice(0, 3);
  const totalQueries = uniqueLogs.length;
  const lastQueryDate =
    uniqueLogs.length > 0 ? new Date(uniqueLogs[0].createdAt) : null;

  // Remove duplicate POIs for display
  const uniquePOIs =
    pois?.filter(
      (poi, index, self) => index === self.findIndex((p) => p._id === poi._id)
    ) || [];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.fullname || "User"}!
        </h1>
        <p className="text-blue-100 mb-4">
          Discover encrypted Points of Interest with privacy protection
        </p>
        <div className="flex gap-3">
          <Button variant="secondary">
            <Search className="mr-2 h-4 w-4" />
            Search POIs
          </Button>
          <Button
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-blue-600"
          >
            <History className="mr-2 h-4 w-4" />
            View History
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <MapPin className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">
                Nearby POIs
              </p>
              <p className="text-2xl font-bold">{nearbyPOIs}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">
                Total Queries
              </p>
              <p className="text-2xl font-bold">{totalQueries}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <Shield className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">
                Privacy Level
              </p>
              <p className="text-2xl font-bold text-green-600">High</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <Clock className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">
                Last Query
              </p>
              <p className="text-sm font-bold">
                {lastQueryDate ? lastQueryDate.toLocaleDateString() : "Never"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Queries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Recent Queries
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentQueries.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No recent queries. Start exploring!
              </p>
            ) : (
              <div className="space-y-3">
                {recentQueries.map((query) => (
                  <div
                    key={query._id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded"
                  >
                    <div>
                      <Badge variant="outline" className="mb-1">
                        {query.queryType}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {query.resultCount} results found
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(query.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Nearby POIs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Nearby Points of Interest
            </CardTitle>
          </CardHeader>
          <CardContent>
            {uniquePOIs.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No POIs found in your area. Try searching a different location.
              </p>
            ) : (
              <div className="space-y-3">
                {uniquePOIs.slice(0, 3).map((poi) => (
                  <div
                    key={poi._id}
                    className="p-3 border rounded hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{poi.title}</h4>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {poi.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>
                        {poi.location.coordinates}, {poi.location.coordinates}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Search className="h-6 w-6" />
              <span>Search POIs</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <History className="h-6 w-6" />
              <span>View History</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Shield className="h-6 w-6" />
              <span>Privacy Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
