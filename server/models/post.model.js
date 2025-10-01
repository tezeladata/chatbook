import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'title is required'],
            minLength: [3, 'title must be at least 3 characters'],
            maxLength: [20, 'title must be at most 20 characters'],
            unique: [true, 'title must be unique']
        },
        content: {
            type: String,
            required: true
        },
        likesCount: {
            type: Number,
            default: 0
        },
        comments: [
            {
                content: {
                    type: String,
                    required: [true, "comment content is required"]
                },
                author: {
                    type: String,
                    required: [true, "author is required"]
                }
            }
        ]
    }
)

export const Post = mongoose.model("Posts", postSchema)