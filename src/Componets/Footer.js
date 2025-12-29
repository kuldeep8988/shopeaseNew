import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-6">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Brand + Tagline */}
          <div className="text-center sm:text-left">
            <h2 className="text-white font-semibold text-lg">
              ShopEase
            </h2>
            <p className="text-xs text-gray-500">
              Fast delivery • Easy returns • Trusted store
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-white transition">About</a>
            <a href="#" className="hover:text-white transition">Contact</a>
            <a href="#" className="hover:text-white transition">Privacy</a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3">
            {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-indigo-600 text-white transition"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>

        </div>

        {/* Bottom Line */}
        <div className="border-t border-white/10 mt-4 pt-3 text-center text-xs">
          © {new Date().getFullYear()} ShopEase. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
