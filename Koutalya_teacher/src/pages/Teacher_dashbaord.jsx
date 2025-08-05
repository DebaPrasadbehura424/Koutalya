import { useState } from "react";
import {
  FaBell,
  FaNewspaper,
  FaCog,
  FaChalkboardTeacher,
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function Teacher_dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100 font-sans">
      <div
        className={`fixed lg:static top-0 left-0 h-full bg-gradient-to-b from-blue-600 to-blue-800 text-white w-64 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 z-50`}
      >
        <div className="p-6 border-b border-blue-700 flex justify-between items-center">
          <h2 className="text-xl font-bold">Teacher Panel</h2>
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={toggleSidebar}
          >
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-4">
          <a href="#" className="flex items-center hover:text-yellow-300">
            <FaNewspaper className="mr-3" /> News
          </a>
          <a href="#" className="flex items-center hover:text-yellow-300">
            <FaBell className="mr-3" /> Notifications
          </a>
          <a href="#" className="flex items-center hover:text-yellow-300">
            <FaChalkboardTeacher className="mr-3" /> Classes
          </a>
          <a href="#" className="flex items-center hover:text-yellow-300">
            <FaUser className="mr-3" /> Profile
          </a>
          <a href="#" className="flex items-center hover:text-yellow-300">
            <FaCog className="mr-3" /> Settings
          </a>
          <a href="#" className="flex items-center hover:text-red-300">
            <FaSignOutAlt className="mr-3" /> Logout
          </a>
        </nav>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="w-full bg-white shadow px-4 py-3 flex justify-between items-center lg:pl-8">
          <button
            className="lg:hidden text-gray-600 focus:outline-none"
            onClick={toggleSidebar}
          >
            <FaBars size={20} />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">John Doe</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        </header>

        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Welcome, Teacher!
          </h2>
          <p className="text-gray-600 mb-6">Here's your overview.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded shadow">News Panel</div>
            <div className="bg-white p-4 rounded shadow">
              Notifications Panel
            </div>
            <div className="bg-white p-4 rounded shadow">Upcoming Classes</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Teacher_dashboard;
