import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

function ProductManagement() {

  const [products, setProducts] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const loadProducts = () => {

    return axios
      .get(`${API_BASE_URL}/admin-api/products`, {
        withCredentials: true,
      })
      .then((res) => setProducts(res.data.payload || []));

  };

  useEffect(() => {
    loadProducts().catch((err) => setErrMsg(err.response?.data?.message || "Failed to load products"));
  }, []);

  const deleteProduct = async (id) => {
    try {
      setErrMsg("");

      await axios.delete(
        `${API_BASE_URL}/admin-api/products/${id}`,
        {
          withCredentials: true,
        }
      );

      await loadProducts();
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Failed to delete product");
    }
  };

  return (

    <div className="max-w-7xl mx-auto py-16">

      <h1 className="text-4xl font-bold mb-8">
        Product Management
      </h1>

      {errMsg && <p className="mb-5 text-sm text-red-500">{errMsg}</p>}

      <table className="w-full bg-white rounded-3xl shadow overflow-hidden">

        <thead className="bg-[#A3B18A] text-white">

          <tr>

            <th className="p-4">Image</th>

            <th>Title</th>

            <th>Price</th>

            <th>Seller</th>

            <th>Status</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr key={product._id} className="border-b">

              <td className="p-4">

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-20 h-20 rounded-xl object-cover"
                />

              </td>

              <td>{product.title}</td>

              <td>₹ {product.price}</td>

              <td>{product.seller?.name}</td>

              <td>{product.status}</td>

              <td>

                <button
                  onClick={() => deleteProduct(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ProductManagement;
