import { useState, useEffect, RefObject } from 'react';

interface UseInViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

// Update the type definition to accept a ref that might contain null
export function useInView(
  ref: RefObject<HTMLElement | null>,
  options: UseInViewOptions = {}
): boolean {
  const [isIntersecting, setIntersecting] = useState(false);
  const { threshold = 0.1, triggerOnce = true, rootMargin = '0px' } = options;

  useEffect(() => {
    // Add null check for ref.current
    const currentRef = ref.current;
    if (!currentRef) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
        
        // If triggerOnce is true and the element is intersecting, unobserve it
        if (triggerOnce && entry.isIntersecting && currentRef) {
          observer.unobserve(currentRef);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [ref, threshold, triggerOnce, rootMargin]);

  return isIntersecting;
}
