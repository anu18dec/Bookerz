import AppError from "../utils/AppError.js";

const handleJWTError = () => {
    return new AppError("Invalid token. Please log in again!", 401);
};

const handleJWTExpiredError = () => {
    return new AppError("Your token has expired. Please log in again!", 401);
};

const sendErrDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        // Prgramming or other error: don't leak error details
        // 1) Log Error
        // console.error("ERROR 💥 ", err);

        // 2) Send generic message
        res.status(500).json({
            status: "error",
            message: "Something went very wrong!",
        });
    }
};

// passing 4 argument function in app.use() will make it as global error middleware
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "development") {
        sendErrDev(err, res);
    } else if (process.env.NODE_ENV === "production") {
        let error = { ...err };

        if (err.name === "JsonWebTokenError") {
            error = handleJWTError();
        }

        if (err.name === "TokenExpiredError") {
            error = handleJWTExpiredError();
        }

        sendErrProd(error, res);
    }
};

export default globalErrorHandler;
