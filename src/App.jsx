import { ThemeProvider } from './contexts/ThemeProvider'
import './App.css'
import Header from './components/Header'
import TrendingPage from './components/TrendingPage'
import MadeWithLove from './components/MadeWithLove'
import WelcomeModal from './components/WelcomeModal'

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <TrendingPage />
        </main>
        <MadeWithLove />
        <WelcomeModal />
      </div>
    </ThemeProvider>
  )
}

export default App
