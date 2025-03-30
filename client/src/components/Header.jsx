import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../store/auth/authSlice.js";

function Header() {
    const isLoggedIn = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const response = await fetch(import.meta.env.VITE_SERVER_URL + "/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            dispatch(logout());
            navigate("/");
        }
    };

    return (
        <header className="sticky w-full min-h-20 bg-white drop-shadow-sm z-999">
            <div className="w-full h-full flex items-center">
                <div className="flex-1 flex items-center gap-3 px-5">
                    <div className="flex justify-center items-center">
                        {/* <img src="/logo.png" className="w-7 h-7" alt="logo" /> */}
                        <span className="font-bold xl:text-2xl lg:text-xl md:text-lg invisible md:visible text-gray-700">
                            Bookerz
                        </span>
                    </div>
                </div>
                <div className="flex md:gap-12 gap-6 hidden md:flex">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `${isActive ? "text-[#007bff]" : ""}  hover:text-[#007bff]  block font-semibold text-[15px]`
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/seats"
                        className={({ isActive }) =>
                            `${isActive ? "text-[#007bff]" : ""}  hover:text-[#007bff]  block font-semibold text-[15px]`
                        }
                    >
                        Seats
                    </NavLink>
                </div>
                <div className="flex-1 flex justify-end items-center gap-4 px-5">
                    {isLoggedIn.status ? isLoggedIn.userData.username : ""}
                    {isLoggedIn.status ? (
                        <button
                            className="rounded-md bg-yellow-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 transition duration-300"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
