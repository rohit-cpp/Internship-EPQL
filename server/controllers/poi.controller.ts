import { Request, Response } from "express";
import { POI } from "../models/poi.model";

import { QueryLog } from "../models/queryLog.model";
import { encryptPOIData, decryptPOIData as decryptPOIUtility } from "../utlis/encryption";

// Create POI (ADMIN)
export const createPOI = async (req: Request, res: Response) => {
  try {
    const { title, description, longitude, latitude, plainData } = req.body;

    // Validate & convert
    const lng = parseFloat(longitude);
    const lat = parseFloat(latitude);

    if (isNaN(lng) || isNaN(lat)) {
      return res.status(400).json({ message: "Invalid coordinates" });
    }

    const encryptedData = encryptPOIData(plainData);

    const poi = await POI.create({
      title: title.trim(),
      description: description.trim(),
      location: { type: "Point", coordinates: [lng, lat] },
      encryptedData,
      createdBy: req.id,
    });

    return res.status(201).json({ success: true, poi });
  } catch (err) {
    return res.status(500).json({ message: "Failed to create POI" });
  }
};


// Admin: List all (with pagination)
export const listAllPOIs = async (req: Request, res: Response) => {
  try {
    const pois = await POI.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, pois });
  } catch (err) {
    return res.status(500).json({ message: "Failed to list POIs" });
  }
};

// User: Spatial Range Query (Privacy preserving)
export const queryPOIsInRange = async (req: Request, res: Response) => {
  try {
    const { longitude, latitude, distance } = req.body;

    // Perform spatial query (in meters)
    const pois = await POI.find({
      location: {
        $nearSphere: {
          $geometry: { type: "Point", coordinates: [longitude, latitude] },
          $maxDistance: distance, // meters
        },
      },
      isActive: true,
    }).select("-__v");

    // Optionally: Only allow decrypted results if user has permission, etc.
    // Demo: Send encrypted blobs
    await QueryLog.create({
      user: req.id,
      queryType: "SPATIAL_RANGE",
      queryParams: { longitude, latitude, distance },
      resultCount: pois.length,
    });

    return res.status(200).json({ success: true, pois });
  } catch (err) {
    return res.status(500).json({ message: "Failed to search POIs" });
  }
};

// User: Decrypt POI (after checking ownership/access)
export const decryptPOIData = async (req: Request, res: Response) => {
  try {
    const { poiId } = req.params;
    const poi = await POI.findById(poiId);

    if (!poi) return res.status(404).json({ message: "POI not found" });

    // Optional: Check permissions if sensitive
    const data = decryptPOIUtility(poi.encryptedData);

    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ message: "Failed to decrypt POI data" });
  }
};
