import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">

          {/* Logo + About */}
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">ShopEase</h2>
            <p className="text-sm leading-6 max-w-xs mx-auto sm:mx-0">
              Your one-stop destination for fashion, electronics & lifestyle products.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 justify-center sm:justify-start mt-4">
              <a className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                <FaFacebookF size={16} />
              </a>
              <a className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                <FaInstagram size={16} />
              </a>
              <a className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                <FaTwitter size={16} />
              </a>
              <a className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                <FaYoutube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Products</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-white mb-3">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">FAQs</li>
              <li className="hover:text-white cursor-pointer">Shipping Info</li>
              <li className="hover:text-white cursor-pointer">Refund Policy</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-white mb-3">Stay Updated</h3>
            <p className="text-sm mb-4 max-w-xs mx-auto sm:mx-0">
              Subscribe to get the latest offers & updates.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-center sm:items-start">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:flex-1 px-4 py-2 bg-white/10 text-white placeholder-gray-300 
                  rounded-lg border border-white/20 focus:outline-none 
                  focus:ring-1 focus:ring-blue-400 text-sm"
              />

              <button
                className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold 
                  hover:bg-blue-700 transition text-sm"
              >
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-xs sm:text-sm text-gray-400">
          © {new Date().getFullYear()} ShopEase. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
