import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  FaArrowRight,
  FaStar,
  FaTruck,
  FaShieldAlt,
  FaUndo,
} from "react-icons/fa";
import ProductCart from "../Componets/ProductCart";

export default function Home() {
  const [api, setApi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://65c31d21f7e6ea59682bf827.mockapi.io/playo")
      .then((response) => {
        setApi(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const productsToShow = showAll ? api : api.slice(0, 8);

  // ---------------- Skeleton Loader ----------------
  const SkeletonCard = () => (
    <div className="animate-pulse bg-white rounded-lg shadow-md p-2 sm:p-4 w-full">
      <div className="h-28 xs:h-32 sm:h-44 bg-gray-300 rounded-lg mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-4/5 mb-1"></div>
      <div className="h-2 bg-gray-300 rounded w-2/4"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 scroll-smooth">

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white py-10 sm:py-14 md:py-20">
        <div className="absolute inset-0 bg-black/25"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent leading-tight">
            Welcome to hiiii
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 opacity-90 max-w-lg mx-auto">
            Discover amazing deals on your favorite products
          </p>

          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 sm:px-8 py-3 rounded-full font-bold text-base sm:text-lg shadow-lg hover:scale-105 transition duration-300 inline-flex items-center">
            Shop Now <FaArrowRight className="ml-2" />
          </button>
        </div>

        {/* Floating Lights */}
        <div className="absolute top-6 left-4 w-14 sm:w-20 h-14 sm:h-20 bg-yellow-400/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-6 right-4 w-20 sm:w-32 h-20 sm:h-32 bg-orange-400/20 rounded-full blur-xl animate-float animation-delay-1000"></div>
      </section>

      {/* ---------------- DISCOUNT BANNERS ---------------- */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

            {/* Banner 1 */}
            <div className="rounded-2xl p-5 sm:p-7 bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-xl transition hover:scale-105">
              <FaStar className="text-3xl sm:text-4xl mx-auto mb-3" />
              <h3 className="text-xl font-bold text-center">🎉 30% OFF Everything!</h3>
              <p className="text-sm text-center mb-3">Limited time offer</p>
              <button className="bg-white text-teal-600 px-5 py-2 rounded-full font-semibold text-sm mx-auto block">
                Grab Deal
              </button>
            </div>

            {/* Banner 2 */}
            <div className="rounded-2xl p-5 sm:p-7 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl transition hover:scale-105">
              <FaTruck className="text-3xl sm:text-4xl mx-auto mb-3" />
              <h3 className="text-xl font-bold text-center">🚚 Free Shipping</h3>
              <p className="text-sm text-center mb-3">Orders over $50</p>
              <button className="bg-white text-green-600 px-5 py-2 rounded-full font-semibold text-sm mx-auto block">
                Learn More
              </button>
            </div>

            {/* Banner 3 */}
            <div className="rounded-2xl p-5 sm:p-7 bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl transition hover:scale-105">
              <FaShieldAlt className="text-3xl sm:text-4xl mx-auto mb-3" />
              <h3 className="text-xl font-bold text-center">🛡️ Secure Shopping</h3>
              <p className="text-sm text-center mb-3">100% safe checkout</p>
              <button className="bg-white text-blue-600 px-5 py-2 rounded-full font-semibold text-sm mx-auto block">
                Shop Safe
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------- FEATURED PRODUCTS ---------------- */}
      <section className="py-10 sm:py-14 bg-gradient-to-b from-white to-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
              Explore our top picks and best sellers.
            </p>
          </div>

          {/* PRODUCT GRID FIXED FOR 320px */}
          {loading ? (
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {productsToShow.map((item) => (
                <ProductCart key={item.id} {...item} />
              ))}
            </div>
          )}

          {!loading && (
            <div className="text-center mt-8">
              <button
                onClick={toggleShowAll}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 sm:px-8 py-2.5 rounded-full font-semibold text-base hover:scale-105 transition-all"
              >
                {showAll ? "Show Less" : "View All Products"}{" "}
                <FaArrowRight className="ml-2 inline" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ---------------- TRUST BADGES ---------------- */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center">

            <div>
              <FaStar className="text-3xl sm:text-4xl text-yellow-500 mx-auto mb-2" />
              <h3 className="font-bold text-sm sm:text-lg">4.9/5 Stars</h3>
              <p className="text-xs sm:text-sm text-gray-600">10k+ customers</p>
            </div>

            <div>
              <FaTruck className="text-3xl sm:text-4xl text-green-500 mx-auto mb-2" />
              <h3 className="font-bold text-sm sm:text-lg">Fast Delivery</h3>
              <p className="text-xs sm:text-sm text-gray-600">2–3 days</p>
            </div>

            <div>
              <FaUndo className="text-3xl sm:text-4xl text-blue-500 mx-auto mb-2" />
              <h3 className="font-bold text-sm sm:text-lg">Easy Returns</h3>
              <p className="text-xs sm:text-sm text-gray-600">30-day refund</p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
