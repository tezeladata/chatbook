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
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "none"
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

    const url = `${req.protocol}://${req.get("host")}/api/auth/verify/${code}`;

    const html = `
    <!DOCTYPE html>
    <html lang="en" style="margin:0; padding:0;">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verify Your Email</title>
        <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            background-color: #f5f6fa;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0,0,0,0.08);
            text-align: center;
        }
        .header {
            background-color: #4f46e5;
            color: #ffffff;
            padding: 30px 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 30px 40px;
            color: #333333;
        }
        .content h2 {
            margin-top: 0;
            color: #111827;
        }
        .content p {
            line-height: 1.6;
            font-size: 15px;
            margin: 10px 0;
        }
        .button {
            display: inline-block;
            margin-top: 25px;
            padding: 12px 30px;
            background-color: #4f46e5;
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            font-size: 16px;
        }
        .button:hover {
            background-color: #4338ca;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 13px;
            color: #6b7280;
        }
        </style>
    </head>
    <body>
        <div class="container">
        <div class="header">
            <h1>Welcome to ChatBook 🎉</h1>
        </div>
        <div class="content">
            <h2>Hello ${fullname},</h2>
            <p>Thank you for signing up for <strong>ChatBook</strong>!</p>
            <p>Please verify your email address to activate your account.</p>
            <a href="${url}" class="button">Verify My Email</a>
            <p>If you didn’t create a ChatBook account, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>© ${new Date().getFullYear()} ChatBook. All rights reserved.</p>
        </div>
        </div>
    </body>
    </html>
    `;

    sendEmail(email, "Welcome to chatbook", html);

    res.status(201).json({status: "success", message: "user created, please verify your email"})
})

export const login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    const user = await User.findOne({ email }).select("+password")
    if (!user) return next(new AppError("Incorrect email or password", 400));

    if (!user.isVerified){
        return next(new AppError("user is not verified! please verify your email", 401))
    }

    const isCorrect = await user.comparePassword(password, user.password);
    if (!isCorrect) return next(new AppError("Incorrect email or password", 400));

    user.password = undefined

    createSendToken(user, 200, res);
});

export const autoLogin = catchAsync(async (req, res, next) => {
    const {user} = req;

    return res.status(200).json(user);
})

export const logOut = (req, res) => {
    res.clearCookie('lt', {
        httpOnly: true,
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "dev" ? false: true
    })

    return res.status(200).json({message: "User logged out successfully"})
}

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