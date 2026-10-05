import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center px-3 py-2 gap-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-thirdColor-800 hover:bg-thirdColor-50 border border-thirdColor-200"
        }`}
      >
        <ChevronRight className="w-4 h-4" />
        السابق
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
              page === currentPage
                ? "bg-firstColor-800 text-white"
                : "text-thirdColor-800 hover:bg-thirdColor-50 border border-thirdColor-200"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center px-3 py-2 gap-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-thirdColor-800 hover:bg-thirdColor-50 border border-thirdColor-200"
        }`}
      >
        التالي
        <ChevronLeft className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
