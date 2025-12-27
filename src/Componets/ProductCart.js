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
    price,
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
    dispatch(addItem({ ...props }));
    setAdd(true);
    setTimeout(() => setAdd(false), 2000);
  };

  const Addtowish = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(wishaddItem({ ...props }));
    setWishh(true);
    setTimeout(() => setWishh(false), 2000);
  };

  const discountedPrice =
    discount > 0 ? (price - price * (discount / 100)).toFixed(2) : null;

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`text-[10px] ${
          i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));

  return (
    <div className="group relative w-full max-w-[160px] xs:max-w-[170px] sm:max-w-xs mx-auto bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:scale-[1.03] border border-gray-100">

      {/* Wishlist */}
      <button
        onClick={Addtowish}
        className={`absolute top-2 right-2 z-20 w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-full transition-all duration-300 ${
          wishh
            ? "bg-red-500 text-white scale-110 shadow-md"
            : "bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-50 hover:text-red-500"
        }`}
      >
        <FaHeart className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-2 left-2 z-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[9px] sm:text-xs font-bold px-2 py-1 rounded-full shadow">
          {discount}% OFF
        </div>
      )}

      {/* Image */}
      <Link to={`/product/${id}`}>
        <div className="relative w-full h-36 xs:h-40 sm:h-56 overflow-hidden bg-gray-100">
          <img
            src={productimage}
            alt={imageAlt || productname}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-2 xs:p-3 sm:p-4">

        {/* Title */}
        <h3 className="text-[12px] xs:text-sm sm:text-base font-bold text-gray-900 line-clamp-1 group-hover:text-blue-700 transition">
          <Link to={`/product/${id}`}>{productname}</Link>
        </h3>

        {/* Description */}
        <p className="mt-1 text-[10px] xs:text-xs sm:text-sm text-gray-600 line-clamp-2">
          {productdescription}
        </p>

        {/* Rating */}
        <div className="mt-2 flex items-center">
          <div className="flex">{renderStars(rating || 0)}</div>
          <span className="text-[10px] text-gray-500 ml-1">
            ({rating || 0})
          </span>
        </div>

        {/* Price + Big Button */}
        <div className="mt-3 flex items-center justify-between gap-2">

          {/* SMALL Price */}
          <div>
            {discount > 0 ? (
              <>
                <p className="text-[9px] text-gray-400 line-through">₹{price}</p>
                <p className="text-sm sm:text-base font-semibold text-blue-600">
                  ₹{discountedPrice}
                </p>
              </>
            ) : (
              <p className="text-sm sm:text-base font-semibold text-gray-800">
                ₹{price}
              </p>
            )}
          </div>

          {/* BIG Add to Cart Button */}
          <button
            onClick={AddtoCart}
            disabled={add}
            className={`flex items-center justify-center gap-2 
              px-3 sm:px-4 py-2 sm:py-2.5
              min-w-[50px] sm:min-w-[120px]
              rounded-lg text-white font-semibold
              text-xs sm:text-sm
              transition-all duration-300
              ${
                add
                  ? "bg-green-500 cursor-not-allowed animate-pulse"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105"
              }`}
          >
            <FaShoppingCart className={add ? "animate-bounce" : ""} />
            {add ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
