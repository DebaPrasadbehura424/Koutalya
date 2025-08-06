import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import {
  FaChalkboardTeacher,
  FaClipboardList,
  FaBookOpen,
  FaCalendarAlt,
  FaTasks,
  FaUsers,
  FaGraduationCap,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const TeacherDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [component, setComponent] = useState(0);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);

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
        return <p className="text-xl">Class Overview</p>;
      case 1:
        return <p className="text-xl">Assignments</p>;
      case 2:
        return <p className="text-xl">Attendance Tracker</p>;
      case 3:
        return <p className="text-xl">Class Schedule</p>;
      case "materials":
        return <p className="text-xl">Study Materials</p>;
      case "quizzes":
        return <p className="text-xl">Quizzes</p>;
      case "results":
        return <p className="text-xl">Results</p>;
      case 4:
        return <p className="text-xl">Student Management</p>;
      case 5:
        return <p className="text-xl">Logout...</p>;
      default:
        return <p className="text-xl text-gray-800">Teacher Dashboard</p>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <div
        className={`fixed z-30 w-64 h-screen bg-purple-900 text-white transition-transform duration-300 ease-in-out transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:sticky md:top-0 md:h-screen shadow-lg`}
      >
        <div className="flex items-center justify-between p-4 border-b border-purple-700">
          <div className="text-2xl font-semibold tracking-tight">
            Teacher Panel
          </div>
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
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-purple-800 ${
              component === 0 ? "bg-purple-700" : ""
            }`}
          >
            <FaChalkboardTeacher />
            Overview
          </button>

          <button
            onClick={() => handleComponentSelect(1)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-purple-800 ${
              component === 1 ? "bg-purple-700" : ""
            }`}
          >
            <FaClipboardList />
            Assignments
          </button>

          <button
            onClick={() => handleComponentSelect(2)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-purple-800 ${
              component === 2 ? "bg-purple-700" : ""
            }`}
          >
            <FaUsers />
            Attendance
          </button>

          <button
            onClick={() => handleComponentSelect(3)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-purple-800 ${
              component === 3 ? "bg-purple-700" : ""
            }`}
          >
            <FaCalendarAlt />
            Schedule
          </button>

          <div>
            <button
              onClick={() => setResourcesDropdownOpen((prev) => !prev)}
              className="flex items-center justify-between w-full gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-purple-800"
            >
              <span className="flex items-center gap-3">
                <FaBookOpen />
                Resources
              </span>
              {resourcesDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {resourcesDropdownOpen && (
              <div className="ml-8 mt-1 flex flex-col gap-1">
                <button
                  onClick={() => handleComponentSelect("materials")}
                  className={`text-left px-3 py-2 rounded-md text-sm hover:bg-purple-800 ${
                    component === "materials" ? "bg-purple-700" : ""
                  }`}
                >
                  Materials
                </button>
                <button
                  onClick={() => handleComponentSelect("quizzes")}
                  className={`text-left px-3 py-2 rounded-md text-sm hover:bg-purple-800 ${
                    component === "quizzes" ? "bg-purple-700" : ""
                  }`}
                >
                  Quizzes
                </button>
                <button
                  onClick={() => handleComponentSelect("results")}
                  className={`text-left px-3 py-2 rounded-md text-sm hover:bg-purple-800 ${
                    component === "results" ? "bg-purple-700" : ""
                  }`}
                >
                  Results
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => handleComponentSelect(4)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-purple-800 ${
              component === 4 ? "bg-purple-700" : ""
            }`}
          >
            <FaGraduationCap />
            Manage Students
          </button>

          <button
            onClick={() => handleComponentSelect(5)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-purple-800 ${
              component === 5 ? "bg-purple-700" : ""
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

      {/* Main Content */}
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
              Jane Smith
            </span>
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
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

export default TeacherDashboard;
