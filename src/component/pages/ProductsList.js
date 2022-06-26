import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, getProducts } from "../../slice/productsSlice";
import { BsFillCartPlusFill } from "react-icons/bs";

function ProductsList() {
  const { list: productsList, loading } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="products-list">
      {productsList.map((product) => (
        <div className="product-box" key={product.id}>
          <img src={product.image} alt="images" />
          <h3>
            <Link to={`/products/${product.id}`}>{product.title}</Link>
          </h3>
          <p>${product.price}</p>
          <div className="product-action">
            <button
              className="btn"
              onClick={() => dispatch(addToCart(product))}
            >
              <BsFillCartPlusFill />
            </button>
            <button className="btn">Detail</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductsList;
