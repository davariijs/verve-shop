import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ storeName = "Verve" }) => {
  return (
    <nav className="bg-primary text-text-on-primary shadow-lg sticky top-0 z-40 py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl sm:text-3xl font-extrabold hover:opacity-90 transition-opacity">
              {storeName}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;