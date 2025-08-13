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
  const { user } = useUserStore();
  const { pois, queryPOIsInRange } = usePOIStore();
  const { logs, getUserLogs, hasFetchedLogs } = useQueryLogStore();
  const [nearbyCount, setNearbyCount] = useState(0);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return;
    if (!hasFetchedLogs) getUserLogs();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        await queryPOIsInRange({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          distance: 5000,
        });
      });
    }
    setInitialized(true);
  }, [initialized, hasFetchedLogs]);

  useEffect(() => {
    const unique = Array.from(new Map(pois.map((p) => [p._id, p])).values());
    setNearbyCount(unique.length);
  }, [pois]);

  const uniqueLogs = Array.from(new Map(logs.map((l) => [l._id, l])).values());
  const recent = uniqueLogs.slice(0, 3);
  const lastDate =
    uniqueLogs[0] && new Date(uniqueLogs[0].createdAt).toLocaleDateString();

  return (
    <div className="relative bg-neutral-900 min-h-screen p-6 space-y-8">
      {/* Ambient Neon Blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Welcome Card */}
      <Card className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white neon-border shadow-fuchsia-500/30">
        <CardContent className="p-8">
          <h1 className="text-5xl text-yellow-400 font-extrabold text-neon">
            Welcome back, {user?.fullname || "User"}!
          </h1>
          <p className="mt-2 text-cyan-100">
            Discover encrypted Points of Interest with privacy protection.
          </p>
          <div className="mt-4 flex gap-4">
            <Button className="neon-gradient neon-border text-white">
              <Search className="mr-2" /> Search POIs
            </Button>
            <Button
              variant="outline"
              className="text-black border-white hover:bg-white/10"
            >
              <History className="mr-2" /> View History
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          {
            icon: MapPin,
            label: "Nearby POIs",
            value: nearbyCount,
            color: "text-cyan-400",
          },
          {
            icon: TrendingUp,
            label: "Total Queries",
            value: uniqueLogs.length,
            color: "text-green-400",
          },
          {
            icon: Shield,
            label: "Privacy Level",
            value: "High",
            color: "text-purple-400",
          },
          {
            icon: Clock,
            label: "Last Query",
            value: lastDate || "Never",
            color: "text-orange-400",
          },
        ].map(({ icon: Icon, label, value, color }, i) => (
          <Card
            key={i}
            className="bg-neutral-800/60 neon-border shadow-cyan-500/10"
          >
            <CardContent className="flex items-center p-6">
              <Icon className={`h-8 w-8 ${color}`} />
              <div className="ml-4">
                <p className="text-sm text-neutral-400">{label}</p>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent & Nearby */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-neutral-800/60 neon-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <History /> Recent Queries
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recent.length === 0 ? (
              <p className="text-neutral-400 text-center py-8">
                No recent queries.
              </p>
            ) : (
              recent.map((q) => (
                <div
                  key={q._id}
                  className="flex justify-between p-4 bg-neutral-700/50 rounded mb-2"
                >
                  <div>
                    <Badge
                      variant="outline"
                      className="border-cyan-400 text-cyan-400 neon-border"
                    >
                      {q.queryType}
                    </Badge>
                    <p className="text-sm text-neutral-400">
                      {q.resultCount} results
                    </p>
                  </div>
                  <span className="text-xs text-neutral-500">
                    {new Date(q.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="bg-neutral-800/60 neon-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <MapPin /> Nearby Points of Interest
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pois.length === 0 ? (
              <p className="text-neutral-400 text-center py-8">
                No POIs found.
              </p>
            ) : (
              pois.slice(0, 3).map((poi) => (
                <div
                  key={poi._id}
                  className="p-4 bg-neutral-700/50 rounded mb-2 flex justify-between items-start"
                >
                  <div>
                    <h4 className="font-medium text-white">{poi.title}</h4>
                    <p className="text-sm text-neutral-400 line-clamp-2">
                      {poi.description}
                    </p>
                  </div>
                  <Button variant="ghost" className="text-cyan-400">
                    <Eye />
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-neutral-800/60 neon-border">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10 neon-border"
            >
              <Search /> Search POIs
            </Button>
            <Button
              variant="outline"
              className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10 neon-border"
            >
              <History /> View History
            </Button>
            <Button
              variant="outline"
              className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10 neon-border"
            >
              <Shield /> Privacy Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
