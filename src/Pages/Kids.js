import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaArrowRight, FaStar, FaTruck, FaShieldAlt, FaUndo } from "react-icons/fa";
import ProductCart from "../Componets/ProductCart"; // check path

export default function Kids() {
  const [api, setApi] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch product data
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://65c31d21f7e6ea59682bf827.mockapi.io/playo")
      .then((response) => {
        // Filter for Kids category
        const kidsProducts = response.data.filter(product => product.category === 'Kids');
        setApi(kidsProducts);
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-blue-50">
      {/* Hero Section for Kids */}
      <section className="relative overflow-hidden bg-gradient-to-r from-pink-600 via-yellow-400 to-blue-500 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent animate-fadeInUp">
            Kids' Wonderland
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fadeInUp animation-delay-300">
            Fun, colorful, and comfy outfits for your little adventurers!
          </p>
          <button className="bg-white text-pink-600 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-yellow-100 transform hover:scale-105 transition-all duration-300 animate-bounce-slow">
            Explore Fun <FaArrowRight className="ml-2 inline" />
          </button>
        </div>
        {/* Floating particles with kid-friendly colors */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-400/30 rounded-full blur-xl animate-float animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-blue-400/30 rounded-full blur-xl animate-bounce -translate-x-1/2 -translate-y-1/2"></div>
      </section>

      {/* Discount Banners for Kids */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Banner 1: 30% Off Kids */}
            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white p-8 text-center shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FaStar className="mx-auto text-4xl mb-4 opacity-80 group-hover:rotate-12 transition-transform duration-300" />
              <h3 className="text-2xl font-bold mb-2">🎈 30% OFF Kids' Wear!</h3>
              <p className="text-sm mb-6 opacity-90">Make playtime stylish without breaking the bank.</p>
              <button className="bg-white text-pink-600 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300">
                Shop Kids
              </button>
            </div>

            {/* Banner 2: Free Shipping */}
            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 text-white p-8 text-center shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FaTruck className="mx-auto text-4xl mb-4 opacity-80 group-hover:translate-x-2 transition-transform duration-300" />
              <h3 className="text-2xl font-bold mb-2">🚚 Free Shipping</h3>
              <p className="text-sm mb-6 opacity-90">On orders over $30. Quick delivery to your door.</p>
              <button className="bg-white text-yellow-600 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300">
                Fast Delivery
              </button>
            </div>

            {/* Banner 3: Easy Returns */}
            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-8 text-center shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FaUndo className="mx-auto text-4xl mb-4 opacity-80 group-hover:rotate-180 transition-transform duration-300" />
              <h3 className="text-2xl font-bold mb-2">🔄 Easy Returns</h3>
              <p className="text-sm mb-6 opacity-90">30-day hassle-free returns for growing kids.</p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300">
                Return Policy
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Kids Products Section */}
      <section className="py-16 bg-gradient-to-b from-white to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
              Fun Kids' Collection
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover playful outfits that spark imagination and comfort for every adventure.
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
              <p className="text-gray-500">No kids products available at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust Badges Section - Kid Focused */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <FaStar className="text-4xl text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">4.8/5 Stars</h3>
              <p className="text-gray-600">From 5k+ happy parents</p>
            </div>
            <div className="flex flex-col items-center">
              <FaTruck className="text-4xl text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Quick Delivery</h3>
              <p className="text-gray-600">Arrives in 1-2 days</p>
            </div>
            <div className="flex flex-col items-center">
              <FaShieldAlt className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Safe Materials</h3>
              <p className="text-gray-600">100% kid-friendly fabrics</p>
            </div>
          </div>
        </div>
      </section>

    
    </div>
  );
}