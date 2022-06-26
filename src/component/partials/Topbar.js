import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Topbar() {
  const { isLoggedIn } = useSelector((state) => state.users);

  return (
    <div className="container">
      <div className="topbar">
        <div className="topbar-left">
          <span>We are available 24/7, Need help? Call Us:</span>
          <a> +01234560352</a>
        </div>
        <ul className="topbar-right">
          <li>
            <Link to="/">Contact Us</Link>
          </li>
          <li>
            <Link to="/">My Account</Link>
          </li>
          {!isLoggedIn && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Topbar;
