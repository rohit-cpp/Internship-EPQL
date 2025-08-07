import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const UploadData = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    latitude: "",
    longitude: "",
    plainData: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios.post("/api/admin/poi", {
      ...form,
      latitude: parseFloat(form.latitude),
      longitude: parseFloat(form.longitude),
    });
    alert("POI uploaded successfully!");
  };

  return (
    <div className="max-w-xl p-6 space-y-4">
      <h2 className="text-xl font-semibold">Upload POI</h2>
      <div className="space-y-2">
        <Label>Title</Label>
        <Input name="title" value={form.title} onChange={handleChange} />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label>Latitude</Label>
        <Input name="latitude" value={form.latitude} onChange={handleChange} />
      </div>
      <div className="space-y-2">
        <Label>Longitude</Label>
        <Input
          name="longitude"
          value={form.longitude}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label>Sensitive Data</Label>
        <textarea
          name="plainData"
          value={form.plainData}
          onChange={handleChange}
        />
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default UploadData;
