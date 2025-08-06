import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Teacher_Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1950/emps/login", {
        email,
        password,
      });

      if (response.status === 200) {
        navigate("/teacher_dashboard");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
      <div
        className={`bg-white p-8 rounded-xl shadow-lg w-full max-w-md transform transition-all duration-700 ${
          fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Teacher Login
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mb-4 px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="relative mb-4">
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 pr-12 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer text-lg"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-right">
          <a
            href="/forgot_password"
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Teacher_Login;
