"use client";

import dynamic from 'next/dynamic';

// Import with no SSR
const CursorReactiveBackground = dynamic(
  () => import('./CursorReactiveBackground'),
  { ssr: false }
);

export default function CursorReactiveBackgroundWrapper() {
  return <CursorReactiveBackground />;
}
