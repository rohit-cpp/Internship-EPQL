import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useQueryLogStore } from "@/store/useQueryLogStore";

import { useEffect } from "react";

const QueryHistory = () => {
  const { logs, getUserLogs } = useQueryLogStore();

  useEffect(() => {
    getUserLogs();
  }, [getUserLogs]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Query History</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Query Type</TableHead>
            <TableHead>Parameters</TableHead>
            <TableHead>Result Count</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((q) => (
            <TableRow key={q._id}>
              <TableCell>{q._id}</TableCell>
              <TableCell>{q.queryType}</TableCell>
              <TableCell>
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(q.queryParams)}
                </pre>
              </TableCell>
              <TableCell>{q.resultCount}</TableCell>
              <TableCell>
                {new Date(q.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default QueryHistory;
