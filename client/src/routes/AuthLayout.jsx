import { Navigate, Outlet } from "react-router-dom";

import Header from "../components/Header.jsx";
import { useSelector } from "react-redux";

function AuthLayout({ IsAuth }) {
    const isLoggedIn = useSelector((state) => state.auth.status);

    return isLoggedIn || IsAuth ? (
        <div className="flex h-screen w-screen overflow-hidden ">
            <div className="flex h-full flex-col flex-1 w-full overflow-y-auto">
                <Header />
                <div
                    className="overflow-y-auto h-full"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right top, #ecb2d3, #e2b3db, #d5b5e2, #c8b8e7, #b9baea, #adc0ef, #a2c5f1, #98caf1, #92d3f2, #92dcf0, #97e4ec, #a2ebe6)",
                    }}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    ) : (
        <Navigate to="/login" />
    );
}

export default AuthLayout;
