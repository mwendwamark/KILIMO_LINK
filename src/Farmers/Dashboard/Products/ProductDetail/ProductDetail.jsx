// components/Products/ProductDetail.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, deleteProduct } from "../../../../services/api";
import { formatCurrency } from "../../../../utils/formatters";
import "./ProductDetail.css";

const ProductDetail = ({ farmId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    fetchProduct();
  }, [farmId, productId]);

  const fetchProduct = async () => {
    setLoading(true);
    const result = await getProduct(farmId, productId);
    if (result.success) {
      setProduct(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    const result = await deleteProduct(farmId, productId);
    if (result.success) {
      alert("Product deleted successfully!");
      navigate(`/farmers/dashboard/farms/${farmId}/products`);
    } else {
      alert(`Error: ${result.error}`);
    }
  };

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

  if (loading) {
    return <div className="product-detail-loading">Loading product...</div>;
  }

  if (error) {
    return <div className="product-detail-error">Error: {error}</div>;
  }

  if (!product) {
    return <div className="product-detail-error">Product not found</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-header">
        <button
          className="dashboard-outline_btn"
          onClick={() =>
            navigate(`/farmers/dashboard/farms/${farmId}/products`)
          }
        >
          ← Back to Products
        </button>
        <div className="product-detail-actions">
          <button
            className="dashboard-edit_btn"
            onClick={() =>
              navigate(
                `/farmers/dashboard/farms/${farmId}/products/${productId}/edit`
              )
            }
          >
            Edit
          </button>
          <button className="dashboard-delete_btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className="product-detail-content">
        {product.product_images && product.product_images.length > 0 && (
          <div className="product-detail-images">
            <div className="image-gallery">
              <img
                src={product.product_images[currentImageIndex]}
                alt={product.product_name}
                className="main-image"
              />
              {product.product_images.length > 1 && (
                <>
                  <button className="image-nav prev" onClick={prevImage}>
                    ‹
                  </button>
                  <button className="image-nav next" onClick={nextImage}>
                    ›
                  </button>
                  <div className="image-indicators">
                    {product.product_images.map((_, index) => (
                      <span
                        key={index}
                        className={`indicator ${
                          index === currentImageIndex ? "active" : ""
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
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
          </div>
        )}

        <div className="product-detail-info">
          <h1 className="product-detail-name">{product.product_name}</h1>
          <span className="product-detail-category">{product.category}</span>

          <div className="product-detail-price">
            <span className="price-label">Price:</span>
            <span className="price-value">
              {formatCurrency(product.price_per_unit)} / {product.unit}
            </span>
          </div>

          {product.description && (
            <div className="product-detail-section">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
          )}

          <div className="product-detail-section">
            <h3>Details</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Quantity:</span>
                <span className="detail-value">
                  {product.quantity} {product.unit}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Category:</span>
                <span className="detail-value">{product.category}</span>
              </div>
              {product.age && (
                <div className="detail-item">
                  <span className="detail-label">Age:</span>
                  <span className="detail-value">{product.age} months</span>
                </div>
              )}
              {product.harvest_date && (
                <div className="detail-item">
                  <span className="detail-label">Harvest Date:</span>
                  <span className="detail-value">
                    {new Date(product.harvest_date).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {product.farm && (
            <div className="product-detail-section">
              <h3>Farm Information</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Farm:</span>
                  <span className="detail-value">{product.farm.farm_name}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{product.farm.county}</span>
                </div>
              </div>
            </div>
          )}

          <div className="product-detail-dates">
            <small>
              Created: {new Date(product.created_at).toLocaleDateString()}
            </small>
            <small>
              Updated: {new Date(product.updated_at).toLocaleDateString()}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
