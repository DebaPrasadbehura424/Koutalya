import React, { useState, useEffect } from "react";

function TimeTable() {
  const [groupedData, setGroupedData] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const program = sessionStorage.getItem("program") || "";
    const branch = sessionStorage.getItem("branch") || "";
    const semester = sessionStorage.getItem("semester") || "";
    const section = sessionStorage.getItem("section") || "";

    if (!program || !branch || !semester || !section) {
      setMessage("Timetable info missing in session storage.");
      setGroupedData({});
      return;
    }

    const fetchTimetable = async () => {
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
        setMessage("Server error. Please try again later.");
      }
    };

    fetchTimetable();
  }, []);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="p-6 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400">
        Student Timetable
      </h2>

      {message && (
        <div className="text-center mt-6 text-red-400 text-lg">{message}</div>
      )}

      {Object.keys(groupedData).length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border border-cyan-400 text-sm">
            <thead>
              <tr className="bg-cyan-900 text-cyan-200">
                <th className="border border-cyan-400 px-4 py-2">Day</th>
                {Array.from({ length: 6 }).map((_, idx) => (
                  <th
                    key={idx}
                    className="border border-cyan-400 px-4 py-2"
                  >{`Slot ${idx + 1}`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => {
                const entries = groupedData[day] || [];
                return (
                  <tr key={day} className="bg-cyan-800 odd:bg-cyan-700">
                    <td className="border border-cyan-400 px-4 py-2 font-bold text-yellow-400">
                      {day}
                    </td>
                    {Array.from({ length: 6 }).map((_, idx) => {
                      const entry = entries[idx];
                      return (
                        <td
                          key={idx}
                          className="border border-cyan-400 px-2 py-2 text-center"
                        >
                          {entry ? (
                            <div>
                              <div className="font-semibold text-cyan-300">
                                {entry.subject}
                              </div>
                              <div className="text-xs text-cyan-200">
                                {entry.teacherName}
                              </div>
                              <div className="text-xs text-cyan-400">
                                {entry.timeSlot}
                              </div>
                              <div className="text-xs text-cyan-400">
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
}

export default TimeTable;
