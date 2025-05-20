import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FiX, FiZoomIn, FiZoomOut, FiMove } from 'react-icons/fi';

const ImageMagnifier = ({ imageUrl, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.5));

  const handleMouseDown = (e) => {
    if (zoomLevel > 1 && containerRef.current && containerRef.current.contains(e.target)) {
      e.preventDefault(); 
      setIsDragging(true);
      setStartDrag({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

const handleMouseMove = useCallback((e) => {
    if (isDragging && imageRef.current) { 
      e.preventDefault();
      const newX = e.clientX - startDrag.x;
      const newY = e.clientY - startDrag.y;
      setPosition({ x: newX, y: newY });
    }
  }, [isDragging, startDrag, setPosition]);

  const handleMouseUpOrLeave = useCallback(() => {
    if (isDragging) {
        setIsDragging(false);
    }
  }, [isDragging, setIsDragging]);
  
  const handleWheelZoom = (e) => {
    if (containerRef.current && containerRef.current.contains(e.target)) {
        e.preventDefault();
        if (e.deltaY < 0) {
          handleZoomIn();
        } else {
          handleZoomOut();
        }
    }
  };
  
  useEffect(() => {
    if (zoomLevel === 1) {
      setPosition({ x: 0, y: 0 });
    }
  }, [zoomLevel]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUpOrLeave);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUpOrLeave);
    };
  }, [isDragging, handleMouseMove, handleMouseUpOrLeave]);


  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" 
        onClick={onClose}
        onWheel={handleWheelZoom} 
    >
      <div 
        ref={containerRef}
        className="relative bg-bg-content p-2 rounded-lg shadow-2xl w-auto h-auto max-w-[90vw] max-h-[90vh] overflow-hidden flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        style={{ cursor: isDragging ? 'grabbing' : zoomLevel > 1 ? 'grab' : 'default' }}
      >
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-300 hover:text-white bg-black/50 p-1.5 rounded-full z-20 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close"
        >
          <FiX size={22} />
        </button>
        
        <img
            ref={imageRef}
            src={imageUrl}
            alt="Zoomed product"
            className="max-w-full max-h-full object-contain block"
            style={{ 
                transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                willChange: 'transform', 
                cursor: isDragging ? 'grabbing' : zoomLevel > 1 ? 'grab' : 'default'
            }}
            draggable="false" 
        />

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 bg-black/60 p-2 rounded-full z-20">
          <button onClick={handleZoomOut} disabled={zoomLevel <= 0.5} className="p-1.5 text-white disabled:text-gray-500 hover:bg-white/20 rounded-full focus:outline-none 
          focus:ring-1 focus:ring-white"><FiZoomOut size={20} /></button>
          <button onClick={handleZoomIn} disabled={zoomLevel >= 3} className="p-1.5 text-white disabled:text-gray-500 hover:bg-white/20 rounded-full focus:outline-none
          focus:ring-1 focus:ring-white"><FiZoomIn size={20} /></button>
          {zoomLevel > 1 && <FiMove size={18} className="text-white" title="Drag to move"/>}
        </div>
      </div>
    </div>
  );
};

export default ImageMagnifier;