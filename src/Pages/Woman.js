import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaArrowRight, FaStar, FaTruck, FaShieldAlt, FaUndo } from "react-icons/fa";
import { FaCrown, FaLeaf, FaGem, FaFeatherAlt } from "react-icons/fa";

import ProductCart from "../Componets/ProductCart";

export default function Woman() {
  const [api, setApi] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Product Data
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://65c31d21f7e6ea59682bf827.mockapi.io/playo")
      .then((response) => {
        const womenProducts = response.data.filter(
          (product) => product.category === "Women"
        );
        setApi(womenProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Skeleton Loader
  const SkeletonCard = () => (
    <div className="animate-pulse bg-white rounded-lg shadow-md p-4">
      <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-r from-rose-600 via-pink-500 to-purple-600 text-white py-16 md:py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-3 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
            Women's Grace
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl mb-6 opacity-90">
            Elegant designs & timeless pieces for the modern woman.
          </p>

          <button className="bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-xl hover:bg-pink-100 transition-all duration-300">
            Discover Elegance <FaArrowRight className="ml-2 inline" />
          </button>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-pink-400/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-purple-400/30 rounded-full blur-xl"></div>
        <div className="absolute top-1/4 right-1/4 w-14 h-14 bg-rose-400/30 rounded-full blur-xl"></div>
      </section>

      {/* DISCOUNT BANNERS */}
      
    
<section className="py-20 bg-[#faf7f5]">
  <div className="max-w-7xl mx-auto px-4">

    {/* Heading */}
    <div className="max-w-2xl mb-14">
      <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
        Crafted for Modern Women
      </h2>
      <p className="mt-4 text-gray-600 text-base sm:text-lg">
        Elevated essentials designed with precision, comfort, and timeless style.
      </p>
    </div>

    {/* Feature Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {/* Card 1 */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-rose-300 transition group">
        <div className="h-12 w-12 rounded-xl bg-rose-100 flex items-center justify-center mb-4 group-hover:scale-110 transition">
          <FaCrown className="text-rose-500 text-xl" />
        </div>
        <h4 className="text-lg font-medium text-gray-900 mb-2">
          Timeless Silhouettes
        </h4>
        <p className="text-sm text-gray-600">
          Designs that stay relevant beyond seasonal trends.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-emerald-300 transition group">
        <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4 group-hover:scale-110 transition">
          <FaLeaf className="text-emerald-600 text-xl" />
        </div>
        <h4 className="text-lg font-medium text-gray-900 mb-2">
          Premium Fabrics
        </h4>
        <p className="text-sm text-gray-600">
          Carefully sourced materials with a refined finish.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-amber-300 transition group">
        <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4 group-hover:scale-110 transition">
          <FaGem className="text-amber-500 text-xl" />
        </div>
        <h4 className="text-lg font-medium text-gray-900 mb-2">
          Thoughtful Details
        </h4>
        <p className="text-sm text-gray-600">
          Subtle finishes and clean tailoring in every piece.
        </p>
      </div>

      {/* Card 4 */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-purple-300 transition group">
        <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4 group-hover:scale-110 transition">
          <FaFeatherAlt className="text-purple-600 text-xl" />
        </div>
        <h4 className="text-lg font-medium text-gray-900 mb-2">
          Everyday Elegance
        </h4>
        <p className="text-sm text-gray-600">
          Effortless pieces for work, travel, and beyond.
        </p>
      </div>

    </div>
  </div>
</section>

      {/* PRODUCT LIST */}
      <section className="py-14 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4">

          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              Women's Collection
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
              Explore elegant, stylish & premium fashion curated just for you.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {api.map((item) => (
                <ProductCart key={item.id} {...item} />
              ))}
            </div>
          )}

          {!loading && api.length === 0 && (
            <div className="text-center mt-8 text-gray-500">
              No women's products available right now.
            </div>
          )}
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">

          {/* Badge 1 */}
          <div className="bg-pink-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <FaStar className="text-3xl sm:text-4xl text-yellow-500 mb-3 mx-auto" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">4.9/5 Rating</h3>
            <p className="text-gray-600 text-sm">Loved by 12k+ women</p>
          </div>

          {/* Badge 2 */}
          <div className="bg-purple-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <FaTruck className="text-3xl sm:text-4xl text-green-500 mb-3 mx-auto" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">Fast Delivery</h3>
            <p className="text-gray-600 text-sm">1–2 days express</p>
          </div>

          {/* Badge 3 */}
          <div className="bg-rose-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <FaUndo className="text-3xl sm:text-4xl text-pink-500 mb-3 mx-auto" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">Easy Returns</h3>
            <p className="text-gray-600 text-sm">30-day guarantee</p>
          </div>

        </div>
      </section>

    </div>
  );
}
