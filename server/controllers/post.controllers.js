import { Post } from "../models/post.model.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

const formatMongoQuery = (query) => {
    const mongoQuery = {};

    for (const [key, value] of Object.entries(query)) {
        const match = key.match(/^(.+)\[(gte|gt|lte|lt)\]$/);
        if (match) {
            const [, field, op] = match;
            mongoQuery[field] = {
                ...mongoQuery[field],
                [`$${op}`]: isNaN(value) ? value : Number(value)
            };
        } else {
            mongoQuery[key] = isNaN(value) ? value : Number(value);
        }
    }

    return mongoQuery;
}

export const getPosts = async (req, res) => {
    const { sort, tags, ...filters } = req.query;
    const mongoQuery = formatMongoQuery(filters);

    if (tags) {
        mongoQuery.tags = {$all: tags.split(",")}
    }
    
    const posts = await Post.find(mongoQuery).sort(sort);

    res.status(200).json(posts);  
};

export const getPost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    if(!post){
        return next(new AppError("Post not found", 404))
    }

    return res.status(200).json(post)
})

export const createPost = catchAsync(async (req, res) => {
    const {title, content, tags} = req.body;

    const newPost = await Post.create({
        title,
        content,
        tags
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

export const updatePost = catchAsync(async (req, res, next) => {
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