const getAllSeats = async (setSeatsData, setSeatsBookedCount, setError) => {
    const seats = getSeatsArray();

    const fetchSeats = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_SERVER_URL + "/seat/getseats", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await response.json();

            if (response.status !== 200) {
                setError(data.message);
                return;
            }

            let bookedSeatsCount = 0;

            data?.data?.seats.forEach((seat) => {
                const row = seat.row_number - 1;
                const column = seat.seat_number - 1;
                if (seat.Booking === null) {
                    seats[row][column] = {
                        seatNo: seat.id,
                        isAvailable: true,
                    };
                } else {
                    bookedSeatsCount++;
                    seats[row][column] = {
                        seatNo: seat.id,
                        isAvailable: false,
                    };
                }
            });

            setSeatsBookedCount(bookedSeatsCount);

            setSeatsData(seats);
        } catch (error) {
            setError(error.message);
        }
    };

    fetchSeats();
};

const resetSeats = async (setError) => {
    try {
        const response = await fetch(import.meta.env.VITE_SERVER_URL + "/seat/resetseats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const data = await response.json();

        if (response.status !== 200) {
            setError(data.message);
            return;
        }
    } catch (error) {
        setError(error.message);
    }
};

const bookSeats = async (seatsToBook, setError) => {
    try {
        const response = await fetch(import.meta.env.VITE_SERVER_URL + "/seat/bookseats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                seatsToBook,
            }),
            credentials: "include",
        });

        const data = await response.json();

        if (response.status !== 200) {
            setError(data.message);
            return;
        }
    } catch (error) {
        setError(error.message);
    }
};

const getSeatsArray = () => {
    const seats = [];

    for (let i = 0; i < 11; i++) {
        const row = [];
        for (let j = 0; j < 7; j++) {
            row.push(0);
        }
        seats.push(row);
    }

    const row = [];
    for (let j = 0; j < 3; j++) {
        row.push(0);
    }
    seats.push(row);

    return seats;
};

const seatsServices = {
    getAllSeats: getAllSeats,
    resetSeats: resetSeats,
    bookSeats: bookSeats,
};

export default seatsServices;
