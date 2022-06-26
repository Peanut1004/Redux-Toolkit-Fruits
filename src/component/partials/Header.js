import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../slice/userSlice";
import { BsCartCheck } from "react-icons/bs";

function Header() {
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const { isLoggedIn } = useSelector((state) => state.users);

  // const { isLoggedIn } = useSelector((state) => state.users);
  const amountTotal = useSelector((state) => state.products.amountTotal);
  const nameUser = JSON.parse(localStorage.getItem("nameUser"));

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Fruits</Link>
      </div>
      <div className="search">
        <input
          type="text"
          value={search}
          placeholder="Search for products (e.g. fish, apple, oil)"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="cart">
        <Link to="/cart">
          <BsCartCheck />
        </Link>
        <span className="cart-number">{amountTotal}</span>
      </div>

      {/* {isLoggedIn && !open && (
        <div className="info-user">
          <div>
            <Link to="/changePassword">Change Password</Link>
          </div>
          <div onClick={() => handleLogout()}>Logout</div>
        </div>
      )} */}
    </div>
  );
}

export default Header;
