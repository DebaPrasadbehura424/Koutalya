import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/academy/Home";
import AdminLogin from "./page/auth/AdminLogin";
import AdminRegister from "./page/auth/AdminRegister";
import AdminDashboard from "./page/admins/AdminDashboard";
import NoticeBoard from "./page/admins/NoticeBoard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin_login" element={<AdminLogin />} />
        <Route path="/admin_register" element={<AdminRegister />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
