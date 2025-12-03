import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  togglewish,
  wishremoveItem,
  wishincrementItem,
  wishdecrementItem,
} from "../Store/Slice/wishLIstslice";
import { addItem } from "../Store/Slice/CartSlice";
import { FaTrash, FaPlus, FaMinus, FaHeart } from "react-icons/fa";

export default function Wishlist() {
  const { isWishlist, wishItem = [] } = useSelector((state) => state.wish);
  const dispatch = useDispatch();

  const handleCloseWish = () => dispatch(togglewish(false));
  const handleRemoveWish = (id) => dispatch(wishremoveItem(id));
  const handleIncrement = (id) => dispatch(wishincrementItem(id));
  const handleDecrement = (id) => dispatch(wishdecrementItem(id));

  const handleMoveToCart = (item) => {
    const itemWithQuantity = { ...item, quantity: item.quantity || 1 };
    dispatch(addItem(itemWithQuantity));
    dispatch(wishremoveItem(item.id));
  };

  const getItemPrice = (item) => {
    const price = parseFloat(item.price?.replace(/[^0-9.]/g, "") || 0);
    return price * (item.quantity || 1);
  };

  const totalPrice = wishItem
    .reduce((total, item) => total + getItemPrice(item), 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-gray-100 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-indigo-900 flex items-center gap-3">
            <FaHeart className="text-pink-500" />
            Your Wishlist
            <span className="text-lg font-medium text-gray-600 ml-2">
              ({wishItem.length} items)
            </span>
          </h1>
          {isWishlist && (
            <button
              onClick={handleCloseWish}
              className="text-gray-600 hover:text-indigo-700 text-3xl font-bold transition duration-200"
              aria-label="Close wishlist"
            >
              &times;
            </button>
          )}
        </div>

        {/* Empty state */}
        {wishItem.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-12 text-center">
            <p className="text-gray-700 text-xl font-medium">
              Your wishlist is empty.{" "}
              <Link
                to="/"
                className="text-indigo-600 hover:text-indigo-800 font-semibold transition"
              >
                Start shopping now
              </Link>
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Wishlist Items */}
            <div className="grid gap-6">
              {wishItem.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center sm:items-stretch justify-between bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4 sm:p-6 transform hover:scale-[1.01]"
                >
                  {/* Product Info */}
                  <div className="flex items-center space-x-4 sm:w-1/2">
                    <Link
                      to={`/product/${item.id}`}
                      className="flex items-center space-x-4 group"
                    >
                      <img
                        src={item.productimage}
                        alt={item.productname}
                        className="w-24 h-24 object-cover rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-300"
                      />
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                          {item.productname || "Unnamed Product"}
                        </h2>
                        <p className="text-gray-500 mt-1">
                          ${parseFloat(
                            item.price?.replace(/[^0-9.]/g, "") || 0
                          ).toFixed(2)}
                        </p>
                      </div>
                    </Link>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <button
                      onClick={() => handleDecrement(item.id)}
                      disabled={(item.quantity || 1) <= 1}
                      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition disabled:opacity-50"
                    >
                      <FaMinus className="h-4 w-4 text-gray-700" />
                    </button>
                    <span className="text-lg font-medium text-gray-800 w-8 text-center">
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() => handleIncrement(item.id)}
                      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                    >
                      <FaPlus className="h-4 w-4 text-gray-700" />
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 sm:mt-0">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all duration-300 hover:scale-105"
                    >
                      Move to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveWish(item.id)}
                      className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                      <FaTrash className="h-4 w-4" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="bg-white/70 backdrop-blur-md mt-10 p-6 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-center">
              <div className="text-xl font-semibold text-gray-700">
                Total:{" "}
                <span className="text-indigo-700 font-bold">${totalPrice}</span>
              </div>
              {isWishlist && (
                <Link to="/">
                  <button
                    onClick={handleCloseWish}
                    className="mt-4 sm:mt-0 px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 hover:scale-105"
                  >
                    Close Wishlist
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}