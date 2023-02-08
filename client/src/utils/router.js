import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Landing from "../components/layouts/Landing";
import Navbar from "../components/layouts/Navbar";
import Alert from "../components/layouts/Alert";
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
        path: "/",
        element: <Landing />
      },
      {
        path: "/login",
        element: (
          <section className="container">
            <Alert/>
            <Login />
          </section>
        ),
      },
      {
        path: "/register",
        element: (
          <section className="container">
             <Alert/>
            <Register />
          </section>
        ),
      },
    ],
  },
]);
