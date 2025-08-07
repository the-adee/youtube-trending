import React from 'react';

const MadeWithLove = () => {
  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50">
      <a 
        href="https://github.com/the-adee" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-5 py-2.5 bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl border border-white/10 dark:border-gray-700/10 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.35)] hover:bg-white/20 dark:hover:bg-gray-800/50 hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-all duration-300 group outline-none focus:ring-0 font-['Inter',sans-serif]"
      >
        <div className="flex items-center">
          <span className="text-xs sm:text-sm font-light text-gray-800 dark:text-gray-100">
            Made with
          </span>
          <span className="mx-1.5 inline-block transform transition-transform">
            <svg className="w-3.5 h-3.5 text-youtube-red group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </span>
          <span className="text-xs sm:text-sm font-light text-gray-800 dark:text-gray-100">
            by
          </span>
          <span className="ml-1.5 text-xs sm:text-sm font-medium bg-gradient-to-r from-youtube-red to-rose-500 bg-clip-text text-transparent">
            the-adee
          </span>
        </div>
        <svg className="w-4 h-4 ml-1 text-gray-600 dark:text-gray-400 transition-all duration-300 group-hover:rotate-6 group-hover:text-gray-800 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </a>
    </div>
  );
};

export default MadeWithLove;
