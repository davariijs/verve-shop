import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    // <Link to={`/products/${product.id}`} className="block group">
    <div className="block group cursor-pointer">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2 h-10 overflow-hidden text-ellipsis">
            {product.description}
          </p>
          <div className="flex justify-between items-center mt-3">
            <p className="text-xl font-bold text-primary">${product.price?.toFixed(2)}</p>
            {product.discountPercentage > 0 && (
              <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                {product.discountPercentage?.toFixed(0)}% OFF
              </span>
            )}
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Stock: {product.stock} | Rating: {product.rating} ⭐
          </div>
        </div>
      </div>
    </div>
    // </Link>
  );
};

export default ProductCard;