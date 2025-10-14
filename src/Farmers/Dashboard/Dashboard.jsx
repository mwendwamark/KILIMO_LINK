import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import "./Dashboard.css";
import TopDash from "./TopDash/TopDash";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="dashboard-container">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main
        className={`dashboard-main-content ${
          isCollapsed ? "sidebar-collapsed" : ""
        }`}
      >
        {/* Add TopDash component here */}
        <TopDash />
        <Outlet /> {/* ← MyFarms will render here via the route below */}
      </main>
    </div>
  );
};

export default Dashboard;
