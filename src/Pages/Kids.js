import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaArrowRight, FaStar, FaTruck, FaShieldAlt, FaUndo } from "react-icons/fa";
import ProductCart from "../Componets/ProductCart"; 

export default function Kids() {
  const [api, setApi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://65c31d21f7e6ea59682bf827.mockapi.io/playo")
      .then((response) => {
        const kidsProducts = response.data.filter(
          (product) => product.category === "Kids"
        );
        setApi(kidsProducts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const SkeletonCard = () => (
    <div className="animate-pulse bg-white rounded-lg shadow-md p-4">
      <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-blue-50">

      {/* ---------------------- HERO ---------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-r from-pink-600 via-yellow-400 to-blue-500 text-white py-16 md:py-20">
        <div className="absolute inset-0 bg-black/15"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Kids' Wonderland
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl mb-6 opacity-95">
            Fun, colorful & comfy outfits for little explorers!
          </p>

          <button className="bg-white text-pink-600 px-7 py-3 rounded-full font-bold text-base sm:text-lg shadow-xl hover:bg-yellow-100 hover:scale-105 transition-all flex items-center mx-auto">
            Explore Fun
            <FaArrowRight className="ml-2" />
          </button>
        </div>

        {/* Soft floating glow elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-400/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-pink-400/30 rounded-full blur-2xl animate-pulse"></div>
      </section>

      {/* ---------------------- BANNERS ---------------------- */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* Banner 1 */}
            <div className="relative rounded-2xl p-8 text-center shadow-xl bg-gradient-to-br from-pink-500 to-rose-600 text-white hover:scale-105 transition-all duration-300">
              <FaStar className="mx-auto text-4xl mb-3 opacity-90" />
              <h3 className="text-xl font-bold mb-1">🎈 30% Off Kids' Wear</h3>
              <p className="text-sm mb-4 opacity-90">Make playtime stylish.</p>
              <button className="bg-white text-pink-600 px-5 py-2 rounded-full font-semibold shadow hover:bg-opacity-90 transition">
                Shop Kids
              </button>
            </div>

            {/* Banner 2 */}
            <div className="relative rounded-2xl p-8 text-center shadow-xl bg-gradient-to-br from-yellow-500 to-orange-600 text-white hover:scale-105 transition-all duration-300">
              <FaTruck className="mx-auto text-4xl mb-3 opacity-90" />
              <h3 className="text-xl font-bold mb-1">🚚 Free Shipping</h3>
              <p className="text-sm mb-4 opacity-90">On orders over $30.</p>
              <button className="bg-white text-yellow-600 px-5 py-2 rounded-full font-semibold shadow hover:bg-opacity-90 transition">
                Fast Delivery
              </button>
            </div>

            {/* Banner 3 */}
            <div className="relative rounded-2xl p-8 text-center shadow-xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white hover:scale-105 transition-all duration-300">
              <FaUndo className="mx-auto text-4xl mb-3 opacity-90" />
              <h3 className="text-xl font-bold mb-1">🔄 Easy Returns</h3>
              <p className="text-sm mb-4 opacity-90">30-day hassle-free.</p>
              <button className="bg-white text-blue-600 px-5 py-2 rounded-full font-semibold shadow hover:bg-opacity-90 transition">
                Return Policy
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------------- PRODUCTS ---------------------- */}
      <section className="py-14 bg-gradient-to-b from-white to-pink-50">
        <div className="container mx-auto px-4 text-center">

          <h2 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
            Fun Kids' Collection
          </h2>
          <p className="text-gray-600 mb-10 max-w-xl mx-auto">
            Outfits that spark imagination and comfort.
          </p>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {api.map((item) => (
                <ProductCart key={item.id} {...item} />
              ))}
            </div>
          )}

          {!loading && api.length === 0 && (
            <p className="text-gray-500 mt-10">No kids products found.</p>
          )}
        </div>
      </section>

      {/* ---------------------- TRUST BADGES ---------------------- */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">

            <div className="flex flex-col items-center">
              <FaStar className="text-4xl text-yellow-500 mb-3" />
              <h3 className="text-xl font-bold">4.8/5 Rating</h3>
              <p className="text-gray-600">Loved by 5k+ parents</p>
            </div>

            <div className="flex flex-col items-center">
              <FaTruck className="text-4xl text-green-500 mb-3" />
              <h3 className="text-xl font-bold">Fast Delivery</h3>
              <p className="text-gray-600">1–2 Day Shipping</p>
            </div>

            <div className="flex flex-col items-center">
              <FaShieldAlt className="text-4xl text-blue-500 mb-3" />
              <h3 className="text-xl font-bold">Safe Materials</h3>
              <p className="text-gray-600">Kid-friendly fabrics</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
