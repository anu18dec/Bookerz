import express from "express";

import AppError from "./utils/AppError.js";
import globalErrorHandler from "./controller/errorController.js";
import sequelize from "./config/database.js";

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to the API",
    });
});

// adding custom route as middleware
// app.use("/api/v1/tours", tourRouter);
// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/reviews", reviewRouter);

// Handling unhandled routes
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

export default app;
