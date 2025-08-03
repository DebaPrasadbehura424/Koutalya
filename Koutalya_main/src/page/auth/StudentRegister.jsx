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
    photo: "",
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
          photo: "",
        });
      })
      .catch((err) => {
        console.error("Registration failed:", err);
        alert("Something went wrong!");
      });
  };

  const handleViewAll = () => navigate("/all_student");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 px-4 py-10 text-white flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 text-gray-900 relative">
        <button
          onClick={handleViewAll}
          className="absolute top-4 right-4 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md shadow-md text-sm"
        >
          <FiUsers className="text-base" />
          All Students
        </button>

        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Student Registration
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-style"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-style"
          />
          <input
            type="text"
            name="registrationId"
            placeholder="Registration ID"
            value={formData.registrationId}
            onChange={handleChange}
            required
            className="input-style"
          />
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            value={formData.photo}
            onChange={handleChange}
            required
            className="input-style"
          />
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
            className="input-style"
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
            className="input-style"
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
            className="input-style"
          />
          <input
            type="number"
            name="endYear"
            placeholder="End Year"
            value={formData.endYear}
            onChange={handleChange}
            required
            className="input-style"
          />
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2.5 rounded-md shadow-md"
            >
              Register Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentRegister;
