import React from 'react';

interface SkeletonProps {
  className?: string;
}

export function SkeletonImage({ className = "" }: SkeletonProps) {
  return (
    <div className={`bg-gray-300 dark:bg-gray-700 animate-pulse ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-shine" />
    </div>
  );
}

export function SkeletonText({ className = "" }: SkeletonProps) {
  return (
    <div className={`h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-shine" />
    </div>
  );
}
