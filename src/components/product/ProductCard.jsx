import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  if (!product) {
    return null;
  }

  const originalPrice = product.discountPercentage > 0 
    ? product.price / (1 - product.discountPercentage / 100) 
    : product.price;

  return (
    <div className="bg-bg-content rounded-xl shadow-lg overflow-hidden flex flex-col group transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 h-full">
      <Link to={`/products/${product.id}`} className="block relative">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-white"> 
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 ease-in-out"
            loading="lazy"
          />
        </div>
        {product.discountPercentage > 0 && (
          <div className="absolute top-3 right-3 bg-accent text-text-on-accent text-xs font-semibold px-2.5 py-1 rounded-full shadow">
            {product.discountPercentage?.toFixed(0)}% OFF
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/products/${product.id}`} className="block mb-1.5">
          <h3 className="text-md sm:text-lg font-semibold text-text-main truncate group-hover:text-accent transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-xs sm:text-sm text-text-secondary mb-3 h-fit line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto">
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-lg sm:text-xl font-bold text-accent">${product.price?.toFixed(2)}</p>
              {product.discountPercentage > 0 && (
                <p className="text-xs text-gray-400 line-through">
                  ${originalPrice.toFixed(2)}
                </p>
              )}
            </div>
            <button 
              className="p-2 bg-gray-100 rounded-full text-primary hover:bg-gray-200 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transition-colors"
              aria-label="Add to cart"
              onClick={(e) => { 
                e.preventDefault(); 
                console.log('Decorative: Add to cart clicked for', product.title); 
              }}
            >
              <FaShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="text-xs text-text-secondary flex items-center justify-between border-t border-border-light pt-2">
            <span>Stock: {product.stock > 0 ? <span className="text-green-600 font-medium">{product.stock}</span> : <span className="text-red-500 font-medium">Out of Stock</span>}</span>
            <div className="flex items-center">
              <FaStar className="w-3.5 h-3.5 text-yellow-400 mr-1" />
              <span>{product.rating?.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;