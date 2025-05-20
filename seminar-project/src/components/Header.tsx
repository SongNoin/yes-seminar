import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: '홈', path: '/' },
    { name: '게임', path: '/games' },
    { name: '스튜디오', path: '/studios' },
    { name: '소개', path: '/about' }
  ];

  // 경로가 활성 상태인지 확인
  const isPathActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // 네비게이션 처리 함수
  const handleNavigation = (path: string) => {
    console.log('Header navigating to:', path);
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <HeaderContainer
      animate={{ backgroundColor: isScrolled ? 'rgba(10, 10, 10, 0.9)' : 'transparent' }}
      transition={{ duration: 0.3 }}
    >
      <LogoContainer>
        <LogoLink onClick={() => handleNavigation('/')}>
          <Logo
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            경환랜드
          </Logo>
        </LogoLink>
      </LogoContainer>
      
      <NavLinks>
        {menuItems.map((item, index) => (
          <Link 
            to={item.path} 
            key={item.name} 
            style={{ textDecoration: 'none' }}
          >
            <NavItemLink 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, color: 'var(--accent-color)' }}
              isActive={isPathActive(item.path)}
            >
              {item.name}
            </NavItemLink>
          </Link>
        ))}
      </NavLinks>
      
      <MobileMenuButton
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span></span>
        <span></span>
        <span></span>
      </MobileMenuButton>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <CloseButton
              onClick={() => setIsMobileMenuOpen(false)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </CloseButton>
            {menuItems.map((item, index) => (
              <Link 
                to={item.path}
                key={item.name} 
                style={{ textDecoration: 'none' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MobileNavItemLink
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 10, color: 'var(--accent-color)' }}
                  isActive={isPathActive(item.path)}
                >
                  {item.name}
                </MobileNavItemLink>
              </Link>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  background-color: rgba(10, 10, 10, 0.8);
`;

const LogoContainer = styled.div`
  z-index: 101;
`;

const Logo = styled(motion.h1)`
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin: 0;
  cursor: pointer;
`;

const LogoLink = styled.div`
  cursor: pointer;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItemLink = styled(motion.span)<{ isActive: boolean }>`
  font-size: 1.1rem;
  font-weight: ${props => props.isActive ? '600' : '400'};
  color: ${props => props.isActive ? 'var(--accent-color)' : 'white'};
  cursor: pointer;
  padding: 0.5rem 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.isActive ? '100%' : '0'};
    height: 2px;
    background-color: var(--accent-color);
    transition: all 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 25px;
  position: relative;
  z-index: 101;
  
  span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: white;
    border-radius: 3px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: .25s ease-in-out;
    
    &:nth-child(1) {
      top: 0px;
    }
    
    &:nth-child(2) {
      top: 10px;
    }
    
    &:nth-child(3) {
      top: 20px;
    }
  }
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 75%;
  max-width: 300px;
  height: 100vh;
  background: rgba(25, 25, 25, 0.95);
  z-index: 100;
  padding: 5rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: transparent;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
`;

const MobileNavItemLink = styled(motion.span)<{ isActive: boolean }>`
  font-size: 1.4rem;
  font-weight: ${props => props.isActive ? '600' : '400'};
  color: ${props => props.isActive ? 'var(--accent-color)' : 'white'};
  padding: 0.5rem 0;
  display: block;
`;

export default Header;