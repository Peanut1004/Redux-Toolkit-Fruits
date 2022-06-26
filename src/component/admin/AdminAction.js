import React from "react";
import { useNavigate } from "react-router-dom";
import productsApi from "../../api/productsApi";
import { removeProduct } from "../../slice/adminProductSlice";
import { useDispatch } from "react-redux";

function AdminAction(props) {
  const { productId } = props;
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const handleDel = (productId) => {
    if (productId) {
      if (window.confirm("Do you want to delete this product?")) {
        dispatch(removeProduct(productId));
        productsApi.deleteProduct(productId);
      }
    }
  };
  const handleEdit = (productId) => {
    if (productId) {
      const editProductUrl = `/admin-manager/edit/${productId}`;
      navigate(editProductUrl);
    }
  };
  return (
    <div className="admin-action">
      <button className="admin-action-del" onClick={() => handleDel(productId)}>
        Del
      </button>
      <button
        className="admin-action-edit"
        onClick={() => handleEdit(productId)}
      >
        Edit
      </button>
    </div>
  );
}

export default AdminAction;
