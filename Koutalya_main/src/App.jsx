import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/academy/Home";
import AdminLogin from "./page/auth/AdminLogin";
import AdminRegister from "./page/auth/AdminRegister";
import AdminDashboard from "./page/admins/AdminDashboard";
import EmployeeRegister from "./page/admins/EmployeeRegister";
import Total_Employee from "./page/admins/Total_Employee";
import News from "./page/academy/News";
import TimeTableStudent from "./page/admins/TimeTableStudent";
import Teacher_time_table from "./page/admins/Teacher_time_table";
import Allstudent from "./page/admins/Allstudent";
import FeesCheckStudent from "./page/admins/FeesCheckStudent";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin_login" element={<AdminLogin />} />
        <Route path="/admin_register" element={<AdminRegister />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/emp_register" element={<EmployeeRegister />} />
        <Route path="/total_employee" element={<Total_Employee />} />
        <Route
          path="/teacher_time_table/:email"
          element={<Teacher_time_table />}
        />
        {/* i will build this shit using mysql not mongodb */}
        <Route path="/news_info" element={<News />} />
        <Route path="/time_table_student" element={<TimeTableStudent />} />
        <Route path="/all_student" element={<Allstudent />} />
        <Route path="/fees/:studentId/:feesId" element={<FeesCheckStudent />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
