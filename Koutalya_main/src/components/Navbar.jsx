import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    "Home",
    "About",
    "Admission",
    "Academics",
    "Gallery",
    "Placement",
    "Alumni",
    "Career",
    "Contact",
  ];

  const formatLink = (link) => `/${link.toLowerCase().replace(/\s+/g, "-")}`;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://via.placeholder.com/40"
            alt="Logo"
            className="h-10 w-10 rounded-full border-2 border-white"
          />
          <h1 className="text-xl font-semibold tracking-wide">
            Koutalya University
          </h1>
        </div>

        <div className="hidden lg:flex items-center gap-5">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={formatLink(link)}
              className={({ isActive }) =>
                `text-sm px-3 py-1 rounded transition-all duration-300 ${
                  isActive
                    ? "bg-white text-blue-900"
                    : "hover:bg-white hover:text-blue-900"
                }`
              }
            >
              {link}
            </NavLink>
          ))}

          <div className="ml-4 flex gap-2">
            <NavLink to="http://localhost:2929">
              <button className="bg-white text-blue-900 text-sm px-3 py-1 rounded-full hover:bg-yellow-300 transition duration-300">
                Student
              </button>
            </NavLink>
            <NavLink to="/admin_login">
              <button className="bg-white text-blue-900 text-sm px-3 py-1 rounded-full hover:bg-yellow-300 transition duration-300">
                Admin
              </button>
            </NavLink>
            <button className="bg-white text-blue-900 text-sm px-3 py-1 rounded-full hover:bg-yellow-300 transition duration-300">
              Employee
            </button>
          </div>
        </div>

        <div className="lg:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden px-4 pb-4 bg-blue-900 border-t border-blue-700">
          <div className="flex flex-col gap-3 mt-2">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={formatLink(link)}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-sm px-3 py-2 rounded transition duration-300 ${
                    isActive
                      ? "bg-white text-blue-900"
                      : "hover:bg-white hover:text-blue-900"
                  }`
                }
              >
                {link}
              </NavLink>
            ))}
            <div className="flex flex-col gap-2 mt-3">
              <button className="bg-white text-blue-900 text-sm px-4 py-2 rounded-full hover:bg-yellow-300 transition">
                Student
              </button>
              <button
                onClick={() => navigate("/admin_login")}
                className="bg-white text-blue-900 text-sm px-4 py-2 rounded-full hover:bg-yellow-300 transition"
              >
                Admin
              </button>
              <button className="bg-white text-blue-900 text-sm px-4 py-2 rounded-full hover:bg-yellow-300 transition">
                Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
