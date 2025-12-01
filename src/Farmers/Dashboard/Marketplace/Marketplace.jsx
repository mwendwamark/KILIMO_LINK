import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../../services/api";
import { formatCurrency } from "../../../utils/formatters";
import "./Marketplace.css";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getAllProducts();
      if (result.success) {
        setProducts(result.data.products);
      } else {
        setError(result.error);
        console.error("Error fetching products:", result.error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    // Navigate to public product details page
    navigate(`/products/${productId}`);
  };

  if (loading) {
    return <div className="marketplace-loading">Loading marketplace...</div>;
  }

  if (error) {
    return <div className="marketplace-error">Error: {error}</div>;
  }

  return (
    <div className="marketplace-container">
      <div className="marketplace-header">
        <h2 className="dashboard_body-title">Marketplace</h2>
        <p className="marketplace-subtitle">
          Browse products from farmers across the platform
        </p>
      </div>

      {products.length === 0 ? (
        <div className="marketplace-empty">
          <p>No products available at the moment.</p>
        </div>
      ) : (
        <div className="marketplace-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="marketplace-product-card"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="marketplace-product-image-container">
                {product.product_images && product.product_images.length > 0 ? (
                  <img
                    src={product.product_images[0]}
                    alt={product.product_name}
                  />
                ) : (
                  <div className="no-image">No Image</div>
                )}
                <div className="marketplace-product-category-badge">
                  {product.category}
                </div>
              </div>
              <div className="marketplace-product-info">
                <h3>{product.product_name}</h3>
                <p className="marketplace-price">
                  {formatCurrency(product.price_per_unit)} per {product.unit}
                </p>
                <p className="marketplace-location">
                  {product.farm.county} County
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
