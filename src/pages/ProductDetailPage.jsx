import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../api/productsApi';
import Spinner from '../components/common/Spinner';
import ErrorMessage from '../components/common/ErrorMessage';
import ProductImageGallery from '../components/product/ProductImageGallery';
import { 
    FaStar, FaChevronLeft, FaTag, FaShippingFast, FaUndo, 
    FaBarcode, FaQrcode, FaRulerCombined, FaWeightHanging, FaShieldAlt 
} from 'react-icons/fa';
import { FiShoppingCart, FiInfo } from 'react-icons/fi';

const ProductDetailPage = () => {
  const { productId } = useParams();

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'instant'});
  }, [productId]);

  const { data: product, isLoading, isError, error, isFetching, isSuccess } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading && !product && !isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-bg-page">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError && !product) { 
    return (
        <div className="flex flex-col min-h-screen bg-bg-page">
            <main className="flex-grow container mx-auto p-8 flex justify-center items-center">
                <ErrorMessage message={error?.message || `Failed to load product with ID ${productId}.`} />
            </main>
        </div>
    );
  }
  
  if (isSuccess && !product) {
    return (
        <div className="flex flex-col min-h-screen bg-bg-page">
            <main className="flex-grow container mx-auto p-8 text-center">
                <ErrorMessage message="Product not found." />
            </main>
        </div>
    );
  }
  
  if (!isLoading && !product) {
    return (
        <div className="container mx-auto p-8 text-center bg-bg-page">
            <ErrorMessage message="The requested product could not be found." />
        </div>
    )
  }

  const originalPrice = product.discountPercentage > 0
    ? product.price / (1 - product.discountPercentage / 100)
    : product.price;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="bg-bg-page min-h-screen py-4 sm:py-6 mb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-4 sm:pt-6">
          <Link to="/" className="inline-flex items-center text-accent hover:text-accent-hover mb-4 sm:mb-6 group text-sm font-medium">
            <FaChevronLeft className="w-4 h-4 mr-1.5 transform group-hover:-translate-x-1 transition-transform duration-200" />
            Back to All Products
          </Link>
        </div>

        {isFetching && !isLoading && (
          <div className="fixed top-20 right-6 z-50 bg-white p-2 rounded-full shadow-lg animate-pulse">
            <Spinner size="sm" />
          </div>
        )}
        
        <div className={`bg-bg-content shadow-2xl rounded-2xl overflow-hidden md:grid md:grid-cols-12 md:gap-x-4 lg:gap-x-8 items-start
          transition-opacity duration-300 ease-in-out ${isSuccess && product ? 'opacity-100' : 'opacity-0'}`}>
          <div className="md:col-span-7 lg:col-span-7 p-4 sm:p-6">
            <ProductImageGallery 
                images={product.images || []} 
                initialImage={product.thumbnail}
                productTitle={product.title}
                className="w-full"
            />
          </div>

          <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-between h-full">
            <div className="p-4 sm:p-6 lg:p-6 flex-grow overflow-y-auto custom-scrollbar">
                <span className="text-xs text-accent font-semibold uppercase tracking-wider mb-1 block">{product.category}</span>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-main mb-1 leading-tight ">{product.title}</h1>
                
                <div className="flex items-center mb-3">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                    </div>
                    <span className="ml-2 text-xs sm:text-sm text-text-secondary">({product.rating?.toFixed(1)} from {product.reviews?.length || 0} reviews)</span>
                </div>

                <p className="text-text-secondary mb-3 text-xs sm:text-sm leading-relaxed 
                ">
                    {product.description}
                </p>

                <div className="mb-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-accent">${product.price?.toFixed(2)}</span>
                    {product.discountPercentage > 0 && (
                        <span className="text-sm sm:text-md text-gray-400 line-through">
                        ${originalPrice.toFixed(2)}
                        </span>
                    )}
                    {product.discountPercentage > 0 && (
                        <span className="bg-accent text-text-on-accent text-[0.6rem] sm:text-xs font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider self-center">
                        {product.discountPercentage?.toFixed(0)}% Off
                        </span>
                    )}
                </div>
                
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs mb-3 text-text-main">
                    <div><strong className="text-text-secondary font-medium">Brand:</strong> {product.brand}</div>
                    <div><strong className="text-text-secondary font-medium">Stock:</strong> 
                        <span className={`font-semibold ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-500'}`}>
                        {product.stock > 0 ? `${product.stock}` : 'Out'}
                        </span>
                    </div>
                    {product.sku && <div><strong className="text-text-secondary font-medium">SKU:</strong> {product.sku}</div>}
                </div>
                
                <div className="space-y-1 text-xs mb-3">
                    {product.shippingInformation && <div className="flex items-start"><FaShippingFast className="w-3.5 h-3.5 mr-1.5 mt-0.5 text-gray-500 
                    flex-shrink-0" /><span className="text-text-secondary">{product.shippingInformation}</span></div>}
                    {product.returnPolicy && <div className="flex items-start"><FaUndo className="w-3.5 h-3.5 mr-1.5 mt-0.5 text-gray-500 flex-shrink-0" />
                    <span className="text-text-secondary">{product.returnPolicy}</span></div>}
                    {product.warrantyInformation && <div className="flex items-start"><FaShieldAlt className="w-3.5 h-3.5 mr-1.5 mt-0.5 text-gray-500 flex-shrink-0" />
                    <span className="text-text-secondary">{product.warrantyInformation}</span></div>}
                </div>

                {product.tags && product.tags.length > 0 && (
                <div className="mb-3">
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {product.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-600 text-[0.7rem] sm:text-xs px-2 py-0.5 rounded-full flex items-center">
                        <FaTag className="w-2.5 h-2.5 mr-1 text-gray-400" />
                        {tag}
                        </span>
                    ))}
                    </div>
                </div>
                )}
            </div>
            
            <div className="p-4 sm:p-6 md:pt-4 sticky bottom-0 bg-bg-content md:relative md:mt-auto shadow-top-md md:shadow-none">
              <button 
                className={`w-full flex items-center justify-center text-base font-semibold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:shadow-lg 
                            focus:outline-none focus:ring-4 focus:ring-opacity-50
                            ${product.stock > 0 
                              ? 'bg-accent text-text-on-accent hover:bg-accent-hover focus:ring-accent active:scale-95' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                disabled={product.stock === 0}
              >
                <FiShoppingCart className="w-5 h-5 mr-2" />
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>

        {(product.dimensions || product.weight !== undefined || (product.meta && (product.meta.barcode || product.meta.qrCode || product.meta.createdAt))) && (
            <div className={`mt-8 sm:mt-10 bg-bg-content shadow-xl rounded-2xl p-4 sm:p-6 lg:p-8 transition-opacity duration-500 ease-in-out ${isSuccess && product ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-xl sm:text-2xl font-bold text-text-main mb-10 flex justify-center md:justify-start items-center">
                    <FiInfo className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-primary"/>
                    Additional Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                    {product.dimensions && (
                        <div>
                            <h4 className="font-semibold text-text-main mb-0.5 flex items-center"><FaRulerCombined className="w-4 h-4 mr-2 text-gray-500"/>Dimensions</h4>
                            <p className="text-text-secondary ml-6">
                                W: {product.dimensions.width} x H: {product.dimensions.height} x D: {product.dimensions.depth}
                            </p>
                        </div>
                    )}
                    {product.weight !== undefined && (
                        <div>
                            <h4 className="font-semibold text-text-main mb-0.5 flex items-center"><FaWeightHanging className="w-4 h-4 mr-2 text-gray-500"/>Weight</h4>
                            <p className="text-text-secondary ml-6">{product.weight}
                            </p>
                        </div>
                    )}
                     {product.meta?.barcode && (
                        <div>
                            <h4 className="font-semibold text-text-main mb-0.5 flex items-center"><FaBarcode className="w-4 h-4 mr-2 text-gray-500"/>Barcode</h4>
                            <p className="text-text-secondary ml-6">{product.meta.barcode}</p>
                        </div>
                    )}
                    {product.meta?.qrCode && (
                        <div className="sm:col-span-2 lg:col-span-1">
                            <h4 className="font-semibold text-text-main mb-1 flex items-center"><FaQrcode className="w-4 h-4 mr-2 text-gray-500"/>Scan QR</h4>
                            <a href={product.meta.qrCode} target="_blank" rel="noopener noreferrer" className="inline-block ml-6 mt-1 border border-border-light p-0.5 rounded hover:shadow-md">
                                <img src={product.meta.qrCode} alt="Product QR Code" className="w-20 h-20"/>
                            </a>
                        </div>
                    )}
                     {product.meta?.createdAt && (
                        <div>
                            <h4 className="font-semibold text-text-main mb-0.5">Added On</h4>
                            <p className="text-text-secondary ml-6">{formatDate(product.meta.createdAt)}</p>
                        </div>
                    )}
                </div>
            </div>
        )}


        {isSuccess && product.reviews && product.reviews.length > 0 && (
          <div className={`mt-8 sm:mt-10 bg-bg-content shadow-xl rounded-2xl p-4 sm:p-6 lg:p-8 transition-opacity duration-500 ease-in-out ${isSuccess && product ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-xl sm:text-2xl font-bold text-text-main mb-10 text-center md:text-left">Customer Reviews ({product.reviews.length})</h2>
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