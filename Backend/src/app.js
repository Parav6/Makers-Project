import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine","ejs");
app.set("views",path.join(__dirname, '../templates/views'));



app.use(cors({
    origin: process.env.CORS_ORIGIN, // help in building cross origin between frontend and backend
    credentials: true
}));

app.use(bodyParser.json({ limit: "5mb" })); // Increase the limit for JSON payloads
app.use(bodyParser.urlencoded({ extended: true , limit : "50mb"})); // Increase the limit for URL-encoded payloads

app.use(express.json({ limit: "5mb" })); // Increase the limit for JSON payloads
app.use(express.urlencoded({ extended: true })); // Increase the limit for URL-encoded payloads
app.use(express.static("public")); // Used to serve static files

// Router calling
import userRouter from "./routes/user.route.js";
import infoRouter from "./routes/info.route.js";



app.use("/api/v1/users", userRouter);
app.use("/api/v1/info", infoRouter);


export { app };


