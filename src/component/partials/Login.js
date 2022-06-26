import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../../slice/login-register";
import { useLocation, useNavigate } from "react-router-dom";
import FormRow from "./FormRow";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // let { userName } = useSelector((state) => state.users);
  let userNameLocal = JSON.parse(localStorage.getItem("userName"));
  console.log(userNameLocal);

  const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true,
  };

  const [values, setValue] = useState(initialState);

  const handleToggle = () => {
    setValue({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValue({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please Fill Out All Fields");
      return;
    } else if (isMember) {
      dispatch(loginUser({ email, password, returnSecureToken: true }));
      if (userNameLocal) {
        toast.success("Login success");
        navigate("/");
      }
      return;
    } else {
      dispatch(
        registerUser({ name, email, password, returnSecureToken: true })
      );
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="form-login">
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          ></FormRow>
        )}
        <FormRow
          type="text"
          name="email"
          value={values.email}
          handleChange={handleChange}
        ></FormRow>
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        ></FormRow>
        <button type="submit">{values.isMember ? "Login" : "Register"}</button>
        <div className="is-member">
          Already a member?
          <span onClick={handleToggle}>
            {!values.isMember ? "Login" : "Register"}
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
