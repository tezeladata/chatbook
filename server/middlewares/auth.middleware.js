import { AppError } from "../utils/appError.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js"

export const allowedTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)){
            return next(new AppError("You do not have permission to this", 401))
        }

        next()
    }
}

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.lt;

        // check if token exists
        if (!token) {
            return next(new AppError("user is not logged in", 401))
        }

        // decryption
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return next(new AppError("token is invalid", 400))
        }

        // find user using ID from decoded object;
        const user = await User.findById(decoded.id)
        if (!user) {
            return next(new AppError("user cannot be found", 404))
        }

        // add user object to req object
        req.user = user;
        next()
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return next(new AppError("token expired"))
        }

        return next(new AppError("you are not authorised", 401))
    }
}