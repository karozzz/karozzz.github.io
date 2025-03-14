import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackToTop from "@/components/BackToTop";
import FooterWrapper from "@/components/FooterWrapper";
import TouchAnimationsWrapper from "@/components/TouchAnimationsWrapper";

// Optimize font loading
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Portfolio | Professional Web Developer",
  description: "Welcome to my portfolio website showcasing my web development projects and skills.",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Add preconnect hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Add image optimization hints */}
        <link rel="preload" as="image" href="/kayz.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen relative overflow-x-hidden bg-black text-gray-200 dark:bg-black dark:text-gray-200`}
        suppressHydrationWarning={true}
      >
        <div className="flex-grow relative z-10"> 
          {children}
        </div>
        <BackToTop />
        <FooterWrapper />
        <TouchAnimationsWrapper />
      </body>
    </html>
  );
}
