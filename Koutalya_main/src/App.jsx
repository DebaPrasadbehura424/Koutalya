import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/academy/Home";
import AdminLogin from "./page/auth/AdminLogin";
import AdminRegister from "./page/auth/AdminRegister";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin_login" element={<AdminLogin />} />
        <Route path="/admin_register" element={<AdminRegister />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
