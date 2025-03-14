"use client";

import { useEffect, useState } from "react";

type TouchPoint = {
  id: number;
  x: number;
  y: number;
  timestamp: number;
};

export default function TouchAnimations() {
  const [touchPoints, setTouchPoints] = useState<TouchPoint[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const animationDuration = 1000; // ms

  useEffect(() => {
    setIsMounted(true);
    
    const handleTouch = (e: TouchEvent) => {
      // Don't prevent default on all touch events as it can break scrolling
      // Only prevent default on specific elements if needed
      
      const newPoints: TouchPoint[] = [];
      
      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        newPoints.push({
          id: Date.now() + i,
          x: touch.clientX,
          y: touch.clientY,
          timestamp: Date.now()
        });
      }

      setTouchPoints(prevPoints => [...prevPoints, ...newPoints]);
    };

    // Clean up old animations
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setTouchPoints(prevPoints => 
        prevPoints.filter(point => now - point.timestamp < animationDuration)
      );
    }, 500);

    document.addEventListener("touchstart", handleTouch);

    return () => {
      document.removeEventListener("touchstart", handleTouch);
      clearInterval(cleanupInterval);
    };
  }, []);

  // Only render on the client side
  if (!isMounted) return null;

  return (
    <>
      {touchPoints.map((point) => (
        <div
          key={point.id}
          className="touch-animation"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
          }}
        />
      ))}
    </>
  );
}
