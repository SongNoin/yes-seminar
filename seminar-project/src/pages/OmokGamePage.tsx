import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const BOARD_SIZE = 15;

interface CellProps {
  isBlack: boolean;
  isWhite: boolean;
}

interface SparkleProps {
  top: number;
  left: number;
  color: string;
}

const PageContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

const MainContent = styled.main`
  position: relative;
  padding-bottom: 5rem;
`;

const HeroSection = styled.section`
  height: 300px;
  background-color: #1a1a1a;
  background-image: linear-gradient(45deg, #7b2cbf 0%, #9d4edd 100%);
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
  background: rgba(0, 0, 0, 0.3);
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
  font-size: 1.2rem;
  color: #fff;
  max-width: 800px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${BOARD_SIZE}, 30px);
  grid-template-rows: repeat(${BOARD_SIZE}, 30px);
  background-color: #dcb35c;
  gap: 0;
  border: 2px solid #333;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  
  @media (max-width: 768px) {
    transform: scale(0.8);
    margin: -30px 0;
  }
  
  @media (max-width: 480px) {
    transform: scale(0.6);
    margin: -60px 0;
  }
`;

const Cell = styled.div<CellProps>`
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #333;
  }
  
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    width: 1px;
    height: 100%;
    background-color: #333;
  }
  
  ${({ isBlack }) => isBlack && `
    &::before, &::after {
      z-index: 0;
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 26px;
      height: 26px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color: black;
      z-index: 1;
    }
    
    &::after {
      content: none;
    }
  `}
  
  ${({ isWhite }) => isWhite && `
    &::before, &::after {
      z-index: 0;
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 26px;
      height: 26px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color: white;
      border: 1px solid #333;
      z-index: 1;
    }
    
    &::after {
      content: none;
    }
  `}
`;

const StoneAnimation = styled(motion.div)<{isBlack: boolean}>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: ${props => props.isBlack ? 'black' : 'white'};
  ${props => !props.isBlack && 'border: 1px solid #333;'}
  z-index: 2;
`;

const Sparkle = styled(motion.div)<SparkleProps>`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${props => props.color};
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  z-index: 3;
`;

const GameStatus = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  background: rgba(26, 26, 26, 0.6);
  border-radius: 10px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const RestartButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--accent-color);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(123, 44, 191, 0.3);
  }
`;

const RulesContainer = styled.div`
  max-width: 800px;
  margin: 4rem auto 0;
  padding: 2rem;
  background: rgba(26, 26, 26, 0.6);
  border-radius: 10px;
`;

const RulesTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
`;

const RulesList = styled.ul`
  list-style-type: disc;
  padding-left: 2rem;
  
  li {
    color: var(--text-color);
    margin-bottom: 1rem;
    line-height: 1.6;
    
    strong {
      color: var(--accent-color);
    }
  }
