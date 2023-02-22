import "./App.css";
import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/router";
//import setAuthToken from "./utils/setAuthToken";
import store from './store'
import { loadUser } from "./actions/auth";


// CHECK
// if (localStorage.token) {
//   setAuthToken(localStorage.token)
// }

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
};

export default App;
