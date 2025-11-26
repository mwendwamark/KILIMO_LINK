import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts, isAuthenticated } from "../../../services/api";
import { formatCurrency } from "../../../utils/formatters";
import "./Products.css";
import SecondaryNavbar from "../../Components/SecondaryNavbar/SecondaryNavbar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getAllProducts();
      if (result.success) {
        setProducts(result.data.products);
      } else {
        console.error("Error fetching products:", result.error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    if (!isAuthenticated()) {
      setSelectedProductId(productId);
      setShowLoginPrompt(true);
    } else {
      navigate(`/products/${productId}`);
    }
  };

  const handleLoginRedirect = (userType) => {
    // Store the intended destination
    sessionStorage.setItem(
      "redirectAfterLogin",
      `/products/${selectedProductId}`
    );
    navigate(`/${userType}s/login`);
  };

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <>
      <SecondaryNavbar />
      <div className="home_page_products-page container below_navbar">
        <h1>Our Marketplace</h1>
        <div className="home_page_products-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="home_page_product-card"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="home_page_product-image-container">
                {product.product_images && product.product_images.length > 0 ? (
                  <img
                    src={product.product_images[0]}
                    alt={product.product_name}
                  />
                ) : (
                  <div className="no-image">No Image</div>
                )}
                <div className="home_page_product-location-badge">
                  {product.category}
                </div>
              </div>
              <div className="home_page_product-info">
                <h3>{product.product_name}</h3>
                <p className="home_page_price">
                  {formatCurrency(product.price_per_unit)} per {product.unit}
                </p>

                <p className="home_page_products_location">
                  {product.farm.county} County
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div
          className="login-prompt-overlay"
          onClick={() => setShowLoginPrompt(false)}
        >
          <div
            className="login-prompt-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="login-prompt-close"
              onClick={() => setShowLoginPrompt(false)}
            >
              ×
            </button>
            <h2>Sign in to Continue</h2>
            <p>Please sign in to view product details and contact farmers.</p>
            <div className="login-prompt-buttons">
              <button
                className="login-prompt-btn buyer-btn"
                onClick={() => handleLoginRedirect("buyer")}
              >
                Sign in as Buyer
              </button>
              <button
                className="login-prompt-btn farmer-btn"
                onClick={() => handleLoginRedirect("farmer")}
              >
                Sign in as Farmer
              </button>
            </div>
            <p className="login-prompt-signup">
              Don't have an account?{" "}
              <span onClick={() => navigate("/select_role")}>Sign up here</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
