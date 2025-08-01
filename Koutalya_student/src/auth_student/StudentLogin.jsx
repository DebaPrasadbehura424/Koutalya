import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

function StudentLogin() {
  const [registrationId, setRegistrationId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:1950/api/students/login", {
        registrationId,
        password,
      });

      console.log("Login Success", res.data);
      setError("");
      // Navigate to dashboard or student home page
      navigate("/student-dashboard", { state: res.data }); // Optional: Pass student data
    } catch (err) {
      console.error("Login Error", err);
      if (err.response && err.response.status === 404) {
        setError("Student not found");
      } else if (err.response && err.response.status === 401) {
        setError("Invalid password");
      } else {
        setError("Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-blue-100">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          Student Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-blue-800 mb-1">
              Registration Number
            </label>
            <input
              type="text"
              value={registrationId}
              onChange={(e) => setRegistrationId(e.target.value)}
              placeholder="Enter registration number"
              required
              className="w-full px-4 py-2 rounded-lg bg-blue-100 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-blue-800 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
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
