import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// 이미지 경로
const gameHeroImage = '/images/games-hero.svg';
const montyHallImage = '/images/monty-hall.svg';
const battlegroundsImage = '/images/battlegrounds.svg';
const newstateImage = '/images/newstate.svg';
const darkDarkerImage = '/images/dark-darker.svg';
const inzoiImage = '/images/inzoi.svg';
const callistoImage = '/images/callisto.svg';

const GamesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeGenre, setActiveGenre] = useState('전체');
  const [activePlatform, setActivePlatform] = useState('전체');
  const [filteredGames, setFilteredGames] = useState<any[]>([]);

  const games = [
    {
      id: 1,
      title: '몬티홀 게임',
      description: '확률론적 퍼즐 게임, 논리적 사고를 확장시켜보세요.',
      genre: '퍼즐',
      platform: 'PC/모바일',
      imageUrl: montyHallImage,
      path: '/games/monty-hall'
    },
    {
      id: 2,
      title: '배틀그라운드',
      description: '배틀로얄 장르의 대표적인 생존 슈팅 게임입니다.',
      genre: '배틀로얄',
      platform: 'PC/모바일/콘솔',
      imageUrl: battlegroundsImage,
      path: '/games/battlegrounds'
    },
    {
      id: 3,
      title: '뉴스테이트 모바일',
      description: '미래를 배경으로 한 모바일 배틀로얄 슈팅 게임입니다.',
      genre: '배틀로얄',
      platform: '모바일',
      imageUrl: newstateImage,
      path: '/games/newstate'
    },
    {
      id: 4,
      title: '다크앤다커 모바일',
      description: '어둠 속에서 펼쳐지는 익스트랙션 장르의 게임입니다.',
      genre: '익스트랙션',
      platform: '모바일',
      imageUrl: darkDarkerImage,
      path: '/games/dark-and-darker'
    },
    {
      id: 5, 
      title: '인조이',
      description: '라이프 시뮬레이션 게임으로 자신만의 세계를 구축합니다.',
      genre: '시뮬레이션',
      platform: 'PC',
      imageUrl: inzoiImage,
      path: '/games/inzoi'
    },
    {
      id: 6,
      title: '칼리스토 프로토콜',
      description: '공포 분위기의 서바이벌 호러 어드벤처 게임입니다.',
      genre: '서바이벌 호러',
      platform: 'PC/콘솔',
      imageUrl: callistoImage,
      path: '/games/callisto-protocol'
    }
  ];

  // 플랫폼 필터 옵션
  const platforms = ['전체', 'PC', '모바일', '콘솔'];

  // 장르 필터 옵션
  const genres = ['전체', '배틀로얄', '퍼즐', '시뮬레이션', '서바이벌 호러', '익스트랙션'];

  // 필터링 처리
  useEffect(() => {
    let result = [...games];
    
    if (activeGenre !== '전체') {
      result = result.filter(game => game.genre === activeGenre);
    }
    
    if (activePlatform !== '전체') {
      result = result.filter(game => game.platform.includes(activePlatform));
    }
    
    setFilteredGames(result);
  }, [activeGenre, activePlatform, games]);

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
              게임
            </HeroTitle>
            <HeroDescription
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              경환랜드의 다양한 게임을 만나보세요
            </HeroDescription>
          </HeroOverlay>
        </HeroSection>

        <ContentSection>
          <FilterContainer>
            <FilterGroup>
              <FilterLabel>플랫폼</FilterLabel>
              <FilterOptions>
                {platforms.map(platform => (
                  <FilterButton 
                    key={platform} 
                    isActive={platform === activePlatform}
                    onClick={() => setActivePlatform(platform)}
                  >
                    {platform}
                  </FilterButton>
                ))}
              </FilterOptions>
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel>장르</FilterLabel>
              <FilterOptions>
                {genres.map(genre => (
                  <FilterButton 
                    key={genre} 
                    isActive={genre === activeGenre}
                    onClick={() => setActiveGenre(genre)}
                  >
                    {genre}
                  </FilterButton>
                ))}
              </FilterOptions>
            </FilterGroup>
          </FilterContainer>

          <GamesGrid>
            {filteredGames.map(game => (
              <GameCard
                key={game.id}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <GameImageContainer>
                  <GameImage src={game.imageUrl} alt={game.title} />
                  <GameOverlay>
                    <GameLink to={game.path}>자세히 보기</GameLink>
                  </GameOverlay>
                </GameImageContainer>
                <GameInfo>
                  <GameTitle>{game.title}</GameTitle>
                  <GameGenre>{game.genre} | {game.platform}</GameGenre>
                  <GameDescription>{game.description}</GameDescription>
                </GameInfo>
              </GameCard>
            ))}
          </GamesGrid>
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
  background-image: url(${gameHeroImage});
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

const FilterContainer = styled.div`
  margin-bottom: 3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-color);
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterButton = styled.button<{ isActive: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 50px;
  border: 1px solid ${props => props.isActive ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.2)'};
  background: ${props => props.isActive ? 'var(--accent-color)' : 'transparent'};
  color: ${props => props.isActive ? '#fff' : 'var(--text-color)'};
  font-weight: ${props => props.isActive ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.isActive ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.1)'};
    border-color: ${props => props.isActive ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.3)'};
  }
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const GameCard = styled(motion.div)`
  background: rgba(26, 26, 26, 0.6);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const GameImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const GameImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;
`;

const GameOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  
  ${GameImageContainer}:hover & {
    opacity: 1;
  }
  
  ${GameImageContainer}:hover ${GameImage} {
    transform: scale(1.1);
  }
`;

const GameLink = styled(Link)`
  padding: 0.8rem 1.5rem;
  background: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--accent-color);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(123, 44, 191, 0.3);
  }
`;

const GameInfo = styled.div`
  padding: 1.5rem;
`;

const GameTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-color);
`;

const GameGenre = styled.p`
  font-size: 0.9rem;
  color: var(--accent-color);
  margin-bottom: 1rem;
`;

const GameDescription = styled.p`
  font-size: 1rem;
  color: #aaa;
  line-height: 1.6;
`;

export default GamesPage; 