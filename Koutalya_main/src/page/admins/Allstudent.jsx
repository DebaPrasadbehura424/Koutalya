import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";

function Allstudent() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
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

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get("http://localhost:1950/api/students/all")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Failed to fetch students:", err));
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      axios
        .delete(`http://localhost:1950/api/students/delete/${id}`)
        .then(() => fetchStudents())
        .catch((err) => console.error("Delete failed:", err));
    }
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name || "",
      email: student.email || "",
      registrationId: student.registrationId || "",
      course: student.course || "",
      branch: student.branch || "",
      startYear: student.startYear || "",
      endYear: student.endYear || "",
      photo: student.photo || "",
    });
  };

  const closeEditModal = () => {
    setEditingStudent(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:1950/api/students/update/${editingStudent.id}`, {
        ...formData,
        password: editingStudent.password, // Assuming password is required
      })
      .then(() => {
        fetchStudents();
        closeEditModal();
      })
      .catch((err) => console.error("Update failed:", err));
  };

  return (
    <div className="min-h-screen bg-[#1E293B] text-white py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">All Students</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white text-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center relative"
          >
            <img
              src={student.photo}
              alt={student.name}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h2 className="text-lg font-semibold">{student.name}</h2>
            <p className="text-sm text-gray-600">{student.registrationId}</p>
            <p className="text-sm">{student.email}</p>
            <p className="text-sm mb-1">Course: {student.course}</p>
            <p className="text-sm mb-1">Branch: {student.branch}</p>
            <p className="text-sm mb-1">Start Year: {student.startYear}</p>
            <p className="text-sm mb-2">End Year: {student.endYear}</p>
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => openEditModal(student)}
                className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <FiEdit className="mr-1" /> Edit
              </button>
              <button
                onClick={() => handleDelete(student.id)}
                className="flex items-center px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                <FiTrash2 className="mr-1" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Student</h2>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Name"
                className="w-full p-2 mb-4 border rounded"
              />
              <input
                type="text"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email"
                className="w-full p-2 mb-4 border rounded"
              />
              <input
                type="text"
                value={formData.registrationId}
                onChange={(e) =>
                  setFormData({ ...formData, registrationId: e.target.value })
                }
                placeholder="Registration ID"
                className="w-full p-2 mb-4 border rounded"
              />
              <input
                type="text"
                value={formData.photo}
                onChange={(e) =>
                  setFormData({ ...formData, photo: e.target.value })
                }
                placeholder="Photo URL"
                className="w-full p-2 mb-4 border rounded"
              />
              <select
                value={formData.course}
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
                className="w-full p-2 mb-4 border rounded"
              >
                <option value="">Select Course</option>
                <option value="BTech">BTech</option>
                <option value="Diploma">Diploma</option>
              </select>
              <select
                value={formData.branch}
                onChange={(e) =>
                  setFormData({ ...formData, branch: e.target.value })
                }
                className="w-full p-2 mb-4 border rounded"
              >
                <option value="">Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="MECH">MECH</option>
                <option value="EE">EE</option>
                <option value="CIVIL">CIVIL</option>
              </select>
              <input
                type="number"
                value={formData.startYear}
                onChange={(e) =>
                  setFormData({ ...formData, startYear: e.target.value })
                }
                placeholder="Start Year"
                className="w-full p-2 mb-4 border rounded"
              />
              <input
                type="number"
                value={formData.endYear}
                onChange={(e) =>
                  setFormData({ ...formData, endYear: e.target.value })
                }
                placeholder="End Year"
                className="w-full p-2 mb-4 border rounded"
              />

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Allstudent;
