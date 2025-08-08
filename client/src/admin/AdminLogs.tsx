import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Activity,
  Search,
  Filter,
  Calendar,
  BarChart3,
  Download,
  User,
} from "lucide-react";
import { useQueryLogStore } from "@/store/useQueryLogStore";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AdminLogs = () => {
  const { logs, getAllLogs, loading } = useQueryLogStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQueryType, setSelectedQueryType] = useState("all");

  useEffect(() => {
    getAllLogs();
  }, [getAllLogs]);

  const filteredLogs =
    logs?.filter((log) => {
      const matchesSearch =
        (typeof log.user === "string" ? log?.user : log.user?.email)
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        log.queryType.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        selectedQueryType === "all" || log.queryType === selectedQueryType;

      return matchesSearch && matchesType;
    }) || [];

  const queryTypes = [...new Set(logs?.map((log) => log.queryType) || [])];

  const totalQueries = logs?.length || 0;
  const todayQueries =
    logs?.filter(
      (log) =>
        new Date(log.createdAt).toDateString() === new Date().toDateString()
    ).length || 0;

  const avgResults = logs?.length
    ? (
        logs.reduce((sum, log) => sum + log.resultCount, 0) / logs.length
      ).toFixed(1)
    : 0;

  const exportLogs = () => {
    const csvContent = [
      ["Date", "User", "Query Type", "Parameters", "Results", "Timestamp"],
      ...filteredLogs.map((log) => [
        new Date(log.createdAt).toLocaleDateString(),
        typeof log.user === "string" ? log.user : log.user.email,
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
    link.download = "query-logs-export.csv";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Query Logs</h1>
          <p className="text-muted-foreground">
            Monitor and analyze user query patterns
          </p>
        </div>
        <Button onClick={exportLogs} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Activity className="h-8 w-8 text-blue-600" />
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
            <User className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">
                Active Users
              </p>
              <p className="text-2xl font-bold">
                {new Set(
                  logs?.map((log) =>
                    typeof log.user === "string" ? log?.user : log.user?._id
                  )
                ).size || 0}
              </p>
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
                placeholder="Search by user email or query type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedQueryType === "all" ? "default" : "outline"}
                onClick={() => setSelectedQueryType("all")}
                size="sm"
              >
                All Types
              </Button>
              {queryTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedQueryType === type ? "default" : "outline"}
                  onClick={() => setSelectedQueryType(type)}
                  size="sm"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          Query History ({filteredLogs.length})
        </h2>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredLogs.length === 0 ? (
          <Alert>
            <AlertDescription>
              No query logs found matching your criteria.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid gap-4">
            {filteredLogs.map((log) => (
              <Card key={log._id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{log.queryType}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(log.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <Badge variant="secondary">{log.resultCount} results</Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-1">User:</p>
                      <p className="text-sm text-muted-foreground">
                        {typeof log.user === "string"
                          ? log.user
                          : `${log.user?.fullname} (${log.user?.email})`}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">
                        Query Parameters:
                      </p>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {JSON.stringify(log.queryParams, null, 2)}
                      </code>
                    </div>
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

export default AdminLogs;
