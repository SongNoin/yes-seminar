import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { Game, GameCategory } from '../types';
import GameCard from './GameCard';

const mockGames: Game[] = [
  {
    id: '7',
    title: '몬티홀 문제',
    description: '확률 이론의 유명한 문제를 게임으로 체험해보세요',
    imageUrl: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?q=80&w=1000',
    path: '/games/monty-hall',
    category: 'puzzle',
    tags: ['퍼즐', '확률', '선택'],
    isNew: true,
    isFeatured: true
  },
  {
    id: '1',
    title: '블록 퍼즐',
    description: '다양한 모양의 블록을 맞춰 줄을 완성하는 퍼즐 게임',
    imageUrl: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=1000',
    path: '/games/puzzle',
    category: 'puzzle',
    tags: ['퍼즐', '논리', '빠른 사고'],
    isNew: true
  },
  {
    id: '2',
    title: '스페이스 슈터',
    description: '우주선을 조종해 적들을 물리치는 슈팅 게임',
    imageUrl: 'https://images.unsplash.com/photo-1614294149010-950b698f72c0?q=80&w=1000',
    path: '/games/space-shooter',
    category: 'action',
    tags: ['액션', '슈팅', '스킬'],
    isFeatured: true
  },
  {
    id: '3',
    title: '메모리 카드',
    description: '카드를 뒤집어 짝을 맞추는 메모리 게임',
    imageUrl: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?q=80&w=1000',
    path: '/games/memory',
    category: 'card',
    tags: ['카드', '메모리', '집중력']
  },
  {
    id: '4',
    title: '체스 마스터',
    description: '전략적 사고가 필요한 클래식 체스 게임',
    imageUrl: 'https://images.unsplash.com/photo-1560174038-594a6e21a4d1?q=80&w=1000',
    path: '/games/chess',
    category: 'strategy',
    tags: ['전략', '두뇌', '계획']
  },
  {
    id: '5',
    title: '미로 탈출',
    description: '복잡한 미로를 탐험하며 출구를 찾는 모험 게임',
    imageUrl: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1000',
    path: '/games/maze',
    category: 'puzzle',
    tags: ['미로', '퍼즐', '탐험'],
    isNew: true
  },
  {
    id: '6',
    title: '아케이드 레이서',
    description: '고속 레이싱 경험을 제공하는 아케이드 레이싱 게임',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000',
    path: '/games/racer',
    category: 'arcade',
    tags: ['레이싱', '속도', '반응속도'],
    isFeatured: true
  }
];

const categories: GameCategory[] = ['all' as GameCategory, 'puzzle', 'arcade', 'strategy', 'action', 'card'];

const GameGrid = () => {
  const [games, setGames] = useState<Game[]>(mockGames);
  const [activeCategory, setActiveCategory] = useState<GameCategory | 'all'>('all');
  const [visibleGames, setVisibleGames] = useState<Game[]>(mockGames);
  
  useEffect(() => {
    if (activeCategory === 'all') {
      setVisibleGames(games);
    } else {
      setVisibleGames(games.filter(game => game.category === activeCategory));
    }
  }, [activeCategory, games]);
  
  const categoryLabels: Record<GameCategory | 'all', string> = {
    all: '전체',
    puzzle: '퍼즐',
    arcade: '아케이드',
    strategy: '전략',
    action: '액션',
    card: '카드'
  };
  
  return (
    <Container>
      <SectionTitle>인기 게임</SectionTitle>
      <FilterContainer>
        {categories.map((category) => (
          <FilterButton
            key={category}
            isActive={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {categoryLabels[category]}
          </FilterButton>
        ))}
      </FilterContainer>
      
      <motion.div layout>
        <GamesGrid>
          {visibleGames.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </GamesGrid>
      </motion.div>
      
      <MoreButtonContainer>
        <MoreButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          더 많은 게임 보기
        </MoreButton>
      </MoreButtonContainer>
    </Container>
  );
};

const Container = styled.section`
  padding: 5rem 5%;
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
  
  @media (max-width: 576px) {
    gap: 0.5rem;
  }
`;

const FilterButton = styled(motion.button)<{ isActive: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.isActive ? 'var(--primary-color)' : 'var(--card-bg-color)'};
  color: ${props => props.isActive ? 'white' : 'var(--text-color)'};
  border: ${props => props.isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.1)'};
  
  @media (max-width: 576px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 576px) {
    gap: 1.5rem;
  }
`;

const MoreButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const MoreButton = styled(motion.button)`
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  background-color: transparent;
  color: var(--text-color);
  border: 2px solid var(--accent-color);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(123, 44, 191, 0.1);
  }
`;

export default GameGrid; 