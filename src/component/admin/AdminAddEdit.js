import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getProductDetail,
  postProduct,
  editProduct,
} from "../../slice/adminProductAddEdit";

function AdminAddEdit() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setItem] = useState({
    image: "",
    title: "",
    price: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setItem({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productId) {
      dispatch(postProduct(product));

      alert("Add product Success");
      navigate("/admin-manager");
    } else {
      dispatch(editProduct({ productId, product }));
      alert("Edit product Success");
      navigate("/admin-manager");
    }
  };

  useEffect(() => {
    if (productId) {
      const getDataProduct = async () => {
        const response = await dispatch(getProductDetail(productId));
        setItem({
          image: response.payload.image,
          title: response.payload.title,
          price: response.payload.price,
        });
      };
      getDataProduct();
    }
  }, [dispatch, productId]);

  return (
    <div>
      <form className="form-add-edit">
        <div className="form-group">
          <input
            type="text"
            name="image"
            placeholder="image"
            value={product.image}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="title"
            value={product.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="price"
            placeholder="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        {productId ? (
          <button onClick={handleSubmit}>Edit</button>
        ) : (
          <button onClick={handleSubmit}>Add Product</button>
        )}
      </form>
    </div>
  );
}

export default AdminAddEdit;
