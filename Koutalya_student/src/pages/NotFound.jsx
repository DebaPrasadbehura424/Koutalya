import React from "react";
import { NavLink } from "react-router-dom"; // If using React Router

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <NavLink
        to="/student_dashBoard"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Go Home
      </NavLink>
    </div>
  );
}

export default NotFound;
