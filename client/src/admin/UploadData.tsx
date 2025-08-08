import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Upload,
  MapPin,
  FileText,
  Lock,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { usePOIStore } from "@/store/usePoiStore";
import { toast } from "sonner";

interface FormData {
  title: string;
  description: string;
  latitude: string;
  longitude: string;
  plainData: string;
}

interface FormErrors {
  [key: string]: string;
}

const UploadData = () => {
  const { createPOI, loading } = usePOIStore();
  const [form, setForm] = useState<FormData>({
    title: "",
    description: "",
    latitude: "",
    longitude: "",
    plainData: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
    } else if (form.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required";
    } else if (form.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!form.latitude.trim()) {
      newErrors.latitude = "Latitude is required";
    } else {
      const lat = parseFloat(form.latitude);
      if (isNaN(lat) || lat < -90 || lat > 90) {
        newErrors.latitude = "Latitude must be between -90 and 90";
      }
    }

    if (!form.longitude.trim()) {
      newErrors.longitude = "Longitude is required";
    } else {
      const lng = parseFloat(form.longitude);
      if (isNaN(lng) || lng < -180 || lng > 180) {
        newErrors.longitude = "Longitude must be between -180 and 180";
      }
    }

    if (!form.plainData.trim()) {
      newErrors.plainData = "Sensitive data is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      await createPOI({
        title: form.title.trim(),
        description: form.description.trim(),
        latitude: parseFloat(form.latitude),
        longitude: parseFloat(form.longitude),
        plainData: form.plainData.trim(),
      });

      setIsSubmitted(true);
      setForm({
        title: "",
        description: "",
        latitude: "",
        longitude: "",
        plainData: "",
      });

      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleGetCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setForm((prev) => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          }));
          toast.success("Current location obtained successfully");
        },
        (error) => {
          toast.error("Failed to get current location");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Upload className="h-6 w-6" />
            Upload Point of Interest
          </CardTitle>
          <p className="text-muted-foreground">
            Add encrypted location data to the system
          </p>
        </CardHeader>

        <CardContent>
          {isSubmitted && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                POI uploaded successfully! The data has been encrypted and
                stored.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Title *
              </Label>
              <Input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter POI title..."
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Provide a detailed description of this POI..."
                rows={4}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.description}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location Coordinates *
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleGetCurrentLocation}
                >
                  Use Current Location
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    name="latitude"
                    value={form.latitude}
                    onChange={handleChange}
                    placeholder="e.g., 40.7128"
                    type="number"
                    step="any"
                    className={errors.latitude ? "border-red-500" : ""}
                  />
                  {errors.latitude && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.latitude}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    name="longitude"
                    value={form.longitude}
                    onChange={handleChange}
                    placeholder="e.g., -74.0060"
                    type="number"
                    step="any"
                    className={errors.longitude ? "border-red-500" : ""}
                  />
                  {errors.longitude && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.longitude}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Sensitive Data */}
            <div className="space-y-2">
              <Label htmlFor="plainData" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Sensitive Data *
              </Label>
              <Textarea
                id="plainData"
                name="plainData"
                value={form.plainData}
                onChange={handleChange}
                placeholder="Enter sensitive information that will be encrypted..."
                rows={4}
                className={errors.plainData ? "border-red-500" : ""}
              />
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Lock className="h-3 w-3" />
                This data will be encrypted before storage
              </p>
              {errors.plainData && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.plainData}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload POI
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadData;
