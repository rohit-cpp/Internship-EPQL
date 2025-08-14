import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import queryRouter from "./routes/queryLog.route";
import poiRouter from "./routes/poi.route";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route";
dotenv.config();
const app = express();

const PORT = process.env.PORT;

//default middleware for any mern project
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({
    extended: true, limit: "10mb"
}));
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
    process.env.FRONTEND_URL, // local dev
  "https://frontend-epql.vercel.app", // production domain
  /\.vercel\.app$/, // any Vercel preview deployment
];
const corsOptions = {
  origin: (origin: string| undefined, callback:Function) => {
    // Allow requests with no origin (Postman, mobile apps)
    if (!origin) return callback(null, true);

    if (
      allowedOrigins.includes(origin) ||
      allowedOrigins.some((o) => o instanceof RegExp && o.test(origin))
    ) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handle preflight requests


// apis
app.use("/api/v1/user", userRouter);
app.use("/api/v1/poi", poiRouter);
app.use("/api/v1/query", queryRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is listing at port ${PORT}`);
    
});