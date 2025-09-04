import express from "express";

// model
import { Post } from "../models/post.model.js";

// controllers
import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.controllers.js";

export const postRouter = express.Router();

// Get all posts
postRouter.get("/", getPosts)

// Get post by ID
postRouter.get("/:id", getPost)

// To create post
postRouter.post("/", createPost)

// Delete post by ID
postRouter.delete("/:id", deletePost)

// Update post by ID
postRouter.patch("/:id", updatePost)