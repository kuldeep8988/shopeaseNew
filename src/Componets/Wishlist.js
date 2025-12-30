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
    dispatch(addItem({ ...item, quantity: item.quantity || 1 }));
    dispatch(wishremoveItem(item.id));
  };

  const getItemPrice = (item) => {
    const price = parseFloat(item.price?.replace(/[^0-9.]/g, "") || 0);
    return price * (item.quantity || 1);
  };

  const totalPrice = wishItem
    .reduce((t, i) => t + getItemPrice(i), 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-gray-100 pt-16 px-2 sm:px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-lg xs:text-xl sm:text-3xl font-extrabold text-indigo-900 flex items-center gap-2">
            <FaHeart className="text-pink-500 text-base sm:text-xl" />
            Wishlist
            <span className="text-sm sm:text-base text-gray-600">
              ({wishItem.length})
            </span>
          </h1>

          {isWishlist && (
            <button
              onClick={handleCloseWish}
              className="text-gray-600 hover:text-indigo-700 text-2xl sm:text-3xl"
            >
              &times;
            </button>
          )}
        </div>

        {/* Empty */}
        {wishItem.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <p className="text-sm sm:text-lg text-gray-700">
              Your wishlist is empty.
            </p>
            <Link
              to="/"
              className="inline-block mt-3 text-indigo-600 font-semibold"
            >
              Start shopping →
            </Link>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="space-y-4">
              {wishItem.map((item) => (
                <div
                  key={item.id}
                  className="
                    bg-white rounded-xl shadow-sm
                    p-3 sm:p-5
                    flex flex-col gap-3
                    sm:flex-row sm:items-center sm:justify-between
                  "
                >
                  {/* Product */}
                  <Link
                    to={`/product/${item.id}`}
                    className="flex gap-3 items-center"
                  >
                    <img
                      src={item.productimage}
                      alt={item.productname}
                      className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                    />

                    <div className="min-w-0">
                      <h2 className="text-sm sm:text-lg font-semibold text-gray-800 truncate">
                        {item.productname}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        ₹{parseFloat(item.price?.replace(/[^0-9.]/g, "") || 0)}
                      </p>
                    </div>
                  </Link>

                  {/* Quantity */}
                  <div className="flex items-center justify-between sm:justify-start gap-3">
                    <button
                      onClick={() => handleDecrement(item.id)}
                      disabled={(item.quantity || 1) <= 1}
                      className="p-2 bg-gray-200 rounded-full disabled:opacity-40"
                    >
                      <FaMinus size={12} />
                    </button>

                    <span className="text-sm sm:text-lg font-medium w-6 text-center">
                      {item.quantity || 1}
                    </span>

                    <button
                      onClick={() => handleIncrement(item.id)}
                      className="p-2 bg-gray-200 rounded-full"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="
                        w-full sm:w-auto
                        bg-indigo-600 text-white
                        px-4 py-2 rounded-lg
                        text-xs sm:text-sm font-semibold
                        hover:bg-indigo-700 transition
                      "
                    >
                      Move to Cart
                    </button>

                    <button
                      onClick={() => handleRemoveWish(item.id)}
                      className="
                        w-full sm:w-auto
                        bg-red-500 text-white
                        px-4 py-2 rounded-lg
                        text-xs sm:text-sm font-semibold
                        hover:bg-red-600 transition
                        flex items-center justify-center gap-2
                      "
                    >
                      <FaTrash size={12} /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white mt-6 p-4 rounded-xl shadow flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm sm:text-xl font-semibold text-gray-700">
                Total:{" "}
                <span className="text-indigo-700 font-bold">
                  ₹{totalPrice}
                </span>
              </p>

              <Link to="/">
                <button
                  onClick={handleCloseWish}
                  className="
                    px-6 py-2
                    bg-indigo-600 text-white
                    rounded-lg font-semibold
                    text-sm
                    hover:bg-indigo-700 transition
                  "
                >
                  Close Wishlist
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
