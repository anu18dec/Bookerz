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

export default sequelize;
