import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./FirstTimer/Components/Navbar/Navbar";
import "./App.css";
import Buttons from "./Components/Buttons";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route path="/faqs" element={<Buttons />} ></Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
