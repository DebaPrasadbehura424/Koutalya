import React, { useEffect, useState } from "react";
import axios from "axios";

function Attendance() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const studentId = sessionStorage.getItem("studentId");

  useEffect(() => {
    if (!studentId) return;

    axios
      .get(`http://localhost:1950/api/students/${studentId}`)
      .then((res) => {
        setStudent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch student data:", err);
        setLoading(false);
      });
  }, [studentId]);

  if (loading)
    return <div className="text-center text-lg mt-10">Loading...</div>;

  if (!student)
    return (
      <div className="text-center text-red-500 mt-10">
        No student data found.
      </div>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">
        Attendance for {student.name}
      </h2>

      <div className="overflow-x-auto rounded shadow-md">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Subject</th>
              <th className="py-2 px-4 text-left">Total Classes</th>
              <th className="py-2 px-4 text-left">Present</th>
              <th className="py-2 px-4 text-left">Absent</th>
              <th className="py-2 px-4 text-left">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {student.attendance.map((att, index) => {
              const { subject, totalClasses, presentClasses, absentClasses } =
                att;
              const percentage =
                totalClasses === 0
                  ? 0
                  : ((presentClasses / totalClasses) * 100).toFixed(2);
              const percentageColor =
                percentage >= 75
                  ? "text-green-600 font-medium"
                  : percentage >= 50
                  ? "text-yellow-600 font-medium"
                  : "text-red-600 font-semibold";

              return (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-gray-100 transition-all"
                >
                  <td className="py-2 px-4">{subject}</td>
                  <td className="py-2 px-4">{totalClasses}</td>
                  <td className="py-2 px-4">{presentClasses}</td>
                  <td className="py-2 px-4">{absentClasses}</td>
                  <td className={`py-2 px-4 ${percentageColor}`}>
                    {percentage}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;
