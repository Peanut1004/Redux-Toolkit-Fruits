import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div>
      <nav className="menu">
        <ul>
          <li>
            <Link to="/product-list">Categories</Link>
          </li>
          <li>
            <Link to="/about-us">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/pages">Pages</Link>
          </li>
        </ul>
        {/* {isLoggedIn && (
          <div className="user-name" onClick={() => setOpen(!open)}>
            Hi! {nameUser}
          </div>
        )} */}
      </nav>
    </div>
  );
}

export default Menu;