`;

const OmokGamePage: React.FC = () => {
  const [board, setBoard] = useState<(boolean | null)[][]>(
    Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null))
  );
  const [isBlackTurn, setIsBlackTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [lastPlacement, setLastPlacement] = useState<{row: number, col: number} | null>(null);
  const [sparkles, setSparkles] = useState<{id: number, top: number, left: number, color: string}[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const checkWin = (row: number, col: number, stone: boolean): boolean => {
    const directions = [
      [0, 1],    // 가로
      [1, 0],    // 세로
      [1, 1],    // 대각선 ↘
      [1, -1],   // 대각선 ↗
    ];
    
    for (const [dx, dy] of directions) {
      let count = 1;
      
      // 한쪽 방향으로 확인
      for (let i = 1; i < 5; i++) {
        const newRow = row + dx * i;
        const newCol = col + dy * i;
        
        if (
          newRow >= 0 && newRow < BOARD_SIZE &&
          newCol >= 0 && newCol < BOARD_SIZE &&
          board[newRow][newCol] === stone
        ) {
          count++;
        } else {
          break;
        }
      }
      
      // 반대 방향으로 확인
      for (let i = 1; i < 5; i++) {
        const newRow = row - dx * i;
        const newCol = col - dy * i;
        
        if (
          newRow >= 0 && newRow < BOARD_SIZE &&
          newCol >= 0 && newCol < BOARD_SIZE &&
          board[newRow][newCol] === stone
        ) {
          count++;
        } else {
          break;
        }
      }
      
      if (count >= 5) {
        return true;
      }
    }
    
    return false;
  };
  
  const createSparkles = (row: number, col: number, isBlack: boolean) => {
    const newSparkles = [];
    const numSparkles = 12;
    const baseColor = isBlack ? '#9d4edd' : '#ffdd00';
    
    // 오목 셀의 중앙 위치를 계산
    const cellX = col * 30 + 15; // 30px 셀 크기
    const cellY = row * 30 + 15;
    
    for (let i = 0; i < numSparkles; i++) {
      // 각 스파클에 약간의 랜덤한 색상 변화를 줌
      const colorVariation = isBlack ? 
        `hsl(${270 + Math.random() * 30}, ${70 + Math.random() * 20}%, ${50 + Math.random() * 30}%)` :
        `hsl(${45 + Math.random() * 20}, ${80 + Math.random() * 20}%, ${50 + Math.random() * 30}%)`;
        
      // 원형으로 퍼져나가는 스파클 위치
      const angle = (i / numSparkles) * Math.PI * 2;
      const distance = 15 + Math.random() * 25;
      const x = cellX + Math.cos(angle) * distance;
      const y = cellY + Math.sin(angle) * distance;
      
      newSparkles.push({
        id: Date.now() + i,
        top: y,
        left: x,
        color: colorVariation
      });
    }
    
    setSparkles(newSparkles);
    
    // 애니메이션이 끝나면 스파클 제거
    setTimeout(() => {
      setSparkles([]);
    }, 1000);
  };
  
  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] !== null || winner) {
      return;
    }
    
    const newBoard = [...board.map(row => [...row])];
    newBoard[row][col] = isBlackTurn;
    setBoard(newBoard);
    setLastPlacement({ row, col });
    
    // 스파클 애니메이션 생성
    createSparkles(row, col, isBlackTurn);
    
    if (checkWin(row, col, isBlackTurn)) {
      setWinner(isBlackTurn ? '흑돌' : '백돌');
    } else {
      setIsBlackTurn(!isBlackTurn);
    }
  };
  
  const resetGame = () => {
    setBoard(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)));
    setIsBlackTurn(true);
    setWinner(null);
    setLastPlacement(null);
    setSparkles([]);
  };

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
              오목 게임
            </HeroTitle>
            <HeroDescription
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              전통적인 오목 게임을 온라인으로 즐겨보세요
            </HeroDescription>
          </HeroOverlay>
        </HeroSection>
        
        <GameContainer>
          <GameStatus
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {winner 
              ? `${winner}이 이겼습니다!` 
              : `현재 차례: ${isBlackTurn ? '흑돌' : '백돌'}`
            }
          </GameStatus>
          
          <BoardContainer>
            {board.map((row, rowIndex) => (
              row.map((cell, colIndex) => (
                <Cell
                  key={`${rowIndex}-${colIndex}`}
                  isBlack={cell === true}
                  isWhite={cell === false}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                />
              ))
            ))}
            
            {/* 스파클 애니메이션 */}
            <AnimatePresence>
              {sparkles.map((sparkle) => (
                <Sparkle
                  key={sparkle.id}
                  top={sparkle.top}
                  left={sparkle.left}
                  color={sparkle.color}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ 
                    scale: [0, 1.5, 0],
                    opacity: [1, 0.8, 0],
                    rotate: Math.random() * 360
                  }}
                  transition={{ 
                    duration: 0.8 + Math.random() * 0.4,
                    ease: "easeOut" 
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                />
              ))}
            </AnimatePresence>
            
            {/* 마지막에 놓은 돌 애니메이션 */}
            {lastPlacement && (
              <StoneAnimation
                isBlack={board[lastPlacement.row][lastPlacement.col] === true}
                initial={{ scale: 1.3, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  top: lastPlacement.row * 30 + 15,
                  left: lastPlacement.col * 30 + 15,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            )}
          </BoardContainer>
          
          <RestartButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
          >
            게임 다시 시작
          </RestartButton>
          
          <RulesContainer>
            <RulesTitle>게임 규칙</RulesTitle>
            <RulesList>
              <li><strong>게임 목표:</strong> 자신의 돌 5개를 가로, 세로, 대각선으로 연속해서 놓으면 승리합니다.</li>
              <li><strong>턴 진행:</strong> 흑돌이 먼저 시작하며, 이후 흑백이 번갈아가며 돌을 놓습니다.</li>
              <li><strong>착수:</strong> 바둑판의 빈 자리에만 돌을 놓을 수 있습니다.</li>
              <li><strong>승리 조건:</strong> 자신의 돌이 5개 연속으로 놓이면 즉시 승리합니다.</li>
              <li><strong>무승부:</strong> 바둑판이 모두 채워지고 승자가 없으면 무승부입니다.</li>
            </RulesList>
          </RulesContainer>
        </GameContainer>
      </MainContent>
      <Footer />
    </PageContainer>
  );
};

export default OmokGamePage; 