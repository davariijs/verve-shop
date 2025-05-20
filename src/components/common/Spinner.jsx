import React from 'react';
const loadingSpinner = `${process.env.PUBLIC_URL}/images/spinner.svg`;

const Spinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',    
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex justify-center items-center my-8" role="status" aria-label="Loading content">
      <img
        src={loadingSpinner}
        alt="Loading..."
        className={`${sizeClasses[size] || sizeClasses.md}`}
      />
    </div>
  );
};

export default Spinner;