"use client";

import dynamic from 'next/dynamic';

// Dynamic import with ssr: false is allowed inside client components
const Footer = dynamic(() => import('./Footer'), {
  ssr: false
});

export default function FooterWrapper() {
  return <Footer />;
}
