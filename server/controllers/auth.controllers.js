import { catchAsync } from "../utils/catchAsync.js"
import { User } from "../models/user.model.js"
import { AppError } from "../utils/appError.js";

// Signup
export const signUp = catchAsync(async (req, res, next) => {
    const {email, password, fullname} = req.body;

    const newUser = await User.create({
        email,
        password,
        fullname
    });

    res.status(201).json({status: "success", message: "user created"})
})

export const login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    const user = await User.findOne({ email }).select("+password")
    if (!user) return next(new AppError("Incorrect email or password", 400));

    const isCorrect = await user.comparePassword(password, user.password);
    if (!isCorrect) return next(new AppError("Incorrect email or password", 400));

    user.password = undefined

    res.status(200).json({
        data: {
            user
        }
    })
})