import { useEffect, useState } from "react";
import "./Navbar.css";
import { AlignRight, ArrowDownRight, X } from "lucide-react";
import { NavLink } from "react-router-dom";
// import Logo from "../../../assets/logo1.svg";
import Logo from "../../../../public/logo.svg";

const Navbar = () => {
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
        <nav className={`main_navbar ${scrolled ? "scroll_navbar" : ""}`}>
          <div className="main_navbar-container container">
            <NavLink to="/" className="main_navbar-logo">
              <img src={Logo} alt="Logo" />
            </NavLink>

            <ul className={`main_navbar-menu ${menuOpen ? "active" : ""}`}>
              <li>
                <NavLink to="/" onClick={closeMenu}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about_us" onClick={closeMenu}>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/marketplace" onClick={closeMenu}>
                  Marketplace
                </NavLink>
              </li>
              <li>
                <NavLink to="/community" onClick={closeMenu}>
                  Community
                </NavLink>
              </li>
              <li>
                <NavLink to="/faqs" onClick={closeMenu}>
                  FAQs
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" onClick={closeMenu}>
                  Contact
                </NavLink>
              </li>
              <div className="mobile-right-section">
                <NavLink
                  to="/login"
                  className="normal_button normal_button_white"
                  onClick={closeMenu}
                >
                  <span className="button_text">Sign In</span>
                  <ArrowDownRight className="arrow_icon" size={18} color="#322f30"/>
                </NavLink>
              </div>
            </ul>

            <div className="main_navbar-right">
              <ul className="main_navbar-right-list">
                <li>
                  <NavLink
                    to="/login"
                    className="normal_button"
                    onClick={closeMenu}
                  >
                    <span className="button_text">Sign In</span>
                    {/* <div className="button_arrow_circle"> */}
                    <ArrowDownRight className="normal_button_icon" />
                    {/* </div> */}
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
