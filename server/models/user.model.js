import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

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
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        verificationCode: String,
        // verificationCodeExpires: Date
    },
    {timestamps: true}
)

// password hashing before creation of password
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    next();
})

// password checking
userSchema.methods.comparePassword = async function (candidatePassword, password) {
    return await bcrypt.compare(candidatePassword, password);
};

// creating verification code
userSchema.methods.createVerificationCode = function () {
    const code = crypto.randomBytes(12).toString("hex");
    this.verificationCode = code;
    return code
}

export const User = mongoose.model("Users", userSchema)