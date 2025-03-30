import Seat from "../models/seatModel.js";
import Booking from "../models/bookingModel.js";

// One Seat can have one Booking (One-to-One)
Seat.hasOne(Booking, { foreignKey: "seatId", onDelete: "CASCADE" });
Booking.belongsTo(Seat, { foreignKey: "seatId" });

export default { Seat, Booking };
