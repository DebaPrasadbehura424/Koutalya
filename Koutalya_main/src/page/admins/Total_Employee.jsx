import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiClock } from "react-icons/fi";
import axios from "axios";

function Total_Employee() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    const updated = employees.filter((emp) => emp.id !== id);
    setEmployees(updated);
  };

  const handleEdit = (id) => {
    alert(`Edit employee with ID: ${id}`);
  };

  const handleTimeTable = (email) => {
    navigate(`/teacher_time_table/${email}`);
  };

  async function getAllEmployee() {
    await axios
      .get("http://localhost:1950/emps/getEmployee")
      .then((res) => {
        setEmployees(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
            <h3 className="text-xl font-bold">{emp.name}</h3>
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
                onClick={() => handleEdit(emp.id)}
                className="flex items-center gap-1 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 transition"
              >
                <FiEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(emp.id)}
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
    </div>
  );
}

export default Total_Employee;
