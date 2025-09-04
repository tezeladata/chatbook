import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 100,
            unique: true
        },
        content: {
            type: String,
            required: true
        },
        likesCount: {
            type: Number,
            default: 0
        }
    }
)

export const Post = mongoose.model("Posts", postSchema)