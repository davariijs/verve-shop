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

   const smoothScrollTo = (elementId, duration = 700, offset = 80) => {
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        let t = timeElapsed / duration;
        t = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const run = startPosition + distance * t;
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          window.scrollTo(0, targetPosition);
        }
      }
      requestAnimationFrame(animation);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); 
    smoothScrollTo('product-list-section'); 
  };

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
          <header className="mb-6 text-center md:text-left">
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
            totalItems={totalProductsFound}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              isFetching={isFetchingData}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </main>
    </div>
  );
};
export default ProductListPage;