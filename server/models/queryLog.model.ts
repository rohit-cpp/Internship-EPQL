import mongoose, { Document } from "mongoose";

export interface IQueryLog {
  user: mongoose.Schema.Types.ObjectId;
  queryType: "SPATIAL_RANGE" | "LOCATION" | string;
  queryParams: any;
  resultCount: number;
  createdAt: Date;
}

export interface IQueryLogDoc extends IQueryLog, Document {}

const queryLogSchema = new mongoose.Schema<IQueryLogDoc>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  queryType: { type: String, required: true },
  queryParams: { type: mongoose.Schema.Types.Mixed, required: true },
  resultCount: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const QueryLog = mongoose.model("QueryLog", queryLogSchema);
