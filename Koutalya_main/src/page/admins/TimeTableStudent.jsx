import React, { useState } from "react";

const programs = {
  "B.Tech": ["CSE", "ECE", "EE", "ME", "Civil", "IT", "AI/ML", "Data Science"],
  Diploma: ["CSE", "ME", "Civil", "EE"],
  //   "B.Pharm": ["Pharmacy"],
  //   "D.Pharm": ["Pharmacy"],
};

const semesters = {
  "B.Tech": [
    "1st Sem A",
    "1st Sem B",
    "2nd Sem A",
    "2nd Sem B",
    "3rd Sem",
    "4th Sem",
    "5th Sem",
    "6th Sem",
    "7th Sem",
    "8th Sem",
  ],
  Diploma: ["1st Sem", "2nd Sem", "3rd Sem", "4th Sem", "5th Sem", "6th Sem"],
  //   "B.Pharm": ["1st Year", "2nd Year", "3rd Year", "4th Year"],
  //   "D.Pharm": ["1st Year", "2nd Year"],
};

function TimeTableStudent() {
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        Student Time Table
      </h1>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Program */}
        <select
          className="p-2 rounded bg-gray-800 border border-gray-700"
          value={selectedProgram}
          onChange={(e) => {
            setSelectedProgram(e.target.value);
            setSelectedBranch("");
            setSelectedSemester("");
          }}
        >
          <option value="">Select Program</option>
          {Object.keys(programs).map((prog) => (
            <option key={prog} value={prog}>
              {prog}
            </option>
          ))}
        </select>

        {/* Branch */}
        <select
          className="p-2 rounded bg-gray-800 border border-gray-700"
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          disabled={!selectedProgram}
        >
          <option value="">Select Branch</option>
          {selectedProgram &&
            programs[selectedProgram].map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
        </select>

        {/* Semester/Year */}
        <select
          className="p-2 rounded bg-gray-800 border border-gray-700"
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          disabled={!selectedProgram}
        >
          <option value="">Select Semester / Year</option>
          {selectedProgram &&
            semesters[selectedProgram].map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
        </select>
      </div>

      {/* Show Button */}
      {selectedProgram && selectedBranch && selectedSemester && (
        <div className="text-center">
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg shadow">
            Show Time Table
          </button>
        </div>
      )}
    </div>
  );
}

export default TimeTableStudent;
