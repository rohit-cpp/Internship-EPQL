import express from "express";
import {
  createQueryLog,
  getAllQueryLogs,
  getUserQueryLogs,
  deleteQueryLog,
} from "../controllers/queryLog.controller";
import { isAutheticated } from "../middlewares/isAuthenticated";


const router = express.Router();

// Usually creation of logs is internal, exposed here optionally
// router.route("/")
//   .post(isAutheticated, createQueryLog);

// // Admin: get all logs
// router.route("/all")
//   .get(isAutheticated, getAllQueryLogs);

// // User: get own logs
// router.route("/me")
//   .get(isAutheticated, getUserQueryLogs);

// // Admin: delete a log
// router.route("/:logId")
//   .delete(isAutheticated, deleteQueryLog);

router.route("/")
  .post( createQueryLog);

// Admin: get all logs
router.route("/all")
  .get( getAllQueryLogs);

// User: get own logs
router.route("/me")
  .get( getUserQueryLogs);

// Admin: delete a log
router.route("/:logId")
  .delete( deleteQueryLog);

export default router;
