import app from "./app.js";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import User from "./models/userModel.js";
import Seat from "./models/seatModel.js";
import Booking from "./models/bookingModel.js";
import Associations from "./config/associations.js";

dotenv.config({ path: ".env" });

// Start the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

const startDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected.");

        await sequelize.sync({ force: false }); // Creates tables if they don't exist
        console.log("Tables synced successfully.");
    } catch (error) {
        console.error("Database error:", error);
    }
};

startDB();

process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection! 💥 Shutting down....");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
