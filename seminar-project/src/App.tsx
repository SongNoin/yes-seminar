import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GlobalStyles from './styles/GlobalStyles'
import HomePage from './pages/HomePage'
import GamesPage from './pages/GamesPage'
import StudiosPage from './pages/StudiosPage'
import AboutPage from './pages/AboutPage'
import MontyHallGame from './pages/MontyHallGame'
import OmokGamePage from './pages/OmokGamePage'
import './App.css'

function App() {
  // 폰트 로드
  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    
    const iconLink = document.createElement('link')
    iconLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css'
    iconLink.rel = 'stylesheet'
    document.head.appendChild(iconLink)
    
    return () => {
      document.head.removeChild(link)
      document.head.removeChild(iconLink)
    }
  }, [])

  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/studios" element={<StudiosPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/games/monty-hall" element={<MontyHallGame />} />
        <Route path="/games/omok" element={<OmokGamePage />} />
      </Routes>
    </Router>
  )
}

export default App
