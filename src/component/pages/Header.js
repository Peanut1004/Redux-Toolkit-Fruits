import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../slice/userSlice";

function Header() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const amountTotal = useSelector((state) => state.products.amountTotal);
  const { isLoggedIn } = useSelector((state) => state.users);

  const nameUser = JSON.parse(localStorage.getItem("nameUser"));

  return (
    <div className="header ">
      <div className="logo">
        <Link to="/">Steam</Link>
      </div>
      <nav className="menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart" className="cart-link">
              Cart<span>{amountTotal}</span>
            </Link>
          </li>
          {!isLoggedIn && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
        {isLoggedIn && (
          <div className="user-name" onClick={() => setOpen(!open)}>
            Hi! {nameUser}
          </div>
        )}
      </nav>
      {isLoggedIn && !open && (
        <div className="info-user">
          <div>
            <Link to="/changePassword">Change Password</Link>
          </div>
          <div onClick={() => handleLogout()}>Logout</div>
        </div>
      )}
    </div>
  );
}

export default Header;
