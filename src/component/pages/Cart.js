import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  removeProduct,
  changeAmount,
  giamSoLuong,
  getAmountTotal,
  getPriceTotal,
  clearCartAll,
} from "../../slice/productsSlice";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";

function Cart() {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("item")));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { amountTotal, priceTotal } = useSelector((state) => state.products);
  const token = useSelector((state) => state.users.token);

  const handleCheckout = () => {
    if (token) {
      toast.success("Checkout success");
    } else {
      if (window.confirm("Please login for payment?")) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    dispatch(getPriceTotal());
    dispatch(getAmountTotal());
    setData(JSON.parse(localStorage.getItem("item")));
  }, [dispatch, amountTotal]);

  return (
    <div className="cart-wrap">
      <div className="container">
        {data.length > 0 ? (
          <div>
            <table className="table-cart">
              <thead>
                <tr>
                  <th className="image">Image</th>
                  <th className="title">Title</th>
                  <th>Price</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((el) => (
                  <tr key={el.id}>
                    <td>
                      <img src={el.image} alt="images" />
                    </td>
                    <td>{el.title}</td>
                    <td>${el.price}</td>
                    <td>
                      <button onClick={() => dispatch(giamSoLuong(el))}>
                        -
                      </button>
                      <input
                        value={el.amount}
                        onChange={(e) => dispatch(changeAmount(e.target.value))}
                      />
                      <button onClick={() => dispatch(addToCart(el))}>+</button>
                    </td>
                    <td>
                      <AiFillDelete
                        onClick={() => dispatch(removeProduct(el))}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total">
              <p>Amount: {amountTotal}</p>
              <p>Price: ${priceTotal}.00</p>
            </div>
            <div className="btn-cart-bottom">
              <button>Buy Continue</button>
              <div>
                <button
                  className="clear-cart-all"
                  onClick={() => dispatch(clearCartAll())}
                >
                  Clear Cart All
                </button>
                <button onClick={() => handleCheckout()}>Checkout</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <h3>Your cart is empty</h3>
            <p>
              No items added in your cart. Please add product to yourcart list.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
