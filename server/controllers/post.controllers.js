import { Post } from "../models/post.model.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getPosts = catchAsync(async (req, res) => {
    const post = await Post.find();

    res.status(200).json(post)
})

export const getPost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    if(!post){
        return next(new AppError("Post not found", 404))
    }

    return res.status(200).json(post)
})

export const createPost = catchAsync(async (req, res) => {
    const {title, content} = req.body;

    const newPost = await Post.create({
        title,
        content,
    });

    res.status(201).json(newPost)
})

export const deletePost = catchAsync(async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post){
        return next(new AppError("Post not found", 404))
    };

    res.status(204).send();
})

export const updatePost = catchAsync(async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
        return next(new AppError("Post not found", 404))
    }

    if(title) post.title = title
    if (content) post.content = content

    await post.save();
    res.json(post)
})