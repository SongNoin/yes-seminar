import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { Game } from '../types';
import { useNavigate } from 'react-router-dom';

interface GameCardProps {
  game: Game;
  index: number;
}

const GameCard = ({ game, index }: GameCardProps) => {
  const navigate = useNavigate();

  const handlePlay = () => {
    console.log(`게임 경로로 이동: ${game.path}`);
    navigate(game.path);
  };

  return (
    <CardContainer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, boxShadow: '0 20px 30px rgba(0, 0, 0, 0.3)' }}
      onClick={handlePlay}
    >
      <ImageContainer>
        <GameImage src={game.imageUrl} alt={game.title} />
        {game.isNew && <NewBadge>NEW</NewBadge>}
        {game.isFeatured && <FeaturedBadge>인기</FeaturedBadge>}
      </ImageContainer>
      
      <CardContent>
        <GameTitle>{game.title}</GameTitle>
        <GameDescription>{game.description}</GameDescription>
        
        <TagContainer>
          {game.tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagContainer>
      </CardContent>
      
      <PlayButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePlay}
      >
        플레이하기
      </PlayButton>
    </CardContainer>
  );
};

const CardContainer = styled(motion.div)`
  background-color: var(--card-bg-color);
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  position: relative;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const GameImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${CardContainer}:hover & {
    transform: scale(1.1);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  z-index: 2;
`;

const NewBadge = styled(Badge)`
  right: 10px;
  background-color: var(--accent-color);
  color: var(--background-color);
`;

const FeaturedBadge = styled(Badge)`
  left: 10px;
  background-color: var(--primary-color);
  color: var(--text-color);
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const GameTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text-color);
`;

const GameDescription = styled.p`
  font-size: 0.9rem;
  color: #aaa;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  background-color: rgba(123, 44, 191, 0.2);
  color: var(--accent-color);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
`;

const PlayButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export default GameCard; 