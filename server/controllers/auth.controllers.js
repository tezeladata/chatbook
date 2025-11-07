import { catchAsync } from "../utils/catchAsync.js"
import { User } from "../models/user.model.js"
import { AppError } from "../utils/appError.js";
import jwt from "jsonwebtoken";
import {sendEmail} from "../utils/email.js"

const signToken = user => {
    return jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    })
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user);

    res.cookie('lt', token, {
        maxAge: process.env.COOKIE_EXPIRES*24*60*60*1000,
        secure: process.env.NODE_ENV === "development" ? false : true,
        httpOnly: true,
        sameSite: "Lax"
    })

    res.status(statusCode).json({
        data: {
            user
        }
    })
}

// Signup
export const signUp = catchAsync(async (req, res, next) => {
    const {email, password, fullname} = req.body;

    const newUser = await User.create({
        email,
        password,
        fullname
    });

    const code = newUser.createVerificationCode();
    await newUser.save({validateBeforeSave: false});

    const url = `${req.protocol}://${req.get("host")}/api/auth/verify/${code}`

    sendEmail(email, "Welcome to chatbook", url);

    res.status(201).json({status: "success", message: "user created, please verify your email"})
})

export const login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    const user = await User.findOne({ email }).select("+password")
    if (!user) return next(new AppError("Incorrect email or password", 400));

    const isCorrect = await user.comparePassword(password, user.password);
    if (!isCorrect) return next(new AppError("Incorrect email or password", 400));

    user.password = undefined

    createSendToken(user, 200, res);
});

export const verifyEmail = catchAsync(async (req, res, next) => {
    const {code} = req.params;

    const user = await User.findOne({verificationCode: code});

    if (!user) {
        return next(new AppError("verification code is invalid!", 400))
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save({validateBeforeSave: false});

    res.status(200).send("<h1>User is verified</h1>")
})