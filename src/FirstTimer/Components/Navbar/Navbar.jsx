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
                  to="/marketplace"
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
                  to="/login"
                  className="normal_button normal_button_white"
                  onClick={closeMenu}
                >
                  <span className="button_text">Sign In</span>
                  <ArrowDownRight className="arrow_icon" size={18} color="#322f30" />
                </NavLink>
              </div>
            </ul>

            <div className="main_navbar-right">
              <ul className="main_navbar-right-list">
                <li>
                  <NavLink
                    aria-label="Go to Sign In page"
                    to="/login"
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

// import { useEffect, useState } from "react";
// import "./Navbar.css";
// import { AlignRight, ArrowDownRight, X } from "lucide-react";
// import { NavLink } from "react-router-dom";
// import Logo from "../../../../public/logo.svg";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [activeSection, setActiveSection] = useState("hero");

//   // Define section configurations with their theme colors
//   const sectionThemes = {
//     hero: {
//       background: "transparent",
//       textColor: "#322f30",
//       logoFilter: "none",
//       buttonStyle: "green", // green background, white text
//       borderColor: "rgba(255, 255, 255, 0.2)"
//     },
//     howItWorks: {
//       background: "",
//       textColor: "#322f30",
//       logoFilter: "none",
//       buttonStyle: "green",
//       borderColor: "rgba(64, 191, 64, 0.1)"
//     },
//     whyFarmersLove: {
//       background: "linear-gradient(135deg, rgba(64, 191, 64, 0.95) 0%, rgba(45, 212, 191, 0.95) 100%)",
//       textColor: "#ffffff",
//       logoFilter: "brightness(0) invert(1)",
//       buttonStyle: "white", // white background, green text
//       borderColor: "rgba(255, 255, 255, 0.3)"
//     },
//     successStories: {
//       background: "rgba(248, 255, 254, 0.98)",
//       textColor: "#322f30",
//       logoFilter: "none",
//       buttonStyle: "green",
//       borderColor: "rgba(132, 204, 22, 0.1)"
//     },
//     categories: {
//       background: "linear-gradient(135deg, rgba(132, 204, 22, 0.95) 0%, rgba(64, 191, 64, 0.95) 100%)",
//       textColor: "#ffffff",
//       logoFilter: "brightness(0) invert(1)",
//       buttonStyle: "white",
//       borderColor: "rgba(255, 255, 255, 0.3)"
//     },
//     businessBuyers: {
//       background: "rgba(255, 255, 255, 0.98)",
//       textColor: "#322f30",
//       logoFilter: "none",
//       buttonStyle: "green",
//       borderColor: "rgba(45, 212, 191, 0.1)"
//     },
//     communityFeatures: {
//       background: "linear-gradient(135deg, rgba(45, 212, 191, 0.95) 0%, rgba(80, 208, 80, 0.95) 100%)",
//       textColor: "#ffffff",
//       logoFilter: "brightness(0) invert(1)",
//       buttonStyle: "white",
//       borderColor: "rgba(255, 255, 255, 0.3)"
//     },
//     trustSafety: {
//       background: "rgba(255, 255, 255, 0.98)",
//       textColor: "#322f30",
//       logoFilter: "none",
//       buttonStyle: "green",
//       borderColor: "rgba(64, 191, 64, 0.1)"
//     },
//     gettingStarted: {
//       background: "linear-gradient(135deg, rgba(64, 191, 64, 0.98) 0%, rgba(48, 160, 48, 0.98) 100%)",
//       textColor: "#ffffff",
//       logoFilter: "brightness(0) invert(1)",
//       buttonStyle: "white",
//       borderColor: "rgba(255, 255, 255, 0.3)"
//     },
//     cta: {
//       background: "linear-gradient(135deg, rgba(132, 204, 22, 0.98) 0%, rgba(64, 191, 64, 0.98) 100%)",
//       textColor: "#ffffff",
//       logoFilter: "brightness(0) invert(1)",
//       buttonStyle: "white",
//       borderColor: "rgba(255, 255, 255, 0.3)"
//     },
//     footer: {
//       background: "rgba(50, 47, 48, 0.98)",
//       textColor: "#ffffff",
//       logoFilter: "brightness(0) invert(1)",
//       buttonStyle: "green",
//       borderColor: "rgba(255, 255, 255, 0.1)"
//     }
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY + 100; // Offset for navbar height
      
//       // Set scrolled state
//       setScrolled(window.scrollY > 100);

//       // Get all sections
//       const sections = [
//         { id: "hero", element: document.getElementById("hero") },
//         { id: "howItWorks", element: document.getElementById("how-it-works") },
//         { id: "whyFarmersLove", element: document.getElementById("why-farmers-love") },
//         { id: "successStories", element: document.getElementById("success-stories") },
//         { id: "categories", element: document.getElementById("categories") },
//         { id: "businessBuyers", element: document.getElementById("business-buyers") },
//         { id: "communityFeatures", element: document.getElementById("community-features") },
//         { id: "trustSafety", element: document.getElementById("trust-safety") },
//         { id: "gettingStarted", element: document.getElementById("getting-started") },
//         { id: "cta", element: document.getElementById("cta") },
//         { id: "footer", element: document.getElementById("footer") }
//       ].filter(section => section.element); // Only include sections that exist

//       // Find the active section
//       let currentSection = "hero";
      
//       sections.forEach((section) => {
//         const rect = section.element.getBoundingClientRect();
//         const sectionTop = rect.top + window.scrollY;
//         const sectionHeight = rect.height;
        
