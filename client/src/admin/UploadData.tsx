import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { usePOIStore } from "@/store/usePoiStore";

const UploadData = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    latitude: "",
    longitude: "",
    plainData: "",
  });
  const { createPOI } = usePOIStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      !form.title ||
      !form.description ||
      !form.latitude ||
      !form.longitude ||
      !form.plainData
    ) {
      alert("Please fill all fields");
      return;
    }

    await createPOI({
      title: form.title,
      description: form.description,
      latitude: parseFloat(form.latitude),
      longitude: parseFloat(form.longitude),
      plainData: form.plainData,
    });

    alert("POI uploaded successfully!");
    setForm({
      title: "",
      description: "",
      latitude: "",
      longitude: "",
      plainData: "",
    });
  };

  return (
    <div className="max-w-xl p-6 space-y-4">
      <h2 className="text-xl font-semibold">Upload POI</h2>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="w-full border rounded p-2"
          value={form.description}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="latitude">Latitude</Label>
        <Input
          id="latitude"
          name="latitude"
          value={form.latitude}
          onChange={handleChange}
          autoComplete="off"
          type="number"
          step="any"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="longitude">Longitude</Label>
        <Input
          id="longitude"
          name="longitude"
          value={form.longitude}
          onChange={handleChange}
          autoComplete="off"
          type="number"
          step="any"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="plainData">Sensitive Data</Label>
        <textarea
          id="plainData"
          name="plainData"
          rows={4}
          className="w-full border rounded p-2"
          value={form.plainData}
          onChange={handleChange}
        />
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default UploadData;
