import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import BuyerSidebar from "./BuyerSidebar/BuyerSidebar";
import "./BuyerDashboard.css";
import BuyerTopDash from "./BuyerTopDash/BuyerTopDash";

const BuyerDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="buyerdashboard-container">
      <BuyerSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main
        className={`buyerdashboard-main-content ${
          isCollapsed ? "sidebar-collapsed" : ""
        }`}
      >
        <BuyerTopDash />
        <Outlet />
      </main>
    </div>
  );
};

export default BuyerDashboard;