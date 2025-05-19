import { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

// 이미지 경로
const studioHeroImage = '/images/studios-hero.png';
const pubgStudioImage = '/images/pubg-studio.png';
const pubgLogoImage = '/images/pubg-logo.png';
const blueholeStudioImage = '/images/bluehole-studio.png';
const blueholeLogoImage = '/images/bluehole-logo.png';
const inzoiStudioImage = '/images/inzoi-studio.png';
const inzoiLogoImage = '/images/inzoi-logo.png';
const sdsStudioImage = '/images/sds-studio.png';
const sdsLogoImage = '/images/sds-logo.png';
const uwStudioImage = '/images/uw-studio.png';
const uwLogoImage = '/images/uw-logo.png';
const rwStudioImage = '/images/rw-studio.png';
const rwLogoImage = '/images/rw-logo.png';

const StudiosPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const studios = [
    {
      id: 1,
      name: '펍지 스튜디오',
      description: '배틀그라운드 시리즈를 개발한 메인 스튜디오입니다.',
      location: '서울, 대한민국',
      games: ['PUBG: 배틀그라운드', '뉴스테이트 모바일'],
      logoUrl: pubgLogoImage,
      imageUrl: pubgStudioImage
    },
    {
      id: 2,
      name: '블루홀 스튜디오',
      description: 'MMORPG 및 모바일 게임 개발을 담당하는 스튜디오입니다.',
      location: '서울, 대한민국',
      games: ['다크앤다커 모바일', '테라'],
      logoUrl: blueholeLogoImage,
      imageUrl: blueholeStudioImage
    },
    {
      id: 3,
      name: '인조이 스튜디오',
      description: '라이프 시뮬레이션 게임을 개발하는 스튜디오입니다.',
      location: '서울, 대한민국',
      games: ['인조이'],
      logoUrl: inzoiLogoImage,
      imageUrl: inzoiStudioImage
    },
    {
      id: 4,
      name: '스트라이킹 디스턴스 스튜디오',
      description: '서바이벌 호러 게임을 개발하는 해외 스튜디오입니다.',
      location: '캘리포니아, 미국',
      games: ['칼리스토 프로토콜', '[리댁티드]'],
      logoUrl: sdsLogoImage,
      imageUrl: sdsStudioImage
    },
    {
      id: 5,
      name: '언노운 월즈',
      description: '오픈 월드 생존 게임을 개발하는 스튜디오입니다.',
      location: '샌프란시스코, 미국',
      games: ['서브노티카', '서브노티카: 빌로우 제로'],
      logoUrl: uwLogoImage,
      imageUrl: uwStudioImage
    },
    {
      id: 6,
      name: '라이징윙스',
      description: '캐주얼 및 미들코어 모바일 게임을 개발하는 스튜디오입니다.',
      location: '서울, 대한민국',
      games: ['골프킹: 월드투어', '디펜스 더비'],
      logoUrl: rwLogoImage,
      imageUrl: rwStudioImage
    }
  ];

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <HeroSection>
          <HeroOverlay>
            <HeroTitle
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              스튜디오
            </HeroTitle>
            <HeroDescription
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              경환랜드의 게임 개발 스튜디오를 소개합니다
            </HeroDescription>
          </HeroOverlay>
        </HeroSection>

        <ContentSection>
          <StudioList>
            {studios.map((studio, index) => (
              <StudioCard
                key={studio.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <StudioImageContainer>
                  <StudioImage src={studio.imageUrl} alt={studio.name} />
                  <StudioLogo src={studio.logoUrl} alt={`${studio.name} 로고`} />
                </StudioImageContainer>
                <StudioInfo>
                  <StudioName>{studio.name}</StudioName>
                  <StudioLocation>{studio.location}</StudioLocation>
                  <StudioDescription>{studio.description}</StudioDescription>
                  <GamesTitle>대표 게임</GamesTitle>
                  <GamesList>
                    {studio.games.map(game => (
                      <GameItem key={game}>{game}</GameItem>
                    ))}
                  </GamesList>
                </StudioInfo>
              </StudioCard>
            ))}
          </StudioList>
        </ContentSection>
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

const HeroSection = styled.section`
  height: 400px;
  background-image: url(${studioHeroImage});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  text-align: center;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroDescription = styled(motion.p)`
  font-size: 1.5rem;
  color: #ddd;
  max-width: 800px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 5rem;
`;

const StudioList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const StudioCard = styled(motion.div)`
  display: flex;
  gap: 2rem;
  background: rgba(26, 26, 26, 0.4);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StudioImageContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  
  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const StudioImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StudioLogo = styled.img`
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const StudioInfo = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const StudioName = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-color);
`;

const StudioLocation = styled.p`
  font-size: 1rem;
  color: var(--accent-color);
  margin-bottom: 1.5rem;
`;

const StudioDescription = styled.p`
  font-size: 1.1rem;
  color: #bbb;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const GamesTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const GamesList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const GameItem = styled.li`
  background: rgba(255, 255, 255, 0.08);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  color: #ddd;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary-color);
    transform: translateY(-3px);
  }
`;

export default StudiosPage; 