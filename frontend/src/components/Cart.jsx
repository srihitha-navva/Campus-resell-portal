import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import {
  btnDanger,
  btnSecondary,
  emptyState,
  error,
  heading,
  pageBackground,
  pageWrapper,
} from "../styles/Common";

function Cart() {
  const [cart, setCart] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const loadCart = async () => {
    const res = await axios.get(`${API_BASE_URL}/cart-api`, {
      withCredentials: true,
    });

    setCart(res.data.payload);
  };

  useEffect(() => {
    let ignore = false;

    axios
      .get(`${API_BASE_URL}/cart-api`, {
        withCredentials: true,
      })
      .then((res) => {
        if (!ignore) {
          setCart(res.data.payload || []);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setErrMsg(err.response?.data?.message || "Failed to load cart");
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const removeItem = async (item) => {
    try {
      setErrMsg("");

      await axios.delete(`${API_BASE_URL}/cart-api/item/${item._id}`, {
        withCredentials: true,
      });

      await loadCart();
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Failed to remove item");
    }
  };

  const updateQuantity = async (item, quantity) => {
    if (quantity < 1) return;

    try {
      setErrMsg("");

      await axios.put(
        `${API_BASE_URL}/cart-api/item/${item._id}`,
        { quantity },
        {
          withCredentials: true,
        }
      );

      await loadCart();
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Failed to update quantity");
    }
  };

  const clearCart = async () => {
    try {
      setErrMsg("");

      await axios.delete(`${API_BASE_URL}/cart-api`, {
        withCredentials: true,
      });

      await loadCart();
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Failed to clear cart");
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <div className={pageBackground}>
    <div className={pageWrapper}>

      <div className="flex justify-between items-center mb-8">

        <h1 className={heading}>
          My Cart
        </h1>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className={btnSecondary}
          >
            Clear Cart
          </button>
        )}

      </div>

      {errMsg && (
        <p className={`${error} mb-5`}>
          {errMsg}
        </p>
      )}

      {cart.length === 0 && !errMsg && (
        <div className={emptyState}>Your cart is empty.</div>
      )}

      <div className="space-y-5">

        {cart.map((item) => (
          (() => {
            const stock = item.product ? item.product.quantity ?? 1 : 0;
            const isOutOfStock = !item.product || item.product.status === "SOLD" || stock < 1;
            const isOverStock = item.quantity > stock;

            return (
              <div
                key={item._id}
                className="bg-white rounded-2xl border border-[#ECEAE5] shadow-sm p-5 flex flex-col md:flex-row gap-5 md:items-center"
              >
                {item.product ? (
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-28 h-28 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-xl bg-[#F4F2EE]" />
                )}

                <div className="flex-1">

                  <h2 className="font-bold text-xl text-[#4F4B47]">
                    {item.product?.title || "Product unavailable"}
                  </h2>

                  <p className="text-[#A3B18A] font-semibold">
                    ₹ {item.product?.price || 0}
                  </p>

                  {item.product && (
                    <p className={isOutOfStock || isOverStock ? "mt-2 text-sm text-[#B66A6A]" : "mt-2 text-sm text-[#7C8E65]"}>
                      {isOutOfStock
                        ? "Out of stock"
                        : isOverStock
                          ? `Only ${stock} available. Please reduce quantity.`
                          : `${stock} in stock`}
                    </p>
                  )}

                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item, item.quantity - 1)}
                    disabled={item.quantity <= 1 || isOutOfStock}
                    className="w-10 h-10 rounded-lg border border-[#D8D4CE] text-[#5F5B57] disabled:cursor-not-allowed disabled:text-[#C9C4BA]"
                  >
                    -
                  </button>

                  <input
                    type="number"
                    min="1"
                    max={stock}
                    value={item.quantity}
                    disabled={isOutOfStock}
                    onChange={(e) => {
                      const nextQuantity = Number(e.target.value);
                      if (Number.isInteger(nextQuantity)) {
                        updateQuantity(item, nextQuantity);
                      }
                    }}
                    className="w-20 h-10 text-center rounded-lg border border-[#D8D4CE] text-[#4F4B47]"
                  />

                  <button
                    type="button"
                    onClick={() => updateQuantity(item, item.quantity + 1)}
                    disabled={isOutOfStock || item.quantity >= stock}
                    className="w-10 h-10 rounded-lg border border-[#D8D4CE] text-[#5F5B57] disabled:cursor-not-allowed disabled:text-[#C9C4BA]"
                  >
                    +
                  </button>
                </div>

                <div className="text-right min-w-28">
                  <p className="text-sm text-[#8A847F]">Subtotal</p>
                  <p className="text-xl font-bold text-[#4F4B47]">
                    ₹ {(item.product?.price || 0) * item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item)}
                  className={btnDanger}
                >
                  Remove
                </button>

              </div>
            );
          })()

        ))}

      </div>

      {cart.length > 0 && (
      <h2 className="text-3xl font-bold mt-10 text-[#4F4B47]">
        Total : ₹ {total}
      </h2>
      )}

    </div>
    </div>
  );
}

export default Cart;
