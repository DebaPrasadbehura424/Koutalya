import React, { useState } from "react";

const TimetableStudent = () => {
  const [program, setProgram] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const [groupedData, setGroupedData] = useState({});
  const [message, setMessage] = useState("");

  const fetchTimetable = async () => {
    if (!program || !branch || !semester || !section) {
      setMessage("Please select all fields.");
      setGroupedData({});
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:1950/api/timetable/get?program=${program}&branch=${branch}&semester=${semester}&section=${section}`
      );
      const data = await res.json();

      if (!data || data.length === 0) {
        setGroupedData({});
        setMessage(
          `No timetable found for ${program} - ${branch} - Sem ${semester} - Section ${section}`
        );
        return;
      }

      const grouped = {};
      data.forEach((entry) => {
        if (!grouped[entry.day]) grouped[entry.day] = [];
        grouped[entry.day].push(entry);
      });

      setGroupedData(grouped);
      setMessage("");
    } catch (err) {
      console.error("Error fetching timetable:", err);
      setMessage("Server error. Please try again later.");
    }
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="p-6 bg-[#0c1323] min-h-screen text-white">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#00BFFF]">
          Student Timetable
        </h2>
        <div className="flex justify-center flex-wrap gap-4">
          <select
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className="bg-[#1e293b] text-white p-2 rounded border border-[#00BFFF]"
          >
            <option value="">Select Program</option>
            <option value="B.Tech">B.Tech</option>
            <option value="Diploma">Diploma</option>
          </select>

          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="bg-[#1e293b] text-white p-2 rounded border border-[#00BFFF]"
          >
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="MECH">MECH</option>
            <option value="EE">EE</option>
            <option value="Civil">Civil</option>
          </select>

          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="bg-[#1e293b] text-white p-2 rounded border border-[#00BFFF]"
          >
            <option value="">Select Semester</option>
            {Array.from({ length: 8 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="bg-[#1e293b] text-white p-2 rounded border border-[#00BFFF]"
          >
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>

          <button
            onClick={fetchTimetable}
            className="bg-[#00BFFF] px-4 py-2 rounded text-white hover:bg-[#0284c7]"
          >
            Show Timetable
          </button>
        </div>
      </div>

      {message && (
        <div className="text-center mt-6 text-red-400 text-lg">{message}</div>
      )}

      {Object.keys(groupedData).length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border border-[#00BFFF] text-sm">
            <thead>
              <tr className="bg-[#1e293b] text-white">
                <th className="border border-[#00BFFF] px-4 py-2">Day</th>
                {Array.from({ length: 6 }).map((_, idx) => (
                  <th key={idx} className="border border-[#00BFFF] px-4 py-2">
                    Slot {idx + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => {
                const entries = groupedData[day] || [];
                return (
                  <tr key={day} className="bg-[#0f172a]">
                    <td className="border border-[#00BFFF] px-4 py-2 font-bold text-[#facc15]">
                      {day}
                    </td>
                    {Array.from({ length: 6 }).map((_, idx) => {
                      const entry = entries[idx];
                      return (
                        <td
                          key={idx}
                          className="border border-[#00BFFF] px-2 py-2 text-center"
                        >
                          {entry ? (
                            <div>
                              <div className="font-semibold text-[#38bdf8]">
                                {entry.subject}
                              </div>
                              <div className="text-xs">{entry.teacherName}</div>
                              <div className="text-xs text-gray-300">
                                {entry.timeSlot}
                              </div>
                              <div className="text-xs text-gray-300">
                                {entry.roomNumber}
                              </div>
                            </div>
                          ) : (
                            "-"
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TimetableStudent;
