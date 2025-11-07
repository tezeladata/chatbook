import express from "express";
import { login, signUp, verifyEmail } from "../controllers/auth.controllers.js";

export const authRouter = express.Router();

authRouter.post("/signup", signUp)
authRouter.post("/login", login)
authRouter.get("/verify/:code", verifyEmail)