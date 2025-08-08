import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePOIStore } from "@/store/usePoiStore";
import { useQueryLogStore } from "@/store/useQueryLogStore";
import { useUserStore } from "@/store/useUserStore";

const AdminDashboard = () => {
  const { user, getAllUsers, allUsers } = useUserStore();
  const { pois, listAllPOIs } = usePOIStore();
  const { logs, getAllLogs } = useQueryLogStore();

  useEffect(() => {
    getAllUsers?.();
    listAllPOIs();
    getAllLogs();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>{allUsers ? allUsers.length : 0}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total POIs</CardTitle>
        </CardHeader>
        <CardContent>{pois.length}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Query Logs</CardTitle>
        </CardHeader>
        <CardContent>{logs.length}</CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
