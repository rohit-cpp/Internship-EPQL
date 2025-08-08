import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Copy,
  Download,
  Shield,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { usePOIStore } from "@/store/usePoiStore";
import { toast } from "sonner";

interface DecryptPOIProps {
  poiId: string;
  poiTitle?: string;
}

const DecryptPOI = ({ poiId, poiTitle }: DecryptPOIProps) => {
  const { decryptPOIData, decryptedPOIData, loading } = usePOIStore();
  const [isDataVisible, setIsDataVisible] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [decryptionAttempted, setDecryptionAttempted] = useState(false);

  const handleDecrypt = async () => {
    try {
      await decryptPOIData(poiId);
      setIsDecrypted(true);
      setDecryptionAttempted(true);
      setIsDataVisible(true);
      toast.success("POI data decrypted successfully");
    } catch (error) {
      setDecryptionAttempted(true);
      toast.error("Failed to decrypt POI data");
    }
  };

  const handleCopyData = () => {
    if (decryptedPOIData) {
      navigator.clipboard.writeText(decryptedPOIData);
      toast.success("Decrypted data copied to clipboard");
    }
  };

  const handleDownloadData = () => {
    if (decryptedPOIData) {
      const blob = new Blob([decryptedPOIData], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `poi-${poiId}-decrypted.txt`;
      link.click();
      window.URL.revokeObjectURL(url);
      toast.success("Decrypted data downloaded");
    }
  };

  const toggleDataVisibility = () => {
    setIsDataVisible(!isDataVisible);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          POI Data Decryption
        </CardTitle>
        {poiTitle && (
          <p className="text-muted-foreground">
            Decrypt sensitive data for:{" "}
            <span className="font-medium">{poiTitle}</span>
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Security Notice */}
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            This operation will decrypt sensitive data. Ensure you're in a
            secure environment.
          </AlertDescription>
        </Alert>

        {/* Decryption Status */}
        <div className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg">
          {!decryptionAttempted ? (
            <div className="text-center space-y-4">
              <div className="p-3 rounded-full bg-gray-100 w-fit mx-auto">
                <Lock className="h-8 w-8 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium">Data is Encrypted</h3>
                <p className="text-sm text-muted-foreground">
                  Click decrypt to reveal sensitive information
                </p>
              </div>
            </div>
          ) : isDecrypted && decryptedPOIData ? (
            <div className="text-center space-y-4">
              <div className="p-3 rounded-full bg-green-100 w-fit mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-green-800">
                  Successfully Decrypted
                </h3>
                <p className="text-sm text-muted-foreground">
                  Sensitive data is now available
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="p-3 rounded-full bg-red-100 w-fit mx-auto">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium text-red-800">Decryption Failed</h3>
                <p className="text-sm text-muted-foreground">
                  Unable to decrypt the data
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center">
          {!isDecrypted ? (
            <Button
              onClick={handleDecrypt}
              disabled={loading}
              size="lg"
              className="min-w-[150px]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Decrypting...
                </>
              ) : (
                <>
                  <Unlock className="mr-2 h-4 w-4" />
                  Decrypt Data
                </>
              )}
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={toggleDataVisibility}
                size="sm"
              >
                {isDataVisible ? (
                  <>
                    <EyeOff className="mr-2 h-4 w-4" />
                    Hide Data
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Show Data
                  </>
                )}
              </Button>

              <Button variant="outline" onClick={handleCopyData} size="sm">
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>

              <Button variant="outline" onClick={handleDownloadData} size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          )}
        </div>

        {/* Decrypted Data Display */}
        {isDecrypted && decryptedPOIData && isDataVisible && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Decrypted Information</h4>
              <Badge
                variant="outline"
                className="text-green-600 border-green-600"
              >
                <Unlock className="mr-1 h-3 w-3" />
                Decrypted
              </Badge>
            </div>

            <div className="relative">
              <pre className="bg-gray-50 border rounded-lg p-4 text-sm whitespace-pre-wrap max-h-64 overflow-auto">
                {decryptedPOIData}
              </pre>

              {/* Security Overlay */}
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="text-xs">
                  Sensitive Data
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Security Footer */}
        <div className="text-xs text-muted-foreground text-center border-t pt-4">
          <p className="flex items-center justify-center gap-1">
            <Lock className="h-3 w-3" />
            Data is protected with end-to-end encryption
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DecryptPOI;
