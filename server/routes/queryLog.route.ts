import express from "express";
import {
  createQueryLog,
  getAllQueryLogs,
  getUserQueryLogs,
  deleteQueryLog,
} from "../controllers/queryLog.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";



const queryRouter = express.Router();

// Usually creation of logs is internal, exposed here optionally
queryRouter.route("/")
  .post(isAuthenticated, createQueryLog);

// Admin: get all logs
queryRouter.route("/all")
  .get(isAuthenticated, getAllQueryLogs);

// User: get own logs
queryRouter.route("/me")
  .get(isAuthenticated, getUserQueryLogs);

// Admin: delete a log
queryRouter.route("/:logId")
  .delete(isAuthenticated, deleteQueryLog);


export default queryRouter;
