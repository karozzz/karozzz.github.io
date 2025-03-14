"use client";


import { useEffect, useState, useRef } from 'react';

export default function CursorReactiveBackground() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Generate cosmic objects
  const stars = Array.from({ length: 300 }, (_, i) => ({
    id: `star-${i}`,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 150 + 50,
    delay: -Math.random() * 100,
    bright: Math.random() * 0.5 + 0.5
  }));

  const planets = Array.from({ length: 3 }, (_, i) => ({
    id: `planet-${i}`,
    size: Math.random() * 40 + 20,
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
    duration: Math.random() * 200 + 100,
    delay: -Math.random() * 100,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`
  }));

  const blackHoles = Array.from({ length: 2 }, (_, i) => ({
    id: `blackhole-${i}`,
    size: Math.random() * 60 + 40,
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
    duration: Math.random() * 300 + 200,
    delay: -Math.random() * 100
  }));

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-gradient-to-b from-blue-950/95 via-indigo-950/90 to-black"
      style={{ 
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 2s ease-in-out'
      }}
    >
      {/* Stars with parallax effect */}
      {stars.map((star) => (
        <div 
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.bright,
            animation: `
              twinkle ${Math.random() * 3 + 2}s ease-in-out infinite,
              moveAcross ${star.duration}s linear infinite
            `,
            animationDelay: `${star.delay}s`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,${star.bright})`
          }}
        />
      ))}

      {/* Planets with glowing effects */}
      {planets.map((planet) => (
        <div 
          key={planet.id}
          className="absolute rounded-full"
          style={{
            width: `${planet.size}px`,
            height: `${planet.size}px`,
            left: `${planet.x}%`,
            top: `${planet.y}%`,
            background: `radial-gradient(circle at 30% 30%, ${planet.color}, rgba(0,0,0,0.8))`,
            boxShadow: `0 0 ${planet.size/2}px ${planet.color}`,
            animation: `floatAround ${planet.duration}s linear infinite`,
            animationDelay: `${planet.delay}s`
          }}
        />
      ))}

      {/* Black holes with gravitational effect */}
      {blackHoles.map((hole) => (
        <div 
          key={hole.id}
          className="absolute"
          style={{
            width: `${hole.size}px`,
            height: `${hole.size}px`,
            left: `${hole.x}%`,
            top: `${hole.y}%`,
            animation: `floatAround ${hole.duration}s linear infinite`,
            animationDelay: `${hole.delay}s`
          }}
        >
          <div className="absolute inset-0 rounded-full bg-black"
            style={{
              boxShadow: 'inset 0 0 20px rgba(255,255,255,0.2)',
              animation: 'rotate 20s linear infinite'
            }}
          />
          <div className="absolute inset-[-50%] rounded-full"
            style={{
              background: 'radial-gradient(circle at center, transparent 40%, rgba(138, 43, 226, 0.2) 70%, transparent 100%)',
              animation: 'rotate 25s linear infinite reverse'
            }}
          />
        </div>
      ))}

      {/* Central Nebula Glow */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.4), transparent 70%),
            radial-gradient(circle at 70% 60%, rgba(139, 92, 246, 0.4), transparent 70%),
            radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.3), transparent 60%)
          `
        }}
      />

      {/* Star Field - Three layers for parallax effect */}
      <div className="absolute inset-0">
        {/* Near stars - fast moving */}
        {[...Array(50)].map((_, i) => (
          <div 
            key={`star-near-${i}`}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `
                twinkle ${Math.random() * 2 + 3}s ease-in-out infinite,
                parallaxNear ${Math.random() * 20 + 30}s linear infinite
              `,
              animationDelay: `-${Math.random() * 20}s`
            }}
          />
        ))}

        {/* Mid stars - medium speed */}
        {[...Array(100)].map((_, i) => (
          <div 
            key={`star-mid-${i}`}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: `${Math.random() * 1.5 + 0.5}px`,
              height: `${Math.random() * 1.5 + 0.5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `
                twinkle ${Math.random() * 3 + 4}s ease-in-out infinite,
                parallaxMid ${Math.random() * 40 + 60}s linear infinite
              `,
              animationDelay: `-${Math.random() * 40}s`
            }}
          />
        ))}

        {/* Far stars - slow moving */}
        {[...Array(150)].map((_, i) => (
          <div 
            key={`star-far-${i}`}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: `${Math.random() * 1 + 0.2}px`,
              height: `${Math.random() * 1 + 0.2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.2,
              animation: `
                twinkle ${Math.random() * 4 + 5}s ease-in-out infinite,
                parallaxFar ${Math.random() * 60 + 90}s linear infinite
              `,
              animationDelay: `-${Math.random() * 60}s`
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      <div 
        className="absolute opacity-0 animate-meteor"
        style={{
          width: '300px',
          height: '2px',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)',
          borderRadius: '1px',
          top: '20%',
          left: '30%',
          animationDelay: '3s'
        }}
      />
      <div 
        className="absolute opacity-0 animate-meteor"
        style={{
          width: '400px',
          height: '2px',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)',
          borderRadius: '1px',
          top: '50%',
          left: '60%',
          animationDelay: '8s'
        }}
      />
    </div>
  );
}
