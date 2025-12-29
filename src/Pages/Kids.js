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
          <a href="#kidsproduct">Explore Fun</a>  
            <FaArrowRight className="ml-2" />
          </button>
        </div>

        {/* Soft floating glow elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-400/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-pink-400/30 rounded-full blur-2xl animate-pulse"></div>
      </section>

      {/* ---------------------- BANNERS ---------------------- */}
{/* ---------------------- CREATIVE KIDS SECTION ---------------------- */}
<section className="py-14 bg-gradient-to-r from-pink-50 via-yellow-50 to-blue-50">
  <div className="container mx-auto px-4">

    {/* Heading */}
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-pink-600">
        Why Kids Love Our Collection 💖
      </h2>
      <p className="text-gray-600 mt-2 max-w-xl mx-auto">
        Designed with fun, comfort, and safety in mind.
      </p>
    </div>

    {/* Creative Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {/* Card 1 */}
      <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition">
        <div className="text-4xl mb-3">🎨</div>
        <h4 className="font-bold text-lg mb-1">Bright Colors</h4>
        <p className="text-sm text-gray-600">
          Fun designs kids absolutely love.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition">
        <div className="text-4xl mb-3">🧸</div>
        <h4 className="font-bold text-lg mb-1">Soft & Comfy</h4>
        <p className="text-sm text-gray-600">
          Gentle fabrics for all-day comfort.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition">
        <div className="text-4xl mb-3">🛡️</div>
        <h4 className="font-bold text-lg mb-1">Safe Materials</h4>
        <p className="text-sm text-gray-600">
          Kid-friendly & skin-safe quality.
        </p>
      </div>

      {/* Card 4 */}
      <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition">
        <div className="text-4xl mb-3">🎁</div>
        <h4 className="font-bold text-lg mb-1">Perfect Gifts</h4>
        <p className="text-sm text-gray-600">
          Ideal for birthdays & special days.
        </p>
      </div>

    </div>
  </div>
</section>

      {/* ---------------------- PRODUCTS ---------------------- */}
      <section className="py-14 bg-gradient-to-b from-white to-pink-50" id="kidsproduct">
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
