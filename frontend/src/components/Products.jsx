import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { API_BASE_URL } from "../config/api";
import ProductCard from "./ProductCard";
import {
  bodySmall,
  campaignGrid,
  emptyState,
  error,
  heading,
  input,
  loading,
  pageBackground,
  pageWrapper,
} from "../styles/Common";

const categories = [
  "All",
  "Electronics",
  "Books",
  "Furniture",
  "Cycles",
  "Sports",
  "Clothing",
  "Accessories",
  "Others",
];

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [availability, setAvailability] = useState("available");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    let ignore = false;

    axios
      .get(`${API_BASE_URL}/product-api`)
      .then((res) => {
        if (!ignore) {
          setProducts(res.data.payload || []);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setErrMsg(err.response?.data?.message || "Failed to load products");
        }
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const visibleProducts = useMemo(() => {
    return products
      .filter((product) => {
        const stock = product.quantity ?? 1;
        const searchText = `${product.title} ${product.description} ${product.category}`.toLowerCase();
        const matchesSearch = searchText.includes(search.trim().toLowerCase());
        const matchesCategory = category === "All" || product.category === category;
        const matchesAvailability =
          availability === "all" ||
          (availability === "available" && stock > 0 && product.status !== "SOLD") ||
          (availability === "out" && (stock < 1 || product.status === "SOLD"));

        return matchesSearch && matchesCategory && matchesAvailability;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "stock") return (b.quantity ?? 1) - (a.quantity ?? 1);

        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });
  }, [availability, category, products, search, sortBy]);

  return (
    <div className={pageBackground}>
      <div className={pageWrapper}>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <h1 className={heading}>Available Products</h1>
            <p className={`${bodySmall} mt-2`}>
              Search, filter, and compare items from your campus marketplace.
            </p>
          </div>

          {!isLoading && !errMsg && (
            <p className="text-sm font-semibold text-[#7C8E65]">
              {visibleProducts.length} of {products.length} shown
            </p>
          )}
        </div>

        <div className="bg-white border border-[#ECEAE5] rounded-2xl p-4 mb-10 grid gap-4 md:grid-cols-4">
          <input
            className={input}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products"
          />

          <select
            className={input}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            className={input}
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          >
            <option value="available">In stock only</option>
            <option value="all">All products</option>
            <option value="out">Out of stock</option>
          </select>

          <select
            className={input}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="stock">Most stock</option>
          </select>
        </div>

        {isLoading && <p className={loading}>Loading products...</p>}

        {errMsg && <p className={error}>{errMsg}</p>}

        {!isLoading && !errMsg && products.length === 0 && (
          <div className={emptyState}>No products available right now.</div>
        )}

        {!isLoading && !errMsg && products.length > 0 && visibleProducts.length === 0 && (
          <div className={emptyState}>No products match your filters.</div>
        )}

        {!isLoading && !errMsg && visibleProducts.length > 0 && (
          <div className={campaignGrid}>
            {visibleProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
