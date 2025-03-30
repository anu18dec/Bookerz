import "./App.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import Login from "./routes/Login.jsx";
import Signup from "./routes/Signup.jsx";
import AuthLayout from "./routes/AuthLayout.jsx";
import Home from "./routes/Home.jsx";
import Seats from "./routes/Seats.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/" element={<AuthLayout IsAuth={true} />}>
                <Route path="/" element={<Home />} />
            </Route>

            <Route path="/" element={<AuthLayout IsAuth={false} />}>
                <Route path="seats" element={<Seats />} />
            </Route>
        </>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
