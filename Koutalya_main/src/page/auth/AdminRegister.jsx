import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

{
  /* Password will be generated automatically and saved */
}
function AdminRegister(props) {
  const [email, setEmail] = useState("");
  const [idCardNumber, setIdCardNumber] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/admin/register", {
        email,
        idCardNumber,
      });
      alert("register successfully");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Admin Register
        </h2>

        <div className="mb-4">
          <label
            className="block text-gray-300 text-sm font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-300 text-sm font-medium mb-2"
            htmlFor="idCardNumber"
          >
            Identity Card Number
          </label>
          <input
            type="text"
            id="idCardNumber"
            value={idCardNumber}
            onChange={(e) => setIdCardNumber(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter ID Card Number"
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-800 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
        >
          Register
        </button>

        <div className="mt-4 text-center text-sm">
          {/* <NavLink
            to="/admin_login"
            className="text-blue-400 hover:text-blue-300"
          >
            Already have an account? Login
          </NavLink> */}
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
