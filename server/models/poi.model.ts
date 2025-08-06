import mongoose, { Document } from "mongoose";

export interface IPOI {
  title: string;
  description: string;
  location: {
    type: string; // GeoJSON
    coordinates: [number, number]; // [longitude, latitude]
  };
  encryptedData: string; // For privacy protection (e.g. encrypted blob)
  createdBy: mongoose.Schema.Types.ObjectId;
  isActive: boolean;
}

export interface IPOIDocument extends IPOI, Document {}

const poiSchema = new mongoose.Schema<IPOIDocument>(
  {
    title: { type: String, required: true },
    description: String,
    location: {
      type: { type: String, enum: ['Point'], required: true, default: "Point" },
      coordinates: { type: [Number], required: true }, // [lng, lat]
    },
    encryptedData: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

poiSchema.index({ location: "2dsphere" });
export const POI = mongoose.model("POI", poiSchema);
