import { configureStore } from "@reduxjs/toolkit";
import adminProductAddEditReducer from "./adminProductAddEdit";
import adminProductReducer from "./adminProductSlice";
import productsReducer from "./productsSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    adminProductAddEdit: adminProductAddEditReducer,
    adminProduct: adminProductReducer,
    users: userReducer,
  },
});

export default store;
