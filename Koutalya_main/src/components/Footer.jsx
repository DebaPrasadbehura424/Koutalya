import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-white mt-16">
      {/* Top CTA */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 py-8 px-6 sm:px-16 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold uppercase tracking-wide text-white">
            Start Your Journey with Koutalya
          </h2>
          <p className="text-sm sm:text-base mt-1 text-gray-300">
            Admission Hotline: +91 9876543210 | Email: apply@koutalya.edu.in
          </p>
        </div>
        <button className="mt-4 sm:mt-0 px-6 py-2 border-2 border-white rounded-full hover:bg-white hover:text-indigo-800 font-semibold transition">
          Apply Now
        </button>
      </div>

      {/* Main Footer */}
      <div className="bg-[#101522] py-12 px-6 sm:px-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">
            Contact Us
          </h3>
          <p className="text-sm leading-relaxed text-gray-300">
            <strong>Koutalya Institute of Technology & Management</strong>
            <br />
            Sector 5, Innovation Park, Bengaluru - 560100, India
            <br />
            Phone: +91 9876543210
            <br />
            Email: info@koutalya.edu.in
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">
            Quick Links
          </h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>
              <a href="#" className="hover:text-white transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Academic Programs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Campus Life
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Admissions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Careers
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">
            Resources
          </h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>
              <a href="#" className="hover:text-white transition">
                Library
              </a>
            </li>
            <li>
              <NavLink
                to="http://localhost:2929"
                className="hover:text-white transition"
              >
                Student login
              </NavLink>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Faculty Login
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Alumni Network
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Scholarships
              </a>
            </li>
          </ul>
        </div>

        {/* Social & Apps */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">
            Stay Connected
          </h3>
          <div className="flex space-x-4 mb-6">
            <a
              href="#"
              className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-sky-400 p-2 rounded-full hover:bg-sky-500 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-pink-500 p-2 rounded-full hover:bg-pink-600 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-blue-800 p-2 rounded-full hover:bg-blue-900 transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="bg-red-600 p-2 rounded-full hover:bg-red-700 transition"
            >
              <FaYoutube />
            </a>
          </div>
          <div className="flex gap-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-10"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-10"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#0a0e1a] text-gray-400 text-sm text-center py-4 px-4 flex flex-col sm:flex-row justify-between items-center">
        <p>© 2025 Koutalya Institute. All rights reserved.</p>
        <div className="space-x-4 mt-2 sm:mt-0">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Use
          </a>
          <a href="#" className="hover:underline">
            Fees & Refunds
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
