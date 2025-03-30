import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./userModel.js";
import Seat from "./seatModel.js";

const Booking = sequelize.define(
    "Booking",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        booking_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        seatId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Seat,
                key: "id",
            },
            onDelete: "CASCADE",
        },
    },
    {
        tableName: "bookings",
    }
);

export default Booking;
