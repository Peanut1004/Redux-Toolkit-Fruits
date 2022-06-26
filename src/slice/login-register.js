import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { changePassword, login } from "./userSlice";

export const urlSignUp =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC5E4M_ltTnWHKQDjERX_dP-_Jcp548ee4";

export const urlSignIn =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC5E4M_ltTnWHKQDjERX_dP-_Jcp548ee4";

export const urlChangePassword =
  "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC5E4M_ltTnWHKQDjERX_dP-_Jcp548ee4";

export const registerUser = createAsyncThunk(
  "registerUser",
  async (user, thunkAPI) => {
    fetch(urlSignUp, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        thunkAPI.dispatch(login(data.idToken));
      });
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async (user, thunkAPI) => {
    fetch(urlSignIn, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.idToken) {
          const name = data.email.replace(/@gmail.com/i, "");
          thunkAPI.dispatch(login({ token: data.idToken, name }));
          // toast.success("Login Success");
          // window.location.pathname = "/";
        }
      });
  }
);

export const changePasswordUser = createAsyncThunk(
  "changePasswordUser",
  async (userChange, thunkAPI) => {
    fetch(urlChangePassword, {
      method: "POST",
      body: JSON.stringify(userChange),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        thunkAPI.dispatch(changePassword({ token: data.idToken }));
        toast.success("Change Password Success");
      });
  }
);
