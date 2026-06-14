import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { API_BASE_URL } from "../config/api";
import { btnDanger, btnSecondary, campaignGrid } from "../styles/Common";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const loadProducts = () => {
    return axios
      .get(`${API_BASE_URL}/product-api/my/products`, {
        withCredentials: true,
      })
      .then((res) => setProducts(res.data.payload || []));
  };

  useEffect(() => {
    loadProducts()
      .catch((err) => setErrMsg(err.response?.data?.message || "Failed to load your products"));
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      setErrMsg("");

      await axios.delete(`${API_BASE_URL}/product-api/${id}`, {
        withCredentials: true,
      });

      await loadProducts();
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-6">

      <h1 className="text-4xl font-bold mb-10">
        My Products
      </h1>

      {errMsg && <p className="mb-5 text-sm text-red-500">{errMsg}</p>}

      {!errMsg && products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No Products Added Yet
        </div>
      ) : !errMsg && (
        <div className={campaignGrid}>

          {products.map((product) => (
            (() => {
              const stock = product.quantity ?? 1;

              return (
            <div
              key={product._id}
              className="bg-white rounded-3xl overflow-hidden border border-[#ECEAE5] shadow-sm"
            >
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-56 object-cover"
                />
              </Link>

              <div className="p-5">
                <div className="flex justify-between items-start gap-4">
                  <Link
                    to={`/product/${product._id}`}
                    className="text-xl font-semibold text-[#4F4B47] hover:text-[#A3B18A]"
                  >
                    {product.title}
                  </Link>

                  <span className="bg-[#EEF3E8] text-[#7C8E65] px-3 py-1 rounded-full text-xs font-semibold">
                    {product.status}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mt-5">
                  <h3 className="text-2xl font-bold text-[#A3B18A]">
                    ₹ {product.price}
                  </h3>

                  <span className={stock < 1 ? "text-sm font-semibold text-[#B66A6A]" : "text-sm text-[#7C8E65]"}>
                    {stock < 1 ? "Out of stock" : `${stock} in stock`}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to={`/update-product/${product._id}`}
                    className={btnSecondary}
                  >
                    Update
                  </Link>

                  <button
                    type="button"
                    onClick={() => deleteProduct(product._id)}
                    className={btnDanger}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
              );
            })()
          ))}

        </div>
      )}
    </div>
  );
}

export default MyProducts;
