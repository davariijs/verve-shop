import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const errorImageUrl = `${process.env.PUBLIC_URL}/images/error-404.png`;

const NotFoundPage = () => {
  useEffect(() => {
    document.title = "Page Not Found - Verve";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-fit bg-bg-page text-center px-4 pt-14 pb-24">
      <div className="max-w-md w-full">
        <img 
          src={errorImageUrl}
          alt="Error 404 - Page Not Found" 
          className="w-full max-w-xs sm:max-w-sm mx-auto mb-8"
        />
        <h1 className="text-3xl sm:text-4xl font-bold text-text-main mb-3">
          Oops! Page Lost in Cyberspace
        </h1>
        <p className="text-md sm:text-lg text-text-secondary mb-8">
          The page you're looking for seems to have vanished or never existed. Let's get you back on track!
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-accent text-text-on-accent font-semibold rounded-lg shadow-md hover:bg-accent-hover
          focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transition-transform transform hover:scale-105"
        >
          <FaHome className="mr-2 -ml-1 h-5 w-5" />
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;