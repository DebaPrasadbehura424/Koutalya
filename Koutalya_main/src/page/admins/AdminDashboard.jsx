import React, { useState } from "react";
import {
  FiMenu,
  FiLogOut,
  FiUserPlus,
  FiUsers,
  FiCalendar,
  FiBell,
  FiFileText,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import NoticeBoard from "./NoticeBoard";
import EmployeeInfo from "./EmployeeInfo";
import News from "../academy/News";
import TimeTableStudent from "./TimeTableStudent";
import StudentRegister from "../auth/StudentRegister";

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderContent = () => {
    switch (activeTab) {
      case 1:
        return <NoticeBoard />;
      case 2:
        return <EmployeeInfo />;
      case 3:
        return <StudentRegister />;
      case 4:
        return <TimeTableStudent />;
      case 5:
        return <News />;
      default:
        return (
          <div className="text-center text-gray-400 mt-10 text-xl">
            Welcome to the Admin Dashboard
          </div>
        );
    }
  };

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
          <li
            className="flex items-center space-x-3 hover:text-gray-300 cursor-pointer"
            onClick={() => setActiveTab(1)}
          >
            <FiFileText />
            <span>New Notice</span>
          </li>
          <li
            className="flex items-center space-x-3 hover:text-gray-300 cursor-pointer"
            onClick={() => setActiveTab(2)}
          >
            <FiUsers />
            <span>Employee</span>
          </li>
          <li
            className="flex items-center space-x-3 hover:text-gray-300 cursor-pointer"
            onClick={() => setActiveTab(3)}
          >
            <FiUserPlus />
            <span>Student</span>
          </li>
          <li
            className="flex items-center space-x-3 hover:text-gray-300 cursor-pointer"
            onClick={() => setActiveTab(4)}
          >
            <FiCalendar />
            <span>Time Table</span>
          </li>
          <li
            className="flex items-center space-x-3 hover:text-gray-300 cursor-pointer"
            onClick={() => setActiveTab(5)}
          >
            <FiBell />
            <span>News</span>
          </li>
          <li className="flex items-center space-x-3 hover:text-gray-300 cursor-pointer">
            <FiLogOut />
            <span>Logout</span>
          </li>
        </ul>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between bg-gray-850 p-4 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <NavLink
              to="/admin_profile_info"
              className="flex items-center space-x-2 md:hidden"
            >
              <img
                src="https://via.placeholder.com/30"
                alt="admin"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium">Admin Name</span>
            </NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <button className="md:hidden text-white" onClick={toggleSidebar}>
              <FiMenu size={24} />
            </button>

            <NavLink
              to="/admin_profile_info"
              className="hidden md:flex items-center space-x-2 hover:opacity-90"
            >
              <img
                src="https://via.placeholder.com/40"
                alt="admin"
                className="w-10 h-10 rounded-full"
              />
              <span className="font-medium">Admin Name</span>
            </NavLink>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="h-full border-2 border-dashed border-gray-700 rounded-lg p-4">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
