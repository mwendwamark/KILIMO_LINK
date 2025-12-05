import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllProducts,
  getFilterOptions,
  isAuthenticated,
} from "../../../services/api";
import { formatCurrency } from "../../../utils/formatters";
import useProductSearch from "../../../hooks/useProductSearch";
import SearchBar from "../../../Components/SearchBar/SearchBar";
import FilterPanel from "../../../Components/FilterPanel/FilterPanel";
import FilterChip from "../../../Components/FilterChip/FilterChip";
import Pagination from "../../../Components/Pagination/Pagination";
import "./Products.css";
import SecondaryNavbar from "../../Components/SecondaryNavbar/SecondaryNavbar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    counties: [],
    price_range: { min: 0, max: 0 },
  });
  const [meta, setMeta] = useState({
    current_page: 1,
    total_pages: 1,
    total_count: 0,
    per_page: 20,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const navigate = useNavigate();
  const {
    filters,
    currentPage,
    updateFilter,
    setCurrentPage,
    clearFilters,
    getActiveFilters,
  } = useProductSearch();

  // Fetch filter options on mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      const result = await getFilterOptions();
      if (result.success) {
        setFilterOptions(result.data);
      }
    };
    fetchFilterOptions();
  }, []);

  // Fetch products when filters or page change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const result = await getAllProducts({
        ...filters,
        page: currentPage,
        per_page: 20,
      });

      if (result.success) {
        setProducts(result.data.products || []);
        if (result.data.meta) {
          setMeta(result.data.meta);
        }
        setError("");
      } else {
        setError(result.error);
        console.error("Error fetching products:", result.error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [filters, currentPage]);

  const handleProductClick = (productId) => {
    if (!isAuthenticated()) {
      setSelectedProductId(productId);
      setShowLoginPrompt(true);
    } else {
      navigate(`/products/${productId}`);
    }
  };

  const handleLoginRedirect = (userType) => {
    sessionStorage.setItem(
      "redirectAfterLogin",
      `/products/${selectedProductId}`
    );
    navigate(`/${userType}s/login`);
  };

  const handleRemoveFilter = (key) => {
    updateFilter(key, "");
  };

  const activeFilters = getActiveFilters();

  return (
    <>
      <SecondaryNavbar />
      <div className="home_page_products-page container below_navbar">
        <div className="products-header">
          <h1>Our Marketplace</h1>
          <p className="products-subtitle">
            Discover quality agricultural products from farmers across Kenya
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar
          value={filters.search}
          onChange={(value) => updateFilter("search", value)}
          placeholder="Search for products..."
        />

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="active-filters">
            <div className="active-filters-label">Active Filters:</div>
            <div className="active-filters-chips">
              {activeFilters.map((filter) => (
                <FilterChip
                  key={filter.key}
                  label={filter.label}
                  value={filter.value}
                  onRemove={() => handleRemoveFilter(filter.key)}
                />
              ))}
              <button className="clear-all-filters-btn" onClick={clearFilters}>
                Clear All
              </button>
            </div>
          </div>
        )}

        <div className="products-content">
          {/* Filter Panel */}
          <FilterPanel
            filters={filters}
            onFilterChange={updateFilter}
            filterOptions={filterOptions}
            onClearAll={clearFilters}
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen(!isFilterOpen)}
          />

          {/* Products Grid */}
          <div className="products-main">
            {loading ? (
              <div className="products-loading">
                <div className="loading-spinner"></div>
                <p>Loading products...</p>
              </div>
            ) : error ? (
              <div className="products-error">
                <p>Error: {error}</p>
              </div>
            ) : products.length === 0 ? (
              <div className="products-empty">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <path
                    d="M32 8L8 20V44L32 56L56 44V20L32 8Z"
                    stroke="#9CA3AF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M32 32L8 20M32 32L56 20M32 32V56"
                    stroke="#9CA3AF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms</p>
                {activeFilters.length > 0 && (
                  <button className="clear-filters-btn" onClick={clearFilters}>
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="products-results-info">
                  Showing {meta.total_count}{" "}
                  {meta.total_count === 1 ? "product" : "products"}
                </div>
                <div className="home_page_products-grid">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="home_page_product-card"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <div className="home_page_product-image-container">
                        {product.product_images &&
                        product.product_images.length > 0 ? (
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
                          {formatCurrency(product.price_per_unit)} per{" "}
                          {product.unit}
                        </p>
                        <p className="home_page_products_location">
                          {product.farm.county} County
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={meta.current_page}
                  totalPages={meta.total_pages}
                  totalCount={meta.total_count}
                  perPage={meta.per_page}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
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
