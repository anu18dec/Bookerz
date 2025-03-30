import express from "express";
import seatController from "../../controller/seatController.js";
import authController from "../../controller/authController.js";

const router = express.Router();

router.get("/getseats", seatController.getAllSeats);

router.post("/bookseats", seatController.bookSeats);

router.post("/resetseats", seatController.resetSeats);

export default router;
