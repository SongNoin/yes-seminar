import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: rgba(15, 15, 15, 0.9);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${props => props.isOpen ? '0' : '-100%'};
    width: 70%;
    height: 100vh;
    background-color: var(--background-color);
    flex-direction: column;
    justify-content: center;
    transition: right 0.3s ease-in-out;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
    z-index: 1001;
  }
`;

const NavLink = styled(Link)<{ isActive: boolean }>`
  margin: 0 1.2rem;
  font-size: 1rem;
  color: ${props => props.isActive ? 'var(--accent-color)' : 'white'};
  font-weight: ${props => props.isActive ? '600' : '400'};
  position: relative;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.isActive ? '100%' : '0'};
    height: 2px;
    background-color: var(--accent-color);
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: var(--accent-color);
    
    &::after {
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    margin: 1.5rem 0;
    font-size: 1.3rem;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  z-index: 1002;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: white;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // 모바일 메뉴 열렸을 때 스크롤 방지
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <NavbarContainer>
      <Logo to="/">경환랜드</Logo>
      
      <MobileMenuButton onClick={toggleMenu}>
        <i className="fas fa-bars"></i>
      </MobileMenuButton>
      
      <Overlay isOpen={isMenuOpen} onClick={toggleMenu} />
      
      <NavLinks isOpen={isMenuOpen}>
        <CloseButton onClick={toggleMenu}>
          <i className="fas fa-times"></i>
        </CloseButton>
        <NavLink to="/" isActive={location.pathname === '/'} onClick={() => setIsMenuOpen(false)}>
          홈
        </NavLink>
        <NavLink to="/games" isActive={location.pathname.includes('/games')} onClick={() => setIsMenuOpen(false)}>
          게임
        </NavLink>
        <NavLink to="/studios" isActive={location.pathname === '/studios'} onClick={() => setIsMenuOpen(false)}>
          스튜디오
        </NavLink>
        <NavLink to="/about" isActive={location.pathname === '/about'} onClick={() => setIsMenuOpen(false)}>
          소개
        </NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar; 