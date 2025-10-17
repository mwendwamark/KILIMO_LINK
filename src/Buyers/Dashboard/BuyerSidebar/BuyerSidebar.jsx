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
  SignOutIcon,
} from "@phosphor-icons/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logo from "../../../../public/logo.svg";
import {
  clearAuthData,
  getAuthToken,
  API_BASE_URL,
} from "../../../services/api";
import "./BuyerSidebar.css";

const BuyerSidebar = ({
  isCollapsed,
  setIsCollapsed,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const [user, setUser] = useState(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();

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

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowLogoutPopup(false);
      }
    };

    if (showLogoutPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLogoutPopup]);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const token = getAuthToken();
      const userType = "buyer"; // Always use buyer for this sidebar

      // Call logout endpoint
      await fetch(`${API_BASE_URL}/${userType}s/logout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear auth data regardless of API response
      clearAuthData();
      setIsLoggingOut(false);
      setShowLogoutPopup(false);

      // Redirect to login page
      navigate("/buyers/login");
    }
  };

  const location = useLocation();

  const navigationLinks = [
    {
      path: "/buyers/dashboard",
      icon: LayoutIcon,
      label: "Dashboard",
      exact: true,
    },
    // {
    //   path: "/buyers/dashboard/profile",
    //   icon: UserCircleIcon,
    //   label: "My Profile",
    // },
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

  // Get profile picture URL
  const getProfilePictureUrl = () => {
    if (user?.buyer_profile?.profile_picture_url) {
      return user.buyer_profile.profile_picture_url;
    }
    return null;
  };

  // Render avatar content
  const renderAvatar = (size = 48) => {
    const profilePicUrl = getProfilePictureUrl();

    if (profilePicUrl) {
      return (
        <img
          src={profilePicUrl}
          alt={`${user?.first_name} ${user?.last_name}`}
          className="avatar-image"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      );
    }

    // Show initials if no profile picture
    if (user?.first_name && user?.last_name) {
      return `${user.first_name.charAt(0).toUpperCase()}${user.last_name
        .charAt(0)
        .toUpperCase()}`;
    }

    return <UserIcon size={size * 0.6} weight="duotone" />;
  };

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
        <div
          className="buyersidebar-mobile-avatar"
          onClick={() => setShowLogoutPopup(true)}
        >
          {renderAvatar(40)}
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

        <div className="buyersidebar-bottom-wrapper">
          <div
            className="buyersidebar-bottom"
            onClick={() => setShowLogoutPopup(!showLogoutPopup)}
          >
            <div className="buyersidebar-user-avatar">{renderAvatar(48)}</div>
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

          {/* Logout Popup */}
          {showLogoutPopup && (
            <div className="buyersidebar-logout-popup" ref={popupRef}>
              <div className="buyersidebar-logout-popup-content">
                <div className="buyersidebar-logout-popup-header">
                  <div className="buyersidebar-logout-avatar">
                    {renderAvatar(56)}
                  </div>
                  <div className="buyersidebar-logout-user-info">
                    <p className="buyersidebar-logout-user-name">
                      {user
                        ? `${user.first_name || ""} ${
                            user.last_name || ""
                          }`.trim() || "User"
                        : "Loading..."}
                    </p>
                    <p className="buyersidebar-logout-user-email">
                      {user?.email || ""}
                    </p>
                  </div>
                </div>

                <div className="buyersidebar-logout-popup-actions">
                  <NavLink
                    to="/buyers/dashboard/profile"
                    className="buyersidebar-logout-popup-link"
                    onClick={() => {
                      setShowLogoutPopup(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <UserCircleIcon size={20} weight="duotone" />
                    <span>View Profile</span>
                  </NavLink>

                  <button
                    className="buyersidebar-logout-button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    <SignOutIcon size={20} weight="bold" />
                    <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default BuyerSidebar;
