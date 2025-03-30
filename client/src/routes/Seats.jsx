import { useEffect, useState } from "react";
import seatsServices from "../services/seatsServices.js";

function Seats() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [seatsBookedCount, setSeatsBookedCount] = useState(0);

    const [seatsData, setSeatsData] = useState([]);

    useEffect(() => {
        setLoading(true);
        async function loadSeats() {
            await seatsServices.getAllSeats(setSeatsData, setSeatsBookedCount, setError);
        }

        loadSeats();
        setLoading(false);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        const formData = new FormData(event.target);
        const seatsToBook = formData.get("seatsToBook");

        if (!seatsToBook) {
            setError("Please eneter seats quantity.");
            return;
        }

        if (seatsToBook < 0 || seatsToBook > 7) {
            setError("Maximum 7 seats can be booked at a time.");
            return;
        }

        setLoading(true);
        await seatsServices.bookSeats(seatsToBook, setError);
        await seatsServices.getAllSeats(setSeatsData, setSeatsBookedCount, setError);
        setLoading(false);
    };

    const handleReset = async () => {
        if (!confirm("Are you sure you want to reset the seats?")) {
            return;
        }
        setError("");
        setLoading(true);
        await seatsServices.resetSeats(setError);
        await seatsServices.getAllSeats(setSeatsData, setSeatsBookedCount, setError);
        setLoading(false);
    };

    return (
        <div className="w-full flex flex-col md:flex-row justify-center items-center">
            <div className="w-min">
                {seatsData.map((row, rowIndex) => (
                    <div key={rowIndex} className="w-min flex flex-row justify-between gap-2 m-4">
                        {row.map((seat, seatIndex) => (
                            <div key={seatIndex} className="w-min flex flex-row items-center gap-2">
                                <div
                                    className={`w-10 h-10 border rounded-md ${
                                        seat.isAvailable ? "bg-green-400" : "bg-red-400"
                                    } text-center flex items-center justify-center text-white font-bold`}
                                >
                                    {seat.seatNo}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center ">
                <div className="text-gray-600 font-bold text-lg p-4">
                    Total of 80 seats available in the bus, <span className="text-red-500">{seatsBookedCount}</span>{" "}
                    seats are already booked and remaining seats are{" "}
                    <span className="text-green-500">{80 - seatsBookedCount}</span>
                </div>

                <div className="w-full sm:p-6">
                    <div className="">
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                            Book Your Seats
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                    Seats quantity
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="seatsToBook"
                                        name="seatsToBook"
                                        type="number"
                                        placeholder="Enter seats quantity here"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500 focusvisible:outline focusvisible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition duration-300${
                                        loading ? "bg-blue-300" : ""
                                    }`}
                                >
                                    Book
                                </button>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    disabled={loading}
                                    className={`flex w-full justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focusvisible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 transition duration-300 ${
                                        loading ? "bg-yellow-300" : ""
                                    }`}
                                >
                                    Reset all seats
                                </button>

                                {error && <p className="mt-2 text-center text-red-500">{error}</p>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Seats;
