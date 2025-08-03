import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiClock } from "react-icons/fi";
import axios from "axios";

function Total_Employee() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editedData, setEditedData] = useState({});
  const navigate = useNavigate();

  const handleTimeTable = (email) => {
    navigate(`/teacher_time_table/${email}`);
  };

  const handleDelete = async (email) => {
    try {
      await axios.delete(
        `http://localhost:1950/emps/deleteEmployee?email=${email}`
      );
      const updated = employees.filter((emp) => emp.email !== email);
      setEmployees(updated);
      alert("Employee deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete employee");
    }
  };

  const handleEdit = (emp) => {
    setEditingEmployee(emp);
    setEditedData({ ...emp });
  };

  const handleSaveEdit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:1950/emps/editEmployee/${editingEmployee.email}`,
        editedData
      );

      alert("Employee updated successfully.");
      setEditingEmployee(null);
      getAllEmployee();
    } catch (err) {
      console.error(err);
      alert("Failed to update employee.");
    }
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const getAllEmployee = async () => {
    try {
      const res = await axios.get("http://localhost:1950/emps/getEmployee");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllEmployee();
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-center">All Employees</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((emp, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl shadow-md p-4 flex flex-col items-center text-center"
          >
            <img
              src={emp.empPhoto}
              alt={emp.name}
              className="w-24 h-24 rounded-full object-cover mb-3"
            />
            <h3 className="text-xl font-bold">{emp.empName}</h3>
            <p className="text-sm text-gray-400">{emp.email}</p>
            <p className="text-sm text-gray-400">{emp.phoneNumber}</p>
            <p className="mt-2 text-blue-400">{emp.workInformation}</p>
            {emp.workInformation === "Teacher" && (
              <>
                <p className="text-sm">Course: {emp.courseType}</p>
                <p className="text-sm">Branch: {emp.branch}</p>
              </>
            )}
            <p className="text-sm mt-2">Salary: ₹{emp.salary}</p>

            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <button
                onClick={() => handleEdit(emp)}
                className="flex items-center gap-1 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 transition"
              >
                <FiEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(emp.email)}
                className="flex items-center gap-1 px-3 py-1 rounded bg-red-600 hover:bg-red-700 transition"
              >
                <FiTrash2 /> Delete
              </button>
              {emp.workInformation === "Teacher" && (
                <button
                  onClick={() => handleTimeTable(emp.email)}
                  className="flex items-center gap-1 px-3 py-1 rounded bg-green-600 hover:bg-green-700 transition"
                >
                  <FiClock /> Time Table
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {editingEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-xl w-full max-w-md space-y-3 overflow-y-auto max-h-[90vh]">
            <h3 className="text-2xl font-semibold text-center mb-4">
              Edit Employee
            </h3>

            <input
              type="text"
              name="empName"
              value={editedData.empName || ""}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2 border rounded"
            />

            <input
              type="text"
              name="email"
              value={editedData.email || ""}
              readOnly
              className="w-full p-2 border rounded bg-gray-200"
            />

            <input
              type="text"
              name="phoneNumber"
              value={editedData.phoneNumber || ""}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full p-2 border rounded"
            />

            <input
              type="password"
              name="password"
              value={editedData.password || ""}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 border rounded"
            />

            <input
              type="text"
              name="empPhoto"
              value={editedData.empPhoto || ""}
              onChange={handleChange}
              placeholder="Photo URL"
              className="w-full p-2 border rounded"
            />

            <input
              type="text"
              name="salary"
              value={editedData.salary || ""}
              onChange={handleChange}
              placeholder="Salary"
              className="w-full p-2 border rounded"
            />

            <input
              type="text"
              name="courseType"
              value={editedData.courseType || ""}
              onChange={handleChange}
              placeholder="Course Type"
              className="w-full p-2 border rounded"
            />

            <input
              type="text"
              name="branch"
              value={editedData.branch || ""}
              onChange={handleChange}
              placeholder="Branch"
              className="w-full p-2 border rounded"
            />

            <input
              type="text"
              name="workInformation"
              value={editedData.workInformation || ""}
              onChange={handleChange}
              placeholder="Work Information"
              className="w-full p-2 border rounded"
            />

            <input
              type="text"
              name="subjects"
              value={(editedData.subjects || []).join(", ")}
              onChange={(e) =>
                setEditedData({
                  ...editedData,
                  subjects: e.target.value.split(",").map((s) => s.trim()),
                })
              }
              placeholder="Subjects (comma separated)"
              className="w-full p-2 border rounded"
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={handleSaveEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setEditingEmployee(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Total_Employee;
