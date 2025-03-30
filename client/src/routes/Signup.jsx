import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/auth/authSlice.js";
import { useNavigate } from "react-router-dom";

function Login() {
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const naivigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get("email");
        const password = formData.get("password");
        const username = formData.get("username");

        if (!username || !email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        if (username.trim().length > 20) {
            setError("Name must be less than 20 characters long.");
            return;
        }

        if (password.trim().length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        const response = await fetch(import.meta.env.VITE_SERVER_URL + "/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        });

        const user = await response.json();

        if (response.status !== 200) {
            setError(user.message);
            return;
        }

        dispatch(login(user.data));

        naivigate("/seats");

        setError("");
    };

    return (
        <>
            <div
                className="flex h-screen flex-col justify-center items-center px-6 py-12 lg:px-8"
                style={{
                    backgroundImage:
                        "linear-gradient(to right top, #ecb2d3, #e2b3db, #d5b5e2, #c8b8e7, #b9baea, #adc0ef, #a2c5f1, #98caf1, #92d3f2, #92dcf0, #97e4ec, #a2ebe6)",
                }}
            >
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <img alt="Logo" src="/logo.png" className="mx-auto h-10 w-auto" /> */}
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Welcome to Bookerz
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="username"
                                    placeholder="Enter your email here"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    maxLength={50}
                                    placeholder="Enter your email here"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="roomPassword" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    maxLength={20}
                                    placeholder="Enter your password here"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition
                            duration-300"
                            >
                                Sign Up
                            </button>

                            {error && <p className="mt-2 text-center text-red-500">{error}</p>}
                        </div>
                    </form>
                </div>
                <div className="h-40 mt-10 sm:mx-auto sm:w-full sm:max-w-sm"></div>
            </div>
        </>
    );
}

export default Login;
