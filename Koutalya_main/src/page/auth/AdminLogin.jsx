import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function AdminLogin() {
  const [loginInput, setLoginInput] = useState(""); // email or ID card number
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = loginInput.includes("@")
        ? { email: loginInput, adminPassword }
        : { idCardNumber: loginInput, adminPassword };

      const response = await axios.post(
        "http://localhost:1950/admin/login",
        payload
      );
      navigate("/admin_dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-medium mb-2"
              htmlFor="loginInput"
            >
              Email or ID Card Number
            </label>
            <input
              type="text"
              id="loginInput"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter email or ID card number"
              required
            />
          </div>

          <div className="mb-6 relative">
            <label
              className="block text-gray-300 text-sm font-medium mb-2"
              htmlFor="adminPassword"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="adminPassword"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-400 hover:text-white"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-800 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          {/* <NavLink
            to="/admin_register"
            className="text-blue-400 hover:text-blue-300"
          >
            Register
          </NavLink> */}
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
