import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsApi from "../api/productsApi";

export const getProducts = createAsyncThunk("getProducts", async () => {
  const getProducts = await productsApi.getProducts();
  return getProducts;
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    list: [],
    amountTotal: 0,
    priceTotal: 0,
  },
  reducers: {
    addToCart(state, action) {
      const currentId = action.payload.id;
      let checkItem = Object.keys(localStorage);
      if (checkItem.includes("item")) {
        let temp = JSON.parse(localStorage.getItem("item"));
        let checked = temp.map((el) => el.id);
        if (checked.includes(currentId)) {
          const newItem = temp.map((el) => {
            if (el.id === currentId) {
              let am = JSON.parse(localStorage.getItem("amountTotal"));
              state.amountTotal = am.amount + 1;
              return { ...el, amount: el.amount + 1 };
            }
            return el;
          });
          localStorage.setItem("item", JSON.stringify(newItem));

          let am = JSON.parse(localStorage.getItem("amountTotal"));
          localStorage.setItem(
            "amountTotal",
            JSON.stringify({ amount: am.amount + 1 })
          );
        } else {
          localStorage.setItem(
            "item",
            JSON.stringify([...temp, { ...action.payload, amount: 1 }])
          );

          let am = JSON.parse(localStorage.getItem("amountTotal"));
          state.amountTotal = am.amount + 1;
          localStorage.setItem(
            "amountTotal",
            JSON.stringify({ amount: am.amount + 1 })
          );
        }
      } else {
        localStorage.setItem(
          "item",
          JSON.stringify([{ ...action.payload, amount: 1 }])
        );
        localStorage.setItem("amountTotal", JSON.stringify({ amount: 1 }));
        state.amountTotal = state.amountTotal + 1;
      }
    },
    removeProduct(state, action) {
      const { id, amount } = action.payload;

      let getItem = JSON.parse(localStorage.getItem("item"));
      let newItem = getItem.filter((el) => el.id !== id);
      localStorage.setItem("item", JSON.stringify(newItem));

      let getAmount = JSON.parse(localStorage.getItem("amountTotal"));
      let newAmountTotal = getAmount.amount - amount;
      localStorage.setItem(
        "amountTotal",
        JSON.stringify({ amount: newAmountTotal })
      );
      state.amountTotal = newAmountTotal;
    },
    changeAmount(state, action) {
      console.log(action.payload);
    },
    giamSoLuong(state, action) {
      let getItem = JSON.parse(localStorage.getItem("item"));

      const newItem = getItem
        .map((el) => {
          if (el.id === action.payload.id) {
            let am = JSON.parse(localStorage.getItem("amountTotal"));
            state.amountTotal = am.amount - 1;
            return { ...el, amount: el.amount - 1 };
          }
          return el;
        })
        .filter((el) => el.amount > 0);

      localStorage.setItem("item", JSON.stringify(newItem));

      let getAmount = JSON.parse(localStorage.getItem("amountTotal"));
      let newAmountTotal = getAmount.amount - 1;
      localStorage.setItem(
        "amountTotal",
        JSON.stringify({ amount: newAmountTotal })
      );
      state.amountTotal = newAmountTotal;
    },
    getAmountTotal(state, action) {
      let getItem = JSON.parse(localStorage.getItem("item"));
      state.amountTotal = getItem.reduce((total, el) => {
        return (total = total + el.amount);
      }, 0);
    },
    getPriceTotal(state, action) {
      let getItem = JSON.parse(localStorage.getItem("item"));
      state.priceTotal = getItem.reduce((total, el) => {
        return (total = total + el.price * el.amount);
      }, 0);
    },
    clearCartAll(state, action) {
      localStorage.setItem("item", JSON.stringify([]));
      localStorage.setItem("amountTotal", JSON.stringify({ amount: 0 }));
      state.amountTotal = 0;
    },
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.loading = true;
    },

    [getProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },

    [getProducts.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { actions, reducer: productsReducer } = productsSlice;
export const {
  addToCart,
  removeProduct,
  changeAmount,
  giamSoLuong,
  getAmountTotal,
  getPriceTotal,
  clearCartAll,
} = actions;
export default productsReducer;
