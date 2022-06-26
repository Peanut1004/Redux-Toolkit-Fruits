import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/style.css";
import { useSelector } from "react-redux";
import AdminAddEdit from "./component/admin/AdminAddEdit";
import AdminManager from "./component/admin/AdminManager";
import Cart from "./component/pages/Cart";
import ChangePassword from "./component/pages/ChangePassword";
import Error from "./component/pages/Error";
import Header from "./component/partials/Header";
import Home from "./component/pages/Home";
import Login from "./component/pages/Login";
import ProductsList from "./component/pages/ProductsList";
import Topbar from "./component/partials/Topbar";
import Menu from "./component/partials/Menu";

function App() {
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  return (
    <BrowserRouter>
      <Topbar />
      <Header />
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-list" element={<ProductsList />} />
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
