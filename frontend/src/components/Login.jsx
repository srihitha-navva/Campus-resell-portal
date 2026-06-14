import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";

import {
  pageBackground,
  formCard,
  formTitle,
  formGroup,
  label,
  input,
  submit,
  error,
  bodySmall,
  link,
} from "../styles/Common";

function Login() {
  const navigate = useNavigate();

  const login = useAuth((state) => state.login);
  const loading = useAuth((state) => state.loading);

  const [errMsg, setErrMsg] = useState("");

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrMsg("");
      await login(user);
      navigate("/");
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className={`${pageBackground} flex justify-center items-center py-20`}>
      <form className={formCard} onSubmit={handleSubmit}>
        <h1 className={formTitle}>Welcome Back 👋</h1>

        <div className={formGroup}>
          <label className={label}>Email</label>

          <input
            className={input}
            type="email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>

        <div className={formGroup}>
          <label className={label}>Password</label>

          <input
            className={input}
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>

        {errMsg && <p className={error}>{errMsg}</p>}

        <button className={submit} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className={`${bodySmall} mt-5 text-center`}>
          Don't have an account?{" "}
          <Link to="/register" className={link}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;