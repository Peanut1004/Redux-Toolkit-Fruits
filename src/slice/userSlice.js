import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    nameUser: "",
    isLoggedIn: false,
  },
  reducers: {
    login(state, action) {
      const { token, name } = action.payload;
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("nameUser", JSON.stringify(name));
      let getTokenLocal = JSON.parse(localStorage.getItem("token"));
      let getUserNameLocal = JSON.parse(localStorage.getItem("userName"));

      state.token = getTokenLocal;
      state.nameUser = getUserNameLocal;

      state.isLoggedIn = true;
    },
    logout(state, action) {
      state.token = "";
      state.nameUser = "";

      localStorage.removeItem("token");
      localStorage.removeItem("nameUser");
      state.isLoggedIn = false;
    },
    changePassword(state, action) {
      const { token, name } = action.payload;
      state.token = token;
      state.nameUser = name;

      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("nameUser", JSON.stringify(name));
      state.isLoggedIn = true;
    },
  },
});

export const { actions, reducer: userReducer } = userSlice;
export const { login, logout, changePassword } = actions;
export default userReducer;
