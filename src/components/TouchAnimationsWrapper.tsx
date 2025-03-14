"use client";

import dynamic from 'next/dynamic';

// Dynamic import with ssr: false is allowed inside client components
const TouchAnimations = dynamic(() => import('@/components/TouchAnimations'), {
  ssr: false
});

export default function TouchAnimationsWrapper() {
  return <TouchAnimations />;
}
