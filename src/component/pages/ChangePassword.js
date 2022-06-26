import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordUser } from "../../slice/login-register";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const { token } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const handleChangePassword = (e) => {
    e.preventDefault();
    dispatch(
      changePasswordUser({ idToken: token, password, returnSecurenToken: true })
    );
  };

  return (
    <div className="change-password-form">
      <form onSubmit={handleChangePassword}>
        <label>Nhập mật khẩu mới</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Change Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
