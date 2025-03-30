import { Link, NavLink } from "react-router-dom";

function Header() {
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
                <div className="flex-1 flex justify-end items-center gap-4 px-5"></div>
            </div>
        </header>
    );
}

export default Header;
