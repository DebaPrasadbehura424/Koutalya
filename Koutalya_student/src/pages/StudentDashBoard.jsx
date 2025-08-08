import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  FaNewspaper,
  FaBell,
  FaCheckCircle,
  FaBook,
  FaPen,
  FaRupeeSign,
  FaGamepad,
  FaSignOutAlt,
  FaClock,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

import News from "../component/News";
import Notification from "../component/Notification";
import TimeTable from "../component/TimeTable";
import Attendance from "../component/Attendance";
import Fees from "../component/Fees";
import Games from "./Games";

const StudentDashBoard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [component, setComponent] = useState(0);
  const [studyDropdownOpen, setStudyDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => {
      const isOpen = !prev;
      document.body.style.overflow = isOpen ? "hidden" : "auto";
      return isOpen;
    });
  };

  const handleComponentSelect = (val) => {
    setComponent(val);
    if (sidebarOpen) toggleSidebar();
  };

  const renderContent = () => {
    switch (component) {
      case 0:
        return <News />;
      case 1:
        return <Notification />;
      case 2:
        return <Attendance />;
      case 3:
        return <TimeTable />;
      case "assignment":
        return <p className="text-xl">Assignment</p>;
      case "exampaper":
        return <p className="text-xl">Exam Paper</p>;
      case "notes":
        return <p className="text-xl">Notes</p>;
      case 4:
        return <p className="text-xl">Test</p>;
      case 5:
        return <Fees />;
      case 6:
        return <Games />;
      case 7:
        return <p className="text-xl">Logging out...</p>;
      default:
        return <p className="text-xl text-gray-800">Default page</p>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div
        className={`fixed z-30 w-64 h-screen bg-gray-900 text-white transition-transform duration-300 ease-in-out transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:sticky md:top-0 md:h-screen shadow-lg`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="text-2xl font-semibold tracking-tight">Dashboard</div>
          <button
            className="md:hidden text-white text-2xl focus:outline-none"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          <button
            onClick={() => handleComponentSelect(0)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 ${
              component === 0 ? "bg-blue-600" : ""
            }`}
          >
            <FaNewspaper />
            News
          </button>

          <button
            onClick={() => handleComponentSelect(1)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 ${
              component === 1 ? "bg-blue-600" : ""
            }`}
          >
            <FaBell />
            Notification
          </button>

          <button
            onClick={() => handleComponentSelect(2)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 ${
              component === 2 ? "bg-blue-600" : ""
            }`}
          >
            <FaCheckCircle />
            Attendance
          </button>

          <button
            onClick={() => handleComponentSelect(3)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 ${
              component === 3 ? "bg-blue-600" : ""
            }`}
          >
            <FaClock />
            Timetable
          </button>

          {/* Study Materials with Dropdown */}
          <div>
            <button
              onClick={() => setStudyDropdownOpen((prev) => !prev)}
              className="flex items-center justify-between w-full gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-800"
            >
              <span className="flex items-center gap-3">
                <FaBook />
                Study Materials
              </span>
              {studyDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {studyDropdownOpen && (
              <div className="ml-8 mt-1 flex flex-col gap-1">
                <button
                  onClick={() => handleComponentSelect("assignment")}
                  className={`text-left px-3 py-2 rounded-md text-sm hover:bg-gray-800 ${
                    component === "assignment" ? "bg-blue-600" : ""
                  }`}
                >
                  Assignment
                </button>
                <button
                  onClick={() => handleComponentSelect("exampaper")}
                  className={`text-left px-3 py-2 rounded-md text-sm hover:bg-gray-800 ${
                    component === "exampaper" ? "bg-blue-600" : ""
                  }`}
                >
                  Exam Paper
                </button>
                <button
                  onClick={() => handleComponentSelect("notes")}
                  className={`text-left px-3 py-2 rounded-md text-sm hover:bg-gray-800 ${
                    component === "notes" ? "bg-blue-600" : ""
                  }`}
                >
                  Notes
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => handleComponentSelect(4)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 ${
              component === 4 ? "bg-blue-600" : ""
            }`}
          >
            <FaPen />
            Test
          </button>

          <button
            onClick={() => handleComponentSelect(5)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 ${
              component === 5 ? "bg-blue-600" : ""
            }`}
          >
            <FaRupeeSign />
            Fee Status
          </button>

          <button
            onClick={() => handleComponentSelect(6)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 ${
              component === 6 ? "bg-blue-600" : ""
            }`}
          >
            <FaGamepad />
            Games
          </button>

          <button
            onClick={() => handleComponentSelect(7)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 ${
              component === 7 ? "bg-blue-600" : ""
            }`}
          >
            <FaSignOutAlt />
            Logout
          </button>
        </nav>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-10">
          <button
            className="md:hidden text-2xl text-gray-700 focus:outline-none"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
          >
            <FiMenu />
          </button>

          <div className="flex items-center gap-3 ml-auto">
            <span className="font-semibold text-gray-800 text-sm">
              John Doe
            </span>
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
            />
          </div>
        </div>

        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <div className="max-w-4xl mx-auto w-full">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashBoard;
