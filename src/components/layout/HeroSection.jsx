import React from 'react';

const chanel = `${process.env.PUBLIC_URL}/images/chanel-coco.webp`;
const iphone = `${process.env.PUBLIC_URL}/images/iphone.webp`;
const partyGlasses = `${process.env.PUBLIC_URL}/images/party-glasses.webp`;
const rolex = `${process.env.PUBLIC_URL}/images/rolex.webp`;

const HeroSection = () => {
  const handleSmoothScrollToProducts = () => {
    const productSection = document.getElementById('product-list-section');
    if (productSection) {
      const navbarHeight = 80; 
      const elementPosition = productSection.getBoundingClientRect().top;
      const offsetPosition = window.pageYOffset + elementPosition - navbarHeight;
      const duration = 1000; 
      const start = window.pageYOffset;
      const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
      const scroll = () => {
        const now = 'now' in window.performance ? performance.now() : new Date().getTime();
        const time = Math.min(1, ((now - startTime) / duration));
        const easedTime = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;
        window.scrollTo(0, Math.ceil((easedTime * (offsetPosition - start)) + start));
        if (window.pageYOffset === offsetPosition || time >= 1) {
          return;
        }
        requestAnimationFrame(scroll);
      };
      scroll();
    } else {
      let currentPosition = window.pageYOffset;
      const targetPosition = currentPosition + window.innerHeight * 0.5;
      const distance = targetPosition - currentPosition;
      const duration = 800;
      let start = null;
      function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        const easedPercentage = percentage < 0.5 ? 2 * percentage * percentage : -1 + (4 - 2 * percentage) * percentage;
        window.scrollTo(0, currentPosition + distance * easedPercentage);
        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      }
      window.requestAnimationFrame(step);
    }
  };

  return (
    <div className="bg-primary w-full overflow-hidden group"> 
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between py-12 md:py-16 lg:py-20 xl:py-24 relative min-h-[400px] sm:min-h-[450px] lg:min-h-0">
          <div className="lg:w-1/2 xl:w-5/12 text-center lg:text-left mb-10 lg:mb-0 z-20 relative">
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold text-text-on-primary leading-tight">
              It's Verve Time! <span className="block sm:inline">Unlock Savings</span> Up to <span className="text-yellow-300">-20%</span>*
            </h1>
            <p className="mt-3 sm:mt-4 text-md sm:text-lg text-indigo-100 max-w-md mx-auto lg:mx-0">
              Discover your next favorite!
            </p>
            <div className="mt-6 sm:mt-8">
              <button
                onClick={handleSmoothScrollToProducts}
                className="inline-block bg-bg-content text-primary font-semibold px-6 py-2.5 sm:px-8 sm:py-3 rounded-full text-base sm:text-lg hover:bg-gray-100 shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
              >
                Shop Now
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 xl:w-7/12 flex justify-center lg:justify-end items-center relative mt-8 lg:mt-0 xl:pr-8 lg:pr-9 md:pr-20 pr-10 w-full">
            <div className="relative w-[270px] h-[200px] sm:w-[330px] sm:h-[230px] md:w-[380px] md:h-[260px] lg:w-[450px] lg:h-[300px] xl:w-[480px] xl:h-[320px] 
                            lg:mt-8 xl:mt-10">
              <div className="absolute bg-bg-content p-2 rounded-xl shadow-xl transform rotate-[7deg] top-[10%] left-[0%] sm:top-[8%] sm:left-[0%]
                            w-28 h-36 sm:w-32 sm:h-40 md:w-36 md:h-44 lg:w-[140px] lg:h-[180px] z-10
                            group-hover:translate-y-[-3%] group-hover:rotate-[9deg] transition-all duration-300 ease-out delay-100">
                <img src={chanel} alt="Featured Product 1" className="w-full h-full object-contain rounded-md"/>
              </div>
              <div className="absolute bg-bg-content p-2 rounded-xl shadow-xl transform rotate-[-8deg] top-[20%] left-[22%] sm:top-[25%] sm:left-[25%] 
                            w-28 h-36 sm:w-32 sm:h-40 md:w-36 md:h-44 lg:w-[140px] lg:h-[180px] z-30
                            group-hover:translate-y-[3%] group-hover:rotate-[-10deg] transition-all duration-300 ease-out delay-200">
                <img src={iphone} alt="Featured Product 2" className="w-full h-full object-contain rounded-md"/>
              </div>
              <div className="absolute bg-bg-content p-2 rounded-xl shadow-xl transform rotate-[10deg] top-[12%] left-[48%] sm:top-[10%] sm:left-[50%] 
                            w-28 h-36 sm:w-32 sm:h-40 md:w-36 md:h-44 lg:w-[140px] lg:h-[180px] z-20
                            group-hover:translate-y-[-4%] group-hover:rotate-[12deg] transition-all duration-300 ease-out delay-300">
                <img src={rolex} alt="Featured Product 4" className="w-full h-full object-contain rounded-md"/>
              </div>
              <div className="absolute bg-bg-content p-2 rounded-xl shadow-xl transform rotate-[-6deg] top-[25%] left-[70%] sm:top-[28%] sm:left-[75%] 
                            w-28 h-36 sm:w-32 sm:h-40 md:w-36 md:h-44 lg:w-[140px] lg:h-[180px] z-10
                            group-hover:translate-y-[4%] group-hover:rotate-[-8deg] transition-all duration-300 ease-out delay-400">
                <img src={partyGlasses} alt="Featured Product 3" className="w-full h-full object-contain rounded-md"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;





