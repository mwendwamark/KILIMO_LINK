import "./TopDash.css";
import { useEffect, useState } from "react";
import { Calendar } from "@phosphor-icons/react";

const TopDash = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        // console.log("User data from localStorage:", parsedUser); // Debug log
        setUser(parsedUser);
      } catch (error) {
        // console.error("Error parsing user data:", error);
      }
    }
    setLoading(false);
  }, []);

  // Format the member since date - using the same format as FarmDetail
  const formatDate = (dateString) => {
    if (!dateString) return "";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  if (loading) {
    return (
      <div className="top-dash">
        <div className="top-dash-loading">
          <div className="spinner"></div>
          <p>Loading user data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="top-dash">
        <div className="top-dash-error">
          <p>User data not available</p>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  const fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();
  
  // Check if created_at exists in user data, if not, try alternative fields
  const memberSinceDate = user.created_at || user.createdAt || user.registration_date;
  const memberSince = formatDate(memberSinceDate);

  return (
    <div className="top-dash">
      <div className="dashboard-greeting">
        <h1 className="greeting-text">
          Hello, {fullName || "User"}
        </h1>
        {memberSince ? (
          <p className="member-since">
            {/* <Calendar size={16} weight="bold" /> */}
            Member since {memberSince}
          </p>
        ) : (
          <p className="member-since">
            <Calendar size={16} weight="bold" />
            Welcome to your dashboard
          </p>
        )}
      </div>
    </div>
  );
};

export default TopDash;