import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Log = {
  _id: string;
  queryType: string;
  resultCount: number;
  createdAt: string;
  user: { fullname: string; email: string };
};

const AdminLogs = () => {
  const [logs, setLogs] = useState<Log[]>([]);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Query Logs</h2>
      {logs?.map((log) => (
        <Card key={log._id}>
          <CardHeader>
            <CardTitle>{log.queryType}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>User:</strong> {log.user.fullname} ({log.user.email})
            </p>
            <p>
              <strong>Results:</strong> {log.resultCount}
            </p>
            <p>
              <strong>Time:</strong> {new Date(log.createdAt).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminLogs;
