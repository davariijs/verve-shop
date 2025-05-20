import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiGrid, FiMenu, FiX } from 'react-icons/fi';

const NavLinkButton = ({ to, children, currentPath, action }) => {
  const isActive = currentPath === to;
  return (
    <button
      onClick={action}
      className={`ml-3 flex items-baseline py-2 px-3 rounded-md text-sm font-medium transition-colors duration-150
                  ${isActive 
                    ? 'bg-accent text-text-on-accent shadow-inner'
                    : 'bg-primary-dark text-text-on-primary hover:bg-accent hover:text-text-on-accent'}`}
    >
      {children}
    </button>
  );
};

const MobileNavLinkButton = ({ to, children, action, closeMenu }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    const handleClick = () => {
        if (action) action();
        if (closeMenu) closeMenu();
    };

    return (
      <button
        onClick={handleClick}
        className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150
                    ${isActive 
                        ? 'bg-accent text-text-on-accent' 
                        : 'text-indigo-100 hover:bg-primary-dark hover:text-white'}`}
      >
        {children}
      </button>
    );
  };


const Navbar = ({ storeName = "Verve" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const smoothScrollTo = (elementId, duration = 700, offset = 80) => {
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        let t = timeElapsed / duration;
        t = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const run = startPosition + distance * t;
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          window.scrollTo(0, targetPosition);
        }
      }
      requestAnimationFrame(animation);
    }
  };

  const handleProductsStoreNavigation = () => {
    if (location.pathname === '/' || location.pathname === '/products') {
      smoothScrollTo('product-list-section');
    } else {
      navigate('/');
    }
  };
  
  const handleMobileProductsStoreNavigation = () => {
    handleProductsStoreNavigation();
    if (isMobileMenuOpen) {
        toggleMobileMenu();
    }
  };


  return (
    <nav className="bg-primary text-text-on-primary shadow-lg sticky top-0 z-40 py-3 md:py-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl sm:text-3xl font-extrabold hover:opacity-90 transition-opacity">
                {storeName}
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <button className="text-indigo-100 hover:text-white transition-colors p-2 rounded-full hover:bg-primary-dark focus:outline-none" aria-label="User Account">
              <FiUser size={22} />
            </button>
            <button className="relative  text-indigo-100 hover:text-white transition-colors p-2 rounded-full hover:bg-primary-dark focus:outline-none" aria-label="Shopping Cart">
              <FiShoppingCart size={22} />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-xs font-bold text-text-on-accent">
                0
              </span>
            </button>

            <div>
              <NavLinkButton to="/products" currentPath={location.pathname} action={handleProductsStoreNavigation}>
                <div className="flex items-center">
                  <FiGrid className="mr-1.5 h-4 w-4" /> Products
                </div>
              </NavLinkButton>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md  hover:bg-primary-dark focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden border-t border-primary-dark`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <MobileNavLinkButton to="/products" action={handleMobileProductsStoreNavigation} closeMenu={toggleMobileMenu}>
            <div className="flex items-center">
                <FiGrid className="mr-2 h-5 w-5" /> Products
            </div>
          </MobileNavLinkButton>
          <MobileNavLinkButton to="/#" action={() => console.log("User Account Clicked (Mobile)")} closeMenu={toggleMobileMenu}>
            <div className="flex items-center">
                <FiUser className="mr-2 h-5 w-5" /> User Account
            </div>
          </MobileNavLinkButton>
          <MobileNavLinkButton to="/#" action={() => console.log("Shopping Cart Clicked (Mobile)")} closeMenu={toggleMobileMenu}>
            <div className="flex items-center">
                <FiShoppingCart className="mr-2 h-5 w-5" /> Shopping Cart 
                <span className="ml-auto inline-block bg-accent text-xs text-text-on-accent font-bold px-1.5 py-0.5 rounded-full">0</span>
            </div>
          </MobileNavLinkButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;