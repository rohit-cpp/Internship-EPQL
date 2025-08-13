import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Download, Users, UserCheck, UserX } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AdminData = () => {
  const { allUsers, getAllUsers, loading } = useUserStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "verified" | "unverified"
  >("all");

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const filteredUsers =
    allUsers?.filter((user) => {
      const matchesSearch =
        user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        filterStatus === "all" ||
        (filterStatus === "verified" && user.isVerified) ||
        (filterStatus === "unverified" && !user.isVerified);

      return matchesSearch && matchesFilter;
    }) || [];

  const exportToCSV = () => {
    const csvContent = [
      [
        "Name",
        "Email",
        "Contact",
        "Verified",
        "Last Login",
        "Registration Date",
      ],
      ...filteredUsers.map((user) => [
        user.fullname,
        user.email,
        user.contact?.toString() || "",
        user.isVerified ? "Yes" : "No",
        user.lastLogin ? new Date(user.lastLogin).toISOString() : "",
        // user.createdAt ? new Date(user.createdAt).toISOString() : "",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "users-export.csv";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              User Management
            </h1>
            <p className="text-muted-foreground">
              Manage and monitor registered users
            </p>
          </div>
          <Button onClick={exportToCSV} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="flex items-center p-6">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Users
                </p>
                <p className="text-2xl font-bold">{allUsers?.length || 0}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <UserCheck className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Verified Users
                </p>
                <p className="text-2xl font-bold">
                  {allUsers?.filter((u) => u.isVerified).length || 0}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <UserX className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Unverified Users
                </p>
                <p className="text-2xl font-bold">
                  {allUsers?.filter((u) => !u.isVerified).length || 0}
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
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  onClick={() => setFilterStatus("all")}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === "verified" ? "default" : "outline"}
                  onClick={() => setFilterStatus("verified")}
                  size="sm"
                >
                  Verified
                </Button>
                <Button
                  variant={
                    filterStatus === "unverified" ? "default" : "outline"
                  }
                  onClick={() => setFilterStatus("unverified")}
                  size="sm"
                >
                  Unverified
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <Alert>
              <AlertDescription>
                No users found matching your criteria.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Registered</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user, index) => (
                    <TableRow
                      key={user.email || index}
                      className="hover:bg-gray-50"
                    >
                      <TableCell className="font-medium">
                        {user.fullname}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.contact || "--"}</TableCell>
                      <TableCell>
                        <Badge
                          variant={user.isVerified ? "default" : "destructive"}
                        >
                          {user.isVerified ? "Verified" : "Unverified"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.lastLogin
                          ? new Date(user.lastLogin).toLocaleDateString()
                          : "--"}
                      </TableCell>
                      {/* <TableCell>
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "--"}
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminData;
