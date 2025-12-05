import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css";

const SearchBar = ({ value, onChange, placeholder = "Search products..." }) => {
  const [localValue, setLocalValue] = useState(value || "");
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimer = useRef(null);

  // Update local value when prop changes
  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    setIsLoading(true);

    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new debounce timer (400ms)
    debounceTimer.current = setTimeout(() => {
      onChange(newValue);
      setIsLoading(false);
    }, 400);
  };

  const handleClear = () => {
    setLocalValue("");
    onChange("");
    setIsLoading(false);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className="search-bar">
      <div className="search-bar-input-wrapper">
        <svg
          className="search-bar-icon"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="text"
          className="search-bar-input"
          placeholder={placeholder}
          value={localValue}
          onChange={handleInputChange}
          aria-label="Search products"
        />
        {isLoading && (
          <div className="search-bar-loading">
            <div className="spinner"></div>
          </div>
        )}
        {localValue && !isLoading && (
          <button
            className="search-bar-clear"
            onClick={handleClear}
            aria-label="Clear search"
            type="button"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
