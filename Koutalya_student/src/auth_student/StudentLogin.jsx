import React from "react";
import { NavLink } from "react-router-dom";

function StudentLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-blue-100">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          Student Login
        </h2>

        <form className="space-y-4">
          <div>
            <label className="block text-blue-800 mb-1">Register Number</label>
            <input
              type="text"
              placeholder="Enter register number"
              className="w-full px-4 py-2 rounded-lg bg-blue-100 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-blue-800 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 rounded-lg bg-blue-100 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        {/* NavLinks */}
        <div className="mt-4 text-sm text-blue-800 text-center space-y-2">
          <p>
            Forgot your password?{" "}
            <NavLink
              to="/forgot-password"
              className="text-yellow-500 hover:underline"
            >
              Reset here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
