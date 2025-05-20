import React from 'react';
import ProductCard from './ProductCard';
import Spinner from '../common/Spinner';

const ProductGrid = ({ products, isLoading, totalItems }) => {
  
  if (isLoading && products.length === 0) {
    return (
      <div className="flex justify-center items-center py-10 col-span-full">
        <Spinner size="lg" /> 
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
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8 ${isLoading ? 'opacity-75' : ''}`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {isLoading && products.length > 0 && (
          <div className="flex justify-center py-4">
              <Spinner size="md" />
          </div>
      )}
    </div>
  );
};

export default ProductGrid;