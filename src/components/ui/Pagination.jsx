import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange, isFetching }) => {
  const [pageNumbersWindow, setPageNumbersWindow] = useState(5);
  const [isVerySmallScreen, setIsVerySmallScreen] = useState(false);

  useEffect(() => {
    const updateScreenSizes = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 340) {
        setPageNumbersWindow(1); 
        setIsVerySmallScreen(true);
      } else if (screenWidth < 640) {
        setPageNumbersWindow(3);
        setIsVerySmallScreen(false);
      } else {
        setPageNumbersWindow(5);
        setIsVerySmallScreen(false);
      }
    };
    updateScreenSizes();
    window.addEventListener('resize', updateScreenSizes);
    return () => window.removeEventListener('resize', updateScreenSizes);
  }, []);


  if (totalPages <= 1) return null;

  const handlePageClick = (pageIndex) => {
    if (pageIndex >= 0 && pageIndex < totalPages && !isFetching) {
      onPageChange(pageIndex);
    }
  };

  let startPage, endPage;
  if (totalPages <= pageNumbersWindow) {
    startPage = 0;
    endPage = totalPages - 1;
  } else {
    let pagesToShowBeforeAndAfter = Math.floor((pageNumbersWindow - 1) / 2);
    if (pageNumbersWindow === 1) pagesToShowBeforeAndAfter = 0;

    if (currentPage <= pagesToShowBeforeAndAfter) {
      startPage = 0;
      endPage = pageNumbersWindow - 1;
    } else if (currentPage + pagesToShowBeforeAndAfter >= totalPages - 1) {
      startPage = totalPages - pageNumbersWindow;
      endPage = totalPages - 1;
    } else {
      startPage = currentPage - pagesToShowBeforeAndAfter;
      endPage = currentPage + pagesToShowBeforeAndAfter;
    }
    endPage = Math.min(endPage, totalPages - 1);
  }


  const pageButtons = [];
  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(i);
  }

  const buttonBaseClass = "flex items-center justify-center px-2 py-1.5 sm:px-2.5 sm:py-1.5 text-xs sm:text-sm border border-border-medium rounded-md transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-accent";
  const activeClass = "bg-primary text-text-on-primary border-primary hover:bg-primary-dark font-bold";
  const inactiveClass = "bg-bg-content text-text-main hover:bg-gray-100";
  const textButtonClass = "font-semibold";

  return (
    <nav aria-label="Page navigation" className="flex justify-center items-center space-x-1 sm:space-x-1.5 my-8 sm:my-10">
      {!isVerySmallScreen && (
        <>
          <button
            onClick={() => handlePageClick(0)}
            disabled={currentPage === 0 || isFetching}
            className={`${buttonBaseClass} ${inactiveClass}`}
            aria-label="Go to first page"
            title="First"
          >
            <FaAngleDoubleLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className={`hidden sm:inline ml-1 ${textButtonClass}`}>First</span>
          </button>
        </>
      )}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 0 || isFetching}
        className={`${buttonBaseClass} ${inactiveClass}`}
        aria-label="Go to previous page"
        title="Previous"
      >
        <FaChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
      </button>

      {startPage > 0 && !isVerySmallScreen && (
        <span className="px-1 py-1.5 sm:px-1.5 sm:py-2 text-xs sm:text-sm text-text-secondary font-semibold">...</span>
      )}

      {pageButtons.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          disabled={isFetching}
          className={`${buttonBaseClass} ${currentPage === page ? activeClass : `${inactiveClass} ${textButtonClass}`}`}
          aria-current={currentPage === page ? 'page' : undefined}
        
        >
          {page + 1}
        </button>
      ))}

      {endPage < totalPages - 1 && !isVerySmallScreen && (
        <span className="px-1 py-1.5 sm:px-1.5 sm:py-2 text-xs sm:text-sm text-text-secondary font-semibold">...</span>
      )}

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages - 1 || isFetching}
        className={`${buttonBaseClass} ${inactiveClass}`}
        aria-label="Go to next page"
        title="Next"
      >
        <FaChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
      </button>
      {!isVerySmallScreen && (
        <>
          <button
            onClick={() => handlePageClick(totalPages - 1)}
            disabled={currentPage === totalPages - 1 || isFetching}
            className={`${buttonBaseClass} ${inactiveClass}`}
            aria-label="Go to last page"
            title="Last"
          >
            <span className={`hidden sm:inline mr-1 ${textButtonClass}`}>Last</span>
            <FaAngleDoubleRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </>
      )}
    </nav>
  );
};

export default Pagination;