import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Navbar from "../components/layouts/Navbar";
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
      </>
    ),
    children: [
      {
        path: "/login",
        element: (
          <section className="container">
            <Login />
          </section>
        ),
      },
      {
        path: "/register",
        element: (
          <section className="container">
            <Register />
          </section>
        ),
      },
    ],
  },
]);
