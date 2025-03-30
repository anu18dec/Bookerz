import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex h-full items-center justify-center">
            <div className="mx-10 md:mx-26 lg:mx-36 align-center text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-8">
                    Welcome to <span className="text-blue-500 text-nowrap">Bookerz</span>
                </h1>

                <p className="text-base md:text-lg text-gray-600 mb-6">
                    <span className="font-semibold text-blue-500">Seamless Train Ticket Booking, Made Easy. </span>
                    Bookerz lets you reserve train seats effortlessly with a smart, optimized booking system. Book
                    instantly, and travel with confidence—no hassle, no confusion.
                </p>

                <p className="text-base md:text-lg font-semibold text-gray-700 mb-8">
                    Ready to simplify your train ticket booking with Bookerz?
                </p>
                <button
                    className="bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg hover:bg-blue-500 transition duration-300"
                    onClick={() => navigate("/seats")}
                >
                    Book Seats
                </button>
            </div>
        </div>
    );
}

export default Home;
