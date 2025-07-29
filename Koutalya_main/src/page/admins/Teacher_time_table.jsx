import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function TeacherTimeTable() {
  const { email } = useParams();
  const [weeklySchedule, setWeeklySchedule] = useState([]);
  const [formState, setFormState] = useState({});
  const [showFormForDay, setShowFormForDay] = useState(null);
  const [editSlotInfo, setEditSlotInfo] = useState({ day: null, index: null });

  const getDetailsByEmail = async () => {
    try {
      const res = await axios.get(
        `http://localhost:1950/emps/getEmployeeByEmail/${email}`
      );
      setWeeklySchedule(res.data.timeTable.weeklySchedule);
    } catch (err) {
      console.error("Error fetching timetable:", err);
    }
  };

  const handleInputChange = (day, field, value) => {
    setFormState((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleEditSlot = async (day, index, slotData) => {
    try {
      setFormState((prev) => ({
        ...prev,
        [day]: { ...slotData },
      }));
      setEditSlotInfo({ day, index });
      setShowFormForDay(day);

      await axios.patch(
        `http://localhost:1950/emps/edit-slot?email=${email}&daysName=${day}&slotIndex=${index}`,
        slotData
      );

      await getDetailsByEmail();
    } catch (error) {
      console.error("Error updating slot:", error);
      alert("Failed to update slot.");
    }
  };

  const handleAddSlot = async (day) => {
    const slot = formState[day];
    if (!slot || !slot.subject || !slot.startTime || !slot.endTime) {
      alert("Please enter subject and time fields");
      return;
    }

    const updatedSchedule = [...weeklySchedule];
    const dayIndex = updatedSchedule.findIndex((d) => d.day === day);

    if (editSlotInfo.day === day && editSlotInfo.index !== null) {
      updatedSchedule[dayIndex].slots[editSlotInfo.index] = slot;
    } else {
      if (updatedSchedule[dayIndex].slots.length >= 6) {
        alert("Max 6 slots per day");
        return;
      }
      updatedSchedule[dayIndex].slots.push(slot);
    }

    setWeeklySchedule(updatedSchedule);
    setFormState((prev) => ({ ...prev, [day]: {} }));
    setShowFormForDay(null);
    setEditSlotInfo({ day: null, index: null });
  };

  useEffect(() => {
    getDetailsByEmail();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-6 md:p-8">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Teacher Timetable</h2>
      <div className="space-y-6 max-w-6xl mx-auto">
        {weeklySchedule.map((dayObj, index) => (
          <div key={index} className="bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-white">{dayObj.day}</h3>
              <button
                onClick={() =>
                  setShowFormForDay((prev) =>
                    prev === dayObj.day ? null : dayObj.day
                  )
                }
                className="mt-2 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
              >
                {showFormForDay === dayObj.day ? "Cancel" : "Add Slot"}
              </button>
            </div>

            {/* Slot Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border border-gray-700 rounded-lg">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th className="p-3 text-sm font-medium">#</th>
                    <th className="p-3 text-sm font-medium">Subject</th>
                    <th className="p-3 text-sm font-medium">Time</th>
                    <th className="p-3 text-sm font-medium">Room</th>
                    <th className="p-3 text-sm font-medium">Course</th>
                    <th className="p-3 text-sm font-medium">Section</th>
                    <th className="p-3 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dayObj.slots.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="p-3 text-center text-gray-400">
                        No slots yet.
                      </td>
                    </tr>
                  ) : (
                    dayObj.slots.map((slot, i) => (
                      <tr key={i} className="border-t border-gray-700 text-white hover:bg-gray-700/50 transition duration-150">
                        <td className="p-3 text-sm">{i + 1}</td>
                        <td className="p-3 text-sm">{slot.subject}</td>
                        <td className="p-3 text-sm">
                          {slot.startTime} - {slot.endTime}
                        </td>
                        <td className="p-3 text-sm">{slot.roomNo}</td>
                        <td className="p-3 text-sm">{slot.courseType}</td>
                        <td className="p-3 text-sm">{slot.section}</td>
                        <td className="p-3">
                          <button
                            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition duration-150"
                            onClick={() => handleEditSlot(dayObj.day, i, slot)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Slot Form */}
            {showFormForDay === dayObj.day && dayObj.slots.length <= 6 && (
              <div className="mt-4 bg-gray-700 p-4 sm:p-6 rounded-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Subject"
                    value={formState[dayObj.day]?.subject || ""}
                    onChange={(e) =>
                      handleInputChange(dayObj.day, "subject", e.target.value)
                    }
                    className="p-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Start Time (e.g., 09:00)"
                    value={formState[dayObj.day]?.startTime || ""}
                    onChange={(e) =>
                      handleInputChange(dayObj.day, "startTime", e.target.value)
                    }
                    className="p-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="End Time (e.g., 10:00)"
                    value={formState[dayObj.day]?.endTime || ""}
                    onChange={(e) =>
                      handleInputChange(dayObj.day, "endTime", e.target.value)
                    }
                    className="p-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Room No"
                    value={formState[dayObj.day]?.roomNo || ""}
                    onChange={(e) =>
                      handleInputChange(dayObj.day, "roomNo", e.target.value)
                    }
                    className="p-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Course Type"
                    value={formState[dayObj.day]?.courseType || ""}
                    onChange={(e) =>
                      handleInputChange(dayObj.day, "courseType", e.target.value)
                    }
                    className="p-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Section"
                    value={formState[dayObj.day]?.section || ""}
                    onChange={(e) =>
                      handleInputChange(dayObj.day, "section", e.target.value)
                    }
                    className="p-3 rounded-lg bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={() => handleAddSlot(dayObj.day)}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200 w-full sm:w-auto"
                >
                  {editSlotInfo.day === dayObj.day &&
                  editSlotInfo.index !== null
                    ? "Save Changes"
                    : "Save Slot"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeacherTimeTable;