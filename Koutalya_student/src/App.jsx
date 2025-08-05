import { useState } from "react";
import StudentLogin from "./auth_student/StudentLogin";
import { Routes, Route } from "react-router-dom";
import StudentDashBoard from "./pages/StudentDashBoard";
import TimeTable from "./component/TimeTable";
function App() {
  return (
    <Routes>
      <Route path="/" element={<StudentLogin />} />
      <Route path="/student_dashBoard" element={<StudentDashBoard />} />
      <Route path="/time_table" element={<TimeTable />} />
    </Routes>
  );
}

export default App;
