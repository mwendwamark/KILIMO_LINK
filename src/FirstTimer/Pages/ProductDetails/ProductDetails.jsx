import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPublicProduct } from "../../../services/api";
import { formatCurrency } from "../../../utils/formatters";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await getPublicProduct(id);
      if (result.success) {
        setProduct(result.data.product);
      } else {
        console.error("Error fetching product details:", result.error);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const nextImage = () => {
    if (product.product_images && product.product_images.length > 1) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % product.product_images.length
      );
    }
  };

  const prevImage = () => {
    if (product.product_images && product.product_images.length > 1) {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + product.product_images.length) %
          product.product_images.length
      );
    }
  };

  if (loading) return <div className="loading">Loading details...</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-details-page">
      <button className="back-btn" onClick={() => navigate("/products")}>
        &larr; Back to Products
      </button>

      <div className="product-details-container">
        <div className="details-image">
          {product.product_images && product.product_images.length > 0 ? (
            <>
              <div className="main-image-container">
                <img
                  src={product.product_images[currentImageIndex]}
                  alt={product.product_name}
                />
                {product.product_images.length > 1 && (
                  <>
                    <button className="image-nav prev" onClick={prevImage}>
                      ‹
                    </button>
                    <button className="image-nav next" onClick={nextImage}>
                      ›
                    </button>
                  </>
                )}
              </div>
              {product.product_images.length > 1 && (
                <div className="thumbnail-list">
                  {product.product_images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${product.product_name} ${index + 1}`}
                      className={`thumbnail ${
                        index === currentImageIndex ? "active" : ""
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="no-image-details">No Image Available</div>
          )}
        </div>

        <div className="details-info">
          <h1>{product.product_name}</h1>
          <div className="details-price">
            {formatCurrency(product.price_per_unit)}{" "}
            <span className="unit">per {product.unit}</span>
          </div>

          <div className="details-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="details-meta">
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Available Quantity:</strong> {product.quantity}{" "}
              {product.unit}
            </p>
          </div>

          <div className="cta-section">
            <p className="login-prompt">Want to purchase this item?</p>
            <button
              className="login-btn"
              onClick={() => navigate("/buyers/login")}
            >
              Login to Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
