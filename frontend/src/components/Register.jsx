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

function Register() {
  const register = useAuth((state) => state.register);
  const loading = useAuth((state) => state.loading);

  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");

  const [user, setUser] = useState({
    name: "",
    studentId: "",
    mobile: "",
    email: "",
    password: "",
    profilePic: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "profilePic") {
      setUser({
        ...user,
        profilePic: e.target.files[0],
      });
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrMsg("");

      const formData = new FormData();

      Object.entries(user).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      await register(formData);

      navigate("/");
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className={`${pageBackground} flex justify-center py-20`}>
      <form className={formCard} onSubmit={handleSubmit}>
        <h1 className={formTitle}>Create Account</h1>

        <div className={formGroup}>
          <label className={label}>Full Name</label>
          <input
            className={input}
            name="name"
            onChange={handleChange}
            required
          />
        </div>

        <div className={formGroup}>
          <label className={label}>Student ID</label>
          <input
            className={input}
            name="studentId"
            onChange={handleChange}
            required
          />
        </div>

        <div className={formGroup}>
          <label className={label}>Mobile</label>
          <input
            className={input}
            name="mobile"
            onChange={handleChange}
            required
          />
        </div>

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

        <div className={formGroup}>
          <label className={label}>Profile Picture</label>
          <input
            type="file"
            name="profilePic"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleChange}
          />
        </div>

        {errMsg && <p className={error}>{errMsg}</p>}

        <button className={submit} disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>

        <p className={`${bodySmall} mt-5 text-center`}>
          Already have an account?{" "}
          <Link className={link} to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
