import React, { useState, useEffect, useRef } from 'react';
import { FaFilter, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { getCategoryIcon } from '../../utils/iconUtils';

const CategoryDropdown = ({
  categories = [],
  selectedCategory,
  onSelectCategory,
  isLoadingCategories = false,
  buttonLabel = "Categories",
  className,
  buttonClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    if (!isLoadingCategories) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelectCategory = (categoryValue) => {
    onSelectCategory(categoryValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  let currentButtonText = buttonLabel;
  if (selectedCategory) {
    const foundCategory = categories.find(c => c === selectedCategory);
    if (foundCategory) {
      currentButtonText = foundCategory.charAt(0).toUpperCase() + foundCategory.slice(1).replace(/-/g, ' ');
    }
  }

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <div>
        <button
          type="button"
          className={`inline-flex justify-between items-center w-full rounded-full border border-border-medium shadow-sm px-4 py-3 bg-bg-content text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accent disabled:opacity-70 disabled:cursor-not-allowed transition-colors ${buttonClassName}`}
          id="category-menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
          disabled={isLoadingCategories || categories.length === 0}
        >
          <div className="flex items-center">
          <FaFilter className="w-4 h-4 mr-2 text-gray-400" aria-hidden="true" />
          </div>
          <span className="truncate">{currentButtonText}</span>
          {isOpen ? (
            <FaChevronUp className="ml-2 h-4 w-4 text-gray-400" aria-hidden="true" />
          ) : (
            <FaChevronDown className="ml-2 h-4 w-4 text-gray-400" aria-hidden="true" />
          )}
        </button>
      </div>

      {isOpen && (
        <div
          className={`origin-top absolute mt-14 md:-mr-4 -mr-0 w-64 sm:w-72 rounded-md shadow-xl bg-bg-content ring-1 ring-black ring-opacity-5 focus:outline-none z-30 max-h-80 overflow-y-auto custom-scrollbar py-1 
                      right-1/2 translate-x-1/2 md:right-0 md:left-auto md:translate-x-0`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="category-menu-button"
        >
          <button
            onClick={() => handleSelectCategory('')}
            className={`w-full text-left px-4 py-2.5 text-sm flex items-center group transition-colors duration-150
              ${selectedCategory === '' ? 'bg-accent text-text-on-accent font-semibold' : 'text-text-main hover:bg-gray-100'}`}
            role="menuitem"
          >
            {getCategoryIcon('')}
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleSelectCategory(category)}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center group transition-colors duration-150
                ${selectedCategory === category ? 'bg-accent text-text-on-accent font-semibold' : 'text-text-main hover:bg-gray-100'}`}
              role="menuitem"
            >
              {getCategoryIcon(category)}
              <span className="truncate">
                {category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;