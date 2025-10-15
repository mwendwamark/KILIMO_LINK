import {
  ChatCircleDotsIcon,
  LayoutIcon,
  StorefrontIcon,
  TextOutdentIcon,
  TextIndentIcon,
  UserIcon,
  UsersThreeIcon,
  ListIcon,
  X,
  UserCircleIcon,
  ShoppingBagIcon,
} from "@phosphor-icons/react";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../../../public/logo.svg";
import "./BuyerSidebar.css";

const BuyerSidebar = ({
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
      path: "/buyers/dashboard",
      icon: LayoutIcon,
      label: "Dashboard",
      exact: true,
    },
    {
      path: "/buyers/dashboard/profile",
      icon: UserCircleIcon,
      label: "My Profile",
    },
    {
      path: "/buyers/dashboard/marketplace",
      icon: StorefrontIcon,
      label: "Marketplace",
    },
    {
      path: "/buyers/dashboard/orders",
      icon: ShoppingBagIcon,
      label: "My Orders",
    },
    {
      path: "/buyers/dashboard/community",
      icon: UsersThreeIcon,
      label: "Community",
    },
    {
      path: "/buyers/dashboard/messages",
      icon: ChatCircleDotsIcon,
      label: "Messages",
    },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="buyersidebar-mobile-header">
        <div
          className="buyersidebar-mobile-header-icon"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <ListIcon size={28} weight="bold" />
        </div>
        <img
          src={logo}
          alt="Kilimo Link"
          className="buyersidebar-mobile-header-logo"
        />
        <div className="buyersidebar-mobile-avatar">
          <div>
            {user?.first_name && user?.last_name ? (
              `${user.first_name.charAt(0).toUpperCase()}${user.last_name
                .charAt(0)
                .toUpperCase()}`
            ) : (
              <UserIcon size={32} weight="duotone" />
            )}
          </div>
        </div>
      </header>

      {/* Overlay for Mobile */}
      <div
        className={`buyersidebar-overlay ${isMobileMenuOpen ? "active" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`buyersidebar-main ${isCollapsed ? "collapsed" : ""} ${
          isMobileMenuOpen ? "mobile-open" : ""
        }`}
      >
        <div className="buyersidebar-logo-section">
          <img
            src={logo}
            alt="Kilimo Link"
            loading="eager"
            className="buyersidebar-logo"
            height={50}
            width={"auto"}
          />
          <div
            className="buyersidebar-toggle-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <TextIndentIcon size={24} />
            ) : (
              <TextOutdentIcon size={24} />
            )}
          </div>
          {isMobileMenuOpen && (
            <div
              className="buyersidebar-toggle-btn buyersidebar-mobile-close-btn"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </div>
          )}
        </div>

        <div className="buyersidebar-links">
          <span className="buyersidebar-section-label">Navigation</span>
          <nav className="buyersidebar-navigation-links">
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.exact}
                  className={({ isActive }) =>
                    `buyersidebar-nav-link ${isActive ? "active" : ""}`
                  }
                  data-label={link.label}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon size={20} /> <p>{link.label}</p>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="buyersidebar-bottom">
          <div className="buyersidebar-user-avatar">
            {user?.first_name && user?.last_name ? (
              `${user.first_name.charAt(0).toUpperCase()}${user.last_name
                .charAt(0)
                .toUpperCase()}`
            ) : (
              <UserIcon size={32} weight="duotone" />
            )}
          </div>
          <div className="buyersidebar-user-info">
            <p className="buyersidebar-user-name">
              {user
                ? `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
                  "User"
                : "Loading..."}
            </p>
            <p className="buyersidebar-user-role">Buyer</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default BuyerSidebar;
