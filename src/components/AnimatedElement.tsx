"use client";

import { useEffect, useRef, useState } from 'react';

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  animationClass?: string;
  delay?: number;
  fallbackClass?: string; // Added fallback class for visibility before animation
  threshold?: number;
};

export default function AnimatedElement({
  children,
  className = "",
  style = {},
  animationClass = "",
  delay = 0,
  fallbackClass = "opacity-0", // Default to invisible
  threshold = 0.2
}: AnimatedElementProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold
      }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  // Force visibility after a timeout even if IntersectionObserver doesn't trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInView(true);
    }, 1000); // Force visible after 1 second as fallback
    
    return () => clearTimeout(timer);
  }, []);

  const inlineStyles = {
    ...style,
    transitionDelay: `${delay}ms`,
  };

  // Apply default visibility if not mounted (SSR)
  if (!isMounted) {
    return (
      <div className={`${className} ${fallbackClass}`} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`${className} ${animationClass} ${isInView ? 'in-view' : fallbackClass}`}
      style={inlineStyles}
    >
      {children}
    </div>
  );
}
