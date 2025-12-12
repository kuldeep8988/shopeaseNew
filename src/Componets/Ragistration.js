import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function Registration() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      alert("Passwords do not match");
      return;
    }
    if (!acceptedPolicy) {
      alert("You must accept the terms and conditions");
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: username,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error registering user: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-8 bg-gradient-to-br from-indigo-50 via-white to-teal-50 flex items-center justify-center 
      py-10 px-3 sm:px-6 lg:px-8 relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/20 to-teal-100/20"></div>

      <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-indigo-500 to-teal-500 
            rounded-2xl flex items-center justify-center shadow-lg mb-3">
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-800 to-teal-600 
            bg-clip-text text-transparent">
            Create Account
          </h2>

          <p className="text-gray-600 text-sm mt-1">Join us today</p>
        </div>

        <form onSubmit={handleRegistration} className="space-y-5 sm:space-y-6">

          {/* Username */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <div className="relative mt-1">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 
                  focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Enter your full name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email Address</label>
            <div className="relative mt-1">
              <input
                type="email"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 
                  focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" />
              </svg>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative mt-1">
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 
                  focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <div className="relative mt-1">
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 
                  focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Confirm your password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />

              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2z" />
              </svg>
            </div>
          </div>

          {/* Policy */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={acceptedPolicy}
              onChange={(e) => setAcceptedPolicy(e.target.checked)}
              className="w-4 h-4 mt-1 text-indigo-600 rounded"
            />
            <label className="text-sm text-gray-700 leading-tight">
              I accept the{" "}
              <Link className="text-indigo-600 font-medium">Terms and Conditions</Link>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 text-sm font-semibold bg-gradient-to-r 
              from-indigo-600 to-teal-500 text-white rounded-xl shadow-md
              hover:from-indigo-700 hover:to-teal-600 transition-all active:scale-[0.98]"
          >
            {isLoading ? "Creating Account..." : "Register Now"}
          </button>

          {/* Login */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-medium">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
