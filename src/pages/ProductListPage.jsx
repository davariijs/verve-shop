import React from 'react';
import { useProductManagement } from '../hooks/useProductManagement';
import HeroSection from '../components/layout/HeroSection';
import ProductFilters from '../components/product/ProductFilters';
import ProductGrid from '../components/product/ProductGrid';
import Pagination from '../components/ui/Pagination';
import ErrorMessage from '../components/common/ErrorMessage';
import Spinner from '../components/common/Spinner';

const ProductListPage = () => {
  const {
    isLoadingInitial,
    isFetchingData,
    isError,
    error,
    refetchProducts,
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
  } = useProductManagement();

  if (isLoadingInitial && !isError) {
    return (
      <div className="flex flex-col min-h-screen">
        
        <div className="flex-grow flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  if (isError && isLoadingInitial) {
    return (
      <div className="flex flex-col min-h-screen">
        
        <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
          <div className="mt-8">
            <ErrorMessage
              message={error?.message || 'Failed to load products. Please ensure you have an internet connection and try again.'}
              onRetry={refetchProducts}
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-page">
      
      <HeroSection />
      <main className="flex-grow">
        <div id="product-list-section" className="container mx-auto p-4 sm:p-6 lg:p-8 mb-28 mt-20">
          <header id="product-list-section" className="mb-6 text-center md:text-left">
            <h1 className="text-2xl pb-5  text-center sm:text-3xl font-bold text-text-main">
              Fresh Picks & Hot Finds
            </h1>
          </header>
          <ProductFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
            isLoadingCategories={isLoadingInitial && categories.length === 0}
            onClearFilters={clearFilters}
            totalProductsFound={totalProductsFound}
          />
          {isError && !isLoadingInitial && !isFetchingData && paginatedProducts.length > 0 && (
              <div className="mb-4">
                  <ErrorMessage message={error?.message || 'Could not update product list at the moment.'} />
              </div>
          )}
          <ProductGrid
            products={paginatedProducts}
            isLoading={isFetchingData}
            itemsPerPage={12}
            totalItems={totalProductsFound}
            currentPage={currentPage}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              isFetching={isFetchingData}
            />
          )}
        </div>
      </main>
    </div>
  );
};
export default ProductListPage;