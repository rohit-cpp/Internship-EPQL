import mongoose, { Document } from "mongoose";

export interface IPOI {
  name: string;
  encryptedLocation: string;
  metadata?: string;
  uploadedBy: mongoose.Types.ObjectId;
}

export interface IPOIDocument extends IPOI, Document {
  createdAt: Date;
  updatedAt: Date;
}

const poiSchema = new mongoose.Schema<IPOIDocument>({
  name: {
    type: String,
    required: true,
  },
  encryptedLocation: {
    type: String,
    required: true,
  },
  metadata: {
    type: String,
    default: "",
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

export const POI = mongoose.model("POI", poiSchema);
