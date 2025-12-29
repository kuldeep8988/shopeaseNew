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
    productdescription,
    rating,
    discount = 0,
  } = props;

  const [add, setAdd] = useState(false);
  const [wishh, setWishh] = useState(false);
  const dispatch = useDispatch();

  const AddtoCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem({ ...props }));
    setAdd(true);
    setTimeout(() => setAdd(false), 1500);
  };

  const Addtowish = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(wishaddItem({ ...props }));
    setWishh(true);
    setTimeout(() => setWishh(false), 1500);
  };

  const discountedPrice =
    discount > 0 ? (price - price * (discount / 100)).toFixed(2) : null;

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`text-[10px] sm:text-xs ${
          i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));

  return (
    <div
      className="
        group relative w-full max-w-[160px] sm:max-w-xs mx-auto
        bg-white rounded-xl overflow-hidden
        border border-gray-100
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-xl
      "
    >
      {/* Wishlist */}
      <button
        onClick={Addtowish}
        className={`
          absolute top-2 right-2 z-20
          w-8 h-8 flex items-center justify-center
          rounded-full transition-all duration-300
          hover:scale-110
          ${
            wishh
              ? "bg-red-500 text-white"
              : "bg-white text-gray-600 hover:text-red-500"
          }
        `}
      >
        <FaHeart className="text-sm" />
      </button>

      {/* Discount Badge */}
      {discount > 0 && (
        <span className="absolute top-2 left-2 z-20 bg-indigo-600 text-white text-[10px] px-2 py-1 rounded-full">
          {discount}% OFF
        </span>
      )}

      {/* Image */}
      <Link to={`/product/${id}`}>
        <div className="relative w-full h-36 sm:h-56 overflow-hidden bg-gray-100">
          <img
            src={productimage}
            alt={imageAlt || productname}
            className="
              w-full h-full object-cover
              transition-transform duration-700 ease-out
              group-hover:scale-110
            "
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-2 sm:p-4">
        {/* Title */}
        <h3 className="text-xs sm:text-base font-semibold text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition">
          <Link to={`/product/${id}`}>{productname}</Link>
        </h3>

        {/* Description */}
        <p className="text-[10px] sm:text-sm text-gray-500 line-clamp-2 mt-1">
          {productdescription}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {renderStars(rating || 0)}
          <span className="text-[10px] text-gray-500">
            ({rating || 0})
          </span>
        </div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-3 gap-2">
          {/* Price */}
          <div>
            {discount > 0 ? (
              <>
                <p className="text-[10px] line-through text-gray-400">
                  ₹{price}
                </p>
                <p className="text-sm sm:text-base font-bold text-indigo-600">
                  ₹{discountedPrice}
                </p>
              </>
            ) : (
              <p className="text-sm sm:text-base font-bold text-gray-800">
                ₹{price}
              </p>
            )}
          </div>

          {/* Add to Cart */}
          <button
            onClick={AddtoCart}
            disabled={add}
            className={`
              flex items-center gap-1
              px-3 py-2 rounded-lg text-xs sm:text-sm
              text-white font-semibold
              transition-all duration-300
              sm:opacity-0 sm:translate-y-3
              sm:group-hover:opacity-100 sm:group-hover:translate-y-0
              ${
                add
                  ? "bg-green-500 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-500"
              }
            `}
          >
            <FaShoppingCart />
            <span className="hidden sm:inline">
              {add ? "Added" : "Add"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
