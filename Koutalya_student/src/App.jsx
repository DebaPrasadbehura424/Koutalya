import { useState } from "react";
import StudentLogin from "./auth_student/StudentLogin";
import { Routes, Route } from "react-router-dom";
import StudentDashBoard from "./pages/StudentDashBoard";
function App() {
  return (
    <Routes>
      <Route path="/" element={<StudentLogin />} />
      <Route path="/student_dashBoard" element={<StudentDashBoard />} />
    </Routes>
  );
}

export default App;
