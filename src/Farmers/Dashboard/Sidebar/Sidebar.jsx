import React, { useState } from 'react';
import { ChatCircleDotsIcon, FolderOpenIcon, LayoutIcon, ListChecksIcon, StorefrontIcon, TextOutdentIcon, TextIndentIcon, UserIcon, UsersThreeIcon, ListIcon, X } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import logo from "../../../../public/logo.svg";
import "./Sidebar.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationLinks = [
    { path: '/farmers/dashboard', icon: LayoutIcon, label: 'Dashboard' },
    { path: '/farmers/resources', icon: FolderOpenIcon, label: 'Resources' },
    { path: '/farmers/marketplace', icon: StorefrontIcon, label: 'Market' },
    { path: '/farmers/my-listings', icon: ListChecksIcon, label: 'My Listings' },
    { path: '/farmers/community', icon: UsersThreeIcon, label: 'Community' },
    { path: '/farmers/messages', icon: ChatCircleDotsIcon, label: 'Messages' },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="mobile-header">
        <div className="mobile-header-icon" onClick={() => setIsMobileMenuOpen(true)}>
          <ListIcon size={28} weight="bold" />
        </div>
        <img
          src={logo}
          alt="Kilimo Link"
          className="mobile-header-logo"
        />
        <div className="mobile-avatar">
          <UserIcon size={24}  />
        </div>
      </header>

      {/* Overlay for Mobile */}
      <div 
        className={`sidebar-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`farmers-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-logo-section">
          <img
            src={logo}
            alt="Kilimo Link"
            loading="eager"
            className="sidebar-logo"
            
          />
          <div className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <TextIndentIcon size={24} /> : <TextOutdentIcon size={24} />}
          </div>
          {isMobileMenuOpen && (
            <div className="toggle-btn mobile-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </div>
          )}
        </div>

        <div className="sidebar-links">
          <span className="sidebar-section-label">Navigation</span>
          <nav className="sidebar-navigation-links">
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className="sidebar-nav-link"
                  data-label={link.label}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon size={20} />
                  <p>{link.label}</p>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <UserIcon size={32} weight="duotone" />
          <div className="sidebar-user-info">
            <p className="sidebar-user-name">John Doe</p>
            <p className="sidebar-user-role">Farmer</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;