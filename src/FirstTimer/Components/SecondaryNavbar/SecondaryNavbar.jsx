import { useEffect, useState } from "react";
import "./SecondaryNavbar.css";
import { AlignRight, ArrowDownRight, X } from "lucide-react";
import { NavLink } from "react-router-dom";
// import Logo from "../../../assets/logo1.svg";
import Logo from "../../../../public/logo.svg";

const SecondaryNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header>
        <nav className={`secondary_navbar ${scrolled ? "scroll_navbar" : ""}`}>
          <div className="secondary_navbar-container container">
            <NavLink
              aria-label="Go to Home page"
              to="/"
              className="secondary_navbar-logo"
            >
              <img src={Logo} alt="Logo" />
            </NavLink>

            <ul className={`secondary_navbar-menu ${menuOpen ? "active" : ""}`}>
              <li>
                <NavLink
                  aria-label="Go to Home page"
                  to="/"
                  onClick={closeMenu}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  aria-label="Go to About Us page"
                  to="/about_us"
                  onClick={closeMenu}
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  aria-label="Go to Marketplace page"
                  to="/products"
                  onClick={closeMenu}
                >
                  Marketplace
                </NavLink>
              </li>
              <li>
                <NavLink
                  aria-label="Go to Community page"
                  to="/community"
                  onClick={closeMenu}
                >
                  Community
                </NavLink>
              </li>
              <li>
                <NavLink
                  aria-label="Go to FAQs page"
                  to="/faqs"
                  onClick={closeMenu}
                >
                  FAQs
                </NavLink>
              </li>
              <li>
                <NavLink
                  aria-label="Go to Contact page"
                  to="/contact"
                  onClick={closeMenu}
                >
                  Contact
                </NavLink>
              </li>
              <div className="mobile-right-section">
                <NavLink
                  aria-label="Go to Sign In page"
                  to="/select_role"
                  className="normal_button normal_button_white"
                  onClick={closeMenu}
                >
                  <span className="button_text">Sign In</span>
                  <ArrowDownRight
                    className="arrow_icon"
                    size={18}
                    color="#322f30"
                  />
                </NavLink>
              </div>
            </ul>

            <div className="secondary_navbar-right">
              <ul className="secondary_navbar-right-list">
                <li>
                  <NavLink
                    aria-label="Go to Sign In page"
                    to="/select_role"
                    className="normal_button"
                    onClick={closeMenu}
                  >
                    <span className="button_text">Sign In</span>
                    <ArrowDownRight className="normal_button_icon" />
                  </NavLink>
                </li>
              </ul>

              <div className="secondary_navbar-menu-icon" onClick={toggleMenu}>
                {menuOpen ? (
                  <X size={24} className="close_menu" color="#000" />
                ) : (
                  <AlignRight size={24} />
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default SecondaryNavbar;
