import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts, getFilterOptions } from "../../../services/api";
import { formatCurrency } from "../../../utils/formatters";
import useProductSearch from "../../../hooks/useProductSearch";
import SearchBar from "../../../Components/SearchBar/SearchBar";
import FilterPanel from "../../../Components/FilterPanel/FilterPanel";
import FilterChip from "../../../Components/FilterChip/FilterChip";
import Pagination from "../../../Components/Pagination/Pagination";
import "./Marketplace.css";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
    navigate(`/products/${productId}`);
  };

  const handleRemoveFilter = (key) => {
    updateFilter(key, "");
  };

  const activeFilters = getActiveFilters();

  return (
    <div className="marketplace-container">
      <div className="marketplace-header">
        <h2 className="dashboard_body-title">Marketplace</h2>
        <p className="marketplace-subtitle">
          Browse products from farmers across the platform
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

      <div className="marketplace-content">
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
        <div className="marketplace-main">
          {loading ? (
            <div className="marketplace-loading">
              <div className="loading-spinner"></div>
              <p>Loading marketplace...</p>
            </div>
          ) : error ? (
            <div className="marketplace-error">
              <p>Error: {error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="marketplace-empty">
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
              <div className="marketplace-results-info">
                Showing {meta.total_count}{" "}
                {meta.total_count === 1 ? "product" : "products"}
              </div>
              <div className="marketplace-grid">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="marketplace-product-card"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <div className="marketplace-product-image-container">
                      {product.product_images &&
                      product.product_images.length > 0 ? (
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
                        {formatCurrency(product.price_per_unit)} per{" "}
                        {product.unit}
                      </p>
                      <p className="marketplace-location">
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
  );
};

export default Marketplace;
