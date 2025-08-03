import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import {
  FaNewspaper,
  FaBell,
  FaCheckCircle,
  FaStickyNote,
  FaBook,
  FaPen,
  FaRupeeSign,
  FaGamepad,
  FaSignOutAlt,
} from "react-icons/fa";
import News from "../component/News";
import Notification from "../component/Notification";

const menuItems = [
  { name: "News", icon: <FaNewspaper /> },
  { name: "Notification", icon: <FaBell /> },
  { name: "Attendance", icon: <FaCheckCircle /> },
  { name: "Notes", icon: <FaStickyNote /> },
  { name: "Study Materials", icon: <FaBook /> },
  { name: "Test", icon: <FaPen /> },
  { name: "Fee Status", icon: <FaRupeeSign /> },
  { name: "Games", icon: <FaGamepad /> },
  { name: "Logout", icon: <FaSignOutAlt /> },
];

const StudentDashBoard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [component, setComponent] = useState(0);

  const renderContent = () => {
    switch (component) {
      case 0:
        return <News />;
      case 1:
        return <Notification />;
      default:
        return <p className="text-xl text-gray-800">Default page</p>;
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => {
      const isOpen = !prev;
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
      return isOpen;
    });
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
          {menuItems.map((item, idx) => (
            <button
              onClick={() => {
                setComponent(idx);
                if (sidebarOpen) toggleSidebar();
              }}
              key={idx}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors ${
                component === idx ? "bg-blue-600" : ""
              }`}
              aria-label={`Navigate to ${item.name}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
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
