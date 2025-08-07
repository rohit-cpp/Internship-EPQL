import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type User = {
  _id: string;
  fullname: string;
  email: string;
  isVerified: boolean;
  lastLogin: string;
};

const AdminData = () => {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead>Last Login</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.fullname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={user.isVerified ? "default" : "destructive"}>
                  {user.isVerified ? "Yes" : "No"}
                </Badge>
              </TableCell>
              <TableCell>{new Date(user.lastLogin).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminData;
