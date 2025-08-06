import { Route, Routes } from "react-router-dom";
import Teacher_Login from "./pages/Teacher_Login";
import TeacherDashboard from "./pages/TeacherDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Teacher_Login />} />
      <Route path="/teacher_dashboard" element={<TeacherDashboard />} />
    </Routes>
  );
}
export default App;
