import axios from "axios";
import React, { useState } from "react";
import {
  FiEye,
  FiEyeOff,
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiDollarSign,
  FiImage,
  FiBook,
} from "react-icons/fi";

function EmployeeRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    empName: "",
    email: "",
    phoneNumber: "",
    password: "",
    empPhoto: "",
    contactNumber: "",
    salary: "",
    courseType: "",
    branch: "",
    subjects: [],
  });

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    if (type === "select-multiple") {
      const selected = Array.from(selectedOptions, (option) => option.value);
      setFormData({ ...formData, [name]: selected });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axios
      .post("http://localhost:1950/emps/register", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        alert("error occurs", err);
      });
  };

  const courseOptions = [
    "BTech",
    "Diploma",
    "ITI",
    "MCS",
    "BCA",
    "B Pharm",
    "D Pharm",
    "12th",
    "Others",
  ];

  const branchOptions = [
    "Computer Science",
    "Mechanical",
    "Civil",
    "Electrical",
    "Electronics",
    "Chemical",
    "Automobile",
    "Biotech",
  ];

  const subjectOptions = [
    "DSA",
    "Operating Systems",
    "DBMS",
    "AI",
    "ML",
    "Web Dev",
    "Mobile App",
    "Networking",
  ];

  return (
    <div className="min-h-screen bg-[#0a1930] p-6 text-white">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">
          Register Employee
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          <div className="relative md:col-span-2">
            <label className="block text-sm mb-1">Employee Name</label>
            <div className="flex items-center bg-gray-700 rounded-lg px-3">
              <FiUser className="mr-2" />
              <input
                type="text"
                name="empName"
                value={formData.empName}
                onChange={handleChange}
                className="bg-transparent w-full py-2 outline-none"
                required
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Work Information</label>
            <select
              name="workInformation"
              value={formData.workInformation || ""}
              onChange={(e) =>
                setFormData({ ...formData, workInformation: e.target.value })
              }
              className="bg-gray-700 w-full py-2 px-3 rounded-lg"
              required
            >
              <option value="">Select Role</option>
              <option value="Teacher">Teacher</option>
              <option value="Swiper">Swiper</option>
              <option value="Accountant">Accountant</option>
              <option value="Security">Security</option>
              <option value="Librarian">Librarian</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <div className="flex items-center bg-gray-700 rounded-lg px-3">
              <FiMail className="mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent w-full py-2 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Phone Number</label>
            <div className="flex items-center bg-gray-700 rounded-lg px-3">
              <FiPhone className="mr-2" />
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="bg-transparent w-full py-2 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Salary</label>
            <div className="flex items-center bg-gray-700 rounded-lg px-3">
              <FiDollarSign className="mr-2" />
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="bg-transparent w-full py-2 outline-none"
              />
            </div>
          </div>

          {formData.workInformation === "Teacher" && (
            <>
              <div>
                <label className="block text-sm mb-1">Course Type</label>
                <select
                  name="courseType"
                  value={formData.courseType}
                  onChange={handleChange}
                  className="bg-gray-700 w-full py-2 px-3 rounded-lg"
                >
                  <option value="">Select Course</option>
                  {courseOptions.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Branch</label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="bg-gray-700 w-full py-2 px-3 rounded-lg"
                >
                  <option value="">Select Branch</option>
                  {branchOptions.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm mb-1">
                  Subjects{" "}
                  <span className="text-10px  text-gray-300">
                    (Cltr,+ and click for multiple choose)
                  </span>
                </label>
                <select
                  name="subjects"
                  multiple
                  value={formData.subjects}
                  onChange={handleChange}
                  className="bg-gray-700 w-full py-2 px-3 rounded-lg h-40"
                >
                  {subjectOptions.map((subj) => (
                    <option key={subj} value={subj}>
                      {subj}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Employee Photo (URL)</label>
            <div className="flex items-center bg-gray-700 rounded-lg px-3">
              <FiImage className="mr-2" />
              <input
                type="text"
                name="empPhoto"
                value={formData.empPhoto}
                onChange={handleChange}
                className="bg-transparent w-full py-2 outline-none"
              />
            </div>
          </div>

          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-6 py-2 rounded-full font-semibold shadow-lg"
            >
              Register Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeRegister;
