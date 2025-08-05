import { useState, useEffect } from 'react'
import { ThemeProvider } from './contexts/ThemeProvider'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import TrendingPage from './components/TrendingPage'

function App() {
  // Initialize sidebar state based on screen size
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Check if it's mobile/tablet on initial load
    return window.innerWidth >= 1025;
  });

  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1025);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Listen for window resize to auto-close sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1025;
      setIsMobile(mobile);
      
      // Auto-manage sidebar based on screen size
      if (!mobile) {
        setSidebarOpen(true); // Always open on desktop
      }
      // On mobile, let user control the sidebar state
    };

    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ThemeProvider>
      <div className="app">
        <Header onToggleSidebar={toggleSidebar} />
        <div className="app-body">
          {sidebarOpen && isMobile && (
            <div className="sidebar-overlay" onClick={toggleSidebar}></div>
          )}
          <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
          <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <TrendingPage />
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
