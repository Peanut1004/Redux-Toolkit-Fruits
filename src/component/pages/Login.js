import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../../slice/login-register";
import { useNavigate } from "react-router-dom";
import FormRow from "../partials/FormRow";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please Fill Out All Fields");
    } else if (isMember) {
      dispatch(loginUser({ email, password, returnSecureToken: true }));
      toast.success("Login success");
      navigate("/");
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
