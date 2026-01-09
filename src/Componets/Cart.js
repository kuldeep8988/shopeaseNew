import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleCart,
  removeItem,
  incrementItem,
  decrementItem,
} from "../Store/Slice/CartSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems = [] } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseCart = () => {
    dispatch(toggleCart(false));
    navigate("/");
  };

  const cartQuantity = cartItems.reduce(
    (t, i) => t + (i.quantity || 1),
    0
  );

  const subtotal = cartItems.reduce((t, i) => {
    const price = parseFloat(i.price?.replace(/[^0-9.]/g, "") || 0);
    return t + price * (i.quantity || 1);
  }, 0);

  const discount = subtotal * 0.3;
  const total = subtotal - discount;

  const handleCheckout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/checkout");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 px-2 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg sm:text-3xl font-bold text-gray-900">
            Shopping Cart
          </h1>
          <span className="text-sm text-gray-500">
            ({cartQuantity})
          </span>
        </div>

        {/* Empty Cart */}
        {cartQuantity === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow">
            <p className="text-gray-700 mb-4">Your cart is empty</p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold"
            >
              Start Shopping →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const price = parseFloat(
                  item.price?.replace(/[^0-9.]/g, "") || 0
                );
                const itemTotal = price * (item.quantity || 1);

                return (
                  <div
                    key={item.id}
                    className="
                      bg-white rounded-xl p-3 sm:p-5
                      shadow-sm border
                      flex flex-col xs:flex-row gap-3
                    "
                  >
                    {/* Image */}
                    <img
                      src={item.productimage}
                      alt={item.productname}
                      className="w-20 h-20 xs:w-24 xs:h-24 object-cover rounded-lg"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.id}`}
                        className="text-sm sm:text-lg font-semibold text-gray-900 block truncate"
                      >
                        {item.productname}
                      </Link>

                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        ₹{price.toFixed(2)}
                      </p>

                      {/* Qty + Price */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => dispatch(decrementItem(item.id))}
                            disabled={(item.quantity || 1) <= 1}
                            className="w-8 h-8 bg-gray-200 rounded-full text-sm"
                          >
                            −
                          </button>

                          <span className="w-6 text-center text-sm font-semibold">
                            {item.quantity || 1}
                          </span>

                          <button
                            onClick={() => dispatch(incrementItem(item.id))}
                            className="w-8 h-8 bg-teal-600 text-white rounded-full text-sm"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-sm sm:text-lg font-bold">
                          ₹{itemTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Remove */}
                         <button
  onClick={() => dispatch(removeItem(item.id))}
  className="
    px-3 py-1.5
    text-xs sm:text-sm
    bg-red-50 text-red-600
    border border-red-200
    rounded-full
    hover:bg-red-600 hover:text-white
    transition
    self-start sm:self-center
  "
>
  Remove
</button>
                  </div>
                );
              })}
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-white rounded-xl p-5 shadow-sm h-fit">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span>Discount (30%)</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>

                <div className="border-t pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="
                  w-full mt-5 py-3
                  bg-gradient-to-r from-teal-600 to-emerald-600
                  text-white rounded-xl font-semibold
                  hover:scale-105 transition
                "
              >
                {isLoading ? "Processing..." : "Checkout"}
              </button>

              <button
                onClick={handleCloseCart}
                className="w-full mt-3 py-2 bg-gray-100 rounded-xl font-medium"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
