import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { toggleCart } from "../Store/Slice/CartSlice";
import { togglewish } from "../Store/Slice/wishLIstslice";
import {
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { wishItem } = useSelector((state) => state.wish);
  const [user] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openCart = () => {
    navigate("/cart");
    dispatch(toggleCart(true));
  };

  const openwish = () => {
    navigate("/wish");
    dispatch(togglewish(true));
  };

  const logout = () => auth.signOut();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-indigo-900/90 backdrop-blur-md border-b border-indigo-800 shadow-lg z-50">
        <div className="max-w-screen-xl mx-auto px-3 sm:px-4 py-2.5">
          <nav className="flex items-center justify-between">

            {/* Logo */}
            <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent tracking-wide">
              ShopEase
            </h1>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white focus:outline-none"
            >
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">

              {/* Links */}
              <ul className="flex items-center space-x-6 text-white/90 font-semibold text-sm">
                {["HOME", "KIDS", "MENS", "WOMAN"].map((item) => (
                  <li key={item}>
                    <Link
                      to={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                      className="hover:text-yellow-300 transition"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-2 sm:space-x-3">

              {/* Login / Logout */}
              {user ? (
                <button
                  onClick={logout}
                  className="flex items-center bg-yellow-400 text-gray-900 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-yellow-300 transition"
                >
                  <FaUser className="mr-1 sm:mr-2 text-xs sm:text-sm" /> Logout
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center bg-yellow-400 text-gray-900 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-yellow-300 transition"
                >
                  <FaUser className="mr-1 sm:mr-2 text-xs sm:text-sm" /> Login
                </button>
              )}

              {/* Wishlist */}
              <div
                onClick={openwish}
                className="relative cursor-pointer bg-white/10 p-2 rounded-full hover:bg-red-500/20 transition"
              >
                <FaHeart className="text-white text-sm" />
                {wishItem.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] h-4 w-4 flex items-center justify-center rounded-full">
                    {wishItem.length}
                  </span>
                )}
              </div>

              {/* Cart */}
              <div
                onClick={openCart}
                className="relative cursor-pointer bg-white/10 p-2 rounded-full hover:bg-yellow-500/20 transition"
              >
                <FaShoppingCart className="text-white text-sm" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-[10px] h-4 w-4 flex items-center justify-center rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </div>
          </nav>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden mt-3 bg-indigo-950 rounded-xl p-3 space-y-3">

              {/* Nav Links */}
              <div className="flex flex-col space-y-2">
                {["HOME", "KIDS", "MENS", "WOMAN"].map((item) => (
                  <Link
                    key={item}
                    to={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-white/90 font-semibold hover:text-yellow-300 transition"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              {/* Logout Mobile */}
              {user && (
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="w-full bg-yellow-400 text-gray-900 py-2 rounded-full font-semibold text-sm hover:bg-yellow-300 transition flex items-center justify-center"
                >
                  <FaUser className="mr-2" /> Logout ({user.email.split("@")[0]})
                </button>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  );
}
