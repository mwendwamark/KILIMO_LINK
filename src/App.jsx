import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./FirstTimer/Components/Navbar/Navbar";
import "./App.css";
import Buttons from "./Components/Buttons";
import Home from "./FirstTimer/Pages/Home/Home";
import RoleSelection from "./FirstTimer/Pages/RoleSelection/RoleSelection";
import FarmerSignup from "./Farmers/Auth/signup/FarmerSignup";
import FarmerLogin from "./Farmers/Auth/login/FarmerLogin";
import BuyerSignup from "./Buyers/Auth/signup/BuyerSignup";
import BuyerLogin from "./Buyers/Auth/login/BuyerLogin";
const App = () => {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        {/* <Route path="/faqs" element={<Buttons />} ></Route> */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/select_role" element={<RoleSelection />}></Route>
        <Route path="/farmers/signup" element={<FarmerSignup/>}></Route>
        <Route path="/farmers/login" element={<FarmerLogin/>}></Route>
        <Route path="/buyers/signup" element={<BuyerSignup/>}></Route>
        <Route path="/buyers/login" element={<BuyerLogin/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
