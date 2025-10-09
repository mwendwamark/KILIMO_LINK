import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import './Dashboard.css';

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
      
      <main className={`dashboard-main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;