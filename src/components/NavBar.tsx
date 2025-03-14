"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";

// Custom Cursor Component
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Add global style to hide default cursor, but don't affect text selection
    const style = document.createElement('style');
    style.textContent = `
      * {
        cursor: none !important;
      }
      ::selection {
        background: rgba(99, 102, 241, 0.4);
        color: inherit;
      }
    `;
    document.head.appendChild(style);
    
    // Show cursor once it moves (prevents initial flash at 0,0)
    const onMouseEnter = () => setHidden(false);
    
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const onMouseDown = (e: MouseEvent) => {
      setClicked(true);
      // Store the position where the click happened
      setClickPosition({ x: e.clientX, y: e.clientY });
    };
    
    const onMouseUp = () => setClicked(false);
    
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    
    return () => {
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.head.removeChild(style);
    };
  }, []);

  // Don't render anything during SSR
  if (!isMounted) return null;

  // Render cursor directly to body using createPortal
  const cursorElements = (
    <>
      {/* Main cursor dot with extremely high z-index */}
      <div 
        className={`fixed pointer-events-none z-[99999] rounded-full mix-blend-difference ${
          hidden ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '15px',
          height: '15px',
          backgroundColor: 'rgb(255, 255, 255)',
          transform: `translate(-50%, -50%) scale(${clicked ? 0.5 : 1})`,
          boxShadow: '0 0 10px rgb(255, 255, 255)',
          transition: 'transform 0.15s ease-out, opacity 0.3s ease',
          willChange: 'transform, left, top' // Performance optimization
        }}
      ></div>
      
      {/* Click effect circle */}
      <div 
        className={`fixed pointer-events-none z-[99998] rounded-full bg-indigo-300/20 ${
          hidden ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          left: `${clickPosition.x}px`,
          top: `${clickPosition.y}px`,
          width: '15px',
          height: '15px',
          transform: `translate(-50%, -50%) scale(${clicked ? 3 : 0})`,
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
          willChange: 'transform'
        }}
      ></div>
    </>
  );

  // Use createPortal to render cursor directly to body
  return typeof document !== 'undefined' ? createPortal(cursorElements, document.body) : null;
}

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [starPositions, setStarPositions] = useState<Array<{
    size: number;
    top: number;
    left: number;
    opacity: number;
    delay: number;
    duration: number;
  }>>([]);

  // Generate stars only on the client side to avoid hydration mismatch
  useEffect(() => {
    // Generate star positions on the client side only
    const generatedStarPositions = Array(20).fill(0).map(() => ({
      size: Math.random() * 2 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: Math.random() * 0.8 + 0.2,
      delay: Math.random() * 4,
      duration: Math.random() * 2 + 3
    }));
    
    setStarPositions(generatedStarPositions);
  }, []);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ["home", "about", "skills", "projects"];
      const scrollPosition = window.scrollY + 100;
      
      // Find the current section in view
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scroll
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      // Make sure the element is visible
      element.style.display = 'block';
      element.style.visibility = 'visible';
      
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - 80; // Adjust for navbar height
      const startPosition = window.scrollY;
      const distance = offsetPosition - startPosition;
      
      let start: number | null = null;
      const duration = 1000; // Animation duration in ms

      // Easing function for smooth deceleration
      const easeOutCubic = (t: number): number => (--t) * t * t + 1;

      const animateScroll = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        
        window.scrollTo({
          top: startPosition + distance * easeOutCubic(percentage),
          behavior: 'auto' // We're handling the animation manually
        });

        if (progress < duration) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
      setActiveSection(sectionId);
    }
  };

  return (
    <>
      {typeof window !== 'undefined' && <CustomCursor />}
      <nav className="fixed top-4 left-0 right-0 z-[60] mx-auto px-4 transition-all duration-500 max-w-5xl">
        <div className="relative flex justify-center items-center h-14">
          {/* Starry background effect - only render when stars are available (client-side only) */}
          <div className="absolute inset-0 overflow-hidden rounded-full opacity-20">
            {starPositions.map((star, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white animate-twinkle" 
                style={{
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  opacity: star.opacity,
                  animationDelay: `${star.delay}s`,
                  animationDuration: `${star.duration}s`
                }}
              />
            ))}
          </div>

          {/* Main navigation container with glowing border - darker style */}
          <div className="relative z-10 px-1 py-1 rounded-full bg-gray-900/80 backdrop-blur-md border border-indigo-500/30 shadow-lg shadow-indigo-500/20">
            {/* Glow effect */}
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-800/20 via-indigo-800/20 to-purple-800/20 blur-md opacity-50"></div>
            
            {/* Navigation links with updated click handlers */}
            <ul className="flex items-center space-x-1">
              {/* Home dot navigation item */}
              <NavItem 
                href="#home" 
                isActive={activeSection === "home"}
                onClick={(e) => handleClick(e, "home")}
                isDot={true}
              >
                <span className="sr-only">Home</span>
              </NavItem>
              <NavItem 
                href="#about" 
                isActive={activeSection === "about"}
                onClick={(e) => handleClick(e, "about")}
              >
                About Me
              </NavItem>
              <NavItem 
                href="#skills" 
                isActive={activeSection === "skills"}
                onClick={(e) => handleClick(e, "skills")}
              >
                Skills
              </NavItem>
              <NavItem 
                href="#projects" 
                isActive={activeSection === "projects"}
                onClick={(e) => handleClick(e, "projects")}
              >
                Projects
              </NavItem>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

// Navigation item component - updated with isDot option
function NavItem({ 
  children, 
  href, 
  isActive,
  onClick,
  isDot = false
}: { 
  children: React.ReactNode; 
  href: string; 
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  isDot?: boolean;
}) {
  return (
    <li>
      <Link 
        href={href} 
        onClick={onClick}
        className={`relative ${isDot ? 'w-3 h-3 mx-2' : 'px-4 py-2'} rounded-full text-sm font-medium transition-all duration-300 ${
          isActive 
            ? isDot ? "bg-indigo-500" : "text-white bg-indigo-600/30" 
            : isDot ? "bg-gray-500/50 hover:bg-indigo-400/50" : "text-gray-300 hover:text-white hover:bg-indigo-500/20"
        } flex items-center justify-center`}
      >
        {children}
        {isActive && !isDot && (
          <span className="absolute inset-0 rounded-full animate-pulse bg-indigo-500/20 -z-10"></span>
        )}
      </Link>
    </li>
  );
}
