import { User } from "../models/user.model.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getUsers = catchAsync(async (req, res) => {
    const users = await User.find();

    return res.status(200).json(users)
})

export const getUser = catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new AppError("User not found", 404))
    }

    return res.status(200).json(user)
})

export const createUser = catchAsync(async (req, res) => {
    const {user, email, age} = req.body;

    const newUser = await User.create({
        user, 
        email,
        age
    });

    return res.status(201).send(newUser)
})

export const deleteUser = catchAsync(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user){
        return next(new AppError("User not found", 404))
    };

    res.status(204).send();
})

export const updateUser = catchAsync(async (req, res) => {
    const { user, email, age } = req.body;
    const { id } = req.params;

    const foundUser = await User.findById(id);

    if (!foundUser) {
        return next(new AppError("User not found", 404))
    }

    if (user) foundUser.user = user
    if (email) foundUser.email = email
    if (age) foundUser.age = age

    await foundUser.save();
    res.json(foundUser)
})