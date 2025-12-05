import React from "react";
import "./Pagination.css";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalCount,
  perPage,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first, last, current, and nearby pages with ellipsis
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalCount);

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <div className="pagination-info">
        Showing {startItem}-{endItem} of {totalCount} products
      </div>
      <div className="pagination-controls">
        <button
          className="pagination-btn pagination-prev"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Previous
        </button>

        <div className="pagination-pages">
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                ...
              </span>
            ) : (
              <button
                key={page}
                className={`pagination-page ${
                  page === currentPage ? "active" : ""
                }`}
                onClick={() => handlePageClick(page)}
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          className="pagination-btn pagination-next"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M7.5 15L12.5 10L7.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
