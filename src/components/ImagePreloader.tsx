"use client";

import { useEffect } from 'react';

interface ImagePreloaderProps {
  imagePaths: string[];
}

/**
 * Component to preload important images for faster display
 */
export default function ImagePreloader({ imagePaths }: ImagePreloaderProps) {
  useEffect(() => {
    // Preload all images in the array
    imagePaths.forEach(path => {
      const img = new Image();
      img.src = path;
    });
  }, [imagePaths]);

  // This component doesn't render anything
  return null;
}
