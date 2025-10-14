import {
  ChatCircleDotsIcon,
  FolderOpenIcon,
  LayoutIcon,
  ListChecksIcon,
  StorefrontIcon,
  TextOutdentIcon,
  TextIndentIcon,
  UserIcon,
  UsersThreeIcon,
  ListIcon,
  X,
  FarmIcon,
} from "@phosphor-icons/react";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../../../public/logo.svg";
import "./Sidebar.css";
const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);
  const location = useLocation();
  const navigationLinks = [
    {
      path: "/farmers/dashboard",
      icon: LayoutIcon,
      label: "Dashboard",
      exact: true,
    },
    { path: "/farmers/dashboard/farms", icon: FarmIcon, label: "My Farms" },
    {
      path: "/farmers/dashboard/resources",
      icon: FolderOpenIcon,
      label: "Resources",
    },
    {
      path: "/farmers/dashboard/marketplace",
      icon: StorefrontIcon,
      label: "Market",
    },
    {
      path: "/farmers/dashboard/my-listings",
      icon: ListChecksIcon,
      label: "My Listings",
    },
    {
      path: "/farmers/dashboard/community",
      icon: UsersThreeIcon,
      label: "Community",
    },
    {
      path: "/farmers/dashboard/messages",
      icon: ChatCircleDotsIcon,
      label: "Messages",
    },
  ];
  return (
    <>
      {" "}
      {/* Mobile Header */}{" "}
      <header className="mobile-header">
        {" "}
        <div
          className="mobile-header-icon"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          {" "}
          <ListIcon size={28} weight="bold" />{" "}
        </div>{" "}
        <img src={logo} alt="Kilimo Link" className="mobile-header-logo" />{" "}
        <div className="mobile-avatar">
          <div>
            {user?.first_name && user?.last_name ? (
              `${user.first_name.charAt(0).toUpperCase()}${user.last_name
                .charAt(0)
                .toUpperCase()}`
            ) : (
              <UserIcon size={32} weight="duotone" />
            )}
          </div>
        </div>{" "}
      </header>{" "}
      {/* Overlay for Mobile */}{" "}
      <div
        className={`sidebar-overlay ${isMobileMenuOpen ? "active" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />{" "}
      {/* Sidebar */}{" "}
      <aside
        className={`farmers-sidebar ${isCollapsed ? "collapsed" : ""} ${
          isMobileMenuOpen ? "mobile-open" : ""
        }`}
      >
        {" "}
        <div className="sidebar-logo-section">
          {" "}
          <img
            src={logo}
            alt="Kilimo Link"
            loading="eager"
            className="sidebar-logo"
            height={50}
            width={"auto"}
          />{" "}
          <div
            className="toggle-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {" "}
            {isCollapsed ? (
              <TextIndentIcon size={24} />
            ) : (
              <TextOutdentIcon size={24} />
            )}{" "}
          </div>{" "}
          {isMobileMenuOpen && (
            <div
              className="toggle-btn mobile-close-btn"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {" "}
              <X size={24} />{" "}
            </div>
          )}{" "}
        </div>{" "}
        <div className="sidebar-links">
          {" "}
          <span className="sidebar-section-label">Navigation</span>{" "}
          <nav className="sidebar-navigation-links">
            {" "}
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.exact}
                  className={({ isActive }) =>
                    `sidebar-nav-link ${isActive ? "active" : ""}`
                  }
                  data-label={link.label}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {" "}
                  <Icon size={20} /> <p>{link.label}</p>{" "}
                </NavLink>
              );
            })}{" "}
          </nav>{" "}
        </div>{" "}
        <div className="sidebar-bottom">
          <div className="sidebar-user-avatar">
            {user?.first_name && user?.last_name ? (
              `${user.first_name.charAt(0).toUpperCase()}${user.last_name
                .charAt(0)
                .toUpperCase()}`
            ) : (
              <UserIcon size={32} weight="duotone" />
            )}
          </div>
          <div className="sidebar-user-info">
            <p className="sidebar-user-name">
              {user
                ? `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
                  "User"
                : "Loading..."}
            </p>
            <p className="sidebar-user-role">Farmer</p>
          </div>
        </div>{" "}
      </aside>{" "}
    </>
  );
};
export default Sidebar;
