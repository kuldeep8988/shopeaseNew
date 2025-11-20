import React from "react";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="footer" className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300 py-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-xl -translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <h3 className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              ShopEase
            </h3>
            <p className="text-sm leading-relaxed opacity-90 max-w-md">
              Your one-stop shop for quality products. Explore our wide range of
              items and enjoy a seamless shopping experience with fast delivery.
            </p>
            <p className="text-xs opacity-75">
              Built with ❤️ by{" "}
              <a
                href="https://www.linkedin.com/in/kuldeepkhandla"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-all duration-300 hover:underline"
              >
                Kuldeep Khandla
              </a>
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white flex items-center">
              Quick Links
              <span className="ml-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/"
                  className="group flex items-center hover:text-blue-400 transition-all duration-300"
                >
                  <span className="w-2 h-2 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-400 transition-colors duration-300"></span>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="group flex items-center hover:text-blue-400 transition-all duration-300"
                >
                  <span className="w-2 h-2 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-400 transition-colors duration-300"></span>
                  Products
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="group flex items-center hover:text-blue-400 transition-all duration-300"
                >
                  <span className="w-2 h-2 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-400 transition-colors duration-300"></span>
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="group flex items-center hover:text-blue-400 transition-all duration-300"
                >
                  <span className="w-2 h-2 bg-gray-500 rounded-full mr-3 group-hover:bg-blue-400 transition-colors duration-300"></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Connect With Us</h4>
            <div className="space-y-4">
              {/* Social Icons */}
              <div className="flex space-x-6">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-blue-500/20 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/10"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors duration-300" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-blue-500/20 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/10"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors duration-300" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-pink-500/20 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-pink-500/10"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-5 h-5 text-gray-300 group-hover:text-pink-400 transition-colors duration-300" />
                </a>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <h5 className="text-sm font-semibold text-white mb-2">Stay Updated</h5>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-white/20 text-white placeholder-gray-400 rounded-lg border border-white/20 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm space-y-2">
          <p className="opacity-75">
            &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
          </p>
          <p className="text-xs opacity-50">
            Made with love for amazing shoppers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}