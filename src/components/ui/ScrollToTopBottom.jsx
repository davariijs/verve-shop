import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const ScrollToTopBottom = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtVeryBottom, setIsAtVeryBottom] = useState(false); 

  const checkScrollPosition = () => {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    if (Math.ceil(scrollY + windowHeight) >= documentHeight - 5) {
      setIsAtVeryBottom(true);
    } else {
      setIsAtVeryBottom(false);
    }
  };

  const smoothScroll = (targetPosition, duration = 700) => { 
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      let t = timeElapsed / duration;
      t = t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      const run = startPosition + distance * t;
      
      window.scrollTo(0, run);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        window.scrollTo(0, targetPosition);
        checkScrollPosition(); 
      }
    }
    requestAnimationFrame(animation);
  };

  const scrollToTop = () => {
    smoothScroll(0);
  };

  const scrollToBottom = () => {
    smoothScroll(document.documentElement.scrollHeight - window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    window.addEventListener('resize', checkScrollPosition, { passive: true });
    checkScrollPosition();
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={isAtVeryBottom ? scrollToTop : scrollToBottom}
          className={`fixed bottom-6 right-6 bg-accent text-text-on-accent p-3.5 rounded-full shadow-xl hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75 transition-all duration-300 ease-in-out transform hover:scale-110 z-30
                      ${isAtVeryBottom ? 'opacity-100' : 'opacity-90 hover:opacity-100'}`}
          aria-label={isAtVeryBottom ? "Scroll to top" : "Scroll to bottom"}
          title={isAtVeryBottom ? "Scroll to top" : "Scroll to bottom"}
        >
          {isAtVeryBottom ? <FaArrowUp size={18} /> : <FaArrowDown size={18} />}
        </button>
      )}
    </>
  );
};

export default ScrollToTopBottom;