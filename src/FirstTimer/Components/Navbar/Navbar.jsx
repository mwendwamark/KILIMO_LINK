import { useEffect, useState } from "react";
import "./Navbar.css";
import { AlignRight, ArrowDownRight, X } from "lucide-react";
import { NavLink } from "react-router-dom";
// import Logo from "../../../assets/logo1.svg";
import Logo from "../../../../public/logo.svg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if navbar should have backdrop blur and color change
      if (currentScrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        // Scrolling down & past threshold - hide navbar
        setVisible(false);
      } else {
        // Scrolling up - show navbar
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header>
        <nav
          className={`main_navbar ${scrolled ? "scroll_navbar" : ""} ${
            !visible ? "main_navbar--hidden" : ""
          }`}
        >
          <div className="main_navbar-container container">
            <NavLink
              aria-label="Go to Home page"
              to="/"
              className="main_navbar-logo"
            >
              <img src={Logo} alt="Logo" />
            </NavLink>

            <ul className={`main_navbar-menu ${menuOpen ? "active" : ""}`}>
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

            <div className="main_navbar-right">
              <ul className="main_navbar-right-list">
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

              <div className="main_navbar-menu-icon" onClick={toggleMenu}>
                {menuOpen ? (
                  <X size={24} className="close_menu" color="#fff" />
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

export default Navbar;
