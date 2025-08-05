import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

const QueryHistory = () => {
  const queries = [
    { id: 1, location: "18.5, 73.8", radius: "500m", date: "2025-08-01" },
    { id: 2, location: "19.1, 72.9", radius: "1000m", date: "2025-08-03" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Query History</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Radius</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {queries.map((q) => (
            <TableRow key={q.id}>
              <TableCell>{q.id}</TableCell>
              <TableCell>{q.location}</TableCell>
              <TableCell>{q.radius}</TableCell>
              <TableCell>{q.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default QueryHistory;
