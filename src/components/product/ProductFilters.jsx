import React from 'react';
import CategoryDropdown from '../ui/CategoryDropdown';
import { FaSearch } from 'react-icons/fa';

const ProductFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  isLoadingCategories,
  onClearFilters,
  totalProductsFound,
}) => {
  return (
    <div className="mb-6 md:mb-8 p-4 bg-bg-content shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
        <div className="flex-grow md:w-auto order-1">
          <label htmlFor="product-search-input" className="sr-only">Search products</label>
          <div className="relative flex items-stretch w-full rounded-full shadow-sm 
                        border border-border-medium 
                        focus-within:border-accent focus-within:ring-2 focus-within:ring-accent focus-within:ring-opacity-50
                        transition-all duration-150 ease-in-out">
            <input
              id="product-search-input"
              type="search"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full pl-5 pr-12 sm:pr-14 py-3 text-sm text-text-main 
                         border-none rounded-l-full bg-transparent 
                         focus:outline-none focus:ring-0"
            />
            <button
              type="button"
              className="relative -ml-px inline-flex items-center justify-center px-3 sm:px-4 py-3 
                         bg-accent text-text-on-accent rounded-r-full 
                         border-none 
                         hover:bg-accent-hover 
                         focus:outline-none focus:ring-0
                         transition-colors"
              aria-label="Search"
            >
              <FaSearch className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        <div className="flex-shrink-0 md:w-auto w-full order-2">
          <CategoryDropdown
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={onCategoryChange}
            isLoadingCategories={isLoadingCategories}
            buttonLabel="All Categories"
          />
        </div>
      </div>

      {(selectedCategory || searchTerm || totalProductsFound !== undefined) && (
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-text-secondary">

          {(selectedCategory || searchTerm) && (
            <button
              onClick={onClearFilters}
              className="mt-2 pt-4 sm:mt-0 text-accent hover:underline focus:outline-none font-medium"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductFilters;