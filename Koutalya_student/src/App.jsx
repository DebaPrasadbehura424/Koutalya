import { useState } from "react";
import StudentLogin from "./auth_student/StudentLogin";
import { Routes, Route } from "react-router-dom";
import StudentDashBoard from "./pages/StudentDashBoard";
import Games from "./pages/Games";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <Routes>
      <Route path="/" element={<StudentLogin />} />
      <Route path="/student_dashBoard" element={<StudentDashBoard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
