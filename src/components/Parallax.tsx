"use client";

import React, { useEffect, useRef, useState } from 'react';

interface ParallaxProps {
  children?: React.ReactNode;
  className?: string;
  speed?: number; // Parallax speed (negative values scroll in opposite direction)
  direction?: 'up' | 'down'; // Direction of parallax effect
  zIndex?: number;
}

export default function Parallax({
  children,
  className = '',
  speed = 0.2,
  direction = 'up',
  zIndex = -1,
}: ParallaxProps) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return; // Don't apply parallax for users who prefer reduced motion
    }

    const handleScroll = () => {
      if (ref.current) {
        const { top } = ref.current.getBoundingClientRect();
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Calculate how far the element is from the viewport center
        const elementCenter = top + ref.current.clientHeight / 2;
        const distanceFromCenter = elementCenter - windowHeight / 2;
        
        // Calculate parallax offset
        const parallaxOffset = distanceFromCenter * speed;
        setOffset(parallaxOffset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial calculation
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div 
      ref={ref} 
      className={`relative ${className}`}
    >
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          transform: `translateY(${direction === 'up' ? -offset : offset}px)`,
          zIndex
        }}
      >
        {children}
      </div>
    </div>
  );
}
