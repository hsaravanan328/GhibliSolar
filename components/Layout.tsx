import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, darkMode, toggleDarkMode }) => {
  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen transition-colors duration-1000`}>
      <div className="min-h-screen bg-ghibli-cream dark:bg-ghibli-midnight text-gray-800 dark:text-gray-100 relative overflow-hidden transition-colors duration-1000">
        
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Clouds (Light Mode) */}
          <div className={`absolute top-10 left-10 w-32 h-16 bg-white rounded-full opacity-60 filter blur-xl animate-float dark:opacity-0 transition-opacity duration-1000`}></div>
          <div className={`absolute top-40 right-20 w-48 h-24 bg-white rounded-full opacity-40 filter blur-2xl animate-float delay-700 dark:opacity-0 transition-opacity duration-1000`}></div>
          
          {/* Stars (Dark Mode) */}
          <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-1000">
            <div className="absolute top-10 left-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"></div>
            <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-yellow-100 rounded-full shadow-[0_0_8px_yellow]"></div>
            <div className="absolute bottom-1/4 left-10 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute top-20 right-10 w-1 h-1 bg-white rounded-full"></div>
             {/* Gradient Overlay for night feel */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ghibli-navy/50"></div>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center">
          
          {/* Header */}
          <header className="w-full flex justify-between items-center mb-12 max-w-4xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-ghibli-grass dark:bg-indigo-600 flex items-center justify-center shadow-lg transform rotate-3">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h1 className="text-3xl font-serif font-bold text-ghibli-navy dark:text-ghibli-sky tracking-wide">
                Renewable Spirits
              </h1>
            </div>
            
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-white/20 hover:scale-105 transition-all duration-300 shadow-sm"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </header>

          <main className="w-full max-w-4xl">
            {children}
          </main>

        </div>
      </div>
    </div>
  );
};

export default Layout;