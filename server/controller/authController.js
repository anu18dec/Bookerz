import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import AppError from "../utils/AppError.js";

const register = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return next(new AppError("Username, email and password are required.", 400));
    }

    try {
        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        //Create a new user and save to DB
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "User ceated successfully",
            data: newUser,
        });
    } catch (err) {
        return next(err);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("Email or password is required.", 400));
    }

    try {
        // Find and check if user exist
        const user = await User.findOne({
            where: { email: email },
            attributes: ["id", "username", "email", "password"],
        });

        if (!user) {
            return next(new AppError("Invalid credentials!", 401));
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return next(new AppError("Invalid credentials!", 401));
        }

        // Generate cookie token and send to user

        const cookieOption = {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
        };

        if (process.env.NODE_ENV === "production") {
            cookieOption.secure = true;
            cookieOption.sameSite = "None";
        }

        const token = jwt.sign(
            {
                id: user.id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: 1000 * 60 * 60 * 24 * 7,
            }
        );

        const userInfo = {
            id: user.id,
            email: user.email,
            username: user.username,
        };

        res.cookie("token", token, cookieOption).status(200).json({
            message: "Login successful",
            data: userInfo,
        });
    } catch (err) {
        return next(err);
    }
};

const verifyToken = async (req, res, next) => {
    try {
        let token;

        if (!req.cookies.token) {
            return next(new AppError("You are not logged in! Please log in to get access.", 401));
        }

        token = req.cookies.token;

        const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        const userStillExist = await User.findByPk(decodedToken.id);

        if (!userStillExist) {
            return next(new AppError("The user belonging to this token does no longer exist.", 401));
        }

        req.user = userStillExist;

        return next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return next(new AppError("Token expired. Please log in again.", 401));
        }
        return next(new AppError("Invalid token.", 401));
    }
};

const authController = {
    register: register,
    login: login,
    verifyToken: verifyToken,
};

export default authController;
