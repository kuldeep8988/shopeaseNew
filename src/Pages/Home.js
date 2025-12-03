import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaArrowRight, FaStar, FaTruck, FaShieldAlt, FaUndo } from "react-icons/fa";
import ProductCart from "../Componets/ProductCart"; // check path

export default function Home() {
  const [api, setApi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // Fetch product data
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

  // Skeleton loader for products
  const SkeletonCard = () => (
    <div className="animate-pulse bg-white rounded-lg shadow-md p-4">
      <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 scroll-smooth">
      {/* Hero Section with Main Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent animate-fadeInUp">
            Welcome to ShopEase
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fadeInUp animation-delay-300">
            Discover amazing deals on your favorite products
          </p>
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 animate-bounce-slow">
            Shop Now <FaArrowRight className="ml-2 inline" />
          </button>
        </div>
        {/* Floating particles */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-400/20 rounded-full blur-xl animate-float animation-delay-1000"></div>
      </section>

      {/* Discount Banners Carousel */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Banner 1: 30% Off Everything */}
            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white p-8 text-center shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FaStar className="mx-auto text-4xl mb-4 opacity-80 group-hover:rotate-12 transition-transform duration-300" />
              <h3 className="text-2xl font-bold mb-2">🎉 30% OFF Everything!</h3>
              <p className="text-sm mb-6 opacity-90">Limited time offer! Shop now and save big.</p>
              <button className="bg-white text-teal-600 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300">
                Grab Deal
              </button>
            </div>

            {/* Banner 2: Free Shipping */}
            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8 text-center shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FaTruck className="mx-auto text-4xl mb-4 opacity-80 group-hover:translate-x-2 transition-transform duration-300" />
              <h3 className="text-2xl font-bold mb-2">🚚 Free Shipping</h3>
              <p className="text-sm mb-6 opacity-90">On orders over $50. Fast delivery guaranteed.</p>
              <button className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300">
                Learn More
              </button>
            </div>

            {/* Banner 3: Secure Shopping */}
            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 text-center shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FaShieldAlt className="mx-auto text-4xl mb-4 opacity-80 group-hover:spin-slow transition-transform duration-1000" />
              <h3 className="text-2xl font-bold mb-2">🛡️ Secure Shopping</h3>
              <p className="text-sm mb-6 opacity-90">100% safe transactions with our protection.</p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300">
                Shop Safe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="home" className="py-16 bg-gradient-to-b from-white to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our top picks and best sellers. Quality you can trust.
            </p>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productsToShow.map((item) => (
                <ProductCart key={item.id} {...item} />
              ))}
            </div>
          )}
          {!loading && (
            <div className="text-center mt-12">
              <button
                onClick={toggleShowAll}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
              >
                {showAll ? "Show Less" : "View All Products"} <FaArrowRight className="ml-2 inline" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <FaStar className="text-4xl text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">4.9/5 Stars</h3>
              <p className="text-gray-600">From 10k+ happy customers</p>
            </div>
            <div className="flex flex-col items-center">
              <FaTruck className="text-4xl text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Within 2-3 business days</p>
            </div>
            <div className="flex flex-col items-center">
              <FaUndo className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day money back guarantee</p>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
}         