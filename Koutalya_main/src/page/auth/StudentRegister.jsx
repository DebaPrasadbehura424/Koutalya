import React, { useState } from "react";
import { FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudentRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    registrationId: "",
    course: "",
    branch: "",
    startYear: "",
    endYear: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:1950/api/students/register", formData)
      .then(() => {
        alert("Student registered successfully!");
        setFormData({
          name: "",
          email: "",
          registrationId: "",
          course: "",
          branch: "",
          startYear: "",
          endYear: "",
        });
      })
      .catch((err) => {
        console.error("Registration failed:", err);
        alert("Something went wrong!");
      });
  };

  const handleViewAll = () => navigate("/all_student");

  return (
    <div className="min-h-screen bg-[#1E293B] px-4 py-8 relative text-white">
      <div className="absolute top-6 right-6">
        <button
          onClick={handleViewAll}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
        >
          <FiUsers className="text-lg" />
          See All Students
        </button>
      </div>

      <div className="flex justify-center items-center">
        <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
            Student Registration
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              value={formData.photo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />

            <input
              type="text"
              name="registrationId"
              placeholder="Registration ID"
              value={formData.registrationId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            >
              <option value="">Select Course</option>
              <option value="BTech">BTech</option>
              <option value="Diploma">Diploma</option>
            </select>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            >
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="MECH">MECH</option>
              <option value="EE">EE</option>
              <option value="CIVIL">CIVIL</option>
            </select>
            <input
              type="number"
              name="startYear"
              placeholder="Start Year"
              value={formData.startYear}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="number"
              name="endYear"
              placeholder="End Year"
              value={formData.endYear}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StudentRegister;
