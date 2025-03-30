import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import AppError from "./utils/AppError.js";
import globalErrorHandler from "./controller/errorController.js";

import authRoutes from "./routes/v1/authRoutes.js";
import seatRoutes from "./routes/v1/seatRoutes.js";

dotenv.config({ path: ".env" });

const app = express();

const corsOptions = {
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to the API",
    });
});

// adding custom route as middleware
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/seat", seatRoutes);

// Handling unhandled routes
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

export default app;
