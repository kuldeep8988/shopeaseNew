import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaArrowRight, FaStar, FaTruck, FaShieldAlt, FaUndo } from "react-icons/fa";
import ProductCart from "../Componets/ProductCart"; // Ensure the path is correct

export default function Mens() {
  const [api, setApi] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch product data
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://65c31d21f7e6ea59682bf827.mockapi.io/playo")
      .then((response) => {
        // Filter for Men's category
        const mensProducts = response.data.filter(product => product.category === 'Men');
        setApi(mensProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
 

  // Skeleton loader for products
  const SkeletonCard = () => (
    <div className="animate-pulse bg-white rounded-lg shadow-md p-4">
      <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Hero Section for Mens */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gray-800 via-blue-900 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent animate-fadeInUp">
            Men's Essentials
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fadeInUp animation-delay-300">
            Timeless style meets modern comfort for the confident man.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 animate-bounce-slow">
            Shop Now <FaArrowRight className="ml-2 inline" />
          </button>
        </div>
        {/* Floating particles with masculine colors */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-400/20 rounded-full blur-xl animate-float animation-delay-1000"></div>
      </section>

      {/* Discount Banners for Mens */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Banner 1: 40% Off Suits */}
            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 text-center shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FaStar className="mx-auto text-4xl mb-4 opacity-80 group-hover:rotate-12 transition-transform duration-300" />
              <h3 className="text-2xl font-bold mb-2">🎩 40% OFF Suits!</h3>
              <p className="text-sm mb-6 opacity-90">Elevate your wardrobe with premium tailoring.</p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300">
                Shop Suits
              </button>
            </div>

            {/* Banner 2: Free Shipping */}
            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-gray-600 to-slate-700 text-white p-8 text-center shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FaTruck className="mx-auto text-4xl mb-4 opacity-80 group-hover:translate-x-2 transition-transform duration-300" />
              <h3 className="text-2xl font-bold mb-2">🚚 Free Shipping</h3>
              <p className="text-sm mb-6 opacity-90">On orders over $50. Arrive in style.</p>
              <button className="bg-white text-gray-600 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300">
                Learn More
              </button>
            </div>

            {/* Banner 3: Premium Quality */}
            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-8 text-center shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FaShieldAlt className="mx-auto text-4xl mb-4 opacity-80 group-hover:spin-slow transition-transform duration-1000" />
              <h3 className="text-2xl font-bold mb-2">🛡️ Premium Quality</h3>
              <p className="text-sm mb-6 opacity-90">Durable fabrics built to last.</p>
              <button className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300">
                Explore Quality
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Mens Products Section */}
      <section id="home" className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-blue-800 bg-clip-text text-transparent">
              Men's Collection
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Classic styles and modern fits for every occasion. Discover your next favorite.
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
              {api.map((item) => (
                <ProductCart key={item.id} {...item} />
              ))}
            </div>
          )}
          {!loading && api.length === 0 && (
            <div className="text-center mt-12">
              <p className="text-gray-500">No men's products available at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust Badges Section - Mens Focused */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <FaStar className="text-4xl text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">4.9/5 Stars</h3>
              <p className="text-gray-600">From 15k+ satisfied customers</p>
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

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .group-hover\\:spin-slow:hover { animation: spin-slow 2s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}