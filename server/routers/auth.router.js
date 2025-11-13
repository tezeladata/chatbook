import express from "express";
import { login, signUp, verifyEmail, autoLogin, logOut } from "../controllers/auth.controllers.js";
import {protect} from "../middlewares/auth.middleware.js"

export const authRouter = express.Router();

authRouter.post("/signup", signUp)
authRouter.post("/login", login)
authRouter.post("/auto-login", protect, autoLogin)
authRouter.post("/logout", protect, logOut)
authRouter.get("/verify/:code", verifyEmail)