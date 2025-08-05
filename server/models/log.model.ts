import mongoose, { Document } from "mongoose";

export interface ILog {
  user: mongoose.Types.ObjectId;
  action: string;
  details?: string;
  ipAddress?: string;
}

export interface ILogDocument extends ILog, Document {
  createdAt: Date;
  updatedAt: Date;
}

const logSchema = new mongoose.Schema<ILogDocument>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    default: "",
  },
  ipAddress: {
    type: String,
    default: "",
  },
}, { timestamps: true });

export const Log = mongoose.model("Log", logSchema);
