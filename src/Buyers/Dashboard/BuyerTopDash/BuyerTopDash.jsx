import "./BuyerTopDash.css";
import { useEffect, useState } from "react";
import { CalendarIcon } from "@phosphor-icons/react";

const BuyerTopDash = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    setLoading(false);
  }, []);

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
      <div className="buyertopdash-container">
        <div className="buyertopdash-loading">
          <div className="buyertopdash-spinner"></div>
          <p>Loading user data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="buyertopdash-container">
        <div className="buyertopdash-error">
          <p>User data not available</p>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      </div>
    );
  }

  const fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();
  const memberSinceDate =
    user.created_at || user.createdAt || user.registration_date;
  const memberSince = formatDate(memberSinceDate);

  return (
    <div className="buyertopdash-container">
      <div className="buyertopdash-greeting">
        <h1 className="buyertopdash-greeting-text">
          Hello, {fullName || "User"}
        </h1>
        {memberSince ? (
          <p className="buyertopdash-member-since">
            Member since {memberSince}
          </p>
        ) : (
          <p className="buyertopdash-member-since">
            <CalendarIcon size={16} weight="bold" />
            Welcome to your dashboard
          </p>
        )}
      </div>
    </div>
  );
};

export default BuyerTopDash;
