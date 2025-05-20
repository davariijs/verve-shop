import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../api/productsApi';
import Spinner from '../components/common/Spinner';
import ErrorMessage from '../components/common/ErrorMessage';
import ProductImageGallery from '../components/product/ProductImageGallery';
import { FaStar, FaChevronLeft, FaTag, FaShippingFast, FaUndo } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';

const ProductDetailPage = () => {
  const { productId } = useParams();

   useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const { data: product, isLoading, isError, error, isFetching, isSuccess } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading && !product && !isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError && !product) { 
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto p-8 flex justify-center items-center">
                <ErrorMessage message={error?.message || `Failed to load product with ID ${productId}.`} />
            </main>
        </div>
    );
  }
  
  if (isSuccess && !product) {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto p-8 text-center">
                <ErrorMessage message="Product not found." />
            </main>
        </div>
    );
  }
  if (!isLoading && !product) {
    return (
        <div className="container mx-auto p-8 text-center">
            <ErrorMessage message="The requested product could not be found." />
        </div>
    )
  }


  const originalPrice = product.discountPercentage > 0
    ? product.price / (1 - product.discountPercentage / 100)
    : product.price;

  return (
    <div className="bg-bg-page min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <Link to="/" className="inline-flex items-center text-accent hover:text-accent-hover mb-6 sm:mb-8 group text-sm font-medium">
          <FaChevronLeft className="w-4 h-4 mr-1.5 transform group-hover:-translate-x-1 transition-transform duration-200" />
          Back to All Products
        </Link>

        {isFetching && !isLoading && ( 
          <div className="fixed top-20 right-6 z-50 bg-white p-2 rounded-full shadow-lg animate-pulse">
            <Spinner size="sm" />
          </div>
        )}
        
        <div className={`bg-bg-content shadow-2xl   rounded-2xl overflow-hidden md:grid md:grid-cols-2 md:gap-x-8 lg:gap-x-12 items-start transition-opacity duration-500 ease-in-out ${isSuccess && product ? 'opacity-100' : 'opacity-0'}`}>
          <div className="p-4 sm:p-6 lg:p-8">
            <ProductImageGallery 
                images={product.images || []} 
                initialImage={product.thumbnail}
            />
          </div>

          <div className="p-6 lg:p-8 flex flex-col justify-between h-full">
            <div className="mt-auto pt-0 md:hidden block my-8">
              <button 
                className={`w-full flex items-center justify-center text-base sm:text-lg font-semibold py-3.5 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:shadow-lg 
                            focus:outline-none focus:ring-4 focus:ring-opacity-50
                            ${product.stock > 0 
                              ? 'bg-accent text-text-on-accent hover:bg-accent-hover focus:ring-accent active:scale-95' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                disabled={product.stock === 0}
              >
                <FiShoppingCart className="w-5 h-5 mr-2.5" />
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
            <div>
                <span className="text-xs text-accent font-semibold uppercase tracking-wider mb-1 block">{product.category}</span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main mb-1 leading-tight">{product.title}</h1>
                
                <div className="flex items-center mb-4">
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                </div>
                <span className="ml-2 text-sm text-text-secondary">({product.rating?.toFixed(1)} from {product.reviews?.length || 0} reviews)</span>
                </div>

                <p className="text-text-secondary mb-5 text-sm leading-relaxed line-clamp-3 hover:line-clamp-none transition-all">
                    {product.description}
                </p>

                <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-accent">${product.price?.toFixed(2)}</span>
                    {product.discountPercentage > 0 && (
                        <span className="text-md text-gray-400 line-through">
                        ${originalPrice.toFixed(2)}
                        </span>
                    )}
                    {product.discountPercentage > 0 && (
                        <span className="bg-accent text-text-on-accent text-xs font-bold px-2 py-0.5 rounded-md uppercase tracking-wider self-center">
                        {product.discountPercentage?.toFixed(0)}% Off
                        </span>
                    )}
                </div>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-sm mb-5 text-text-main">
                <div><strong className="text-text-secondary font-medium">Brand:</strong> {product.brand}</div>
                <div><strong className="text-text-secondary font-medium">Stock:</strong> 
                    <span className={`font-semibold ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-500'}`}>
                    {product.stock > 0 ? `${product.stock} (In Stock)` : 'Out of Stock'}
                    </span>
                </div>
                <div><strong className="text-text-secondary font-medium">Min. Order:</strong> {product.minimumOrderQuantity}</div>
                <div><strong className="text-text-secondary font-medium">Warranty:</strong> {product.warrantyInformation}</div>
                </div>
                
                <div className="space-y-2 text-xs sm:text-sm mb-6">
                {product.shippingInformation && <div className="flex items-start"><FaShippingFast className="w-4 h-4 mr-2 mt-0.5 text-gray-500 flex-shrink-0" /><span className="text-text-secondary"><strong>Shipping:</strong> {product.shippingInformation}</span></div>}
                {product.returnPolicy && <div className="flex items-start"><FaUndo className="w-4 h-4 mr-2 mt-0.5 text-gray-500 flex-shrink-0" /><span className="text-text-secondary"><strong>Returns:</strong> {product.returnPolicy}</span></div>}
                </div>

                {product.tags && product.tags.length > 0 && (
                <div className="mb-6">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {product.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full flex items-center">
                        <FaTag className="w-3 h-3 mr-1.5 text-gray-400" />
                        {tag}
                        </span>
                    ))}
                    </div>
                </div>
                )}
            </div>
            
            <div className="mt-auto pt-0 md:block hidden">
              <button 
                className={`w-full flex items-center justify-center text-base sm:text-lg font-semibold py-3.5 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:shadow-lg 
                            focus:outline-none focus:ring-4 focus:ring-opacity-50
                            ${product.stock > 0 
                              ? 'bg-accent text-text-on-accent hover:bg-accent-hover focus:ring-accent active:scale-95' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                disabled={product.stock === 0}
              >
                <FiShoppingCart className="w-5 h-5 mr-2.5" />
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>

        {isSuccess && product.reviews && product.reviews.length > 0 && (
          <div className={`mt-10 sm:mt-12 bg-bg-content shadow-xl rounded-2xl p-6 lg:p-8 transition-opacity duration-500 ease-in-out ${isSuccess && product ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-xl sm:text-2xl font-bold text-text-main mb-6">Customer Reviews ({product.reviews.length})</h2>
            <div className="space-y-6">
              {product.reviews.map((review, index) => (
                <div key={index} className="border-b border-border-light pb-6 last:border-b-0 last:pb-0">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-primary font-semibold mr-3 uppercase">
                      {review.reviewerName?.substring(0,1) || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-text-main">{review.reviewerName}</p>
                      <span className="text-xs text-text-secondary">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>
                  <div className="flex items-center my-1.5">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;