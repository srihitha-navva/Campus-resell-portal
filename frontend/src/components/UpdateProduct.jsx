import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { API_BASE_URL } from "../config/api";

function UpdateProduct() {
  const { id } = useParams();
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

  const [preview, setPreview] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/product-api/${id}`)
      .then((res) => {
        const data = res.data.payload;

        setProduct({
          title: data.title,
          description: data.description,
          category: data.category,
          price: data.price,
          quantity: data.quantity ?? 1,
          condition: data.condition,
          image: null,
        });

        setPreview(data.image);
      })
      .catch((err) => setErrMsg(err.response?.data?.message || "Failed to load product"));
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setProduct({
        ...product,
        image: e.target.files[0],
      });

      if (e.target.files[0]) {
        const nextPreview = URL.createObjectURL(e.target.files[0]);
        setPreview((currentPreview) => {
          if (currentPreview.startsWith("blob:")) {
            URL.revokeObjectURL(currentPreview);
          }

          return nextPreview;
        });
      }
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

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      setErrMsg("");
      setSuccessMsg("");

      const formData = new FormData();

      formData.append("title", product.title);
      formData.append("description", product.description);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("quantity", product.quantity);
      formData.append("condition", product.condition);

      if (product.image) {
        formData.append("image", product.image);
      }

      await axios.put(
        `${API_BASE_URL}/product-api/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      setSuccessMsg("Product updated successfully");

      navigate("/my-products");
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">

      <form
        onSubmit={updateProduct}
        className="bg-white rounded-3xl shadow-lg p-10"
      >
        <h1 className="text-4xl font-bold mb-8 text-[#4F4B47]">
          Update Product
        </h1>

        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border rounded-xl p-3 mb-5"
          required
        />

        <textarea
          rows={4}
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border rounded-xl p-3 mb-5"
          required
        />

        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full border rounded-xl p-3 mb-5"
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
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          min="1"
          className="w-full border rounded-xl p-3 mb-5"
          required
        />

        <input
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          placeholder="Quantity available"
          min="0"
          className="w-full border rounded-xl p-3 mb-5"
          required
        />

        <select
          name="condition"
          value={product.condition}
          onChange={handleChange}
          className="w-full border rounded-xl p-3 mb-5"
        >
          <option>New</option>
          <option>Like New</option>
          <option>Good</option>
          <option>Fair</option>
        </select>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-48 h-48 object-cover rounded-2xl mb-5"
          />
        )}

        <input
          type="file"
          name="image"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleChange}
          className="mb-8"
        />

        {errMsg && <p className="mb-5 text-sm text-red-500">{errMsg}</p>}
        {successMsg && <p className="mb-5 text-sm text-green-600">{successMsg}</p>}

        <button
          className="bg-[#A3B18A] hover:bg-[#8F9D77] text-white px-8 py-3 rounded-xl transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default UpdateProduct;
