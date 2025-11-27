import { NavLink } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="below_navbar not_found_page">
      <div className="small_container not_found_container">
        <h1>Page not found</h1>
        <h2 className="not_found_title">404</h2>
        <span>Oops! the page you're looking for cannot be found</span>
        <NavLink to="/" className="btn btn_black_outline">GO BACK HOME</NavLink>
      </div>
    </div>
  );
};

export default NotFound;