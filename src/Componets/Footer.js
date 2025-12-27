import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">

        {/* Logo */}
        <h2 className="text-lg font-semibold text-white">
          ShopEase
        </h2>

        {/* Social Icons */}
        <div className="flex gap-3">
          <a className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
            <FaFacebookF size={14} />
          </a>
          <a className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
            <FaInstagram size={14} />
          </a>
          <a className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
            <FaTwitter size={14} />
          </a>
          <a className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
            <FaYoutube size={14} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-center sm:text-right">
          © {new Date().getFullYear()} ShopEase
        </p>

      </div>
    </footer>
  );
}
