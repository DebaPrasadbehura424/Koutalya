import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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

  const closeEditModal = () => setEditingStudent(null);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:1950/api/students/update/${editingStudent.id}`, {
        ...formData,
        password: editingStudent.password,
      })
      .then(() => {
        fetchStudents();
        closeEditModal();
      })
      .catch((err) => console.error("Update failed:", err));
  };

  const goToFees = (studentId, feesId) => {
    navigate(`/fees/${studentId}/${feesId}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">All Students</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white text-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center relative"
          >
            <img
              src={student.photo}
              alt={student.name}
              className="w-20 h-20 rounded-full object-cover mb-3"
            />
            <h2 className="text-base font-semibold text-center">
              {student.name}
            </h2>
            <p className="text-xs text-gray-600">{student.registrationId}</p>
            <p className="text-xs text-gray-700">{student.email}</p>
            <p className="text-xs">Course: {student.course}</p>
            <p className="text-xs">Branch: {student.branch}</p>
            <p className="text-xs">
              Year: {student.startYear} - {student.endYear}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => openEditModal(student)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm rounded flex items-center"
              >
                <FiEdit className="mr-1" /> Edit
              </button>
              <button
                onClick={() => handleDelete(student.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm rounded flex items-center"
              >
                <FiTrash2 className="mr-1" /> Delete
              </button>
            </div>
            <button
              onClick={() => goToFees(student.id, student.feesModel.id)}
              className="mt-2 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1 rounded"
            >
              Fees
            </button>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Student</h2>
            <form onSubmit={handleEditSubmit}>
              {[
                { name: "name", type: "text", placeholder: "Name" },
                { name: "email", type: "email", placeholder: "Email" },
                {
                  name: "registrationId",
                  type: "text",
                  placeholder: "Registration ID",
                },
                { name: "photo", type: "text", placeholder: "Photo URL" },
                {
                  name: "startYear",
                  type: "number",
                  placeholder: "Start Year",
                },
                { name: "endYear", type: "number", placeholder: "End Year" },
              ].map(({ name, type, placeholder }) => (
                <input
                  key={name}
                  type={type}
                  value={formData[name]}
                  onChange={(e) =>
                    setFormData({ ...formData, [name]: e.target.value })
                  }
                  placeholder={placeholder}
                  className="w-full p-2 mb-4 border rounded"
                />
              ))}

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

              <div className="flex justify-end gap-2">
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
