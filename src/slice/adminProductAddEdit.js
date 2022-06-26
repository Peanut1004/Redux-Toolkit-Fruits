import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsApi from "../api/productsApi";
import { toast } from "react-toastify";

export const getProductDetail = createAsyncThunk(
  "getProductDetail",
  async (productId) => {
    const getProductDetailt = await productsApi.getProductDetail(productId);
    return getProductDetailt;
  }
);

export const postProduct = createAsyncThunk("postProduct", async (product) => {
  const postProduct = await productsApi.postProduct(product);
  return postProduct;
});

export const editProduct = createAsyncThunk(
  "editProduct",
  async ({ productId, product }) => {
    const editProduct = await productsApi.editProduct(productId, product);
    return editProduct;
  }
);

const adminProductAddEditSlice = createSlice({
  name: "adminProductAddEditSlice",
  initialState: {
    listDetail: [],
    successError: "",
    loading: false,
  },
  reducer: {},
  extraReducers: {
    [getProductDetail.pending]: (state) => {
      state.loading = true;
    },

    [getProductDetail.fulfilled]: (state, action) => {
      state.loading = false;
      // console.log(action);
      state.listDetail.push(action.payload);
    },

    [getProductDetail.rejected]: (state, action) => {
      state.loading = false;
    },

    [postProduct.pending]: (state) => {
      state.loading = true;
    },

    [postProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.successError = action.payload;
    },

    [postProduct.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

const { reducer: adminProductAddEditReducer } = adminProductAddEditSlice;
export default adminProductAddEditReducer;
