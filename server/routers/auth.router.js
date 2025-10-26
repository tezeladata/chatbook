import express from "express";
import { signUp } from "../controllers/auth.controllers.js";

export const authRouter = express.Router();

authRouter.post("/signup", signUp)