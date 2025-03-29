import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const sequelize = new Sequelize(
    process.env.PGDATABASE, // Database name
    process.env.PGUSER, // Username
    process.env.PGPASSWORD, // Password
    {
        host: process.env.PGHOST, // Host
        port: process.env.PGPORT, // Port
        dialect: "postgres", // Tell Sequelize to use PostgreSQL
        logging: false, // Set to true to see SQL queries in the console
    }
);

// Test the connection

try {
    await sequelize.authenticate();
    console.log("Connection to PostgreSQL has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

export default sequelize;
