import express from "express";
import {
  createPOI,
  listAllPOIs,
  queryPOIsInRange,
  decryptPOIData as decryptPOI,
} from "../controllers/poi.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";


const poiRouter = express.Router();

// Admin routes
poiRouter.route("/admin/poi")
  .post(isAuthenticated, createPOI);

poiRouter.route("/admin/pois")
  .get(isAuthenticated, listAllPOIs);

// User routes
poiRouter.route("/user/pois/search")
  .post(isAuthenticated, queryPOIsInRange);

poiRouter.route("/user/poi/:poiId/decrypt")
  .get(isAuthenticated, decryptPOI);


export default poiRouter;
