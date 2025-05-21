import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import GlobalStyles from './styles/GlobalStyles'
import HomePage from './pages/HomePage'
import GamesPage from './pages/GamesPage'
import StudiosPage from './pages/StudiosPage'
import AboutPage from './pages/AboutPage'
import MontyHallGame from './pages/MontyHallGame'
import OmokGamePage from './pages/OmokGamePage'
import KnightTourPage from './pages/KnightTourPage'
import './App.css'

// 스크롤 초기화 컴포넌트
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// 레이아웃 컴포넌트
const Layout = ({ children }: { children: ReactNode }) => {
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
    <>
      <GlobalStyles />
      {children}
    </>
  )
}

// 라우팅 구성 요소
const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/studios" element={<StudiosPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/games/monty-hall" element={<MontyHallGame />} />
        <Route path="/games/omok" element={<OmokGamePage />} />
        <Route path="/games/knight-tour" element={<KnightTourPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  )
}

export default App
