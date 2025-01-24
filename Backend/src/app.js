import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import multer from "multer";

const app = express();

// Router calling
import userRouter from "./routes/user.route.js";
import infoRouter from "./routes/info.route.js";

app.use(cors({
    origin: process.env.CORS_ORIGIN, // help in building cross origin between frontend and backend
    credentials: true
}));

app.use(bodyParser.json({ limit: "5mb" })); // Increase the limit for JSON payloads
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" })); // Increase the limit for URL-encoded payloads

app.use(express.json({ limit: "5mb" })); // Increase the limit for JSON payloads
app.use(express.urlencoded({ extended: true, limit: "5mb" })); // Increase the limit for URL-encoded payloads
app.use(express.static("public")); // Used to serve static files
app.use(cookieParser()); // Used to parse the incoming cookies

// Set up multer for handling multipart/form-data
const upload = multer({ dest: 'uploads/' });

app.use("/api/v1/users", userRouter);
app.use("/api/v1/info", infoRouter);
app.use("/",userRouter)

export { app };