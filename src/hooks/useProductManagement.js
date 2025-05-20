import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchAllProducts } from '../api/productsApi';

const PRODUCTS_PER_PAGE = 12;
const SEARCH_DEBOUNCE_MS = 300;

export const useProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, SEARCH_DEBOUNCE_MS);

  const {
    data: allProducts = [],
    isLoading: isLoadingAllProducts,
    isFetching: isFetchingAllProducts,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['allProducts'],
    queryFn: fetchAllProducts,
    staleTime: 1000 * 60 * 5,
  });

  const [currentPage, setCurrentPage] = useState(0);

  const categories = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return [];
    const uniqueCategories = new Set(allProducts.map(product => product.category).filter(Boolean));
    return Array.from(uniqueCategories).sort();
  }, [allProducts]);

  const filteredAndSearchedProducts = useMemo(() => {
    let productsToDisplay = allProducts;
    if (selectedCategory) {
      productsToDisplay = productsToDisplay.filter(
        (product) => product.category === selectedCategory
      );
    }
    if (debouncedSearchTerm) {
      const lowerSearchTerm = debouncedSearchTerm.toLowerCase();
      productsToDisplay = productsToDisplay.filter((product) =>
        product.title?.toLowerCase().includes(lowerSearchTerm) ||
        product.description?.toLowerCase().includes(lowerSearchTerm) ||
        product.brand?.toLowerCase().includes(lowerSearchTerm) ||
        product.category?.toLowerCase().includes(lowerSearchTerm)
      );
    }
    return productsToDisplay;
  }, [allProducts, selectedCategory, debouncedSearchTerm]);

  const paginatedProducts = useMemo(() => {
    const startIndex = currentPage * PRODUCTS_PER_PAGE;
    return filteredAndSearchedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredAndSearchedProducts, currentPage]);

  const totalProductsFound = filteredAndSearchedProducts.length;
  const totalPages = Math.ceil(totalProductsFound / PRODUCTS_PER_PAGE);

  useEffect(() => {
    if (!isLoadingAllProducts) {
        setCurrentPage(0);
    }
  }, [selectedCategory, debouncedSearchTerm, isLoadingAllProducts]);

  const clearFilters = () => {
    setSelectedCategory('');
    setSearchTerm('');
  };

  return {
    isLoadingInitial: isLoadingAllProducts && allProducts.length === 0 && !isError,
    isFetchingData: isFetchingAllProducts,
    isError,
    error,
    refetchProducts: refetch,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    paginatedProducts,
    totalProductsFound,
    totalPages,
    clearFilters,
  };
};