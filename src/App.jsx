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
      </Routes>
    </BrowserRouter>
  );
};

export default App;