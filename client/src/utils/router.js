import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Landing from "../components/layouts/Landing";
import Navbar from "../components/layouts/Navbar";
import Alert from "../components/layouts/Alert";
import Dashboard from "../components/dashboard/Dashboard";
import PrivateRoute from "../components/routing/PrivateRoute";
import CreateProfile from "../components/profile-forms/CreateProfile";
import EditProfile from "../components/profile-forms/EditProfile";
import AddExperience from "../components/profile-forms/AddExperience";
import AddEducation from "../components/profile-forms/AddEducation";
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
      {
        path: "/dashboard",
        element: (
          <section className="container">
            <PrivateRoute component={<Dashboard/>}/>
          </section>
        ),
      },
      {
        path: "/create-profile",
        element: (
          <section className="container">
             <Alert/>
            <PrivateRoute component={<CreateProfile/>}/>
          </section>
        ),
      },
      {
        path: "/edit-profile",
        element: (
          <section className="container">
             <Alert/>
            <PrivateRoute component={<EditProfile/>}/>
          </section>
        ),
      },
      {
        path: "/add-experience",
        element: (
          <section className="container">
             <Alert/>
            <PrivateRoute component={<AddExperience/>}/>
          </section>
        ),
      },
      {
        path: "/add-education",
        element: (
          <section className="container">
             <Alert/>
            <PrivateRoute component={<AddEducation/>}/>
          </section>
        ),
      },
    ],
  },
]);
