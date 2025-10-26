import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    // userId: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Users"
    // },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: "Posts"
    },
    text: {
        type: String,
        required: [true, "Comments must have text"],
        minLength: 10
    }
})

const comment = mongoose.model("Comments", commentSchema)