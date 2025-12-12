import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setErrors({ general: "Invalid email or password" });
      } else {
        setErrors({ general: "Something went wrong. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 flex items-center justify-center py-8 px-4 sm:px-6 mt-8 lg:px-8 relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/20 to-teal-100/20"></div>

      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-500">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-indigo-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-800 to-teal-600 bg-clip-text text-transparent mt-3">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
          
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <div className="relative mt-1">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                }}
                className={`w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm bg-gray-50 rounded-xl border ${
                  errors.email ? "border-red-400" : "border-gray-200"
                } focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all`}
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(prev => ({ ...prev, password: "" }));
                }}
                className={`w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm bg-gray-50 rounded-xl border ${
                  errors.password ? "border-red-400" : "border-gray-200"
                } focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all`}
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* General Error */}
          {errors.general && (
            <p className="text-red-500 text-sm text-center">{errors.general}</p>
          )}

          {/* Forgot Password */}
          <div className="text-right -mt-2">
            <Link className="text-xs sm:text-sm text-indigo-600" to="/forgot-password">
              Forgot your password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 sm:py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-teal-500 rounded-lg shadow-md hover:opacity-90 transition-all disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign In Securely"}
          </button>

          {/* Register */}
          <div className="text-center text-xs sm:text-sm">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link className="text-indigo-600 font-medium" to="/page">
                Create one now
              </Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
