import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Search,
  Eye,
  Edit,
  Trash2,
  Plus,
  Globe,
  Lock,
} from "lucide-react";
import { usePOIStore } from "@/store/usePoiStore";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ManagePOI = () => {
  const { pois, listAllPOIs, loading } = usePOIStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");

  useEffect(() => {
    listAllPOIs();
  }, [listAllPOIs]);

  const filteredPOIs =
    pois?.filter((poi) => {
      const matchesSearch =
        poi.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        poi.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && poi.isActive) ||
        (statusFilter === "inactive" && !poi.isActive);

      return matchesSearch && matchesStatus;
    }) || [];

  const activePOICount = pois?.filter((poi) => poi.isActive).length || 0;
  const inactivePOICount = pois?.filter((poi) => !poi.isActive).length || 0;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage POIs</h1>
          <p className="text-muted-foreground">
            Manage Points of Interest and their encrypted data
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New POI
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <MapPin className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">
                Total POIs
              </p>
              <p className="text-2xl font-bold">{pois?.length || 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Globe className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">
                Active POIs
              </p>
              <p className="text-2xl font-bold">{activePOICount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Lock className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">
                Inactive POIs
              </p>
              <p className="text-2xl font-bold">{inactivePOICount}</p>
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
                placeholder="Search POIs by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={statusFilter === "active" ? "default" : "outline"}
                onClick={() => setStatusFilter("active")}
                size="sm"
              >
                Active
              </Button>
              <Button
                variant={statusFilter === "inactive" ? "default" : "outline"}
                onClick={() => setStatusFilter("inactive")}
                size="sm"
              >
                Inactive
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* POI Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Points of Interest ({filteredPOIs.length})
        </h2>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredPOIs.length === 0 ? (
          <Alert>
            <AlertDescription>
              No POIs found matching your criteria.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPOIs.map((poi) => (
              <Card key={poi._id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{poi.title}</CardTitle>
                    <Badge variant={poi.isActive ? "default" : "secondary"}>
                      {poi.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {poi.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Lat: {poi.location.coordinates[1].toFixed(5)}, Lng:{" "}
                      {poi.location.coordinates[0].toFixed(5)}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Created: {new Date(poi.createdAt).toLocaleDateString()}
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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

export default ManagePOI;
