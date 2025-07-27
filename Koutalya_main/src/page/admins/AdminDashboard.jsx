import React, { useState } from "react";
import {
  FiMenu,
  FiLogOut,
  FiSettings,
  FiUserPlus,
  FiUsers,
  FiCalendar,
  FiBell,
  FiFileText,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import NoticeBoard from "./NoticeBoard";

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      <div
        className={`fixed md:relative z-40 w-64 bg-gray-800 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4 text-xl font-semibold border-b border-gray-700">
          Admin Panel
        </div>
        <ul className="p-4 space-y-4">
          <li className="flex items-center space-x-3 hover:text-gray-300 cursor-pointer">
            <FiFileText />
            <span>New Notice</span>
          </li>
          <li className="flex items-center space-x-3 hover:text-gray-300 cursor-pointer">
            <FiUsers />
            <span>Employee</span>
          </li>
          <li className="flex items-center space-x-3 hover:text-gray-300 cursor-pointer">
            <FiUserPlus />
            <span>Student</span>
          </li>
          <li className="flex items-center space-x-3 hover:text-gray-300 cursor-pointer">
            <FiCalendar />
            <span>Time Table</span>
          </li>
          <li className="flex items-center space-x-3 hover:text-gray-300 cursor-pointer">
            <FiBell />
            <span>News</span>
          </li>
          <li className="flex items-center space-x-3 hover:text-gray-300 cursor-pointer">
            <FiSettings />
            <span>Settings</span>
          </li>
          <li className="flex items-center space-x-3 hover:text-gray-300 cursor-pointer">
            <FiLogOut />
            <span>Logout</span>
          </li>
        </ul>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between bg-gray-850 p-4 border-b border-gray-700">
          <div className="text-xl font-bold">Logo</div>
          <button className="md:hidden text-white" onClick={toggleSidebar}>
            <FiMenu size={24} />
          </button>
        </div>

        <div className="flex-1 p-6">
          <div className="h-full border-2 border-dashed border-gray-700 rounded-lg">
            <NoticeBoard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
