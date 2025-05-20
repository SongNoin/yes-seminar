import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (heroRef.current && textRef.current) {
      // 배경 파티클 효과
      const particles = Array.from({ length: 20 }, () => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.setProperty('--size', `${Math.random() * 30 + 10}px`);
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        heroRef.current?.appendChild(particle);
        return particle;
      });
      
      // 파티클 애니메이션
      particles.forEach(particle => {
        gsap.to(particle, {
          x: Math.random() * 200 - 100,
          y: Math.random() * 200 - 100,
          opacity: Math.random() * 0.5 + 0.3,
          duration: Math.random() * 20 + 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
      
      // 텍스트 애니메이션
      const textTimeline = gsap.timeline();
      textTimeline.fromTo(
        textRef.current.querySelectorAll('h1, p, button'),
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: 'power3.out' }
      );
      
      return () => {
        particles.forEach(particle => particle.remove());
      };
    }
  }, []);
  
  return (
    <HeroContainer ref={heroRef}>
      <HeroContent>
        <TextContent ref={textRef}>
          <Title
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <GradientText>경환랜드</GradientText>에서 게임의 세계를 탐험하세요
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            혁신적인 게임 경험을 제공하는 경환랜드에 오신 것을 환영합니다
          </Subtitle>
          <ButtonGroup
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <PrimaryButton
              as={Link}
              to="/games"
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(123, 44, 191, 0.7)' }}
              whileTap={{ scale: 0.95 }}
            >
              게임 시작하기
            </PrimaryButton>
            <SecondaryButton
              as={Link}
              to="/about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              경환랜드 소개
            </SecondaryButton>
          </ButtonGroup>
        </TextContent>
      </HeroContent>
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
  
  .particle {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(to right, var(--primary-color), var(--accent-color));
    width: var(--size);
    height: var(--size);
    opacity: 0.2;
    filter: blur(8px);
    pointer-events: none;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, transparent 20%, var(--background-color) 70%);
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 200px;
    background: linear-gradient(to top, var(--background-color), transparent);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  width: 90%;
  max-width: 1200px;
  text-align: center;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.2;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(to right, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: #aaa;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  box-shadow: 0 4px 15px rgba(123, 44, 191, 0.3);
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  color: var(--text-color);
  border: 2px solid var(--accent-color);
`;

export default HeroSection; 