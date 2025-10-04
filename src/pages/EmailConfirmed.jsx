import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const EmailConfirmed = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const confirmed = searchParams.get("confirmed");
  const userType = searchParams.get("userType") || "farmer"; // Get user type from URL
  const error = searchParams.get("error");

  useEffect(() => {
    if (confirmed === "true") {
      toast.success("Email confirmed successfully! You can now login.");
      setTimeout(() => {
        // Dynamic redirect based on user type
        navigate(`/${userType}s/login`);
      }, 2000);
    } else {
      toast.error(error || "Email confirmation failed. Please try again.");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [confirmed, userType, error, navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        {confirmed === "true" ? "✓ Email Confirmed!" : "✗ Confirmation Failed"}
      </h2>
      <p>Redirecting to {userType} login...</p>
    </div>
  );
};

export default EmailConfirmed;
