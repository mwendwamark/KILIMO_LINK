import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * Custom hook for managing product search and filter state
 * Syncs state with URL query parameters for shareable URLs
 */
const useProductSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize filters from URL params
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    min_price: searchParams.get("min_price") || "",
    max_price: searchParams.get("max_price") || "",
    county: searchParams.get("county") || "",
    sort: searchParams.get("sort") || "newest",
  });

  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );

  // Update URL when filters change
  useEffect(() => {
    const params = {};

    if (filters.search) params.search = filters.search;
    if (filters.category) params.category = filters.category;
    if (filters.min_price) params.min_price = filters.min_price;
    if (filters.max_price) params.max_price = filters.max_price;
    if (filters.county) params.county = filters.county;
    if (filters.sort && filters.sort !== "newest") params.sort = filters.sort;
    if (currentPage > 1) params.page = currentPage.toString();

    setSearchParams(params, { replace: true });
  }, [filters, currentPage, setSearchParams]);

  // Update a single filter
  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    // Reset to page 1 when filters change
    if (key !== "sort") {
      setCurrentPage(1);
    }
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      search: "",
      category: "",
      min_price: "",
      max_price: "",
      county: "",
      sort: "newest",
    });
    setCurrentPage(1);
  }, []);

  // Get active filters for display
  const getActiveFilters = useCallback(() => {
    const active = [];

    if (filters.search) {
      active.push({ key: "search", label: "Search", value: filters.search });
    }
    if (filters.category) {
      active.push({
        key: "category",
        label: "Category",
        value: filters.category,
      });
    }
    if (filters.min_price) {
      active.push({
        key: "min_price",
        label: "Min Price",
        value: `KSh ${filters.min_price}`,
      });
    }
    if (filters.max_price) {
      active.push({
        key: "max_price",
        label: "Max Price",
        value: `KSh ${filters.max_price}`,
      });
    }
    if (filters.county) {
      active.push({ key: "county", label: "County", value: filters.county });
    }

    return active;
  }, [filters]);

  return {
    filters,
    currentPage,
    updateFilter,
    setCurrentPage,
    clearFilters,
    getActiveFilters,
  };
};

export default useProductSearch;
