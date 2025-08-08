import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Users, MapPin, Activity } from "lucide-react";
import { usePOIStore } from "@/store/usePoiStore";
import { useQueryLogStore } from "@/store/useQueryLogStore";
import { useUserStore } from "@/store/useUserStore";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AdminDashboard = () => {
  const { allUsers, getAllUsers, loading: userLoading } = useUserStore();
  const { pois, listAllPOIs, loading: poiLoading } = usePOIStore();
  const { logs, getAllLogs, loading: logLoading } = useQueryLogStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([getAllUsers(), listAllPOIs(), getAllLogs()]);
      } catch (err) {
        setError("Failed to load dashboard data. Please refresh the page.");
      }
    };
    fetchData();
  }, [getAllUsers, listAllPOIs, getAllLogs]);

  const verifiedUsersCount =
    allUsers?.filter((user) => user.isVerified).length || 0;
  const activePOIsCount = pois?.filter((poi) => poi.isActive).length || 0;
  const recentLogsCount =
    logs?.filter(
      (log) =>
        new Date(log.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000)
    ).length || 0;

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your Location-Based Query System
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {userLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {allUsers?.length || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  <Badge variant="secondary" className="mr-1">
                    {verifiedUsersCount}
                  </Badge>
                  verified
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Total POIs Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Points of Interest
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {poiLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">{pois?.length || 0}</div>
                <p className="text-xs text-muted-foreground">
                  <Badge variant="outline" className="mr-1">
                    {activePOIsCount}
                  </Badge>
                  active
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Query Logs Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Query Logs</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {logLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">{logs?.length || 0}</div>
                <p className="text-xs text-muted-foreground">
                  <Badge variant="outline" className="mr-1">
                    {recentLogsCount}
                  </Badge>
                  last 24h
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* System Status Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Online</div>
            <p className="text-xs text-muted-foreground">
              All services operational
            </p>
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
            <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
              <h3 className="font-medium">Upload New POI</h3>
              <p className="text-sm text-muted-foreground">
                Add encrypted location data
              </p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
              <h3 className="font-medium">View User Activity</h3>
              <p className="text-sm text-muted-foreground">
                Monitor user queries
              </p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
              <h3 className="font-medium">System Settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure system parameters
              </p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
