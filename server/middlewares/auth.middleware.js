import {AppError} from "../utils/appError.js"
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js"

export const protect = async (req, res, next) => {
    try {
        // 1. Check if token exists in cookies
        const token = req.cookies?.lt;

        if (!token) {
            return next(new AppError("თქვენ არ ხართ ავტორიზირებული!", 401));
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        if (!decoded) {
            return next(new AppError("არასწორი ტოკენი!", 401));
        }

        // 3. Find user by ID and exclude sensitive fields
        const user = await User.findById(decoded.id);

        if (!user) {
            return next(new AppError("მომხმარებელი არ არსებობს!", 404));
        }

        // 4. Attach user to request object
        req.user = user;

        // 5. Move to next middleware or controller
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);

        // Handle token expiration separately
        if (error.name === "TokenExpiredError") {
            return next(new AppError("თქვენი ავტორიზაციის დრო ამოიწურა, გთხოთ გაიაროთ თავიდან!", 401));
        }

        return next(new AppError("თქვენ არ ხართ ავტორიზირებული!", 401));
    }
};