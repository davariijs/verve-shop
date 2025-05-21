import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FiMaximize, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ImageMagnifier from '../ui/ImageMagnifier';

const ProductImageGallery = ({ 
    images = [], 
    initialImage,
    className,
    productTitle
}) => {
  const displayImages = useMemo(() => {
    return Array.isArray(images) && images.length > 0 ? images : (initialImage ? [initialImage] : []);
  }, [images, initialImage]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMainImageLoaded, setIsMainImageLoaded] = useState(false);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const thumbnailsContainerRef = useRef(null);

  const selectedImage = useMemo(() => displayImages[currentIndex] || null, [displayImages, currentIndex]);

  useEffect(() => {
    setCurrentIndex(0);
    setIsMainImageLoaded(false); 
  }, [displayImages]);


  const handleThumbnailClick = (index) => {
    if (currentIndex !== index) {
      setCurrentIndex(index);
      setIsMainImageLoaded(false);
    }
  };

  const handleMainImageLoad = () => {
    setIsMainImageLoaded(true);
  };

  const openZoomModal = () => {
    if (selectedImage) {
      setIsZoomModalOpen(true);
    }
  };
  
  const selectNextImage = () => {
    if (displayImages.length <= 1) return;
    const nextIndex = (currentIndex + 1) % displayImages.length;
    setCurrentIndex(nextIndex);
    setIsMainImageLoaded(false);
  };

  const selectPreviousImage = () => {
    if (displayImages.length <= 1) return;
    const prevIndex = (currentIndex - 1 + displayImages.length) % displayImages.length;
    setCurrentIndex(prevIndex);
    setIsMainImageLoaded(false);
  };

  if (displayImages.length === 0) { 
    return (
      <div className={`relative aspect-w-1 aspect-h-1 w-full md:max-w-[500px] max-w-full rounded-lg overflow-hidden bg-gray-200 ${className}`}>
        <div className="flex items-center justify-center h-full text-gray-400 text-sm">No Image Available</div>
      </div>
    );
  }
  
  return (
    <div className={`lg:grid lg:grid-cols-12 ${className}`}>
      <div className="lg:col-span-9 md:col-span-8 relative">
        <div 
          className={`relative aspect-w-1 aspect-h-1 w-full md:max-w-[500px] lg:max-w-none max-w-full rounded-lg overflow-hidden mb-4 lg:mb-0 group bg-white shadow-inner`}
        >
          {!isMainImageLoaded && selectedImage && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              </div>
          )}
          {selectedImage && (
              <img
              src={selectedImage}
              alt={productTitle || "Selected product view"}
              className={`w-full h-full object-contain transition-opacity duration-300 ease-in-out 
                          ${isMainImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={handleMainImageLoad}
              onError={() => {setIsMainImageLoaded(true);}} 
              key={selectedImage} 
              />
          )}
          
          {displayImages.length > 1 && isMainImageLoaded && (
              <>
                  <button 
                      className="absolute top-1/2 left-2 -translate-y-1/2 md:p-2 p-1 bg-black/40 text-white rounded-full transition-opacity duration-200 cursor-pointer hover:bg-black/60 focus:outline-none z-10 opacity-70 hover:opacity-100"
                      onClick={(e) => {e.stopPropagation(); selectPreviousImage();}}
                      title="Previous image" aria-label="Previous image"
                  >
                      <FiChevronLeft size={20} />
                  </button>
                  <button 
                      className="absolute top-1/2 right-2 -translate-y-1/2 md:p-2 p-1 bg-black/40 text-white rounded-full transition-opacity duration-200 cursor-pointer hover:bg-black/60 focus:outline-none z-10 opacity-70 hover:opacity-100"
                      onClick={(e) => {e.stopPropagation(); selectNextImage();}}
                      title="Next image" aria-label="Next image"
                  >
                      <FiChevronRight size={20} />
                  </button>
              </>
          )}
          <button 
              className="absolute top-2 right-2 p-1.5 bg-black/30 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer hover:bg-black/50 focus:outline-none"
              onClick={(e) => {e.stopPropagation(); openZoomModal();}}
              title="Click to zoom" aria-label="Zoom image"
              style={{ display: isMainImageLoaded && selectedImage ? 'flex' : 'none' }}
          >
              <FiMaximize size={18} />
          </button>
        </div>
      </div>
      
      {displayImages.length > 0 && (
        <div className="lg:col-span-3 md:col-span-4 relative mt-4 lg:mt-0 flex lg:flex-col items-center">
          <div 
              ref={thumbnailsContainerRef}
              className="flex justify-start lg:flex-col space-x-2 pt-2  mx-2 mt-2 lg:space-x-0 lg:space-y-2 
                        overflow-x-auto lg:overflow-x-hidden lg:overflow-y-hidden 
                        pb-2 lg:pb-0 lg:pt-0 lg:max-h-[450px] custom-scrollbar 
                        lg:justify-start w-full lg:items-center"
          >
            {displayImages.map((img, index) => (
                <button
                key={img + index}
                onClick={() => handleThumbnailClick(index)}
                className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20  lg:h-20 rounded-md overflow-hidden border-2 p-0.5 bg-white
                            transition-all duration-200 ease-in-out transform  focus:outline-none
                            ${currentIndex === index ? 'border-accent shadow-md' : 'border-transparent hover:border-gray-300'}`}
                aria-label={`View image ${index + 1}`}
                >
                <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover rounded"/>
                </button>
            ))}
          </div>
        </div>
      )}

      {isZoomModalOpen && selectedImage && (
          <ImageMagnifier imageUrl={selectedImage} onClose={() => setIsZoomModalOpen(false)} />
      )}
    </div>
  );
};

export default ProductImageGallery;