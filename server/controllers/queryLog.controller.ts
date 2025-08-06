import { Request, Response } from "express";
import { QueryLog } from "../models/queryLog.model";

// Create a new query log entry (usually called internally, but exposed if needed)
export const createQueryLog = async (req: Request, res: Response) => {
  try {
    const { queryType, queryParams, resultCount } = req.body;
    const user = req.id; // assuming req.id is set via auth middleware

    if (!queryType || !queryParams || resultCount === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: queryType, queryParams, resultCount",
      });
    }

    const log = await QueryLog.create({
      user,
      queryType,
      queryParams,
      resultCount,
    });

    return res.status(201).json({ success: true, log });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create query log" });
  }
};

// Get all query logs (for admin)
export const getAllQueryLogs = async (req: Request, res: Response) => {
  try {
    // Add pagination params if needed
    const logs = await QueryLog.find()
      .populate("user", "fullname email")
      .sort({ createdAt: -1 })
      .limit(100); // limit for performance, add pagination later

    return res.status(200).json({ success: true, logs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch query logs" });
  }
};

// Get query logs for current user
export const getUserQueryLogs = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const logs = await QueryLog.find({ user: userId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, logs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch user query logs" });
  }
};

// Delete a query log by ID (admin only)
export const deleteQueryLog = async (req: Request, res: Response) => {
  try {
    const { logId } = req.params;
    const log = await QueryLog.findByIdAndDelete(logId);
    if (!log) {
      return res.status(404).json({ success: false, message: "Log not found" });
    }
    return res.status(200).json({ success: true, message: "Log deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete query log" });
  }
};
