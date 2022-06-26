// import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Cart from "./component/pages/Cart";
import Error from "./component/pages/Error";
import Header from "./component/pages/Header";
import Home from "./component/pages/Home";
import AdminManager from "./component/admin/AdminManager";
import AdminAddEdit from "./component/admin/AdminAddEdit";
import Login from "./component/partials/Login";
import ChangePassword from "./component/pages/ChangePassword";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {isLoggedIn && (
          <Route path="/changePassword" element={<ChangePassword />} />
        )}
        <Route path="/admin-manager" element={<AdminManager />} />
        <Route path="/admin-manager/add" element={<AdminAddEdit />} />
        <Route
          path="/admin-manager/edit/:productId"
          element={<AdminAddEdit />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
