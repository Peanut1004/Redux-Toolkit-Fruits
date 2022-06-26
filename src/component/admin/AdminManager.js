import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminAction from "./AdminAction";
import { getProducts } from "../../slice/adminProductSlice";

function AdminManager() {
  const products = useSelector((state) => state.adminProduct.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddProduct = () => {
    const url = "/admin-manager/add";
    navigate(url);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="admin-manager">
      <div className="admin-manager_left">
        <Link to="">Product List</Link>
      </div>
      <div className="admin-manager_right">
        <button className="add-product" onClick={handleAddProduct}>
          Add Product
        </button>
        <table className="table-admin">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((el) => (
              <tr key={el.id}>
                <td>
                  <img src={el.image} alt="images" />
                </td>
                <td>{el.title}</td>
                <td>{el.price}</td>
                <td>
                  <AdminAction productId={el.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminManager;
