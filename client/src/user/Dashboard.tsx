import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UserDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-lg font-semibold">Search POIs</p>
            <Button className="mt-4 w-full" variant="default">
              Search
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-lg font-semibold">Decrypt Results</p>
            <Button className="mt-4 w-full" variant="outline">
              Decrypt
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-lg font-semibold">Query History</p>
            <Button className="mt-4 w-full" variant="ghost">
              View History
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
