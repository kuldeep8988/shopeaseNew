import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleCart,
  removeItem,
  incrementItem,
  decrementItem,
} from "../Store/Slice/CartSlice";
import { Link, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51P14MVSADBiCosF4FJSqwZFlojbkHEEdlcLPQl7I4veDmhXGEfcW975rzZdDK2U2r3RMDvwXu4MpXtl5WK5V89Dn00rtTAf0c9"
);

export default function Cart() {
  const { isCartOpen, cartItems = [] } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseCart = () => {
    dispatch(toggleCart(false));
    navigate("/");
  };

  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleIncrement = (itemId) => {
    dispatch(incrementItem(itemId));
  };

  const handleDecrement = (itemId) => {
    dispatch(decrementItem(itemId));
  };

  const cartQuantity = cartItems.length;

  const subtotal = cartItems
    .reduce((total, item) => {
      const price = parseFloat(item.productprice?.replace(/[^0-9.]/g, "") || 0);
      return total + price * (item.quantity || 1);
    }, 0)
    .toFixed(2);

  const discount = (parseFloat(subtotal) * 0.30).toFixed(2);
  const cartTotal = (parseFloat(subtotal) - parseFloat(discount)).toFixed(2);

  const makePayment = async () => {
    setIsLoading(true);
    try {
      const stripe = await stripePromise;
      const body = { products: cartItems };
      const headers = { "Content-Type": "application/json" };

      const response = await fetch(
        "http://localhost:7000/api/create-checkout-session",
        {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const session = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error("Stripe checkout error:", result.error.message);
      }
    } catch (error) {
      console.error("Payment error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleCloseCart}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
          <span className="text-sm text-gray-500">({cartQuantity} items)</span>
        </div>

        {/* Discount Banner */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-xl shadow-lg mb-8 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-2 bg-white/20 rounded-full">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold">🎉 30% OFF Everything! 🎉</h2>
              <p className="text-sm opacity-90">Limited time offer – discount previewed below!</p>
            </div>
          </div>
        </div>

        {cartQuantity === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-16">
            <div className="mx-auto w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 1.5M7 13l-1.5-1.5M12 13v6m0 0h-3m3 0h3" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven’t added anything to your cart yet.</p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-all duration-200 transform hover:scale-105"
            >
              Start Shopping
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        ) : (
          /* Cart Items */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => {
                const price = parseFloat(item.productprice?.replace(/[^0-9.]/g, "") || 0);
                const itemSubtotal = (price * (item.quantity || 1)).toFixed(2);
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 flex items-center gap-4"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={item.productimage}
                        alt={item.productname || "Product image"}
                        className="w-24 h-24 object-cover rounded-xl shadow-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.id}`}
                        className="block text-xl font-semibold text-gray-900 hover:text-teal-600 transition-colors duration-200 mb-2 line-clamp-2"
                      >
                        {item.productname || "Unnamed Product"}
                      </Link>
                      <p className="text-gray-600 mb-4">Unit Price: ${price.toFixed(2)}</p>
                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleDecrement(item.id)}
                            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={(item.quantity || 1) <= 1}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                            </svg>
                          </button>
                          <span className="w-12 text-center text-lg font-bold text-gray-900">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => handleIncrement(item.id)}
                            className="p-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors duration-200 shadow-sm"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>
                        {/* Item Total */}
                        <div className="text-xl font-bold text-gray-900">${itemSubtotal}</div>
                      </div>
                    </div>
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 mt-10">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 sticky top-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount (30%)</span>
                    <span className="text-emerald-600 font-semibold">-${discount}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>${cartTotal}</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={cartQuantity === 0 || isLoading}
                  onClick={makePayment}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Proceed to Checkout"
                  )}
                </button>
                <button
                  className="w-full mt-4 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200"
                  onClick={handleCloseCart}
                >
                  Continue Shopping →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}