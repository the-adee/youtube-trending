import { useState } from 'react'
import { ThemeProvider } from './contexts/ThemeProvider'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import TrendingPage from './components/TrendingPage'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <ThemeProvider>
      <div className="app">
        <Header onToggleSidebar={toggleSidebar} />
        <div className="app-body">
          {sidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
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
