import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  History as HistoryIcon,
  Search,
  Calendar,
  Download,
  Trash2,
  Eye,
  BarChart3,
  Clock,
  MapPin,
} from "lucide-react";
import { useQueryLogStore } from "@/store/useQueryLogStore";
import { Alert, AlertDescription } from "@/components/ui/alert";

const History = () => {
  const { logs, getUserLogs, loading, hasFetchedLogs } = useQueryLogStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState<
    "all" | "today" | "week" | "month"
  >("all");

  useEffect(() => {
    if (!hasFetchedLogs) {
      getUserLogs();
    }
  }, [hasFetchedLogs]);

  const uniqueLogs =
    logs?.filter(
      (log, index, self) => index === self.findIndex((l) => l._id === log._id)
    ) || [];

  const filteredLogs = uniqueLogs.filter((log) => {
    const matchesSearch =
      log.queryType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      JSON.stringify(log.queryParams)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const logDate = new Date(log.createdAt);
    const now = new Date();

    let matchesTimeRange = true;
    switch (selectedTimeRange) {
      case "today":
        matchesTimeRange = logDate.toDateString() === now.toDateString();
        break;
      case "week":
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        matchesTimeRange = logDate >= weekAgo;
        break;
      case "month":
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        matchesTimeRange = logDate >= monthAgo;
        break;
      default:
        matchesTimeRange = true;
    }

    return matchesSearch && matchesTimeRange;
  });

  const totalQueries = uniqueLogs.length;
  const todayQueries = uniqueLogs.filter(
    (log) =>
      new Date(log.createdAt).toDateString() === new Date().toDateString()
  ).length;
  const totalResults = uniqueLogs.reduce(
    (sum, log) => sum + log.resultCount,
    0
  );
  const avgResults =
    totalQueries > 0 ? (totalResults / totalQueries).toFixed(1) : "0";

  const exportHistory = () => {
    const csvContent = [
      ["Date", "Query Type", "Parameters", "Results", "Timestamp"],
      ...filteredLogs.map((log) => [
        new Date(log.createdAt).toLocaleDateString(),
        log.queryType,
        JSON.stringify(log.queryParams),
        log.resultCount.toString(),
        new Date(log.createdAt).toISOString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "query-history.csv";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const getQueryTypeColor = (type: string) => {
    switch (type) {
      case "SPATIAL_RANGE":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "LOCATION":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Query History</h1>
          <p className="text-muted-foreground">
            View and manage your search history
          </p>
        </div>
        <Button onClick={exportHistory} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export History
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <HistoryIcon className="h-8 w-8 text-blue-600" />
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
            <Calendar className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Today</p>
              <p className="text-2xl font-bold">{todayQueries}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <BarChart3 className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">
                Avg Results
              </p>
              <p className="text-2xl font-bold">{avgResults}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <MapPin className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">
                Total Results
              </p>
              <p className="text-2xl font-bold">{totalResults}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search queries by type or parameters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedTimeRange === "all" ? "default" : "outline"}
                onClick={() => setSelectedTimeRange("all")}
                size="sm"
              >
                All Time
              </Button>
              <Button
                variant={selectedTimeRange === "today" ? "default" : "outline"}
                onClick={() => setSelectedTimeRange("today")}
                size="sm"
              >
                Today
              </Button>
              <Button
                variant={selectedTimeRange === "week" ? "default" : "outline"}
                onClick={() => setSelectedTimeRange("week")}
                size="sm"
              >
                This Week
              </Button>
              <Button
                variant={selectedTimeRange === "month" ? "default" : "outline"}
                onClick={() => setSelectedTimeRange("month")}
                size="sm"
              >
                This Month
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          Your Queries ({filteredLogs.length})
        </h2>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredLogs.length === 0 ? (
          <Alert>
            <AlertDescription>
              {uniqueLogs.length === 0
                ? "No queries found. Start exploring to see your history here."
                : "No queries match your current filters."}
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid gap-4">
            {filteredLogs.map((log) => (
              <Card key={log._id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className={getQueryTypeColor(log.queryType)}
                      >
                        {log.queryType}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{new Date(log.createdAt).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {log.resultCount} result
                        {log.resultCount !== 1 ? "s" : ""}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <h4 className="font-medium text-sm">Query Parameters:</h4>
                      <div className="mt-1 p-3 bg-gray-50 rounded-md">
                        <code className="text-sm">
                          {JSON.stringify(log.queryParams, null, 2)}
                        </code>
                      </div>
                    </div>

                    {log.queryParams.longitude && log.queryParams.latitude && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>
                          Location: {log.queryParams.latitude},{" "}
                          {log.queryParams.longitude}
                        </span>
                        {log.queryParams.distance && (
                          <span>
                            • Radius:{" "}
                            {log.queryParams.distance > 1000
                              ? `${(log.queryParams.distance / 1000).toFixed(
                                  1
                                )}km`
                              : `${log.queryParams.distance}m`}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
