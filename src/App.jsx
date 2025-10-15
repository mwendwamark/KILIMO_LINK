// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";
// import Home from "./FirstTimer/Pages/Home/Home";
// import RoleSelection from "./FirstTimer/Pages/RoleSelection/RoleSelection";
// import FarmerSignup from "./Farmers/Auth/signup/FarmerSignup";
// import FarmerLogin from "./Farmers/Auth/login/FarmerLogin";
// import BuyerSignup from "./Buyers/Auth/signup/BuyerSignup";
// import BuyerLogin from "./Buyers/Auth/login/BuyerLogin";
// import EmailConfirmed from "./pages/EmailConfirmed";
// import CheckEmail from "./pages/CheckEmail";
// import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
// import ResetPassword from "./pages/ForgotPassword/ResetPassword";
// import Dashboard from "./Farmers/Dashboard/Dashboard";
// import MyFarms from "./Farmers/Dashboard/MyFarms/MyFarms";
// import FarmDetail from "./Farmers/Dashboard/MyFarms/FarmDetail";
// const App = () => {
//   return (
//     <BrowserRouter>
//       {" "}
//       <Routes>
//         {" "}
//         <Route path="/" element={<Home />} />{" "}
//         <Route path="/select_role" element={<RoleSelection />} />{" "}
//         <Route path="/farmers/signup" element={<FarmerSignup />} />{" "}
//         <Route path="/farmers/login" element={<FarmerLogin />} />{" "}
//         <Route path="/buyers/signup" element={<BuyerSignup />} />{" "}
//         <Route path="/buyers/login" element={<BuyerLogin />} />{" "}
//         <Route path="/check-email" element={<CheckEmail />} />{" "}
//         <Route path="/email-confirmed" element={<EmailConfirmed />} />{" "}
//         {/* Password Reset Routes */}{" "}
//         <Route
//           path="/farmers/forgot-password"
//           element={<ForgotPassword userType="farmer" />}
//         />{" "}
//         <Route
//           path="/farmers/reset-password"
//           element={<ResetPassword userType="farmer" />}
//         />{" "}
//         <Route
//           path="/buyers/forgot-password"
//           element={<ForgotPassword userType="buyer" />}
//         />{" "}
//         <Route
//           path="/buyers/reset-password"
//           element={<ResetPassword userType="buyer" />}
//         />{" "}
//         {/* Farmers Dashboard Routes */}{" "}
//         <Route path="/farmers/dashboard" element={<Dashboard />}>
//           <Route index element={<div>Dashboard Home</div>} />
//           <Route path="farms" element={<MyFarms />} />
//           <Route path="farms/:id" element={<FarmDetail />} />{" "}
//           {/* Add this line */}
//           <Route path="resources" element={<div>Resources</div>} />
//           <Route path="marketplace" element={<div>Marketplace</div>} />
//           <Route path="my-listings" element={<div>My Listings</div>} />
//           <Route path="community" element={<div>Community</div>} />
//           <Route path="messages" element={<div>Messages</div>} />
//         </Route>
//       </Routes>{" "}
//     </BrowserRouter>
//   );
// };
// export default App;

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
import MyFarms from "./Farmers/Dashboard/MyFarms/MyFarms";
import FarmDetail from "./Farmers/Dashboard/MyFarms/FarmDetail";
import FarmerProfile from "./Farmers/Dashboard/Profile/FarmerProfile";
import BuyerDashboard from "./Buyers/Dashboard/BuyerDashboard";
import BuyerProfile from "./Buyers/Dashboard/Profile/BuyerProfile";

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
        <Route
          path="/farmers/forgot-password"
          element={<ForgotPassword userType="farmer" />}
        />
        <Route
          path="/farmers/reset-password"
          element={<ResetPassword userType="farmer" />}
        />
        <Route
          path="/buyers/forgot-password"
          element={<ForgotPassword userType="buyer" />}
        />
        <Route
          path="/buyers/reset-password"
          element={<ResetPassword userType="buyer" />}
        />

        {/* Farmers Dashboard Routes */}
        <Route path="/farmers/dashboard" element={<Dashboard />}>
          <Route index element={<div>Dashboard Home</div>} />
          <Route path="farms" element={<MyFarms />} />
          <Route path="farms/:id" element={<FarmDetail />} />
          <Route path="profile" element={<FarmerProfile />} />
          <Route path="resources" element={<div>Resources</div>} />
          <Route path="marketplace" element={<div>Marketplace</div>} />
          <Route path="my-listings" element={<div>My Listings</div>} />
          <Route path="community" element={<div>Community</div>} />
          <Route path="messages" element={<div>Messages</div>} />
        </Route>

        {/* Buyers Dashboard Routes */}
        <Route path="/buyers/dashboard" element={<BuyerDashboard />}>
          <Route index element={<div>Buyer Dashboard Home</div>} />
          <Route path="profile" element={<BuyerProfile />} />
          <Route path="marketplace" element={<div>Marketplace</div>} />
          <Route path="orders" element={<div>My Orders</div>} />
          <Route path="community" element={<div>Community</div>} />
          <Route path="messages" element={<div>Messages</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
