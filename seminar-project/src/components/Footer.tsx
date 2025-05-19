import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <LogoSection>
          <Logo>경환랜드</Logo>
          <LogoText>최고의 게임 경험을 제공합니다</LogoText>
        </LogoSection>
        
        <LinkSections>
          <LinkSection>
            <LinkTitle>바로가기</LinkTitle>
            <LinkList>
              <LinkItemNav to="/"
                whileHover={{ x: 5, color: 'var(--accent-color)' }}
                transition={{ duration: 0.2 }}
              >
                홈
              </LinkItemNav>
              <LinkItemNav to="/games"
                whileHover={{ x: 5, color: 'var(--accent-color)' }}
                transition={{ duration: 0.2 }}
              >
                게임
              </LinkItemNav>
              <LinkItemNav to="/studios"
                whileHover={{ x: 5, color: 'var(--accent-color)' }}
                transition={{ duration: 0.2 }}
              >
                스튜디오
              </LinkItemNav>
              <LinkItemNav to="/about"
                whileHover={{ x: 5, color: 'var(--accent-color)' }}
                transition={{ duration: 0.2 }}
              >
                소개
              </LinkItemNav>
            </LinkList>
          </LinkSection>
          
          <LinkSection>
            <LinkTitle>게임 카테고리</LinkTitle>
            <LinkList>
              <LinkItem
                whileHover={{ x: 5, color: 'var(--accent-color)' }}
                transition={{ duration: 0.2 }}
              >
                퍼즐
              </LinkItem>
              <LinkItem
                whileHover={{ x: 5, color: 'var(--accent-color)' }}
                transition={{ duration: 0.2 }}
              >
                배틀로얄
              </LinkItem>
              <LinkItem
                whileHover={{ x: 5, color: 'var(--accent-color)' }}
                transition={{ duration: 0.2 }}
              >
                시뮬레이션
              </LinkItem>
              <LinkItem
                whileHover={{ x: 5, color: 'var(--accent-color)' }}
                transition={{ duration: 0.2 }}
              >
                서바이벌 호러
              </LinkItem>
            </LinkList>
          </LinkSection>
          
          <LinkSection>
            <LinkTitle>지원</LinkTitle>
            <LinkList>
              <LinkItem
                whileHover={{ x: 5, color: 'var(--accent-color)' }}
                transition={{ duration: 0.2 }}
              >
                FAQ
              </LinkItem>
              <LinkItem
                whileHover={{ x: 5, color: 'var(--accent-color)' }}
                transition={{ duration: 0.2 }}
              >
                문의하기
              </LinkItem>
              <LinkItem
                whileHover={{ x: 5, color: 'var(--accent-color)' }}
                transition={{ duration: 0.2 }}
              >
                개인정보처리방침
              </LinkItem>
              <LinkItem
                whileHover={{ x: 5, color: 'var(--accent-color)' }}
                transition={{ duration: 0.2 }}
              >
                이용약관
              </LinkItem>
            </LinkList>
          </LinkSection>
        </LinkSections>
      </FooterContent>
      
      <Divider />
      
      <BottomFooter>
        <Copyright>© {currentYear} 경환랜드. All rights reserved.</Copyright>
        <SocialLinks>
          <SocialIcon
            whileHover={{ y: -5, color: 'var(--accent-color)' }}
            transition={{ duration: 0.2 }}
          >
            <i className="fab fa-twitter"></i>
          </SocialIcon>
          <SocialIcon
            whileHover={{ y: -5, color: 'var(--accent-color)' }}
            transition={{ duration: 0.2 }}
          >
            <i className="fab fa-facebook"></i>
          </SocialIcon>
          <SocialIcon
            whileHover={{ y: -5, color: 'var(--accent-color)' }}
            transition={{ duration: 0.2 }}
          >
            <i className="fab fa-instagram"></i>
          </SocialIcon>
          <SocialIcon
            whileHover={{ y: -5, color: 'var(--accent-color)' }}
            transition={{ duration: 0.2 }}
          >
            <i className="fab fa-discord"></i>
          </SocialIcon>
        </SocialLinks>
      </BottomFooter>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: var(--card-bg-color);
  padding: 5rem 5% 2rem;
  color: var(--text-color);
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  gap: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const LogoSection = styled.div`
  flex: 1;
  min-width: 250px;
`;

const Logo = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LogoText = styled.p`
  color: #aaa;
  max-width: 300px;
`;

const LinkSections = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const LinkSection = styled.div`
  flex: 1;
  min-width: 150px;
`;

const LinkTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--text-color);
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
`;

const LinkItem = styled(motion.li)`
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #aaa;
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  
  &::before {
    content: '>';
    margin-right: 0.5rem;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
    transform: translateX(5px);
  }
`;

const LinkItemNav = styled(motion(Link))`
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #aaa;
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  text-decoration: none;
  
  &::before {
    content: '>';
    margin-right: 0.5rem;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
    transform: translateX(5px);
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 3rem 0 2rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;

const BottomFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  color: #aaa;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled(motion.a)`
  font-size: 1.5rem;
  color: #aaa;
  cursor: pointer;
  transition: color 0.3s ease;
`;

export default Footer; 