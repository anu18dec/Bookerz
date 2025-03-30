import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Seat = sequelize.define(
    "Seat",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        row_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        seat_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "seats",
        unique: ["row_number", "seat_number"],
    }
);

export default Seat;
