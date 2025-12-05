import React, { useState } from "react";
import "./FilterPanel.css";

const FilterPanel = ({
  filters,
  onFilterChange,
  filterOptions,
  onClearAll,
  isOpen,
  onToggle,
}) => {
  const [priceMin, setPriceMin] = useState(filters.min_price || "");
  const [priceMax, setPriceMax] = useState(filters.max_price || "");

  const handleCategoryChange = (category) => {
    onFilterChange("category", filters.category === category ? "" : category);
  };

  const handleCountyChange = (e) => {
    onFilterChange("county", e.target.value);
  };

  const handleSortChange = (e) => {
    onFilterChange("sort", e.target.value);
  };

  const handlePriceMinChange = (e) => {
    const value = e.target.value;
    setPriceMin(value);
    onFilterChange("min_price", value);
  };

  const handlePriceMaxChange = (e) => {
    const value = e.target.value;
    setPriceMax(value);
    onFilterChange("max_price", value);
  };

  const activeFilterCount = [
    filters.category,
    filters.county,
    filters.min_price,
    filters.max_price,
  ].filter(Boolean).length;

  return (
    <>
      {/* Mobile toggle button */}
      <button className="filter-toggle-btn" onClick={onToggle}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M2.5 5.83333H17.5M5.83333 10H14.1667M8.33333 14.1667H11.6667"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        Filters
        {activeFilterCount > 0 && (
          <span className="filter-badge">{activeFilterCount}</span>
        )}
      </button>

      {/* Filter panel */}
      <div className={`filter-panel ${isOpen ? "open" : ""}`}>
        <div className="filter-panel-header">
          <h3>Filters</h3>
          <button className="filter-close-btn" onClick={onToggle}>
            ×
          </button>
        </div>

        <div className="filter-panel-content">
          {/* Sort */}
          <div className="filter-section">
            <label className="filter-label">Sort By</label>
            <select
              className="filter-select"
              value={filters.sort || "newest"}
              onChange={handleSortChange}
            >
              <option value="newest">Newest First</option>
              <option value="date_asc">Oldest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>

          {/* Category */}
          <div className="filter-section">
            <label className="filter-label">Category</label>
            <div className="filter-options">
              {filterOptions.categories?.map((category) => (
                <button
                  key={category}
                  className={`filter-option-btn ${
                    filters.category === category ? "active" : ""
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="filter-section">
            <label className="filter-label">Price Range (KSh)</label>
            <div className="filter-price-inputs">
              <input
                type="number"
                className="filter-price-input"
                placeholder="Min"
                value={priceMin}
                onChange={handlePriceMinChange}
                min="0"
              />
              <span className="filter-price-separator">-</span>
              <input
                type="number"
                className="filter-price-input"
                placeholder="Max"
                value={priceMax}
                onChange={handlePriceMaxChange}
                min="0"
              />
            </div>
            {filterOptions.price_range && (
              <div className="filter-price-hint">
                Range: KSh{" "}
                {Number(filterOptions.price_range.min).toLocaleString()} - KSh{" "}
                {Number(filterOptions.price_range.max).toLocaleString()}
              </div>
            )}
          </div>

          {/* County */}
          <div className="filter-section">
            <label className="filter-label">County</label>
            <select
              className="filter-select"
              value={filters.county || ""}
              onChange={handleCountyChange}
            >
              <option value="">All Counties</option>
              {filterOptions.counties?.map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
          </div>

          {/* Clear All */}
          {activeFilterCount > 0 && (
            <button className="filter-clear-all-btn" onClick={onClearAll}>
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="filter-overlay" onClick={onToggle}></div>}
    </>
  );
};

export default FilterPanel;
