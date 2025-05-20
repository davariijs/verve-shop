import React from 'react';

const ProductListHeader = ({ storeName = "Verve Store" }) => { 
  return (
    <header className="text-center mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
        {storeName} Collection
      </h1>
      <p className="text-gray-600 mt-2">Browse and find your favorite items.</p>
    </header>
  );
};

export default ProductListHeader;