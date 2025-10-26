import { catchAsync } from "../utils/catchAsync.js"
import { User } from "../models/user.model.js"

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