"use client";

import { useEffect, useState, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const cursorGradientId = "cursorGradient";
  const glowFilterId = "cursorGlow";
  
  // Performance optimization - reduce numbers for better performance
  const MAX_TRAIL_POINTS = 15; // Reduced from 25
  const POINT_LIFETIME = 800; // Reduced from 1200ms
  const UPDATE_THRESHOLD = 16; // Increased from 10ms (matches 60fps)
  
  // Store last update time for throttling
  const lastUpdate = useRef(0);
  // Track the currently hovered element
  const hoveredElementRef = useRef<Element | null>(null);

  useEffect(() => {
    // Hide cursor when it leaves the window
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    // Track mouse clicks
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    // Check if element is interactive
    const isInteractive = (element: Element): boolean => {
      const interactiveElements = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'];
      const interactiveRoles = ['button', 'link', 'checkbox', 'radio', 'switch', 'tab'];
      
      // Check tag name
      if (interactiveElements.includes(element.tagName)) return true;
      
      // Check role attribute
      const role = element.getAttribute('role');
      if (role && interactiveRoles.includes(role)) return true;
      
      // Check for common interactive classes
      const classList = element.classList;
      if (classList.contains('cursor-pointer') || 
          classList.contains('button') || 
          classList.contains('btn')) return true;
      
      return false;
    };

    // Main mouse move handler with optimized throttling
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      
      // Only update if enough time has passed since last update
      if (now - lastUpdate.current < UPDATE_THRESHOLD) return;
      
      lastUpdate.current = now;
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check for hovering over interactive elements
      let target = e.target as Element;
      let isOnInteractive = false;
      
      // Bubble up through parents to check for interactive elements
      while (target && target !== document.body) {
        if (isInteractive(target)) {
          isOnInteractive = true;
          hoveredElementRef.current = target;
          break;
        }
        target = target.parentElement as Element;
      }
      
      setIsHovering(isOnInteractive);
      
      // Add new point to trail - skip when hovering for smoother transitions
      if (!isOnInteractive) {
        const newPoint = { 
          x: e.clientX,
          y: e.clientY,
          timestamp: now
        };
        
        // Optimized trail update - use functional update to avoid closure issues
        setTrailPoints(prevPoints => {
          const updatedPoints = [...prevPoints, newPoint];
          return updatedPoints.length > MAX_TRAIL_POINTS ? 
            updatedPoints.slice(updatedPoints.length - MAX_TRAIL_POINTS) : 
            updatedPoints;
        });
      }
    };
    
    // Animation frame for trail animation with optimization
    let animationId: number;
    let lastAnimationTime = 0;
    const ANIMATION_FRAME_RATE = 30; // ms between frames (about 30fps)
    
    const animateTrail = (timestamp: number) => {
      // Only run animation logic if enough time has passed
      if (timestamp - lastAnimationTime > ANIMATION_FRAME_RATE) {
        lastAnimationTime = timestamp;
        const now = performance.now();
        
        // Filter out old points
        setTrailPoints(prevPoints => 
          prevPoints.filter(point => now - point.timestamp < POINT_LIFETIME)
        );
      }
      
      animationId = requestAnimationFrame(animateTrail);
    };
    
    // Start animation loop
    animationId = requestAnimationFrame(animateTrail);
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Generate optimized SVG path data from trail points
  const getPathData = () => {
    if (trailPoints.length < 2) return "";

    // Use a simple line path for better performance
    let pathData = `M ${trailPoints[0].x} ${trailPoints[0].y}`;
    
    // Create a smooth curve by using every point
    for (let i = 1; i < trailPoints.length; i++) {
      pathData += ` L ${trailPoints[i].x} ${trailPoints[i].y}`;
    }
    
    return pathData;
  };
  
  // Don't render on touch-only devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  return (
    <>
      {/* SVG for trail effect - only render when not hovering for performance */}
      <svg 
        ref={svgRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9998]"
        style={{ opacity: isVisible && !isHovering ? 1 : 0 }}
      >
        <defs>
          <linearGradient id={cursorGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.9)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.8)" />
            <stop offset="100%" stopColor="rgba(236, 72, 153, 0.7)" />
          </linearGradient>
          
          <filter id={glowFilterId} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Main trail path - simplified for better performance */}
        {trailPoints.length > 1 && (
          <path
            d={getPathData()}
            fill="none"
            stroke={`url(#${cursorGradientId})`}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${glowFilterId})`}
            style={{ opacity: 0.8 }}
          />
        )}
        
        {/* Additional thin trail - only render last few points for performance */}
        {trailPoints.length > 1 && (
          <path
            d={getPathData()}
            fill="none"
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.5 }}
          />
        )}
        
        {/* Optimize particle rendering - only show a few particles */}
        {trailPoints.length > 3 && trailPoints
          .filter((_, index) => index % 4 === 0 || index === trailPoints.length - 1)
          .map((point, index) => {
            const now = performance.now();
            const pointAge = now - point.timestamp;
            const opacity = 1 - Math.min(pointAge / POINT_LIFETIME, 1);
            
            return (
              <circle
                key={`${point.timestamp}-${index}`}
                cx={point.x}
                cy={point.y}
                r={index === Math.floor(trailPoints.length / 4) - 1 ? 3 : 1.5}
                fill="rgba(255, 255, 255, 0.8)"
                style={{ 
                  opacity: opacity * 0.8,
                  filter: "blur(1px)"
                }}
              />
            );
          })}
      </svg>

      {/* Main cursor dot with button-hover state */}
      <div
        className={`custom-cursor ${isVisible ? 'visible' : ''} ${isClicking ? 'clicking' : ''} ${isHovering ? 'hovering' : ''}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
    </>
  );
}
