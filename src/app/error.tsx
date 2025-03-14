'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-900 text-white">
      <div className="w-full max-w-lg p-8 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-red-500/20 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Something went wrong!</h2>
            <p className="text-gray-400 mt-1">There was an error loading the page</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={reset} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
            Try again
          </button>
          
          <Link href="/" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:bg-gray-800 rounded-md transition-colors text-center">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
