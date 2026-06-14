import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import ProductCard from "./ProductCard";
import {
  pageBackground,
  pageWrapper,
  pageTitle,
  body,
  btnPrimary,
  btnSecondary,
  campaignGrid,
  card,
  heading,
  loading,
} from "../styles/Common";

function Home() {
  const [recentProducts, setRecentProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    axios
      .get(`${API_BASE_URL}/product-api`)
      .then((res) => {
        if (!ignore) {
          setRecentProducts((res.data.payload || []).slice(0, 3));
        }
      })
      .catch(() => {
        if (!ignore) {
          setRecentProducts([]);
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

  return (
    <div className={pageBackground}>
      <div className={pageWrapper}>
        {/* Hero Section */}
        <section className="py-20 text-center">
          <h1 className={pageTitle}>
            Buy & Sell on Your Campus
          </h1>

          <p className={`${body} max-w-2xl mx-auto mt-6`}>
            Give your unused items a second life. Find affordable books,
            electronics, furniture, cycles, and more from fellow students.
          </p>

          <div className="flex justify-center gap-4 mt-10">
            <Link to="/products" className={btnPrimary}>
              Browse Products
            </Link>

            <Link to="/add-product" className={btnSecondary}>
              Sell an Item
            </Link>
          </div>
        </section>

        {/* Features */}

        <section className="mt-24">
          <h2 className={`${heading} text-center mb-12`}>
            Why Campus Resell?
          </h2>

          <div className={campaignGrid}>
            <div className={card}>
              <h3 className="font-semibold text-xl mb-3 text-[#4F4B47]">
                Affordable Prices
              </h3>

              <p className={body}>
                Buy second-hand products from seniors and classmates at
                student-friendly prices.
              </p>
            </div>

            <div className={card}>
              <h3 className="font-semibold text-xl mb-3 text-[#4F4B47]">
                Sustainable
              </h3>

              <p className={body}>
                Reduce waste and promote reuse by giving products another
                chance.
              </p>
            </div>

            <div className={card}>
              <h3 className="font-semibold text-xl mb-3 text-[#4F4B47]">
                Trusted Campus Community
              </h3>

              <p className={body}>
                Buy and sell only within your college using verified student
                accounts.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <h2 className={heading}>Recently Listed</h2>
              <p className={`${body} mt-2`}>
                Fresh items added by students across campus.
              </p>
            </div>

            <Link to="/products" className={btnSecondary}>
              View All Products
            </Link>
          </div>

          {isLoading && <p className={loading}>Loading recent products...</p>}

          {!isLoading && recentProducts.length > 0 && (
            <div className={campaignGrid}>
              {recentProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {!isLoading && recentProducts.length === 0 && (
            <div className="bg-white border border-[#ECEAE5] rounded-2xl p-8 text-center text-[#8A847F]">
              No recent products yet.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Home;
