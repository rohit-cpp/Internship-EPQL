import express from "express";
import {
  createPOI,
  listAllPOIs,
  queryPOIsInRange,
  decryptPOIData as decryptPOI,
} from "../controllers/poi.controller";
import { isAutheticated } from "../middlewares/isAuthenticated";

const router = express.Router();

// Admin routes
router.route("/admin/poi")
  .post(isAutheticated, createPOI);

router.route("/admin/pois")
  .get(isAutheticated, listAllPOIs);

// User routes
router.route("/user/pois/search")
  .post(isAutheticated, queryPOIsInRange);

router.route("/user/poi/:poiId/decrypt")
  .get(isAutheticated, decryptPOI);



export default router;
