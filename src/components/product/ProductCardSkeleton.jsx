import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className="bg-bg-content rounded-xl shadow-lg overflow-hidden flex flex-col animate-pulse">
      <div className="aspect-w-1 aspect-h-1 w-full bg-gray-300"></div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="h-5 sm:h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 sm:h-4 bg-gray-300 rounded w-full mb-1"></div>
        <div className="h-3 sm:h-4 bg-gray-300 rounded w-5/6 mb-3"></div>
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-2">
            <div>
              <div className="h-6 sm:h-7 bg-gray-300 rounded w-16 mb-1"></div>
              <div className="h-3 bg-gray-300 rounded w-12"></div>
            </div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-300 rounded-full"></div>
          </div>
          <div className="border-t border-border-light pt-2 flex justify-between items-center">
            <div className="h-3 sm:h-4 bg-gray-300 rounded w-14"></div>
            <div className="h-3 sm:h-4 bg-gray-300 rounded w-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;