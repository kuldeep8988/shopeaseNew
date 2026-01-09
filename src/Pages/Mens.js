import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaArrowRight, FaStar, FaTruck, FaShieldAlt, FaUndo } from "react-icons/fa";
import ProductCart from "../Componets/ProductCart";

export default function Mens() {
  const [api, setApi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://65c31d21f7e6ea59682bf827.mockapi.io/playo")
      .then((res) => {
        setApi(res.data.filter((item) => item.category === "Men"));
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gray-800 via-blue-900 to-indigo-900 text-white py-16 md:py-20">
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Men's Essentials
          </h1>
          <p className="text-lg md:text-2xl mb-8 opacity-90">
            Timeless style meets modern comfort for the confident man.
          </p>
          <button className="flex items-center gap-2 mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition-all">
            Shop Now <FaArrowRight />
          </button>
        </div>x

        {/* Floating particles */}
        <div className="absolute top-8 left-8 w-16 h-16 bg-blue-400/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-8 right-8 w-28 h-28 bg-indigo-400/20 rounded-full blur-xl animate-float delay-700"></div>
      </section>

      {/* DISCOUNT BANNERS */}
   <section className="py-14 bg-gray-100">
  <div className="container mx-auto px-4">

    {/* Heading */}
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
        Crafted for Modern Men
      </h2>
      <p className="text-gray-600 mt-2 max-w-xl mx-auto">
        Clean design, strong fabric, and everyday confidence.
      </p>
    </div>

    {/* Feature Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {/* Card 1 */}
      <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition">
        <div className="text-3xl mb-3">👔</div>
        <h4 className="font-bold text-lg mb-1">Sharp Fit</h4>
        <p className="text-sm text-gray-600">
          Tailored cuts for a confident look.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition">
        <div className="text-3xl mb-3">🧵</div>
        <h4 className="font-bold text-lg mb-1">Premium Fabric</h4>
        <p className="text-sm text-gray-600">
          Durable, breathable, long-lasting.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition">
        <div className="text-3xl mb-3">⚙️</div>
        <h4 className="font-bold text-lg mb-1">Everyday Comfort</h4>
        <p className="text-sm text-gray-600">
          Built for work, travel, and weekends.
        </p>
      </div>

      {/* Card 4 */}
      <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition">
        <div className="text-3xl mb-3">✔️</div>
        <h4 className="font-bold text-lg mb-1">Quality Checked</h4>
        <p className="text-sm text-gray-600">
          Trusted materials & stitching.
        </p>
      </div>

    </div>
  </div>
</section>


      {/* PRODUCT SECTION */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-blue-800 bg-clip-text text-transparent">
            Men's Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-10">
            Classic styles and modern fits for every occasion.
          </p>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {api.map((item) => (
                <ProductCart key={item.id} {...item} />
              ))}
            </div>
          )}

          {!loading && api.length === 0 && (
            <p className="text-gray-500 mt-10">No men's products available.</p>
          )}
        </div>
      </section>

      {/* TRUST BADGES */}
    {/* TRUST BADGES */}
<section className="py-12 bg-white">
  <div className="
    container mx-auto px-4 
    grid grid-cols-1 sm:grid-cols-3 
    gap-6 sm:gap-8 
    text-center
  ">

    {/* Badge 1 */}
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <FaStar className="text-3xl sm:text-4xl text-yellow-500 mb-3 mx-auto" />
      <h3 className="text-lg sm:text-xl font-bold">4.9/5 Rating</h3>
      <p className="text-gray-600 text-sm sm:text-base">From 15k+ customers</p>
    </div>

    {/* Badge 2 */}
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <FaTruck className="text-3xl sm:text-4xl text-green-500 mb-3 mx-auto" />
      <h3 className="text-lg sm:text-xl font-bold">Fast Delivery</h3>
      <p className="text-gray-600 text-sm sm:text-base">2–3 day shipping</p>
    </div>

    {/* Badge 3 */}
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <FaUndo className="text-3xl sm:text-4xl text-blue-500 mb-3 mx-auto" />
      <h3 className="text-lg sm:text-xl font-bold">Easy Returns</h3>
      <p className="text-gray-600 text-sm sm:text-base">30-day guarantee</p>
    </div>

  </div>
</section>


    </div>
  );
}
