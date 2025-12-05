import React from "react";
import "./FilterChip.css";

const FilterChip = ({ label, value, onRemove }) => {
  return (
    <div className="filter-chip">
      <span className="filter-chip-label">{label}:</span>
      <span className="filter-chip-value">{value}</span>
      <button
        className="filter-chip-remove"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        type="button"
      >
        ×
      </button>
    </div>
  );
};

export default FilterChip;
