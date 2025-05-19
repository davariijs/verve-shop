import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, isFetching }) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = [];
  const maxPagesToShow = 5;
  let startPage, endPage;

  if (totalPages <= maxPagesToShow) {
    startPage = 0;
    endPage = totalPages -1;
  } else {
    if (currentPage <= Math.floor(maxPagesToShow / 2) ) {
      startPage = 0;
      endPage = maxPagesToShow - 1;
    } else if (currentPage + Math.floor(maxPagesToShow / 2) >= totalPages -1) {
      startPage = totalPages - maxPagesToShow;
      endPage = totalPages - 1;
    } else {
      startPage = currentPage - Math.floor(maxPagesToShow / 2);
      endPage = currentPage + Math.floor(maxPagesToShow / 2);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }


  return (
    <nav aria-label="Page navigation" className="flex justify-center items-center space-x-1 sm:space-x-2 my-8">
      <button
        onClick={() => onPageChange(0)}
        disabled={currentPage === 0 || isFetching}
        className="px-3 py-2 sm:px-4 sm:py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        First
      </button>
      <button
        onClick={handlePrev}
        disabled={currentPage === 0 || isFetching}
        className="px-3 py-2 sm:px-4 sm:py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="sr-only">Previous</span>
        «
      </button>

      {startPage > 0 && (
         <span className="px-3 py-2 sm:px-4 sm:py-2 text-sm font-medium text-gray-700">...</span>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={isFetching}
          className={`px-3 py-2 sm:px-4 sm:py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50
            ${currentPage === page ? 'bg-primary text-white border-primary hover:bg-red-700' : 'text-gray-700 bg-white'}`}
        >
          {page + 1}
        </button>
      ))}

      {endPage < totalPages -1 && (
         <span className="px-3 py-2 sm:px-4 sm:py-2 text-sm font-medium text-gray-700">...</span>
      )}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages - 1 || isFetching}
        className="px-3 py-2 sm:px-4 sm:py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="sr-only">Next</span>
        »
      </button>
       <button
        onClick={() => onPageChange(totalPages - 1)}
        disabled={currentPage === totalPages - 1 || isFetching}
        className="px-3 py-2 sm:px-4 sm:py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Last
      </button>
    </nav>
  );
};

export default Pagination;