import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../../../../services/api";
import { formatCurrency } from "../../../../utils/formatters";
import "./ProductList.css";

const ProductsList = ({ farmId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [farmId]);

  const fetchProducts = async () => {
    setLoading(true);
    const result = await getProducts(farmId);
    if (result.success) {
      setProducts(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleDelete = async (productId) => {
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

  if (loading) {
    return <div className="products-loading">Loading products...</div>;
  }

  if (error) {
    return <div className="products-error">Error: {error}</div>;
  }

  return (
    <div className="products-list-container">
      <div className="products-header">
        <h2 className="dashboard_body-title">Products</h2>
        <button
          className="dashboard-green_btn"
          onClick={() =>
            navigate(`/farmers/dashboard/farms/${farmId}/products/create`)
          }
        >
          + Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="products-empty">
          <p>No products yet. Create your first product!</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {product.product_images && product.product_images.length > 0 && (
                <img
                  src={product.product_images[0]}
                  alt={product.product_name}
                  className="product-image"
                />
              )}
              <div className="product-info">
                <h3 className="product-name">{product.product_name}</h3>
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
                  onClick={() =>
                    navigate(
                      `/farmers/dashboard/farms/${farmId}/products/${product.id}`
                    )
                  }
                >
                  View
                </button>
                <button
                  className="dashboard-edit_btn"
                  onClick={() =>
                    navigate(
                      `/farmers/dashboard/farms/${farmId}/products/${product.id}/edit`
                    )
                  }
                >
                  Edit
                </button>
                <button
                  className="dashboard-delete_btn"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
