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
      .catch(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <h2 className="text-xl font-semibold">Product Not Found</h2>
      </div>
    );

  const AddtoCart = () => {
    dispatch(addItem(product));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const Addtowish = () => {
    dispatch(wishaddItem(product));
    setAddedToWish(true);
    setTimeout(() => setAddedToWish(false), 2000);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`text-sm ${i < Math.floor(rating || 0) ? "text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 mt-4">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold text-sm bg-white/60 px-4 py-2 rounded-full shadow-md transition-all duration-200"
        >
          <FaArrowLeft /> Back
        </Link>

        {/* Main Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-3xl shadow-xl p-6 mt-6 border border-gray-100">

          {/* Product Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-md bg-gray-100">
              <img
                src={product.productimage}
                alt={product.productname}
                className="w-full h-[280px] xs:h-[330px] sm:h-[380px] md:h-[470px] lg:h-[500px] object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Badges */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {product.discount > 0 && (
                <span className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  {product.discount}% OFF
                </span>
              )}

              <span className="bg-white text-gray-700 text-xs font-semibold px-3 py-1 rounded-full shadow">
                {product.color || "Premium"}
              </span>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              {product.productname}
            </h1>

            {/* Price */}
            <div>
              {product.discount > 0 ? (
                <>
                  <p className="line-through text-gray-500 text-lg">
                    ₹{product.price}
                  </p>
                  <p className="text-4xl text-teal-600 font-black">
                    ₹{(product.price - product.price * (product.discount / 100)).toFixed(0)}
                  </p>
                </>
              ) : (
                <p className="text-4xl font-black text-gray-900">₹{product.price}</p>
              )}
              <p className="text-sm text-gray-500">Free shipping above ₹500</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-sm text-gray-600">({product.rating} Reviews)</span>
            </div>

            {/* Description */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl">
              <h3 className="font-semibold mb-2 text-gray-800">Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.productdescription || "Premium quality product made for everyday comfort and style."}
              </p>
            </div>

            {/* Colors */}
            {product.color && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Available Colors</h4>
                <div className="flex gap-2">
                  <span
                    className="w-8 h-8 rounded-full border shadow-sm"
                    style={{ backgroundColor: product.color }}
                  ></span>
                  <span className="w-8 h-8 rounded-full bg-gray-200 border shadow-sm"></span>
                  <span className="w-8 h-8 rounded-full bg-black border shadow-sm"></span>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3 w-full">

              {/* Add to Cart */}
              <button
                onClick={AddtoCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm xs:text-base font-semibold shadow-md transition-all
                  ${addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-teal-600 text-white hover:bg-teal-700"
                  }`}
              >
                <FaShoppingCart />
                <span className="truncate">{addedToCart ? "Added!" : "Add"}</span>
              </button>

              {/* Wishlist */}
              <button
                onClick={Addtowish}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm xs:text-base font-semibold shadow-md transition-all
                  ${addedToWish
                    ? "bg-pink-600 text-white"
                    : "bg-white text-pink-600 border border-pink-300 hover:bg-pink-50"
                  }`}
              >
                <FaHeart />
                <span className="truncate">{addedToWish ? "Added!" : "Wish"}</span>
              </button>

            </div>
          </div>
        </div>

        {/* Suggested Section */}
        <div className="mt-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-2">You May Also Like</h2>
          <p className="text-gray-500 text-sm">More similar stylish products coming soon.</p>
        </div>
      </div>
    </div>
  );
}
