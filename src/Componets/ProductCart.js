import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../Store/Slice/CartSlice";
import { wishaddItem } from "../Store/Slice/wishLIstslice";
import { FaHeart, FaStar, FaShoppingCart } from "react-icons/fa";

export default function ProductCart(props) {
  const {
    id,
    productname,
    productprice,
    productimage,
    imageAlt,
    color,
    productdescription,
    rating,
    discount = 0,
  } = props;

  const [add, setAdd] = useState(false);
  const [wishh, setWishh] = useState(false);
  const dispatch = useDispatch();

  const AddtoCart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const item = { ...props };
    dispatch(addItem(item));
    setAdd(true);
    setTimeout(() => setAdd(false), 2000);
  };

  const Addtowish = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const item = { ...props };
    dispatch(wishaddItem(item));
    setWishh(true);
    setTimeout(() => setWishh(false), 2000);
  };

  // Calculate discounted price if discount exists
  const discountedPrice =
    discount > 0
      ? (productprice - productprice * (discount / 100)).toFixed(2)
      : null;

  // Generate star rating icons
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`text-xs transition-colors ${
            i <= Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="group relative w-full max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
      {/* Gradient Overlay on Image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Wishlist Button */}
      <button
        onClick={Addtowish}
        className={`absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
          wishh
            ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-500/25"
            : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-red-50 hover:text-red-500 border border-white/50"
        }`}
        aria-label={wishh ? "Remove from wishlist" : "Add to wishlist"}
      >
        <FaHeart
          className={`w-5 h-5 transition-transform duration-300 ${
            wishh ? "fill-current scale-110" : ""
          }`}
        />
      </button>

      {/* Dynamic Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-bounce-slow">
          {discount}% OFF · Limited!
        </div>
      )}

      {/* Product Image */}
      <Link to={`/product/${id}`}>
        <div className="relative h-80 w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <img
            alt={imageAlt || productname}
            src={productimage}
            className="h-full w-full  transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-5 relative z-10">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-bold text-gray-900 leading-tight line-clamp-1 group-hover:text-blue-700 transition-colors duration-300">
            <Link to={`/product/${id}`} className="hover:underline">
              {productname}
            </Link>
          </h3>
          {color && (
            <span className="inline-block w-4 h-4 rounded-full bg-gray-300 border-2 border-white shadow-sm" style={{ backgroundColor: color }}></span>
          )}
        </div>

        <p className="mt-2 text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {productdescription}
        </p>

        {/* Rating */}
        <div className="mt-3 flex items-center">
          <div className="flex text-sm text-yellow-400 mr-1">{renderStars(rating || 0)}</div>
          <span className="text-xs text-gray-500 ml-1">({rating || 0})</span>
        </div>

        {/* Price Section */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-left space-y-1">
            {discount > 0 ? (
              <>
                <p className="text-sm text-gray-400 line-through">₹{productprice}</p>
                <p className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ₹{discountedPrice}
                </p>
              </>
            ) : (
              <p className="text-xl font-extrabold text-gray-900">₹{productprice}</p>
            )}
          </div>

          <button
            onClick={AddtoCart}
            disabled={add}
            className={`relative py-2.5 px-4 rounded-xl text-white font-semibold transition-all duration-300 transform shadow-md ${
              add
                ? "bg-gradient-to-r from-green-500 to-emerald-600 cursor-not-allowed animate-pulse shadow-green-500/25"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105 hover:shadow-lg"
            }`}
            aria-label={add ? "Item added to cart" : "Add to cart"}
          >
            {add ? (
              <>
                <FaShoppingCart className="w-4 h-4 inline mr-1 animate-bounce" />
                Added!
              </>
            ) : (
              <>
                <FaShoppingCart className="w-4 h-4 inline mr-1" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}