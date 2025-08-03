import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

function StudentLogin() {
  const [registrationId, setRegistrationId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Canvas animation setup
  useEffect(() => {
    const canvas = document.getElementById("bgCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 8 + 3;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.1;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = "rgba(59, 130, 246, 0.3)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function init() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.size <= 0.2) {
          particles.splice(index, 1);
          particles.push(new Particle());
        }
      });
      requestAnimationFrame(animate);
    }

    init();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:1950/api/students/login", {
        registrationId,
        password,
      });

      setError("");
      navigate("/student-dashboard");
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
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4 overflow-hidden">
      <canvas
        id="bgCanvas"
        className="absolute inset-0 z-0"
        style={{ opacity: 0.5 }}
      />
      <div className="relative z-10 bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-blue-200 transform transition-all hover:scale-105 duration-300">
        <h2 className="text-4xl font-extrabold text-indigo-900 mb-6 text-center bg-clip-text  bg-gradient-to-r from-indigo-500 to-blue-500">
          Student Login
        </h2>

        {error && (
          <div className="bg-red-100/80 text-red-700 p-3 rounded-xl mb-6 text-center animate-pulse">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-indigo-800 font-medium mb-2">
              Registration Number
            </label>
            <input
              type="text"
              value={registrationId}
              onChange={(e) => setRegistrationId(e.target.value)}
              placeholder="Enter registration number"
              required
              className="w-full px-4 py-3 rounded-xl bg-indigo-50 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-indigo-800 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full px-4 py-3 rounded-xl bg-indigo-50 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-indigo-900 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-sm text-indigo-800 text-center space-y-3">
          <p>
            Forgot your password?{" "}
            <NavLink
              to="/forgot-password"
              className="text-yellow-500 hover:text-yellow-600 font-medium hover:underline transition duration-200"
            >
              Reset here
            </NavLink>
          </p>
          <p>
            Don't have an account?{" "}
            <NavLink
              to="/report"
              className="text-yellow-500 hover:text-yellow-600 font-medium hover:underline transition duration-200"
            >
              Report
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
