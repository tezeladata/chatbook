import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        age: {
            type: Number,
            required: true
        }
    }
)

export const User = mongoose.model("Users", userSchema)