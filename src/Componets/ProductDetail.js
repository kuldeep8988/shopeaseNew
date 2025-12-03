import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addItem } from "../Store/Slice/CartSlice";
import { wishaddItem } from "../Store/Slice/wishLIstslice";
import { FaArrowLeft, FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // track button states
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToWish, setAddedToWish] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://65c31d21f7e6ea59682bf827.mockapi.io/playo/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
    </div>
  );
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Product</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    </div>
  );
  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <Link to="/" className="text-teal-600 hover:text-teal-700">Back to Products</Link>
      </div>
    </div>
  );

  const AddtoCart = () => {
    dispatch(addItem(product));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000); // reset after 2s
  };

  const Addtowish = () => {
    dispatch(wishaddItem(product));
    setAddedToWish(true);
    setTimeout(() => setAddedToWish(false), 2000);
  };

  // Generate star rating icons
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`text-sm transition-colors ${
            i <= Math.floor(rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 mt-5 ">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold text-sm transition-all duration-300 hover:scale-105 mb-8 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-md"
        >
          <FaArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-white/20">
          {/* Product Image */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-inner">
              <img
                src={product.productimage}
                alt={product.imageAlt || product.productname}
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Image overlay for premium feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            {/* Quick view badges */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {product.discount > 0 && (
                <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-bounce-slow">
                  {product.discount}% OFF
                </div>
              )}
              <div className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                {product.color || 'Premium Quality'}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text">
                {product.productname}
              </h1>
              
              {/* Price Section */}
              <div className="space-y-2">
                {product.discount > 0 ? (
                  <>
                    <p className="text-xl text-gray-500 line-through">₹{product.price}</p>
                    <p className="text-4xl font-black bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                      ₹{(product.price - product.price * (product.discount / 100)).toFixed(0)}
                    </p>
                  </>
                ) : (
                  <p className="text-4xl font-black text-gray-900">₹{product.price}</p>
                )}
                <p className="text-sm text-gray-500">Free shipping on orders over ₹500</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex text-lg">{renderStars(product.rating)}</div>
                <span className="text-sm text-gray-600 ml-2">({product.rating || 0} reviews)</span>
              </div>

              {/* Description */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {product.productdescription || "Discover the perfect blend of style and comfort with this premium product, crafted for everyday elegance."}
                </p>
              </div>

              {/* Features (if available, or placeholder) */}
              {product.color && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700">Available Colors:</h4>
                  <div className="flex gap-2">
                    <span className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: product.color }}></span>
                    <span className="w-8 h-8 rounded-full border-2 border-gray-300 bg-gray-200"></span>
                    <span className="w-8 h-8 rounded-full border-2 border-gray-300 bg-black"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              {/* Cart Button */}
              <button
                onClick={AddtoCart}
                className={`flex-1 relative py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform shadow-xl ${
                  addedToCart
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white animate-pulse shadow-green-500/25"
                    : "bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white hover:scale-105 hover:shadow-2xl"
                }`}
              >
                {addedToCart ? (
                  <>
                    <FaShoppingCart className="w-5 h-5 inline mr-2 animate-bounce" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <FaShoppingCart className="w-5 h-5 inline mr-2" />
                    Add to Cart
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={Addtowish}
                className={`relative p-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform shadow-xl ${
                  addedToWish
                    ? "bg-gradient-to-r from-pink-500 to-red-500 text-white scale-105 shadow-pink-500/25 animate-pulse"
                    : "bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-700 hover:scale-105 hover:shadow-lg border border-purple-200"
                }`}
              >
                <FaHeart className={`w-6 h-6 inline ${addedToWish ? 'fill-current' : ''}`} />
                {addedToWish ? "Added!" : "Wishlist"}
              </button>
            </div>
          </div>
        </div>

        {/* Additional Section: Related Products or Reviews - Placeholder */}
        <div className="mt-16 p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
          <p className="text-gray-600">Explore similar products for more inspiration.</p>
        </div>
      </div>
    </div>
  );
}