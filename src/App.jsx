import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./FirstTimer/Components/Navbar/Navbar";
import "./App.css";
import Buttons from "./Components/Buttons";
import Home from "./FirstTimer/Pages/Home/Home";
import RoleSelection from "./FirstTimer/Pages/RoleSelection/RoleSelection";
const App = () => {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        {/* <Route path="/faqs" element={<Buttons />} ></Route> */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/select_role" element={<RoleSelection />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
