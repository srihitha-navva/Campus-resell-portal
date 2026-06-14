import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { API_BASE_URL } from "../config/api";
import { useAuth } from "../store/authStore";
import { btnDanger, btnSecondary } from "../styles/Common";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const currentUser = useAuth((state) => state.currentUser);
  const isOwner = currentUser?._id === product?.seller?._id;
  const stock = product?.quantity ?? 1;
  const isOutOfStock = stock < 1 || product?.status === "SOLD";

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/product-api/${id}`)
      .then((res) => {
        setProduct(res.data.payload);
        setQuantity((res.data.payload.quantity ?? 1) > 0 ? 1 : 0);
      })
      .catch((err) => setErrMsg(err.response?.data?.message || "Failed to load product"));
  }, [id]);

  const addToCart = async () => {
    try {
      setErrMsg("");
      setSuccessMsg("");

      await axios.post(
        `${API_BASE_URL}/cart-api/${id}`,
        { quantity },
        {
          withCredentials: true,
        }
      );

      setSuccessMsg("Added to cart");
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Failed to add to cart");
    }
  };

  const deleteProduct = async () => {
    if (!window.confirm("Delete this product?")) return;

    try {
      setErrMsg("");
      setSuccessMsg("");

      await axios.delete(`${API_BASE_URL}/product-api/${id}`, {
        withCredentials: true,
      });

      navigate("/my-products");
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Failed to delete product");
    }
  };

  if (!product && !errMsg)
    return <h2 className="text-center py-20">Loading...</h2>;

  if (!product && errMsg)
    return <h2 className="text-center py-20 text-red-500">{errMsg}</h2>;

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">

      <div className="grid md:grid-cols-2 gap-12">

          <img
            src={product.image}
            alt={product.title}
            className="rounded-3xl w-full h-[450px] object-cover shadow-md"
          />

        <div>

          <h1 className="text-4xl font-bold text-[#4F4B47]">
            {product.title}
          </h1>

          <p className="mt-6 text-gray-600">
            {product.description}
          </p>

          <h2 className="text-3xl font-bold text-[#A3B18A] mt-8">
            ₹ {product.price}
          </h2>

          <div className="mt-5 space-y-2">

            <p>
              <b>Category:</b> {product.category}
            </p>

            <p>
              <b>Condition:</b> {product.condition}
            </p>

            <p>
              <b>Stock:</b>{" "}
              <span className={isOutOfStock ? "text-[#B66A6A] font-semibold" : ""}>
                {isOutOfStock ? "Out of stock" : `${stock} available`}
              </span>
            </p>

            <p>
              <b>Seller:</b> {product.seller?.name}
            </p>

            <p>
              <b>Email:</b> {product.seller?.email}
            </p>

            <p>
              <b>Phone:</b> {product.seller?.mobile}
            </p>

          </div>

          {errMsg && <p className="mt-6 text-sm text-red-500">{errMsg}</p>}
          {successMsg && <p className="mt-6 text-sm text-green-600">{successMsg}</p>}

          {isOwner && (
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={`/update-product/${product._id}`}
                className={btnSecondary}
              >
                Update Product
              </Link>

              <button
                type="button"
                onClick={deleteProduct}
                className={btnDanger}
              >
                Delete Product
              </button>
            </div>
          )}

          {currentUser && !isOwner && (
            <div className="mt-8 flex flex-wrap items-end gap-4">
              <label className="text-sm font-medium text-[#6E6964]">
                Quantity
                <input
                  type="number"
                  min="1"
                  max={stock}
                  value={quantity}
                  disabled={isOutOfStock}
                  onChange={(e) => {
                    const nextQuantity = Number(e.target.value);
                    setQuantity(Math.max(1, Math.min(stock, nextQuantity)));
                  }}
                  className="mt-2 block w-28 border border-[#E5E3DE] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#A3B18A]/30"
                />
              </label>

              <button
                onClick={addToCart}
                disabled={isOutOfStock || quantity < 1 || quantity > stock}
                className="bg-[#A3B18A] text-white px-8 py-3 rounded-xl hover:bg-[#8F9D77] disabled:cursor-not-allowed disabled:bg-[#C9C4BA]"
              >
                {isOutOfStock ? "Out of Stock" : "Add To Cart"}
              </button>
            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;
