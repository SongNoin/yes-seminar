import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderContainer
      animate={{ backgroundColor: isScrolled ? 'rgba(10, 10, 10, 0.9)' : 'transparent' }}
      transition={{ duration: 0.3 }}
    >
      <LogoContainer>
        <Logo
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          GameZone
        </Logo>
      </LogoContainer>
      
      <NavLinks>
        {['홈', '게임', '랭킹', '소개'].map((item, index) => (
          <NavItem
            key={item}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.1, color: 'var(--accent-color)' }}
          >
            {item}
          </NavItem>
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
            {['홈', '게임', '랭킹', '소개'].map((item, index) => (
              <MobileNavItem
                key={item}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, x: 10, color: 'var(--accent-color)' }}
              >
                {item}
              </MobileNavItem>
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
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
`;

const LogoContainer = styled.div`
  z-index: 101;
`;

const Logo = styled(motion.h1)`
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: var(--neon-glow);
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(motion.a)`
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--accent-color);
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled(motion.div)`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;
  z-index: 101;
  
  span {
    display: block;
    height: 3px;
    width: 100%;
    background-color: var(--text-color);
    border-radius: 3px;
    transition: all 0.3s ease;
  }
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  height: 100vh;
  background-color: var(--background-color);
  z-index: 100;
  display: flex;
  flex-direction: column;
  padding: 5rem 2rem;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
`;

const MobileNavItem = styled(motion.a)`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 1rem 0;
  cursor: pointer;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  color: var(--text-color);
  background: none;
  border: none;
  cursor: pointer;
`;

export default Header; 