import { User } from "../models/user.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import jwt from "jsonwebtoken"

const signToken = (id, role) => {
    // payload - stored data
    // secret - secret key for encriptation
    // options - additional info for management
    return jwt.sign({id, role}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES});
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id, user.role);
    const cookiesOption = {
        maxAge: new Date(Date.now() + process.env.COOKIE_EXPIRES*24*60*60*1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "development" ? false : true
    }

    res.cookie("token", token, cookiesOption)
    user.password=undefined;
    res.status(statusCode).json({
        status: "success",
        data: {user}
    })
}

export const signUp = catchAsync(async (req, res, next) => {
    const {fullname, email, password} = req.body;
    const newUser = await User.create({fullname, email, password});

    createSendToken(newUser, 201, res)
});