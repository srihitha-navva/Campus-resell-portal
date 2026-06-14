import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { API_BASE_URL } from "../config/api";
import {
  btnSecondary,
  error,
  heading,
  pageBackground,
  pageWrapper,
} from "../styles/Common";

function AdminDashboard() {

  const [data, setData] = useState({});
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {

    axios
      .get(`${API_BASE_URL}/admin-api/dashboard`, {
        withCredentials: true,
      })
      .then((res) => setData(res.data.payload || {}))
      .catch((err) => setErrMsg(err.response?.data?.message || "Failed to load dashboard"));

  }, []);

  const card =
    "bg-white rounded-3xl border border-[#ECEAE5] p-8 shadow-sm text-center";

  return (

    <div className={pageBackground}>
    <div className={pageWrapper}>

      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-10">
        <div>
          <h1 className={heading}>
            Admin Dashboard
          </h1>
          <p className="text-sm text-[#8A847F] mt-2">
            Monitor users, products, and marketplace activity.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link to="/user-management" className={btnSecondary}>
            View Users
          </Link>

          <Link to="/product-management" className={btnSecondary}>
            View Products
          </Link>
        </div>
      </div>

      {errMsg && <p className={`${error} mb-5`}>{errMsg}</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        <div className={card}>
          <h2>Total Users</h2>
          <p className="text-5xl font-bold mt-4">
            {data.totalUsers}
          </p>
        </div>

        <div className={card}>
          <h2>Total Products</h2>
          <p className="text-5xl font-bold mt-4">
            {data.totalProducts}
          </p>
        </div>

        <div className={card}>
          <h2>Available</h2>
          <p className="text-5xl font-bold mt-4">
            {data.availableProducts}
          </p>
        </div>

        <div className={card}>
          <h2>Sold</h2>
          <p className="text-5xl font-bold mt-4">
            {data.soldProducts}
          </p>
        </div>

      </div>

    </div>
    </div>
  );
}

export default AdminDashboard;
