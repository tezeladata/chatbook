import { Post } from "../models/post.model.js";

export const getPosts = async (req, res) => {
    const post = await Post.find();

    res.status(200).json(post)
}

export const getPost = async (req, res) => {
    const post = await Post.findById(req.params.id);

    if(!post){
        return res.status(404).json({
            status: "fail",
            message: "Post not found"
        })
    }

    return res.status(200).json(post)
}

export const createPost = async (req, res) => {
    const {title, content} = req.body;

    const newPost = await Post.create({
        title,
        content,
    });

    res.status(201).json(newPost)
}

export const deletePost = async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post){
        return res.status(404).json({
            status: "fail",
            message: "Post not found"
        })
    };

    res.status(204).send();
}

export const updatePost = async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
        return res.status(404).json({
            status: "fail",
            message: "Post not found"
        })
    }

    if(title) post.title = title
    if (content) post.content = content

    await post.save();
    res.json(post)
}