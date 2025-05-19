import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4" role="alert">
      <p className="font-bold">Error!</p>
      <p>{message || "An unexpected error occurred. Please try again later."}</p>
    </div>
  );
};

export default ErrorMessage;