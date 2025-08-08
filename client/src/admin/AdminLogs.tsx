import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQueryLogStore } from "@/store/useQueryLogStore";
import { useUserStore } from "@/store/useUserStore";

const AdminLogs = () => {
  const { logs, getAllLogs } = useQueryLogStore();
  const { user } = useUserStore();

  useEffect(() => {
    getAllLogs();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Query Logs</h2>
      {logs.length === 0 ? (
        <p>No query logs found.</p>
      ) : (
        logs.map((log) => (
          <Card key={log._id}>
            <CardHeader>
              <CardTitle>{log.queryType}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>User:</strong>{" "}
                {typeof user?.fullname === "string"
                  ? user?.fullname
                  : `${user?.fullname} (${user?.email})`}
              </p>
              <p>
                <strong>Results:</strong> {log.resultCount}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {new Date(log.createdAt).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default AdminLogs;
