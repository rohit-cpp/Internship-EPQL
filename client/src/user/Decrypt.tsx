import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DecryptPage = () => {
  const encryptedResults = [
    { id: 1, name: "Encrypted_Place_1" },
    { id: 2, name: "Encrypted_Place_2" },
  ];

  const handleDecrypt = (id: number) => {
    // handle predicate-only decryption here
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Decrypt Results</h2>
      <div className="grid gap-4">
        {encryptedResults.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>{item.name}</div>
              <Button size="sm" onClick={() => handleDecrypt(item.id)}>
                Decrypt
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DecryptPage;
