import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.section`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  background-color: var(--background-color);
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 20px;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin-bottom: 30px;
  color: var(--text-color);
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const GamesButton = styled.a`
  display: inline-block;
  padding: 12px 30px;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  color: white;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(123, 44, 191, 0.3);
  }
`;

const HomePage: React.FC = () => {
  return (
    <PageContainer>
      <Navbar />
      <HeroSection>
        <Title>경환랜드에 오신 것을 환영합니다</Title>
        <Description>
          다양한 게임을 즐길 수 있는 경환랜드에서 특별한 경험을 만나보세요.
          몬티홀 퍼즐 게임부터 오목 게임까지 다양한 콘텐츠가 준비되어 있습니다.
        </Description>
        <GamesButton href="/games">게임 플레이하기</GamesButton>
      </HeroSection>
    </PageContainer>
  );
};

export default HomePage; 