import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
    {
        fullname: {
            type: String,
            required: [true, "fullname is required"]
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: [true, "email must be unique"]
        },
        photo: String,
        role: {
            enum: ["user", "admin", "moderator"],
            default: "user",
            type: String
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [6, 'Password must be at least 6 characters'],
            select: false
        }
    },
    {timestamps: true}
)

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    next();
})

export const User = mongoose.model("Users", userSchema)