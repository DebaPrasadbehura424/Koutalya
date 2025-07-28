import React from "react";
import { useNavigate } from "react-router-dom";

function EmployeeInfo(props) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0a1930] text-white p-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-10">Employee Details</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button
            className="bg-[#1e3a8a] hover:bg-[#2563eb] text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition-all duration-300"
            onClick={() => navigate("/emp_register")}
          >
            Register Employee
          </button>
          <button
            className="bg-[#1e3a8a] hover:bg-[#2563eb] text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition-all duration-300"
            onClick={() => navigate("/total_employee")}
          >
            See All Employees
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeInfo;
