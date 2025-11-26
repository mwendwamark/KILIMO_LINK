import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllFarmerProducts, deleteProduct } from "../../../services/api";
import { formatCurrency } from "../../../utils/formatters";
import "./MyListings.css";

const MyListings = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [groupByFarm, setGroupByFarm] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    setLoading(true);
    const result = await getAllFarmerProducts();
    if (result.success) {
      setProducts(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleDelete = async (farmId, productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    const result = await deleteProduct(farmId, productId);
    if (result.success) {
      setProducts(products.filter((p) => p.id !== productId));
      alert("Product deleted successfully!");
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  const handleEdit = (farmId, productId) => {
    navigate(`/farmers/dashboard/farms/${farmId}/products/${productId}/edit`);
  };

  const handleView = (farmId, productId) => {
    navigate(`/farmers/dashboard/farms/${farmId}/products/${productId}`);
  };

  // Group products by farm
  const groupedProducts = products.reduce((acc, product) => {
    const farmName = product.farm?.farm_name || "Unknown Farm";
    if (!acc[farmName]) {
      acc[farmName] = [];
    }
    acc[farmName].push(product);
    return acc;
  }, {});

  if (loading) {
    return <div className="my-listings-loading">Loading your products...</div>;
  }

  if (error) {
    return <div className="my-listings-error">Error: {error}</div>;
  }

  return (
    <div className="my-listings-container">
      <div className="my-listings-header">
        <h2 className="dashboard_body-title">My Product Listings</h2>
        <div className="my-listings-controls">
          <button
            className={`view-toggle-btn ${groupByFarm ? "active" : ""}`}
            onClick={() => setGroupByFarm(true)}
          >
            Group by Farm
          </button>
          <button
            className={`view-toggle-btn ${!groupByFarm ? "active" : ""}`}
            onClick={() => setGroupByFarm(false)}
          >
            All Products
          </button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="my-listings-empty">
          <p>You haven't created any products yet.</p>
          <button
            className="dashboard-green_btn"
            onClick={() => navigate("/farmers/dashboard/farms")}
          >
            Go to My Farms
          </button>
        </div>
      ) : groupByFarm ? (
        // Grouped by farm view
        <div className="my-listings-grouped">
          {Object.entries(groupedProducts).map(([farmName, farmProducts]) => (
            <div key={farmName} className="farm-group">
              <h3 className="farm-group-title">
                {farmName}
                <span className="product-count">
                  ({farmProducts.length}{" "}
                  {farmProducts.length === 1 ? "product" : "products"})
                </span>
              </h3>
              <div className="products-grid">
                {farmProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onView={handleView}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Flat list view
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onView={handleView}
              showFarmName={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Product Card Component
const ProductCard = ({
  product,
  onDelete,
  onEdit,
  onView,
  showFarmName = false,
}) => {
  return (
    <div className="my-listings-product-card">
      {product.product_images && product.product_images.length > 0 && (
        <img
          src={product.product_images[0]}
          alt={product.product_name}
          className="product-image"
        />
      )}
      <div className="product-info">
        <h4 className="product-name">{product.product_name}</h4>
        {showFarmName && (
          <p className="product-farm-name">{product.farm?.farm_name}</p>
        )}
        <span className="product-category">{product.category}</span>
        <p className="product-description">{product.description}</p>
        <div className="product-details">
          <span className="product-quantity">
            {product.quantity} {product.unit}
          </span>
          <span className="product-price">
            {formatCurrency(product.price_per_unit)}/{product.unit}
          </span>
        </div>
      </div>
      <div className="product-actions">
        <button
          className="dashboard-outline_btn"
          onClick={() => onView(product.farm_id, product.id)}
        >
          View
        </button>
        <button
          className="dashboard-edit_btn"
          onClick={() => onEdit(product.farm_id, product.id)}
        >
          Edit
        </button>
        <button
          className="dashboard-delete_btn"
          onClick={() => onDelete(product.farm_id, product.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MyListings;
