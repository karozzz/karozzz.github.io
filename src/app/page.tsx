"use client";

import { useState, useEffect, lazy, Suspense, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedElement from "@/components/AnimatedElement";
import Parallax from "@/components/Parallax";
import NavBar from "@/components/NavBar";
import { SkeletonImage } from "@/components/SkeletonLoaders";
import ErrorBoundary from "@/components/ErrorBoundary";

// Lazy load non-critical components
const CursorReactiveBackgroundWrapper = lazy(() => 
  import("@/components/CursorReactiveBackgroundWrapper")
);

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const totalImages = projects.length + 1; // +1 for profile image

  // Logger for debugging images loaded
  // Uncomment this to debug loading issues
  // useEffect(() => {
  //   console.log(`Images loaded: ${imagesLoaded}/${totalImages}`);
  // }, [imagesLoaded, totalImages]);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Preload critical fonts and images
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        // Fonts loaded
      });
    }

    // Safety mechanism: Force projects to show after 5 seconds even if images don't load
    const safetyTimer = setTimeout(() => {
      setProjectsLoading(false);
      console.log("Safety timer triggered - forcing projects to show");
    }, 5000);
    
    return () => clearTimeout(safetyTimer);
  }, []);

  // Improved image loading handler that properly counts loaded images
  const handleImageLoad = useCallback(() => {
    setImagesLoaded(prev => {
      const newCount = prev + 1;
      // Once we've loaded all images, set projectsLoading to false
      if (newCount >= totalImages) {
        console.log("All images loaded, showing projects");
        setProjectsLoading(false);
      }
      return newCount;
    });
  }, [totalImages]);

  // Add an error handler for images that fail to load
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error(`Image failed to load: ${e.currentTarget.src || "unknown image"}`);
    // Count failed images as "loaded" to prevent indefinite loading
    handleImageLoad();
  }, [handleImageLoad]);
  
  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        {/* Lazy load interactive background */}
        {isMounted && (
          <Suspense fallback={null}>
            <CursorReactiveBackgroundWrapper />
          </Suspense>
        )}
        
        {/* Navbar always visible */}
        <NavBar />
        
        {/* Hero Section - Optimized for smoother loading */}
        <section id="home" className="relative min-h-screen">
          {/* Background effects - reduced opacity until loaded */}
          <div className="absolute inset-0 z-0 opacity-0 pointer-events-none transition-opacity duration-700"
               style={{ opacity: isMounted ? "0.3" : "0" }}>
            <Parallax speed={0.1} direction="up">
              <div className="absolute top-20 left-[10%] w-[300px] h-[300px] bg-blue-400 rounded-full blur-[80px] opacity-20"></div>
            </Parallax>
            <Parallax speed={0.15} direction="down">
              <div className="absolute top-[40%] right-[5%] w-[250px] h-[250px] bg-purple-400 rounded-full blur-[70px] opacity-20"></div>
            </Parallax>
            <Parallax speed={0.08} direction="up">
              <div className="absolute bottom-20 left-[20%] w-[200px] h-[200px] bg-green-400 rounded-full blur-[60px] opacity-10"></div>
            </Parallax>
          </div>

          {/* Content wrapper */}
          <div className="relative z-10 container mx-auto px-4 pt-24 md:pt-0 min-h-screen flex flex-col md:flex-row items-center justify-center">
            {/* Image Section - Optimized with improved blur placeholder & sizes */}
            <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
              <div className="fixed-size-container w-[180px] h-[200px] sm:w-[280px] sm:h-[320px] lg:w-[400px] lg:h-[450px]">
                <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl animate-gentle-float">
                  <Image
                    src="/kayz.jpg"
                    alt="Karoz Rebaz - Professional Portrait"
                    fill
                    sizes="(max-width: 640px) 180px, (max-width: 768px) 280px, 400px"
                    priority={true}
                    quality={85}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUH/8QAIhAAAgIBAgcBAAAAAAAAAAAAAQIDBBEABRIGBxMhIkFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAQP/xAAaEQADAAMBAAAAAAAAAAAAAAAAAQIDESES/9oADAMBAAIRAxEAPwDVFv8Aa29tU2cDIpYUNwXVZrBGxAyG7FSM9sjsfeSWON8ewbudvX4kOBFYjFmqCNTOfjxp3xk4BPb4D88pHh7Ra0LdXae3wVbYaNIogFxHJIyAjPkDnJ+T9ZQ325bO3PcK1aClNLCtnaoZI1kWTy4wxYnBU9s48h6zUk1TFuTdKj//2Q=="
                    onLoadingComplete={handleImageLoad}
                    onError={handleImageError}
                    className="transition-all duration-700"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>

            {/* Text Content Section - Optimized to render early */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left mt-8 md:mt-0">
              <div className="max-w-xl">
                <span className="inline-block text-lg text-gray-500 dark:text-gray-400 mb-2 font-medium">Hello, I'm</span>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white">
                  Karoz Rebaz
                </h1>
                <h2 className="text-xl sm:text-2xl lg:text-4xl mb-6 text-blue-600 dark:text-blue-400">
                  Full Stack Developer
                </h2>
                <p className="text-base sm:text-lg mb-8 text-gray-700 dark:text-gray-300 leading-relaxed">
                  I craft elegant, user-focused web experiences with modern technologies.
                  Specializing in building responsive and performant applications.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full">
                  <Link 
                    href="/cv.pdf"
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium 
                      transition-all duration-300 relative overflow-hidden button-ring button-ripple
                      hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-1 text-center"
                    target="_blank"
                  >
                    <span className="relative z-10">View My Resume (CV)</span>
                  </Link>
                  <button 
                    onClick={() => {
                      const contactForm = document.getElementById('contact-form');
                      if (contactForm) {
                        // Custom smooth scroll with deceleration
                        const elementPosition = contactForm.getBoundingClientRect().top + window.scrollY;
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
                      }
                    }}
                    className="px-8 py-3 border border-gray-300 dark:border-gray-600 
                      hover:border-blue-600 dark:hover:border-blue-400 rounded-full font-medium 
                      transition-all duration-300 group magnetic-effect button-subtle-pulse button-border-shift
                      text-center flex items-center justify-center"
                  >
                    <span className="text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors 
                      inline-flex items-center">
                      Message Me
                      <svg xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-y-1" 
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </span>
                  </button>
                </div>
                
                {/* Social links - Modified with new icons */}
                <div className="mt-8 flex gap-4 justify-center md:justify-start">
                  <SocialLink href="https://github.com" label="GitHub">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </SocialLink>
                  <SocialLink href="https://linkedin.com" label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                    </svg>
                  </SocialLink>
                  <SocialLink href="https://instagram.com/karoz04" label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </SocialLink>
                  <SocialLink href="https://snapchat.com/add/karoz2004" label="Snapchat">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M12.166 3.36c.323 0 1.43.1 1.938.271.211.068.41.14.608.242a2.66 2.66 0 01.714.56c.253.283.422.581.555.95.212.584.163 1.245.12 1.865-.13.211-.022.421-.03.632a.393.393 0 00.054.202.452.452 0 00.222.158c.13.042.263.075.395.114.443.135.768.276 1.007.462.353.272.532.6.552 1.007.01.267-.08.546-.328.785-.122.12-.3.223-.514.31a3.99 3.99 0 01-.484.122c-.214.045-.428.077-.623.134-.151.043-.376.119-.44.216-.05.08-.02.17.03.299.196.518.512.98.888 1.379.233.242.494.47.765.678.205.156.41.313.625.46.253.17.506.351.79.484.143.068.328.14.415.232.13.131.13.313-.01.454-.1.102-.223.165-.355.234-.243.128-.513.214-.783.294-.09.025-.198.06-.307.081-.12.018-.24.073-.291.181-.07.154.030.463-.179.6-.189.127-.652.081-.851.071a5.22 5.22 0 00-.807.011c-.183.02-.356.088-.538.15-.701.246-1.312.926-2.175.926-.03 0-.058 0-.087-.003-2.175.08-2.874-1.047-3.526-1.047-.17 0-.336.033-.499.081a1.008 1.008 0 00-.358.02c-.13.003-.261.013-.392.013-.358 0-.749-.048-.987-.303-.137-.143-.161-.31-.162-.475-.003-.26.092-.505-.13-.592a9.649 9.649 0 01-.298-.1c-.289-.105-.57-.2-.86-.283-.13-.041-.26-.078-.387-.123a2.624 2.624 0 01-.371-.177c-.192-.118-.328-.252-.38-.408-.07-.238.04-.408.192-.547.283-.26.622-.399.944-.553.144-.7.289-.135.423-.214.25-.15.47-.336.572-.61.05-.151.06-.32-.04-.445-.102-.129-.26-.174-.409-.224a3.494 3.494 0 01-.517-.246c-.142-.09-.272-.19-.363-.337a.723.723 0 01-.079-.635c.06-.18.175-.327.315-.445a1.494 1.494 0 01.487-.252c.179-.05.409-.08.545-.256.149-.183.129-.417.108-.642-.113-.98-.17-1.963.081-2.843.336-1.173 1.138-1.742 1.907-2.123a4.168 4.168 0 011.09-.32c.309-.04.617-.06.926-.06z"/>
                    </svg>
                  </SocialLink>
                  <SocialLink href="https://wa.me/9647719036814" label="WhatsApp">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </SocialLink>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* About Me Section */}
        <section id="about" className="py-20 px-4 md:px-8 lg:px-16 section-transition">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <AnimatedElement animationClass="animate-scale">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">About Me</h2>
                <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
              </AnimatedElement>
            </div>
            
            {/* Full width background content - Updated with improved visibility */}
            <div className="max-w-3xl mx-auto">
              <AnimatedElement 
                animationClass="animate-reveal-left" 
                fallbackClass="opacity-100" // Ensures content is visible even before animation
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-100">My Background</h3>
              </AnimatedElement>
              
              <AnimatedElement 
                animationClass="animate-reveal" 
                delay={200}
                fallbackClass="opacity-100" // Ensures content is visible even before animation
              >
                <p className="mb-4 text-gray-300 leading-relaxed">
                  I'm a passionate Full Stack Developer and I'm an expert in creating web applications.
                  With a background in Computer Science and a love for clean, 
                  efficient code, I've helped companies transform their ideas into digital realities.
                </p>
              </AnimatedElement>
              
              <AnimatedElement 
                animationClass="animate-reveal" 
                delay={400}
                fallbackClass="opacity-100" // Ensures content is visible even before animation
              >
                <p className="text-gray-300 leading-relaxed">
                  I'm a software engineering student in Qaiwan International University (QIU). 
                  I've worked with startups and established companies, 
                  consistently delivering solutions that exceed expectations. I believe in continuous learning 
                  and staying updated with the latest technologies and best practices in the industry.
                </p>
              </AnimatedElement>
            </div>
          </div>
        </section>
        
        {/* Skills Section */}
        <section id="skills" className="py-20 px-4 md:px-8 lg:px-16 section-transition">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <AnimatedElement animationClass="animate-scale">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Skills</h2>
                <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
              </AnimatedElement>
            </div>
            
            {/* Skills Grid - With progressive loading */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-4xl mx-auto">
              {skillIcons.map((skill, index) => (
                <AnimatedSkillIcon 
                  key={skill.name}
                  src={skill.src} 
                  name={skill.name} 
                  delay={index * 50} 
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Projects Section - With enhanced loading animations and improved error handling */}
        <section id="projects" className="py-20 px-4 md:px-8 lg:px-16 section-transition">
          <div className="max-w-7xl mx-auto">
            <AnimatedElement animationClass="animate-scale">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Projects</h2>
                <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
                <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Here are some of my recent projects. Each one represents unique challenges and solutions.
                </p>
              </div>
            </AnimatedElement>
            
            {/* Debug counter - uncomment to debug */}
            {/* <div className="text-center text-sm text-gray-500 mb-4">Images loaded: {imagesLoaded}/{totalImages}</div> */}
            
            {/* Loading indicator - with improved timeout mechanism */}
            {projectsLoading ? (
              <div className="flex flex-col items-center justify-center mb-12">
                <div className="loading-spinner mb-4"></div>
                <p className="text-gray-400 animate-pulse">Loading projects...</p>
                <button 
                  onClick={() => setProjectsLoading(false)} 
                  className="mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Show projects anyway
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <ErrorBoundary key={`project-${index}`}>
                    <AnimatedElement 
                      key={index} 
                      delay={index * 100} 
                      threshold={0.1}
                    >
                      <ProjectCard 
                        project={project} 
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                      />
                    </AnimatedElement>
                  </ErrorBoundary>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
}

// Component for social media links
function SocialLink({ 
  href, 
  children, 
  label 
}: { 
  href: string; 
  children: React.ReactNode; 
  label: string;
}) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors duration-300"
    >
      {children}
    </a>
  );
}

// Animated Skill Category Component
function AnimatedSkillCategory({ 
  title, 
  skills,
  delay = 0
}: { 
  title: string;
  skills: Array<{ name: string; level: number }>;
  delay?: number;
}) {
  return (
    <AnimatedElement animationClass="animate-reveal" delay={delay}>
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">{title}</h4>
        <div className="space-y-2">
          {skills.map((skill, index) => (
            <AnimatedSkill 
              key={skill.name}
              name={skill.name} 
              level={skill.level} 
              delay={delay + (index + 1) * 150} 
            />
          ))}
        </div>
      </div>
    </AnimatedElement>
  );
}

// Animated Skill Component
function AnimatedSkill({ name, level, delay = 0 }: { name: string; level: number; delay?: number }) {
  return (
    <AnimatedElement delay={delay}>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600 dark:text-gray-400">{name}</span>
          <span className="text-gray-600 dark:text-gray-400">{level}%</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <AnimatedElement 
            className="h-full bg-blue-600 dark:bg-blue-400 rounded-full" 
            animationClass="animate-progress-bar"
            delay={delay + 100}
            style={{ "--progress-width": `${level}%` } as React.CSSProperties}
          >
            {/* Add empty div as child */}
            <div></div>
          </AnimatedElement>
        </div>
      </div>
    </AnimatedElement>
  );
}

// Skill category component (original, can be removed or kept as fallback)
function SkillCategory({ 
  title, 
  children 
}: { 
  title: string; 
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h4 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-300">{title}</h4>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}

// Individual skill component with progress bar (original, can be removed or kept as fallback)
function Skill({ name, level }: { name: string; level: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600 dark:text-gray-400">{name}</span>
        <span className="text-gray-600 dark:text-gray-400">{level}%</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 dark:bg-blue-400 rounded-full" 
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );
}

// Project Card Component with Enhanced Hover Effect - Optimized image loading and error handling
function ProjectCard({ 
  project, 
  onLoad, 
  onError 
}: { 
  project: Project; 
  onLoad: () => void;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Handle images that couldn't load
  useEffect(() => {
    // If we have no image or if there's an error and the image isn't marked as loaded,
    // trigger the handleImageLoad callback after a short delay
    if ((!project.image || hasError) && !imageLoaded) {
      const timer = setTimeout(() => {
        handleImageLoad();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [project.image, hasError, imageLoaded]);

  const handleImageLoad = () => {
    console.log(`Project image loaded: ${project.title}`);
    setImageLoaded(true);
    onLoad();
    
    // Add a slight delay before showing content for smoother transition
    setTimeout(() => {
      setCardVisible(true);
    }, 100);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error(`Error loading project image: ${project.title}`);
    setHasError(true);
    setImageLoaded(true); // Consider it loaded even if it failed
    if (onError) onError(e);
    onLoad(); // Important: still call onLoad to increment counter
    
    setTimeout(() => {
      setCardVisible(true);
    }, 100);
  };

  return (
    <div className={`group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] ${
      cardVisible ? 'animate-content-fade-in' : 'opacity-0'
    }`}>
      {/* Project Image/Thumbnail with optimized loading */}
      <div className="aspect-video relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 
            group-hover:opacity-100 transition-opacity duration-300 z-10 
            after:absolute after:inset-0 after:bg-white/10 after:opacity-0 
            group-hover:after:opacity-100 after:transition-opacity after:duration-1500 
            after:animate-pulse"></div>
        
        <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
          {project.image && !hasError ? (
            <>
              {!imageLoaded && <SkeletonImage className="absolute inset-0" />}
              <Image 
                src={project.image} 
                alt={project.title} 
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                quality={80}
                placeholder="blur"
                blurDataURL={project.blurDataURL || "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzIxMjEyMSIvPjwvc3ZnPg=="}
                className={`object-cover transition-transform duration-700 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoadingComplete={handleImageLoad}
                onError={handleImageError}
              />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
      </div>
      
      {/* Basic Info Always Visible - Transitions on hover */}
      <div className="p-4 relative z-20 transition-all duration-300 group-hover:opacity-0 transform group-hover:translate-y-[-10px]">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {project.category}
        </p>
      </div>
      
      {/* Enhanced Hover Overlay - With staggered animations */}
      <div 
        className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-blue-900/95 via-black/80 to-transparent 
          opacity-0 group-hover:opacity-100 transition-all duration-500 
          transform translate-y-8 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto"
      >
        <div className="p-6 text-white">
          {/* Title with appear animation */}
          <div className="transform transition-all duration-300 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          </div>
          
          {/* Description with delayed appear animation */}
          <div className="transform transition-all duration-300 delay-75 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="mb-4 text-sm opacity-90">{project.description}</p>
          </div>
          
          {/* Technologies with delayed appear animation */}
          <div className="mb-4 transform transition-all duration-300 delay-150 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-white/20 text-white text-xs rounded-full transition-all duration-300 hover:bg-white/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Action Links with delayed appear animation and enhanced hover */}
          <div className="flex gap-3 transform transition-all duration-300 delay-200 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            {/* Removed the Live Demo button */}
            {project.codeUrl && (
              <a 
                href={project.codeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 text-white text-sm px-4 py-2 rounded hover:bg-gray-600 
                  transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/30 
                  hover:-translate-y-1 magnetic-effect group button-ripple overflow-hidden"
              >
                <span className="flex items-center">
                  <span>View Code</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Project Card Skeleton component
function ProjectCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg h-[420px] relative">
      {/* Shimmer overlay for loading effect */}
      <div className="absolute inset-0 skeleton-shine z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      {/* Image placeholder */}
      <div className="h-48 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
      
      {/* Content placeholders */}
      <div className="p-5 space-y-3">
        {/* Title placeholder */}
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
        
        {/* Category placeholder */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
        
        {/* Description placeholders */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-full mt-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-4/6"></div>
        
        {/* Tech stack placeholder */}
        <div className="flex flex-wrap gap-2 mt-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse w-16"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Sample projects data
type Project = {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image?: string;
  blurDataURL?: string; // Added for blur placeholders
  demoUrl?: string;
  codeUrl?: string;
};

const projects: Project[] = [
  {
    title: "warehouse management system",
    category: "Web Application",
    description: "web application.",
    technologies: ["nextjs", "reactjs", "Tailwind CSS","MongoDB","Node.js"],
    image: "/warehouse.png",
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQQBBQEAAAAAAAAAAAABAgMABAUGERITFCFhMf/EABUBAQEAAAAAAAAAAAAAAAAAAAAME/8QAFxEBAQEBAAAAAAAAAAAAAAAAAQACEv/aAAwDAQACEQMRAD8AnnO3rtBaSXFxp90LeOAO5kMZ4qo7k+R28VpWgvLeGyt0t54ZQsagGORWGMAeQSPdFFBn7Bf/2Q==",
    demoUrl: "https://example.com/demo1",
    codeUrl: "https://github.com/username/project1"
  },
  {
    title: "menu system",
    category: "Web Application",
    description: "a menu management system with admin panel.",
    technologies: ["nextjs", "reactjs", "Tailwind CSS","MongoDB","Node.js"],
    image: "/menusystem.png",
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMEEQAFBhITISJBUf/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAFxEBAQEBAAAAAAAAAAAAAAAAAQARIf/aAAwDAQACEQMRAD8AmLTOdQzV1Ll8tPE0tQ/GjMTYE+/O3jqfxgfStXLTZHRrJIVCwqAGNzbBGIxdJSV//9k=",
    demoUrl: "https://example.com/demo2",
    codeUrl: "https://github.com/username/project2"
  },
  {
    title: "gym website",
    category: "web Application",
    description: "web app for managing gym memberships and schedules.",
    technologies: ["nextjs", "reactjs", "tailwindcss"],
    image: "/gymwebsite.png",
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMEEQAFBhITISJBUf/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAFxEBAQEBAAAAAAAAAAAAAAAAAQARIf/aAAwDAQACEQMRAD8AmLTOdQzV1Ll8tPE0tQ/GjMTYE+/O3jqfxgfStXLTZHRrJIVCwqAGNzbBGIxdJSV//9k=",
    demoUrl: "https://example.com/demo3",
    codeUrl: "https://github.com/username/project3"
  }
];


// Add this new component at the end of the file
function AnimatedSkillIcon({ src, name, delay = 0 }: { src: string; name: string; delay?: number }) {
  return (
    <AnimatedElement
      delay={delay}
      className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-900/60 
        backdrop-blur-sm border border-indigo-500/20 transition-all duration-300 
        hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20 group"
    >
      <div className="flex items-center justify-center h-16 w-16 mb-3 relative">
        <img
          src={src}
          alt={`${name} icon`}
          className="max-h-12 max-w-12 object-contain filter group-hover:brightness-110"
        />
      </div>
      <span className="text-sm text-gray-400 group-hover:text-blue-400 transition-colors">
        {name}
      </span>
    </AnimatedElement>
  );
}

// Data moved outside components for better performance
const skillIcons = [
  { src: "/icons/html5.svg", name: "HTML5" },
  { src: "/icons/css3.svg", name: "CSS3" },
  { src: "/icons/javascript.svg", name: "JavaScript" },
  { src: "/icons/tailwind.svg", name: "Tailwind CSS" },
  { src: "/icons/react.svg", name: "ReactJS" },
  { src: "/icons/nextjs.svg", name: "NextJS" },
  { src: "/icons/typescript.svg", name: "TypeScript" },
  { src: "/icons/nodejs.svg", name: "NodeJS" },
  { src: "/icons/postgresql.svg", name: "PostgreSQL" },
  { src: "/icons/mysql.svg", name: "MySQL" },
  { src: "/icons/mongodb.svg", name: "MongoDB" },
  { src: "/icons/git.svg", name: "Git" },
  { src: "/icons/github.svg", name: "GitHub" },
  { src: "/icons/cpp.svg", name: "C++" },
  { src: "/icons/graphql.svg", name: "GraphQL" }
];
