import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail } from "lucide-react";
import "./CheckEmail.css";
import animation from "../../src/assets/CheckEmail.webm"

const CheckEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "your email";
  const userType = location.state?.userType || "farmer";

  return (
    <div className="check-email-section ">
      <div className="check-email-container">
        <video
          src={animation}
          playsInline={true}
          autoPlay={true}
          muted={true}
        //   loop={true}
          className="check-email-icon"
        >
          <Mail size={40} color="white" />
        </video>

        <h1
         className="section-title"
        >
          Check Your Email
        </h1>

        <p className="check-email-instructions"
         
        >
          We've sent a confirmation link to <strong>{email}</strong>
        </p>

        <p
          style={{
            color: "#6b7280",
            marginBottom: "32px",
            lineHeight: "1.6",
          }}
        >
          Please check your inbox and click the confirmation link to activate
          your account. After confirming, you'll be able to log in.
        </p>

        <div
          style={{
            backgroundColor: "#fef3c7",
            border: "1px solid #fbbf24",
            borderRadius: "6px",
            padding: "16px",
            marginBottom: "24px",
          }}
        >
          <p
            style={{
              color: "#92400e",
              fontSize: "14px",
              margin: 0,
            }}
          >
            <strong>Note:</strong> If you don't see the email, check your spam
            folder.
          </p>
        </div>

        {/* <button
          onClick={() => navigate(`/${userType}s/login`)}
          style={{
            width: '100%',
            backgroundColor: '#10b981',
            color: 'white',
            padding: '12px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
        >
          Go to Login Page
        </button> */}
      </div>
    </div>
  );
};

export default CheckEmail;
