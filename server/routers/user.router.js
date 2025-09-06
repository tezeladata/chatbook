import express from "express";

// controllers
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/user.controllers.js";

export const userRouter = express.Router();

// Get all users
userRouter.get("/", getUsers)

// Get single user
userRouter.get("/:id", getUser)

// Post user
userRouter.post("/", createUser)

// Delete user
userRouter.delete("/:id", deleteUser)

// Update user
userRouter.patch("/:id", updateUser)