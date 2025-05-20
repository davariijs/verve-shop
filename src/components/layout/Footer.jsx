import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = ({ storeName = "Verve" }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-dark text-text-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1 lg:col-span-1 text-center md:text-left">
            <Link to="/" className="text-2xl font-extrabold text-white hover:opacity-80 transition-opacity">
              {storeName}
            </Link>
            <p className="mt-3 text-sm text-gray-400">
              Your one-stop shop for discovering amazing products. Quality and Verve, delivered.
            </p>
          </div>

          <div className='text-center md:text-left'>
            <h3 className="text-md font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div className='text-center md:text-left'>
            <h3 className="text-md font-semibold text-white uppercase tracking-wider mb-4">Popular Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/products?category=electronics" className="text-gray-400 hover:text-white transition-colors">Electronics</Link></li>
              <li><Link to="/products?category=fashion" className="text-gray-400 hover:text-white transition-colors">Fashion</Link></li>
              <li><Link to="/products?category=home" className="text-gray-400 hover:text-white transition-colors">Home & Decor</Link></li>
              <li><Link to="/products?category=beauty" className="text-gray-400 hover:text-white transition-colors">Beauty</Link></li>
            </ul>
          </div>

          <div className='text-center md:text-left'>
            <h3 className="text-md font-semibold text-white uppercase tracking-wider mb-4">Follow Us</h3>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <FaFacebookF size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {currentYear} {storeName}. All Rights Reserved.
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Designed with Verve.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;