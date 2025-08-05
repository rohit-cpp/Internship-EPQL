import mongoose, { Document } from "mongoose";

export interface IQuery {
  user: mongoose.Types.ObjectId;
  queryParams: {
    location: string;
    radius: number;
  };
  encryptedResults: string[];
}

export interface IQueryDocument extends IQuery, Document {
  createdAt: Date;
  updatedAt: Date;
}

const querySchema = new mongoose.Schema<IQueryDocument>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  queryParams: {
    location: { type: String, required: true },
    radius: { type: Number, required: true },
  },
  encryptedResults: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

export const Query = mongoose.model("Query", querySchema);
