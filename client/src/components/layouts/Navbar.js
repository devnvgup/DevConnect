import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Landing from "./Landing";
const Navbar = () => {
  const [hideLanding, setHideLanding] = useState(true);
  const isHideLanding = () => {
    if (window.location.href !== "http://localhost:3000/") {
      setHideLanding(false);
    }
  };
  useEffect(() => {
    isHideLanding();
  }, [hideLanding]);
  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-code"></i> DevConnector
          </Link>
        </h1>
        <ul>
          <li>
            <a href="profiles.html">Developers</a>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
      {hideLanding && <Landing />}
    </div>
  );
};

export default Navbar;
