import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./FirstTimer/Pages/Home/Home";
import RoleSelection from "./FirstTimer/Pages/RoleSelection/RoleSelection";
import FarmerSignup from "./Farmers/Auth/signup/FarmerSignup";
import FarmerLogin from "./Farmers/Auth/login/FarmerLogin";
import BuyerSignup from "./Buyers/Auth/signup/BuyerSignup";
import BuyerLogin from "./Buyers/Auth/login/BuyerLogin";
import EmailConfirmed from "./pages/EmailConfirmed";
import CheckEmail from "./pages/CheckEmail";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ForgotPassword/ResetPassword";
import Dashboard from "./Farmers/Dashboard/Dashboard";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select_role" element={<RoleSelection />} />
        <Route path="/farmers/signup" element={<FarmerSignup />} />
        <Route path="/farmers/login" element={<FarmerLogin />} />
        <Route path="/buyers/signup" element={<BuyerSignup />} />
        <Route path="/buyers/login" element={<BuyerLogin />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/email-confirmed" element={<EmailConfirmed />} />
        
        {/* Password Reset Routes */}
        <Route path="/farmers/forgot-password" element={<ForgotPassword userType="farmer" />} />
        <Route path="/farmers/reset-password" element={<ResetPassword userType="farmer" />} />
        <Route path="/buyers/forgot-password" element={<ForgotPassword userType="buyer" />} />
        <Route path="/buyers/reset-password" element={<ResetPassword userType="buyer" />} />
        <Route path="/farmers/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;