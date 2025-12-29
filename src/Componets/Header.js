import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  FaSignOutAlt,
} from "react-icons/fa";

export default function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { wishItem } = useSelector((state) => state.wish);
  const [user] = useAuthState(auth);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Kids", path: "/kids" },
    { name: "Mens", path: "/mens" },
    { name: "Woman", path: "/woman" },
  ];

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
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 ">
        <nav className="flex items-center justify-between">

          {/* LOGO */}
          <h1
            onClick={() => navigate("/")}
            className="cursor-pointer text-lg sm:text-2xl font-extrabold bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent"
          >
            ShopEase
          </h1>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`relative text-sm font-semibold transition ${
                    location.pathname === link.path
                      ? "text-indigo-600"
                      : "text-gray-700 hover:text-sky-600"
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-2 sm:gap-1">

            {/* Wishlist */}
            <button
              onClick={openwish}
              className="relative p-2 rounded-full bg-gray-100 hover:bg-rose-100 transition"
            >
              <FaHeart className="text-rose-500 text-sm sm:text-base" />
              {wishItem.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center">
                  {wishItem.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2 rounded-full bg-gray-100 hover:bg-amber-100 transition"
            >
              <FaShoppingCart className="text-amber-600 text-sm sm:text-base" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* USER */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-indigo-500 transition"
                >
                  <FaUser />
                  {/* hide username on very small screens */}
                  <span className="hidden sm:inline">
                    {user.email.split("@")[0]}
                  </span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg p-2">
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 w-full text-sm text-gray-700 hover:bg-red-50 px-3 py-2 rounded-lg transition"
                    >
                      <FaSignOutAlt className="text-red-500" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-indigo-600 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-indigo-500 transition"
              >
                Login
              </button>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-800 p-2"
            >
              {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          </div>
        </nav>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden mt-3 bg-white border border-gray-200 rounded-xl shadow-lg p-3 space-y-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 font-semibold text-sm hover:text-indigo-600 transition"
              >
                {link.name}
              </Link>
            ))}

            {user && (
              <button
                onClick={logout}
                className="w-full bg-indigo-600 text-white py-2 rounded-full font-semibold text-sm flex items-center justify-center gap-2"
              >
                <FaSignOutAlt /> Logout
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
