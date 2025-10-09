// import React, { useEffect } from 'react';
// import { ChatCircleDotsIcon, FolderOpenIcon, LayoutIcon, ListChecksIcon, StorefrontIcon, TextOutdentIcon, TextIndentIcon, UserIcon, UsersThreeIcon, ListIcon, X } from "@phosphor-icons/react";
// import { NavLink } from "react-router-dom";
// import logo from "../../../../public/logo.svg";
// import "./Sidebar.css";

// const Sidebar = ({ isCollapsed, isMobile, isOpen, onClose, onToggleCollapse }) => {
//   const navigationLinks = [
//     { path: '/farmers/dashboard', icon: LayoutIcon, label: 'Dashboard' },
//     { path: '/farmers/resources', icon: FolderOpenIcon, label: 'Resources' },
//     { path: '/farmers/marketplace', icon: StorefrontIcon, label: 'Market' },
//     { path: '/farmers/my-listings', icon: ListChecksIcon, label: 'My Listings' },
//     { path: '/farmers/community', icon: UsersThreeIcon, label: 'Community' },
//     { path: '/farmers/messages', icon: ChatCircleDotsIcon, label: 'Messages' },
//   ];

//   // Close sidebar when route changes on mobile
//   useEffect(() => {
//     if (isMobile && isOpen) {
//       onClose();
//     }
//   }, [window.location.pathname]);

//   const handleToggleCollapse = () => {
//     if (isMobile) {
//       onToggleCollapse();
//       onClose();
//     } else {
//       onToggleCollapse();
//     }
//   };

//   return (
//     <>
//       {/* Mobile Header */}
//       <header className="farmers-mobile-header">
//         <div className="farmers-mobile-header-icon" onClick={onToggleCollapse}>
//           <ListIcon size={28} weight="bold" />
//         </div>
//         <img
//           src={logo}
//           alt="Kilimo Link"
//           className="farmers-mobile-header-logo"
//         />
//         <div className="farmers-mobile-avatar">
//           <UserIcon size={24} />
//         </div>
//       </header>

//       {/* Overlay for Mobile */}
//       <div 
//         className={`farmers-sidebar-overlay ${isOpen ? 'farmers-overlay-active' : ''}`}
//         onClick={onClose}
//       />

//       {/* Sidebar */}
//       <aside 
//         className={`farmers-sidebar ${isCollapsed ? 'farmers-sidebar-collapsed' : ''} ${isOpen ? 'farmers-sidebar-mobile-open' : ''}`}
//       >
//         <div className="farmers-sidebar-logo-section">
//           <img
//             src={logo}
//             alt="Kilimo Link"
//             loading="eager"
//             className="farmers-sidebar-logo"
//           />
//           <div className="farmers-sidebar-toggle-btn" onClick={handleToggleCollapse}>
//             {isCollapsed ? <TextIndentIcon size={24} /> : <TextOutdentIcon size={24} />}
//           </div>
//           {isMobile && (
//             <div className="farmers-mobile-close-btn" onClick={onClose}>
//               <X size={24} />
//             </div>
//           )}
//         </div>

//         <div className="farmers-sidebar-links">
//           <span className="farmers-sidebar-section-label">Navigation</span>
//           <nav className="farmers-sidebar-navigation">
//             {navigationLinks.map((link) => {
//               const Icon = link.icon;
//               return (
//                 <NavLink
//                   key={link.path}
//                   to={link.path}
//                   className={({ isActive }) => 
//                     `farmers-sidebar-nav-link ${isActive ? 'farmers-sidebar-nav-link-active' : ''}`
//                   }
//                   data-label={link.label}
//                   onClick={onClose}
//                 >
//                   <Icon size={20} className="farmers-sidebar-icon" />
//                   {!isCollapsed && <span className="farmers-sidebar-link-text">{link.label}</span>}
//                 </NavLink>
//               );
//             })}
//           </nav>
//         </div>

//         <div className="farmers-sidebar-bottom">
//           <div className="farmers-sidebar-user-avatar">
//             <UserIcon size={32} weight="duotone" />
//           </div>
//           {!isCollapsed && (
//             <div className="farmers-sidebar-user-info">
//               <p className="farmers-sidebar-user-name">John Doe</p>
//               <p className="farmers-sidebar-user-role">Farmer</p>
//             </div>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;

import React from 'react';
import { ChatCircleDotsIcon, FolderOpenIcon, LayoutIcon, ListChecksIcon, StorefrontIcon, TextOutdentIcon, TextIndentIcon, UserIcon, UsersThreeIcon, ListIcon, X } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import logo from "../../../../public/logo.svg";
import "./Sidebar.css";

const Sidebar = ({ isCollapsed, setIsCollapsed, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navigationLinks = [
    { path: '/farmers/dashboard', icon: LayoutIcon, label: 'Dashboard' },
    { path: '/farmers/dashboard/resources', icon: FolderOpenIcon, label: 'Resources' },
    { path: '/farmers/dashboard/marketplace', icon: StorefrontIcon, label: 'Market' },
    { path: '/farmers/dashboard/my-listings', icon: ListChecksIcon, label: 'My Listings' },
    { path: '/farmers/dashboard/community', icon: UsersThreeIcon, label: 'Community' },
    { path: '/farmers/dashboard/messages', icon: ChatCircleDotsIcon, label: 'Messages' },
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
          <UserIcon size={24} weight="fill" />
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
            height={50}
            width={"auto"}
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
                  end={link.path === '/farmers/dashboard'}
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