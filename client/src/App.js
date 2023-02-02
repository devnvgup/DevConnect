import "./App.css";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/router";
import Navbar from "./components/layouts/Navbar";

const App = () => {
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
};

export default App;
