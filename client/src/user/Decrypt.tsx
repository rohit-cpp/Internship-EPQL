import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePOIStore } from "@/store/usePoiStore";

const DecryptPage = () => {
  const { pois, decryptPOIData, decryptedPOIData, loading } = usePOIStore();

  const handleDecrypt = (id: string) => {
    decryptPOIData(id);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Decrypt Results</h2>
      <div className="grid gap-4">
        {pois.map((item) => (
          <Card key={item._id}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>{item.title}</div>
              <Button
                size="sm"
                onClick={() => handleDecrypt(item._id)}
                disabled={loading}
              >
                Decrypt
              </Button>
            </CardContent>
          </Card>
        ))}
        {decryptedPOIData && (
          <div className="mt-6 p-4 border rounded">
            <h3 className="font-semibold">Decrypted Data:</h3>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(decryptedPOIData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecryptPage;
