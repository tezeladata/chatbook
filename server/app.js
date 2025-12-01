import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import { postRouter } from "./routers/post.router.js";
import { globalErrorHandler } from "./controllers/error.controller.js";
import { authRouter } from "./routers/auth.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["\"https://chatbook-xlr2.onrender.com\""],
  credentials: true
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "dist")));

if (process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

// Middlewares
app.use(cookieParser())
app.use(express.json());
// Using routers
app.use("/api/posts", postRouter)
app.use("/api/auth", authRouter)

// Global error handling middleware
app.use(globalErrorHandler)

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Connected to mongoDB")
        app.listen(process.env.PORT, () => console.log(`Server started on port: ${process.env.PORT}`))
    })
    .catch(err => {
        console.error("Database connection error");
        process.exit(1)
    })