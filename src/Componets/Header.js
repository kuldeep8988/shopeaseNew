import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { toggleCart } from "../Store/Slice/CartSlice";
import { togglewish } from "../Store/Slice/wishLIstslice";
import {
  FaSearch,
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

  const openCart = (open) => {
    navigate("/cart");
    dispatch(toggleCart(open));
  };

  const openwish = (open) => {
    navigate("/wish");
    dispatch(togglewish(open));
  };

  const cartQuantity = cartItems.length;
  const wishQuantity = wishItem.length;

  const logout = () => {
    auth.signOut();
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-indigo-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-xl shadow-2xl z-50 border-b border-white/10 animate-slideDown">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent tracking-wider transition-all duration-500 hover:scale-110">
                ShopEase
              </h1>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white/80 focus:outline-none hover:text-yellow-400 transition-all duration-300 p-1 rounded"
            >
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              {/* Search Box */}
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-32 sm:w-40 lg:w-64 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 text-sm rounded-full pl-10 pr-4 py-2 border border-white/20 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-500 group-hover:scale-105"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70 group-hover:text-yellow-400 transition-all duration-300" />
              </div>

              {/* Links */}
              <ul className="flex space-x-4 sm:space-x-6">
                {["HOME", "KIDS", "MENS", "WOMAN"].map((item) => (
                  <li key={item}>
                    <Link
                      to={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                      className="text-white/90 font-semibold text-sm sm:text-base transition-all duration-300 hover:text-yellow-300 hover:scale-105"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Auth Section */}
              {user ? (
                <div className="hidden md:flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                  <h6 className="text-white/90 text-xs font-semibold truncate max-w-24">
                    {user.email}
                  </h6>

                  {/* Enhanced Logout Button */}
                  <button
                    onClick={logout}
                    className="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-1.5 rounded-full font-semibold text-xs shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-110 active:scale-95 group"
                  >
                    <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></span>

                    <span className="relative flex items-center space-x-1 z-10">
                      <FaUser className="h-3 w-3 group-hover:rotate-12 transition-transform duration-300" />
                      <span>Logout</span>
                    </span>

                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 transition-transform duration-700"></span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 text-gray-900 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-bold text-sm sm:text-base shadow-lg hover:shadow-xl active:shadow-md ring-2 ring-transparent hover:ring-yellow-300/30 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all duration-300 hover:scale-105 active:scale-95 transform-gpu group relative overflow-hidden"
                >
                  <FaUser className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10">Login</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                </button>
              )}

              {/* Wishlist */}
              <div
                className="relative group cursor-pointer p-1 sm:p-2 rounded-full bg-white/5 border border-white/10 hover:bg-red-500/10 transition-all duration-300"
                onClick={() => openwish(true)}
              >
                <FaHeart
                  className={`h-4 w-4 sm:h-5 sm:w-5 text-white/80 group-hover:text-red-400 transition-all duration-300 ${
                    wishQuantity > 0 ? "text-red-400" : ""
                  }`}
                />
                {wishQuantity > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold animate-pulse">
                    {wishQuantity}
                  </span>
                )}
              </div>

              {/* Cart */}
              <div
                className="relative group cursor-pointer p-1 sm:p-2 rounded-full bg-white/5 border border-white/10 hover:bg-yellow-500/10 transition-all duration-300"
                onClick={() => openCart(true)}
              >
                <FaShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-white/80 group-hover:text-yellow-300 transition-all duration-300" />
                {cartQuantity > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-yellow-500 text-gray-900 text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold animate-bounce">
                    {cartQuantity}
                  </span>
                )}
              </div>
            </div>
          </nav>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden mt-2 sm:mt-3 bg-indigo-950/95 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 p-3 sm:p-4 space-y-3 sm:space-y-4 animate-fadeIn">
              <div className="flex flex-col space-y-2 sm:space-y-3">
                {["HOME", "KIDS", "MENS", "WOMAN"].map((item) => (
                  <Link
                    key={item}
                    to={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-white/90 font-semibold text-sm sm:text-base hover:text-yellow-300 transition-all duration-300 py-1"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              {/* Mobile Search */}
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-white/10 text-white placeholder-white/70 text-sm rounded-full pl-10 pr-4 py-2 border border-white/20 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70 group-focus-within:text-yellow-400 transition-colors" />
              </div>

              {/* Mobile Logout */}
              {user && (
                <div className="flex justify-center pt-2">
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-110 active:scale-95 group w-full"
                  >
                    <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></span>

                    <span className="relative flex items-center justify-center space-x-1 z-10">
                      <FaUser className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                      <span>Logout ({user.email?.split("@")[0]})</span>
                    </span>

                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 transition-transform duration-700"></span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  );
}
