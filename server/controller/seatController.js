import Seat from "../models/seatModel.js";
import Booking from "../models/bookingModel.js";
import sequelize from "../config/database.js";
import AppError from "../utils/AppError.js";
import e from "express";

const getAllSeats = async (req, res, next) => {
    try {
        const seats = await Seat.findAll({
            attributes: ["id", "row_number", "seat_number"],
            include: [
                {
                    model: Booking,
                    attributes: ["seatId"],
                    required: false,
                },
            ],
        });

        res.status(200).json({
            status: "success",
            data: {
                seats,
            },
        });
    } catch (error) {
        return next(error);
    }
};

const bookSeats = async (req, res, next) => {
    const seatsToBook = req.body.seatsToBook;

    if (!seatsToBook || seatsToBook === 0) {
        return next(new AppError("Please provide seats to book", 400));
    }

    if (seatsToBook > 7) {
        return next(new AppError("You can book a maximum of 7 seats at a time", 400));
    }

    try {
        let bookingStatus = false;

        const availableSeats = await Seat.findAll({
            attributes: ["id", "row_number", "seat_number"],
            include: [
                {
                    model: Booking,
                    attributes: ["seatId"],
                    required: false,
                },
            ],
            where: {
                "$Booking.id$": null,
            },
            order: [
                ["row_number", "ASC"],
                ["seat_number", "ASC"],
            ],
        });

        if (availableSeats.length < seatsToBook) {
            return next(new AppError("Not enough seats available.", 400));
        }

        // Book in single row
        for (let row = 1; row <= 12; row++) {
            const rowSeats = availableSeats.filter((seat) => {
                return seat.row_number === row;
            });

            if (rowSeats.length >= seatsToBook) {
                const bookedSeats = rowSeats.slice(0, seatsToBook);
                for (let i = 0; i < bookedSeats.length; i++) {
                    await Booking.create({
                        seatId: bookedSeats[i].id,
                    });
                }
                bookingStatus = true;
                break;
            }
        }

        // Book in multiple rows for nearby seats
        if (!bookingStatus) {
            const availSeatsPerRow = [];

            for (let row = 1; row <= 12; row++) {
                const rowSeats = availableSeats.filter((seat) => {
                    return seat.row_number === row;
                });
                availSeatsPerRow.push(rowSeats.length);
            }

            // We can determine nearby seats by using vaiable length sliding window
            let pointerj = 0;
            const rowRangeToBook = {
                start: -1,
                end: -1,
            };
            let seatsSumTill = 0;
            let minRowsTill = 99999;

            for (let poniteri = 0; poniteri < availSeatsPerRow.length; poniteri++) {
                seatsSumTill += availSeatsPerRow[poniteri];

                while (seatsSumTill >= seatsToBook) {
                    if (poniteri - pointerj + 1 < minRowsTill) {
                        minRowsTill = poniteri - pointerj + 1;

                        rowRangeToBook.start = pointerj + 1;
                        rowRangeToBook.end = poniteri + 1;
                    }

                    seatsSumTill -= availSeatsPerRow[pointerj];
                    pointerj++;
                }
            }

            if (rowRangeToBook.start === -1 || rowRangeToBook.end === -1) {
                return next(new AppError("Not enough seats available.", 400));
            } else {
                let totSelSeats = [];
                for (let counter = rowRangeToBook.start; counter <= rowRangeToBook.end; counter++) {
                    totSelSeats = totSelSeats.concat(
                        availableSeats.filter((seat) => {
                            return seat.row_number === counter;
                        })
                    );
                }

                const bookedSeats = totSelSeats.slice(0, seatsToBook);

                for (let i = 0; i < bookedSeats.length; i++) {
                    await Booking.create({
                        seatId: bookedSeats[i].id,
                    });
                }

                bookingStatus = true;
            }
        }

        if (!bookingStatus) {
            return next(new AppError("Unable to book seats", 500));
        }

        res.status(200).json({
            status: "success",
            bookingStatus: bookingStatus,
        });
    } catch (error) {
        return next(error);
    }
};

const resetSeats = async (req, res, next) => {
    try {
        await sequelize.transaction(async (t) => {
            await Booking.destroy({ where: {}, transaction: t });
        });

        res.status(200).json({
            status: "success",
            message: "All seats have been reset",
        });
    } catch (error) {
        return next(error);
    }
};

const seatController = {
    getAllSeats: getAllSeats,
    bookSeats: bookSeats,
    resetSeats: resetSeats,
};

export default seatController;
