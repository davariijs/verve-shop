import React from 'react';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

const ProductGrid = ({ products, isLoading, itemsPerPage = 12, totalItems, currentPage }) => {
  
  const skeletonCount = products.length > 0 && isLoading ? products.length : itemsPerPage;

  if (isLoading && products.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <ProductCardSkeleton key={`skeleton-initial-${index}`} />
        ))}
      </div>
    );
  }
  
  if (!isLoading && products.length === 0) {
    return (
      <p className="text-center text-text-secondary py-10 col-span-full text-lg">
        No products found matching your criteria.
      </p>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {isLoading 
          ? Array.from({ length: skeletonCount }).map((_, index) => (
              <ProductCardSkeleton key={`skeleton-fetch-${index}`} />
            ))
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default ProductGrid;