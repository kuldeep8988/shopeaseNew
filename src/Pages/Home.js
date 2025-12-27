import axios from "axios";
import React, { useEffect, useState } from "react";
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
    axios
      .get("https://65c31d21f7e6ea59682bf827.mockapi.io/playo")
      .then((res) => {
        setApi(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const productsToShow = showAll ? api : api.slice(0, 8);

  const SkeletonCard = () => (
    <div className="animate-pulse bg-white rounded-xl border p-3 shadow-sm">
      <div className="h-36 bg-gray-200 rounded-lg mb-3" />
      <div className="h-3 bg-gray-200 rounded w-4/5 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-2/5" />
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600" />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center text-white">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Discover <span className="text-yellow-300">Amazing Deals</span>
          </h1>
          <p className="max-w-xl mx-auto text-base sm:text-lg opacity-90 mb-8">
            Premium quality products curated just for you.
          </p>

          <a
            href="#FeaturedProducts"
            className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-6 sm:px-8 py-3 rounded-full font-bold hover:scale-105 transition no-underline"
          >
            Shop Now <FaArrowRight />
          </a>
        </div>
      </section>

      {/* ================= CATEGORY BANNERS ================= */}
<section className="py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">

    {/* MEN */}
    <div className="relative w-full h-72 sm:h-80 md:h-96 lg:h-[420px] rounded-3xl overflow-hidden group shadow-2xl">
      <img
        src="https://i.pinimg.com/736x/46/30/77/463077183fbc67c55929d66f36074079.jpg"
        alt="Men"
        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
        <h3 className="text-3xl md:text-4xl font-extrabold mb-5">Men</h3>
        <a
          href="/mens"
          className="bg-white text-gray-900 px-7 py-3 rounded-full text-sm md:text-base font-semibold hover:bg-gray-100 transition"
        >
          Shop Men
        </a>
      </div>
    </div>

    {/* WOMEN */}
    <div className="relative w-full h-72 sm:h-80 md:h-96 lg:h-[420px] rounded-3xl overflow-hidden group shadow-2xl">
      <img
        src="https://i.pinimg.com/736x/3c/1c/e2/3c1ce2a4308e7c63cb8ecb2fcf3e9727.jpg"
        alt="Women"
        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
        <h3 className="text-3xl md:text-4xl font-extrabold mb-5">Women</h3>
        <a
          href="/woman"
          className="bg-white text-gray-900 px-7 py-3 rounded-full text-sm md:text-base font-semibold hover:bg-gray-100 transition"
        >
          Shop Women
        </a>
      </div>
    </div>

    {/* KIDS */}
    <div className="relative w-full h-72 sm:h-80 md:h-96 lg:h-[420px] rounded-3xl overflow-hidden group shadow-2xl">
      <img
        src="https://i.pinimg.com/736x/63/17/f2/6317f2aa59306c9706cfefe910f9a15f.jpg"
        alt="Kids"
        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
        <h3 className="text-3xl md:text-4xl font-extrabold mb-5">Kids</h3>
        <a
          href="/kids"
          className="bg-white text-gray-900 px-7 py-3 rounded-full text-sm md:text-base font-semibold hover:bg-gray-100 transition"
        >
          Shop Kids
        </a>
      </div>
    </div>

  </div>
</section>

      {/* ================= PRODUCTS ================= */}
      <section className="py-14 bg-white" id="FeaturedProducts">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Featured Products
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Best selling & trending items
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {productsToShow.map((item) => (
                <ProductCart key={item.id} {...item} />
              ))}
            </div>
          )}

          {!loading && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-500 transition"
              >
                {showAll ? "Show Less" : "View All Products"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section className="py-12 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-3 gap-6 text-center">

          <div>
            <FaStar className="text-4xl text-yellow-500 mx-auto mb-2" />
            <h4 className="font-bold">4.9 Rating</h4>
            <p className="text-gray-600 text-sm">10k+ Reviews</p>
          </div>

          <div>
            <FaTruck className="text-4xl text-green-500 mx-auto mb-2" />
            <h4 className="font-bold">Fast Delivery</h4>
            <p className="text-gray-600 text-sm">2–3 Days</p>
          </div>

          <div>
            <FaUndo className="text-4xl text-blue-500 mx-auto mb-2" />
            <h4 className="font-bold">Easy Returns</h4>
            <p className="text-gray-600 text-sm">30 Days Policy</p>
          </div>

        </div>
      </section>

    </div>
  );
}
