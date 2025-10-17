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
  UserCircleIcon,
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
import "./Sidebar.css";

const Sidebar = ({
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
      const userType = localStorage.getItem("userType") || "farmer";

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
      navigate("/farmers/login");
    }
  };

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
    // {
    //   path: "/farmers/dashboard/profile",
    //   icon: UserCircleIcon,
    //   label: "My Profile",
    // },
  ];

  // Get profile picture URL
  const getProfilePictureUrl = () => {
    if (
      user?.farmer_profile?.profile_picture_url ||
      user?.buyer_profile?.profile_picture_url
    ) {
      return (
        user.farmer_profile?.profile_picture_url ||
        user.buyer_profile?.profile_picture_url
      );
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
      <header className="mobile-header">
        <div
          className="mobile-header-icon"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <ListIcon size={28} weight="bold" />
        </div>
        <img src={logo} alt="Kilimo Link" className="mobile-header-logo" />
        <div className="mobile-avatar" onClick={() => setShowLogoutPopup(true)}>
          {renderAvatar(40)}
        </div>
      </header>

      {/* Overlay for Mobile */}
      <div
        className={`sidebar-overlay ${isMobileMenuOpen ? "active" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`farmers-sidebar ${isCollapsed ? "collapsed" : ""} ${
          isMobileMenuOpen ? "mobile-open" : ""
        }`}
      >
        <div className="sidebar-logo-section">
          <img
            src={logo}
            alt="Kilimo Link"
            loading="eager"
            className="sidebar-logo"
            height={50}
            width={"auto"}
          />
          <div
            className="toggle-btn"
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
              className="toggle-btn mobile-close-btn"
              onClick={() => setIsMobileMenuOpen(false)}
            >
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
                  end={link.exact}
                  className={({ isActive }) =>
                    `sidebar-nav-link ${isActive ? "active" : ""}`
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

        <div className="sidebar-bottom-wrapper">
          <div
            className="sidebar-bottom"
            onClick={() => setShowLogoutPopup(!showLogoutPopup)}
          >
            <div className="sidebar-user-avatar">{renderAvatar(48)}</div>
            <div className="sidebar-user-info">
              <p className="sidebar-user-name">
                {user
                  ? `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
                    "User"
                  : "Loading..."}
              </p>
              <p className="sidebar-user-role">Farmer</p>
            </div>
          </div>

          {/* Logout Popup */}
          {showLogoutPopup && (
            <div className="logout-popup" ref={popupRef}>
              <div className="logout-popup-content">
                <div className="logout-popup-header">
                  <div className="logout-avatar">{renderAvatar(56)}</div>
                  <div className="logout-user-info">
                    <p className="logout-user-name">
                      {user
                        ? `${user.first_name || ""} ${
                            user.last_name || ""
                          }`.trim() || "User"
                        : "Loading..."}
                    </p>
                    <p className="logout-user-email">{user?.email || ""}</p>
                  </div>
                </div>

                <div className="logout-popup-actions">
                  <NavLink
                    to="/farmers/dashboard/profile"
                    className="logout-popup-link"
                    onClick={() => {
                      setShowLogoutPopup(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <UserCircleIcon size={20} weight="duotone" />
                    <span>View Profile</span>
                  </NavLink>

                  <button
                    className="logout-button"
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

export default Sidebar;
