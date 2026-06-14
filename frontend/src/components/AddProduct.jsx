import { useState } from "react";
import axios from "axios";

import { API_BASE_URL } from "../config/api";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "Electronics",
    price: "",
    quantity: 1,
    condition: "Good",
    image: null,
  });
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setProduct({
        ...product,
        image: e.target.files[0],
      });
    } else {
      const value = ["price", "quantity"].includes(e.target.name)
        ? Number(e.target.value)
        : e.target.value;

      setProduct({
        ...product,
        [e.target.name]: value,
      });
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      setErrMsg("");

      const formData = new FormData();

      Object.entries(product).forEach(([k, v]) => {
        if (v !== null && v !== "") {
          formData.append(k, v);
        }
      });

      await axios.post(
        `${API_BASE_URL}/product-api`,
        formData,
        {
          withCredentials: true,
        }
      );

      navigate("/my-products");
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-16">

      <form
        onSubmit={submit}
        className="bg-white rounded-3xl p-10 shadow-md"
      >

        <h1 className="text-3xl font-bold mb-8">
          Sell Product
        </h1>

        <input
          className="w-full border p-3 rounded-xl mb-5"
          placeholder="Title"
          name="title"
          value={product.title}
          onChange={handleChange}
          required
        />

        <textarea
          className="w-full border p-3 rounded-xl mb-5"
          rows="4"
          placeholder="Description"
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />

        <select
          className="w-full border p-3 rounded-xl mb-5"
          name="category"
          value={product.category}
          onChange={handleChange}
        >
          <option>Electronics</option>
          <option>Books</option>
          <option>Furniture</option>
          <option>Cycles</option>
          <option>Sports</option>
          <option>Clothing</option>
          <option>Accessories</option>
          <option>Others</option>
        </select>

        <input
          className="w-full border p-3 rounded-xl mb-5"
          type="number"
          placeholder="Price"
          name="price"
          min="1"
          value={product.price}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border p-3 rounded-xl mb-5"
          type="number"
          placeholder="Quantity available"
          name="quantity"
          min="0"
          value={product.quantity}
          onChange={handleChange}
          required
        />

        <select
          className="w-full border p-3 rounded-xl mb-5"
          name="condition"
          value={product.condition}
          onChange={handleChange}
        >
          <option>New</option>
          <option>Like New</option>
          <option>Good</option>
          <option>Fair</option>
        </select>

        <input
          type="file"
          name="image"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleChange}
          className="mb-8"
          required
        />

        {errMsg && (
          <p className="mb-5 text-sm text-red-500">
            {errMsg}
          </p>
        )}

        <button className="bg-[#A3B18A] text-white px-8 py-3 rounded-xl">
          Add Product
        </button>

      </form>

    </div>
  );
}

export default AddProduct;
