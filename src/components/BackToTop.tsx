"use client";

import React, { useState, useEffect } from 'react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls below 500px
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 500);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const scrollStep = window.scrollY / 25; // Divide scroll distance into steps
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, -scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15); // Smaller interval for smoother animation
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white 
        z-50 transition-all duration-300 shadow-lg hover:bg-blue-700 
        focus:outline-none focus:ring-2 focus:ring-blue-500 
        hover:shadow-xl hover:shadow-blue-600/30 button-pulse
        ${isVisible ? 'back-to-top-visible' : 'back-to-top-hidden'}`}
      aria-label="Back to top"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6 transition-transform duration-300 hover:scale-110" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 15l7-7 7 7" 
        />
      </svg>
    </button>
  );
}
