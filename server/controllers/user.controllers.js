import { User } from "../models/user.model.js";

export const getUsers = async (req, res) => {
    const users = await User.find();

    return res.status(200).json(users)
};

export const getUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return res.status(404).json({
            status: "fail",
            message: "User not found"
        })
    }

    return res.status(200).json(user)
}

export const createUser = async (req, res) => {
    const {user, email, age} = req.body;

    const newUser = await User.create({
        user, 
        email,
        age
    });

    return res.status(201).send(newUser)
}

export const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user){
        return res.status(404).json({
            status: "fail",
            message: "User not found"
        })
    };

    res.status(204).send();
}

export const updateUser = async (req, res) => {
    const { user, email, age } = req.body;
    const { id } = req.params;

    const foundUser = await User.findById(id);

    if (!foundUser) {
        return res.status(404).json({
            status: "fail",
            message: "User not found"
        })
    }

    if (user) foundUser.user = user
    if (email) foundUser.email = email
    if (age) foundUser.age = age

    await foundUser.save();
    res.json(foundUser)
}