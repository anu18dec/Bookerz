import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

// Start the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection! 💥 Shutting down....");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
