import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>234</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total POIs</CardTitle>
        </CardHeader>
        <CardContent>87</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Query Logs</CardTitle>
        </CardHeader>
        <CardContent>421</CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
