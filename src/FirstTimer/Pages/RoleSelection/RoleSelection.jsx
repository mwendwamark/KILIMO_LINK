import React from "react";
import "./RoleSelection.css";
// Assuming Logo is a component or a path to your SVG
import Logo from "../../../../public/logo.svg";
import farmer_role from "../../assets/farmer_role.webp";
import buyer_role from "../../assets/buyer_role.webp";
import { NavLink } from "react-router-dom";

const RoleSelection = () => {
  return (
    <div className="role-selection-page-wrapper container"> 
        {/* New Logo/Navigation area, centered or at the top */}
        <NavLink to="/" className="role-selection-logo-container">
            <img src={Logo} alt="App Logo" className="role-selection-logo" />
        </NavLink>
        
        <div className="role-selection-container">
            <header className="role-selection-header">
                <h1 className="section-title">Select Your Role</h1> {/* Use h1 for primary heading */}
                <p>Please choose the option that best describes you:</p>
            </header>

            <div className="role-selection-cards">
                {/* Farmer Card - Entire card is the link */}
                <NavLink to="/farmers/signup" className="role-card farmer-card">
                    <div className="role-card-information">
                        <h2>Farmer</h2>
                        <p>Sign up as a farmer to access farming resources.</p>
                    </div>
                    <div className="role-card-img">
                        <img src={farmer_role} alt="A farmer working in a field" />
                    </div>
                </NavLink>

                {/* Buyer Card - Entire card is the link */}
                <NavLink to="/buyers/signup" className="role-card buyer-card">
                    <div className="role-card-information">
                        <h2>Buyer</h2>
                        <p>Sign up as a buyer to purchase agricultural products.</p>
                    </div>
                    <div className="role-card-img">
                        <img src={buyer_role} alt="A person viewing market data" />
                    </div>
                </NavLink>
            </div>
        </div>
    </div>
  );
};

export default RoleSelection;