import { ThemeProvider } from './contexts/ThemeProvider'
import './App.css'
import Header from './components/Header'
import TrendingPage from './components/TrendingPage'

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <TrendingPage />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
