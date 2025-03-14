"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Trigger entrance animations after component mounts
    // Small delay to ensure smooth animation after page load
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Navigation items with their delay values for staggered animation
  const navItems = [
    { href: "/", label: "Home", delay: "delay-[100ms]" },
    { href: "/about", label: "About", delay: "delay-[200ms]" },
    { href: "/portfolio", label: "Portfolio", delay: "delay-[300ms]" },
    { href: "/contact", label: "Contact", delay: "delay-[400ms]" }
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          {/* Logo with entrance animation */}
          <div 
            className={`flex-shrink-0 transform transition-all duration-700 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
          >
            <Link href="/" className="flex items-center">
              <span className="font-bold text-xl text-white">Portfolio</span>
            </Link>
          </div>

          {/* Desktop Navigation with staggered animation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div 
                key={item.href}
                className={`transform transition-all duration-700 ${item.delay} ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <NavLink href={item.href}>{item.label}</NavLink>
              </div>
            ))}
          </nav>

          {/* Mobile menu button with animation */}
          <button
            className={`md:hidden rounded-md p-2 text-white hover:bg-gray-800 transition transform duration-700 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation with slide-down animation */}
        {isMenuOpen && (
          <div 
            className="md:hidden py-3 pb-6 space-y-2"
            style={{
              animation: "slideDown 0.3s ease forwards"
            }}
          >
            {navItems.map((item, index) => (
              <div 
                key={item.href}
                className="animate-fadeIn"
                style={{ 
                  animationDelay: `${(index + 1) * 100}ms`,
                  opacity: 0,
                  animation: `fadeIn 0.5s ease forwards ${(index + 1) * 100}ms`
                }}
              >
                <MobileNavLink 
                  href={item.href} 
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </MobileNavLink>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

// NavLink component for desktop navigation with microinteractions
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-white relative group transition-all duration-200 font-medium text-sm tracking-wide"
    >
      {children}
      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
    </Link>
  );
}

// MobileNavLink component for mobile navigation with microinteractions
function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block text-gray-200 hover:text-white hover:bg-gray-800 rounded px-4 py-2 transition-all duration-300 hover:pl-6 hover:pr-2"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
