import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./FirstTimer/Components/Navbar/Navbar";
import "./App.css";
import Buttons from "./Components/Buttons";
import Home from "./FirstTimer/Pages/Home/Home";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route path="/faqs" element={<Buttons />} ></Route> */}
        <Route path="/" element={<Home />} ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