//         // Check if section is in viewport (with some tolerance)
//         if (scrollPosition >= sectionTop - 200 && scrollPosition < sectionTop + sectionHeight - 200) {
//           currentSection = section.id;
//         }
//       });

//       setActiveSection(currentSection);
//     };

//     handleScroll(); // Check on mount
//     window.addEventListener("scroll", handleScroll);
    
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const closeMenu = () => {
//     setMenuOpen(false);
//   };

//   // Get current theme
//   const currentTheme = sectionThemes[activeSection] || sectionThemes.hero;

//   return (
//     <>
//       <header>
//         <nav 
//           className={`main_navbar ${scrolled ? "scroll_navbar" : ""} theme-${activeSection}`}
//           style={{
//             background: currentTheme.background,
//             color: currentTheme.textColor,
//             borderBottom: `1px solid ${currentTheme.borderColor}`,
//             backdropFilter: scrolled ? "blur(20px)" : "none",
//             transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
//           }}
//         >
//           <div className="main_navbar-container container">
//             <NavLink
//               aria-label="Go to Home page"
//               to="/"
//               className="main_navbar-logo"
//             >
//               <img 
//                 src={Logo} 
//                 alt="Logo" 
//                 style={{
//                   filter: currentTheme.logoFilter,
//                   transition: "filter 0.4s ease"
//                 }}
//               />
//             </NavLink>

//             <ul className={`main_navbar-menu ${menuOpen ? "active" : ""}`}>
//               <li>
//                 <NavLink
//                   aria-label="Go to Home page"
//                   to="/"
//                   onClick={closeMenu}
//                   style={{ color: currentTheme.textColor }}
//                 >
//                   Home
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   aria-label="Go to About Us page"
//                   to="/about_us"
//                   onClick={closeMenu}
//                   style={{ color: currentTheme.textColor }}
//                 >
//                   About Us
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   aria-label="Go to Marketplace page"
//                   to="/marketplace"
//                   onClick={closeMenu}
//                   style={{ color: currentTheme.textColor }}
//                 >
//                   Marketplace
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   aria-label="Go to Community page"
//                   to="/community"
//                   onClick={closeMenu}
//                   style={{ color: currentTheme.textColor }}
//                 >
//                   Community
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   aria-label="Go to FAQs page"
//                   to="/faqs"
//                   onClick={closeMenu}
//                   style={{ color: currentTheme.textColor }}
//                 >
//                   FAQs
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   aria-label="Go to Contact page"
//                   to="/contact"
//                   onClick={closeMenu}
//                   style={{ color: currentTheme.textColor }}
//                 >
//                   Contact
//                 </NavLink>
//               </li>
//               <div className="mobile-right-section">
//                 <NavLink
//                   aria-label="Go to Sign In page"
//                   to="/login"
//                   className={`navbar-button ${currentTheme.buttonStyle === 'white' ? 'white-style' : 'green-style'}`}
//                   onClick={closeMenu}
//                   style={{
//                     backgroundColor: currentTheme.buttonStyle === 'white' 
//                       ? 'rgba(255, 255, 255, 0.9)' 
//                       : 'var(--green_color)',
//                     color: currentTheme.buttonStyle === 'white' 
//                       ? 'var(--green_color)' 
//                       : 'white',
//                     border: currentTheme.buttonStyle === 'white' 
//                       ? '2px solid rgba(255, 255, 255, 0.3)' 
//                       : '2px solid transparent'
//                   }}
//                 >
//                   <span className="button_text">Sign In</span>
//                   <ArrowDownRight 
//                     className="arrow_icon" 
//                     size={18} 
//                     color={currentTheme.buttonStyle === 'white' ? 'var(--green_color)' : 'white'} 
//                   />
//                 </NavLink>
//               </div>
//             </ul>

//             <div className="main_navbar-right">
//               <ul className="main_navbar-right-list">
//                 <li>
//                   <NavLink
//                     aria-label="Go to Sign In page"
//                     to="/login"
//                     className={`navbar-button ${currentTheme.buttonStyle === 'white' ? 'white-style' : 'green-style'}`}
//                     onClick={closeMenu}
//                     style={{
//                       backgroundColor: currentTheme.buttonStyle === 'white' 
//                         ? 'rgba(255, 255, 255, 0.9)' 
//                         : 'var(--green_color)',
//                       color: currentTheme.buttonStyle === 'white' 
//                         ? 'var(--green_color)' 
//                         : 'white',
//                       border: currentTheme.buttonStyle === 'white' 
//                         ? '2px solid rgba(255, 255, 255, 0.3)' 
//                         : '2px solid transparent',
//                       backdropFilter: 'blur(10px)'
//                     }}
//                   >
//                     <span className="button_text">Sign In</span>
//                     <ArrowDownRight 
//                       className="normal_button_icon" 
//                       color={currentTheme.buttonStyle === 'white' ? 'var(--green_color)' : 'white'}
//                     />
//                   </NavLink>
//                 </li>
//               </ul>

//               <div className="main_navbar-menu-icon" onClick={toggleMenu}>
//                 {menuOpen ? (
//                   <X 
//                     size={24} 
//                     className="close_menu" 
//                     color={currentTheme.textColor} 
//                   />
//                 ) : (
//                   <AlignRight 
//                     size={24} 
//                     color={currentTheme.textColor}
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//         </nav>
//       </header>
//     </>
//   );
// };

// export default Navbar;