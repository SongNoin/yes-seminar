import { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import GameGrid from '../components/GameGrid';
import Footer from '../components/Footer';

const HomePage = () => {
  useEffect(() => {
    // 페이지 로드 시 상단으로 스크롤
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <HeroSection />
        <GameGrid />
        <NewsletterSection>
          <NewsletterContainer>
            <NewsletterContent>
              <NewsletterTitle>최신 게임 소식 받기</NewsletterTitle>
              <NewsletterDescription>
                새로운 게임과 이벤트 소식을 가장 먼저 받아보세요!
              </NewsletterDescription>
            </NewsletterContent>
            <NewsletterForm>
              <NewsletterInput type="email" placeholder="이메일 주소" />
              <SubscribeButton>구독하기</SubscribeButton>
            </NewsletterForm>
          </NewsletterContainer>
        </NewsletterSection>
      </MainContent>
      <Footer />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

const MainContent = styled.main`
  position: relative;
`;

const NewsletterSection = styled.section`
  padding: 5rem 5%;
  background-color: rgba(26, 26, 26, 0.7);
  background-image: linear-gradient(45deg, var(--background-color) 25%, transparent 25%, transparent 50%, var(--background-color) 50%, var(--background-color) 75%, transparent 75%, transparent);
  background-size: 10px 10px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(10, 10, 10, 0.8);
    z-index: 1;
  }
`;

const NewsletterContainer = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const NewsletterContent = styled.div`
  flex: 1;
  min-width: 300px;
`;

const NewsletterTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--text-color);
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const NewsletterDescription = styled.p`
  color: #aaa;
  font-size: 1.1rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  flex: 1;
  min-width: 300px;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 1rem;
  border-radius: 50px;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--text-color);
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  
  &:focus {
    background-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 2px var(--primary-color);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SubscribeButton = styled.button`
  padding: 1rem 2rem;
  border-radius: 50px;
  border: none;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 15px rgba(123, 44, 191, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export default HomePage; 