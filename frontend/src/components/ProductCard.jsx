import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const stock = product.quantity ?? 1;
  const isOutOfStock = stock < 1 || product.status === "SOLD";

  return (
    <Link
      to={`/product/${product._id}`}
      className="bg-white rounded-3xl overflow-hidden border border-[#ECEAE5] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold text-[#4F4B47]">
            {product.title}
          </h2>

          <span className="bg-[#EEF3E8] text-[#7C8E65] px-3 py-1 rounded-full text-xs font-semibold">
            {product.condition}
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-5">
          <h3 className="text-2xl font-bold text-[#A3B18A]">
            ₹ {product.price}
          </h3>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isOutOfStock
                ? "bg-[#F7E8E8] text-[#B66A6A]"
                : "bg-[#EEF3E8] text-[#7C8E65]"
            }`}
          >
            {isOutOfStock ? "Out of stock" : `${stock} in stock`}
          </span>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          {product.category}
        </p>

        <div className="mt-4 pt-4 border-t text-sm text-gray-500">
          Seller:{" "}
          <span className="font-medium text-[#4F4B47]">
            {product.seller?.name}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
