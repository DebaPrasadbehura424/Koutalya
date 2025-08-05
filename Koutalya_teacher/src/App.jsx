import { Route, Routes } from "react-router-dom";
import Teacher_Login from "./pages/Teacher_Login";
import Teacher_dashbaord from "./pages/Teacher_dashbaord";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Teacher_Login />} />
      <Route path="/teacher_dashboard" element={<Teacher_dashbaord />} />
    </Routes>
  );
}

export default App;
