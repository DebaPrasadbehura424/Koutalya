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
    photo: "",
    program: "",
    branch: "",
    semester: "",
    section: "",
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
          photo: "",
          program: "",
          branch: "",
          semester: "",
          section: "",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-8 flex justify-center items-center text-white">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">
            Student Registration
          </h2>
          <button
            onClick={handleViewAll}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md shadow text-sm"
          >
            <FiUsers className="text-base" />
            All Students
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-dark"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-dark"
          />
          <input
            type="text"
            name="registrationId"
            placeholder="Registration ID"
            value={formData.registrationId}
            onChange={handleChange}
            required
            className="input-dark"
          />
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            value={formData.photo}
            onChange={handleChange}
            required
            className="input-dark"
          />
          <select
            name="program"
            value={formData.program}
            onChange={handleChange}
            required
            className="bg-gray-400"
          >
            <option value="">Select Program</option>
            <option value="B.Tech">B.Tech</option>
            <option value="Diploma">Diploma</option>
          </select>

          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            required
            className="bg-gray-400"
          >
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="MECH">MECH</option>
            <option value="EE">EE</option>
            <option value="CIVIL">CIVIL</option>
          </select>
          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            required
            className="bg-gray-400"
          >
            <option value="">Select Semester</option>
            {[...Array(8)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{`Semester ${i + 1}`}</option>
            ))}
          </select>
          <select
            name="section"
            value={formData.section}
            onChange={handleChange}
            required
            className="bg-gray-400"
          >
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
          <input
            type="number"
            name="startYear"
            placeholder="Start Year"
            value={formData.startYear}
            onChange={handleChange}
            required
            className="bg-gray-400"
          />
          <input
            type="number"
            name="endYear"
            placeholder="End Year"
            value={formData.endYear}
            onChange={handleChange}
            required
            className="bg-gray-400"
          />

          <div className="col-span-1 sm:col-span-2 lg:col-span-3">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2.5 rounded-md shadow"
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
