import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const KnightTourPage = () => {
  // 보드 크기 상태
  const [boardSize, setBoardSize] = useState(5);
  // 방문한 칸들 상태
  const [visitedCells, setVisitedCells] = useState<number[][]>([]);
  // 현재 위치 상태
  const [currentPosition, setCurrentPosition] = useState<number[] | null>(null);
  // 게임 상태 (시작 안함, 진행 중, 완료)
  const [gameState, setGameState] = useState('not-started');
  // 경과 시간
  const [elapsedTime, setElapsedTime] = useState(0);
  // 타이머 간격 ID
  const [intervalId, setIntervalId] = useState<number | null>(null);
  // 다음 가능한 이동을 하이라이트하기 위한 상태
  const [highlightedCells, setHighlightedCells] = useState<number[][]>([]);
  // 마지막 이동 위치 기억
  const [lastMove, setLastMove] = useState<number[] | null>(null);
  // 무빙 애니메이션 상태
  const [isMoving, setIsMoving] = useState(false);

  // 기사가 이동 가능한 방향들
  const knightMoves = [
    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
    [1, -2], [1, 2], [2, -1], [2, 1]
  ];

  // 보드 크기 변경 핸들러
  const handleBoardSizeChange = (size: number) => {
    if (gameState === 'in-progress') return;
    setBoardSize(size);
    resetGame();
  };

  // 게임 리셋 함수
  const resetGame = () => {
    setVisitedCells([]);
    setCurrentPosition(null);
    setGameState('not-started');
    setElapsedTime(0);
    setHighlightedCells([]);
    setLastMove(null);
    setIsMoving(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  // 셀 클릭 핸들러
  const handleCellClick = (row: number, col: number) => {
    // 애니메이션 중이면 클릭 무시
    if (isMoving) return;
    
    // 게임이 완료된 상태면 아무 동작 안함
    if (gameState === 'completed') return;

    // 첫 번째 클릭이면 게임 시작
    if (gameState === 'not-started') {
      setGameState('in-progress');
      setCurrentPosition([row, col]);
      setVisitedCells([[row, col]]);
      
      // 가능한 다음 이동 표시
      updateHighlightedCells([row, col]);
      
      // 타이머 시작
      const id = window.setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
      setIntervalId(id);
      return;
    }

    // 게임이 진행 중이면
    if (gameState === 'in-progress' && currentPosition) {
      const [currentRow, currentCol] = currentPosition;
      
      // 현재 위치에서 클릭한 위치로 기사가 이동할 수 있는지 확인
      const canMove = knightMoves.some(([dRow, dCol]) => {
        return currentRow + dRow === row && currentCol + dCol === col;
      });

      // 이미 방문한 셀인지 확인
      const isVisited = visitedCells.some(([vRow, vCol]) => vRow === row && vCol === col);

      // 유효한 이동이면 현재 위치 업데이트
      if (canMove && !isVisited) {
        // 이동 애니메이션 시작
        setIsMoving(true);
        setLastMove([...currentPosition]);

        // 이동 사운드 효과 (선택 사항)
        try {
          const moveSound = new Audio('/sounds/move.mp3');
          moveSound.volume = 0.5;
          moveSound.play().catch(e => console.log('소리 재생 실패:', e));
        } catch (error) {
          console.log('소리 재생 오류:', error);
        }
        
        // 약간의 지연 후 위치 업데이트 (애니메이션 효과)
        setTimeout(() => {
          setCurrentPosition([row, col]);
          const newVisitedCells = [...visitedCells, [row, col]];
          setVisitedCells(newVisitedCells);
          
          // 다음 가능한 이동 업데이트
          updateHighlightedCells([row, col]);
          
          // 모든 셀을 방문했는지 확인
          if (newVisitedCells.length === boardSize * boardSize) {
            setGameState('completed');
            setHighlightedCells([]);
            if (intervalId) {
              clearInterval(intervalId);
              setIntervalId(null);
            }
            
            // 클리어 사운드 효과 (선택 사항)
            try {
              const clearSound = new Audio('/sounds/clear.mp3');
              clearSound.volume = 0.7;
              clearSound.play().catch(e => console.log('소리 재생 실패:', e));
            } catch (error) {
              console.log('소리 재생 오류:', error);
            }
          }
          
          setIsMoving(false);
        }, 200);
      } else if (!canMove) {
        // 잘못된 이동 표시 (선택 사항)
        const cellElement = document.getElementById(`cell-${row}-${col}`);
        if (cellElement) {
          cellElement.classList.add('invalid-move');
          setTimeout(() => {
            cellElement.classList.remove('invalid-move');
          }, 300);
        }
      }
    }
  };

  // 가능한 다음 이동을 하이라이트하는 함수
  const updateHighlightedCells = (position: number[]) => {
    const [row, col] = position;
    const possibleMoves: number[][] = [];
    
    knightMoves.forEach(([dRow, dCol]) => {
      const newRow = row + dRow;
      const newCol = col + dCol;
      
      if (newRow >= 0 && newRow < boardSize && 
          newCol >= 0 && newCol < boardSize && 
          !visitedCells.some(([vRow, vCol]) => vRow === newRow && vCol === newCol)) {
        possibleMoves.push([newRow, newCol]);
      }
    });
    
    setHighlightedCells(possibleMoves);
  };

  // 힌트 보기 핸들러
  const handleShowHint = () => {
    if (gameState !== 'in-progress' || !currentPosition) return;
    
    // 현재 위치에서 이동 가능한 위치들 계산
    const [currentRow, currentCol] = currentPosition;
    const possibleMoves = knightMoves
      .map(([dRow, dCol]) => {
        const newRow = currentRow + dRow;
        const newCol = currentCol + dCol;
        
        // 보드 범위 내인지 확인
        if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
          // 아직 방문하지 않은 셀인지 확인
          const isVisited = visitedCells.some(([vRow, vCol]) => vRow === newRow && vCol === newCol);
          
          if (!isVisited) {
            return [newRow, newCol];
          }
        }
        return null;
      })
      .filter(move => move !== null) as number[][];
      
    // 디버깅 메시지
    console.log('가능한 이동:', possibleMoves);
    
    // 가능한 이동이 없으면 게임 종료
    if (possibleMoves.length === 0) {
      alert('더 이상 이동할 수 없습니다. 게임을 다시 시작합니다.');
      resetGame();
      return;
    }
    
    // 웜스도르프 알고리즘을 사용하여 최적의 다음 이동 선택
    // 이동할 수 있는 셀 중에서 다시 이동할 수 있는 셀이 가장 적은 셀 선택
    let bestMove = possibleMoves[0];
    let minNextMoves = Infinity;
    
    possibleMoves.forEach(([moveRow, moveCol]) => {
      let nextMoveCount = 0;
      
      // 이 위치에서 다시 이동할 수 있는 위치의 수 계산
      knightMoves.forEach(([dRow, dCol]) => {
        const nextRow = moveRow + dRow;
        const nextCol = moveCol + dCol;
        
        if (nextRow >= 0 && nextRow < boardSize && 
            nextCol >= 0 && nextCol < boardSize && 
            !visitedCells.some(([vRow, vCol]) => vRow === nextRow && vCol === nextCol)) {
          nextMoveCount++;
        }
      });
      
      if (nextMoveCount < minNextMoves) {
        minNextMoves = nextMoveCount;
        bestMove = [moveRow, moveCol];
      }
    });
    
    // 최적의 이동 위치 하이라이트
    setHighlightedCells([bestMove]);
    
    // 힌트 표시 셀에 애니메이션 효과 추가
    const cellElement = document.getElementById(`cell-${bestMove[0]}-${bestMove[1]}`);
    if (cellElement) {
      cellElement.classList.add('hint-animation');
      setTimeout(() => {
        cellElement.classList.remove('hint-animation');
      }, 2000);
    }
  };

  // 되돌리기 핸들러
  const handleUndo = () => {
    if (gameState !== 'in-progress' || visitedCells.length <= 1 || isMoving) return;
    
    const newVisitedCells = [...visitedCells];
    newVisitedCells.pop();
    setVisitedCells(newVisitedCells);
    
    const newPosition = newVisitedCells[newVisitedCells.length - 1];
    setCurrentPosition(newPosition);
    
    // 다음 가능한 이동 업데이트
    updateHighlightedCells(newPosition);
  };

  // 셀 색상 계산 함수
  const getCellColor = (row: number, col: number) => {
    // 체스판 패턴
    const isLightCell = (row + col) % 2 === 0;
    
    // 현재 위치
    if (currentPosition && currentPosition[0] === row && currentPosition[1] === col) {
      return 'var(--accent-color)';
    }
    
    // 마지막 이동 위치
    if (lastMove && lastMove[0] === row && lastMove[1] === col && isMoving) {
      return 'rgba(123, 44, 191, 0.5)';
    }
    
    // 방문한 셀
    const visitIndex = visitedCells.findIndex(([vRow, vCol]) => vRow === row && vCol === col);
    if (visitIndex !== -1) {
      // 방문 순서에 따라 색상 그라데이션
      return `rgba(123, 44, 191, ${0.3 + (visitIndex / visitedCells.length) * 0.7})`;
    }
    
    // 하이라이트된 셀 (가능한 이동)
    const isHighlighted = highlightedCells.some(([hRow, hCol]) => hRow === row && hCol === col);
    if (isHighlighted) {
      return 'rgba(123, 44, 191, 0.3)';
    }
    
    return isLightCell ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.2)';
  };

  // 방문 순서 표시 함수
  const getVisitOrder = (row: number, col: number) => {
    const index = visitedCells.findIndex(([vRow, vCol]) => vRow === row && vCol === col);
    return index !== -1 ? index + 1 : '';
  };

  // 포맷된 시간 문자열 계산
  const formattedTime = () => {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

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
              기사의 여행
            </HeroTitle>
            <HeroDescription
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              체스의 기사 말을 이용하여 모든 칸을 정확히 한 번씩 방문하는 퍼즐
            </HeroDescription>
          </HeroOverlay>
        </HeroSection>

        <ContentSection>
          <GameContainer>
            <GameControls>
              <SizeSelector>
                <SizeLabel>보드 크기 선택:</SizeLabel>
                <SizeOptions>
                  {[5, 6, 7, 8].map(size => (
                    <SizeButton
                      key={size}
                      isActive={boardSize === size}
                      onClick={() => handleBoardSizeChange(size)}
                      disabled={gameState === 'in-progress'}
                    >
                      {size}x{size}
                    </SizeButton>
                  ))}
                </SizeOptions>
              </SizeSelector>

              <GameStatus>
                {gameState === 'not-started' && (
                  <StatusText>아래 체스판에서 시작할 칸을 클릭하세요</StatusText>
                )}
                {gameState === 'in-progress' && (
                  <StatusText>
                    <span>경과 시간: {formattedTime()}</span>
                    <MoveCounter>이동 횟수: {visitedCells.length}/{boardSize * boardSize}</MoveCounter>
                  </StatusText>
                )}
                {gameState === 'completed' && (
                  <StatusText completed>🎉 클리어 성공! 시간: {formattedTime()}</StatusText>
                )}
              </GameStatus>

              <ButtonGroup>
                <ControlButton 
                  onClick={resetGame}
                  title="게임을 처음부터 다시 시작합니다"
                >
                  🔄 다시 시작
                </ControlButton>
                <ControlButton 
                  onClick={handleUndo}
                  disabled={gameState !== 'in-progress' || visitedCells.length <= 1 || isMoving}
                  title="마지막 이동을 취소합니다"
                >
                  ↩️ 되돌리기
                </ControlButton>
                <ControlButton 
                  onClick={handleShowHint}
                  disabled={gameState !== 'in-progress' || isMoving}
                  title="다음 최적의 이동을 알려줍니다"
                >
                  💡 힌트
                </ControlButton>
              </ButtonGroup>
            </GameControls>

            <ChessboardWrapper>
              <ChessboardContainer>
                <Chessboard size={boardSize}>
                  {Array.from({ length: boardSize }, (_, row) => (
                    Array.from({ length: boardSize }, (_, col) => (
                      <Cell
                        key={`${row}-${col}`}
                        id={`cell-${row}-${col}`}
                        color={getCellColor(row, col)}
                        onClick={() => handleCellClick(row, col)}
                        whileHover={gameState !== 'completed' ? { scale: 1.05 } : {}}
                        whileTap={gameState !== 'completed' ? { scale: 0.95 } : {}}
                        highlighted={highlightedCells.some(([hRow, hCol]) => hRow === row && hCol === col)}
                      >
                        <CellNumber>{getVisitOrder(row, col)}</CellNumber>
                        {currentPosition && currentPosition[0] === row && currentPosition[1] === col && (
                          <KnightIcon>♞</KnightIcon>
                        )}
                      </Cell>
                    ))
                  ))}
                </Chessboard>
              </ChessboardContainer>
              
              <GameLegend>
                <LegendItem>
                  <LegendColor color='var(--accent-color)' />
                  <span>현재 위치</span>
                </LegendItem>
                <LegendItem>
                  <LegendColor color='rgba(123, 44, 191, 0.3)' />
                  <span>이동 가능한 위치</span>
                </LegendItem>
                <LegendItem>
                  <LegendColor color='rgba(123, 44, 191, 0.6)' />
                  <span>방문한 위치</span>
                </LegendItem>
              </GameLegend>
            </ChessboardWrapper>

            {gameState === 'completed' && (
              <CongratulationsMessage>
                <h2>🏆 축하합니다!</h2>
                <p>총 소요 시간: {formattedTime()}</p>
                <p>보드 크기: {boardSize}x{boardSize}</p>
                <ShareButton onClick={() => {
                  try {
                    navigator.clipboard.writeText(`나는 ${boardSize}x${boardSize} 기사의 여행 퍼즐을 ${formattedTime()}에 완료했어요! 당신도 도전해보세요: https://example.com/games/knight-tour`);
                    alert('결과가 클립보드에 복사되었습니다!');
                  } catch (e) {
                    console.error('클립보드 복사 실패:', e);
                  }
                }}>
                  🔗 결과 공유하기
                </ShareButton>
              </CongratulationsMessage>
            )}

            <InstructionsContainer>
              <h3>🎮 게임 방법</h3>
              <ul>
                <li>체스의 기사(나이트) 말은 'ㄱ' 모양으로 이동합니다.</li>
                <li>보드의 모든 칸을 정확히 한 번씩만 방문해야 합니다.</li>
                <li>시작 위치를 클릭해 게임을 시작하세요.</li>
                <li><HighlightText>연한 보라색</HighlightText>으로 표시된 칸은 이동 가능한 위치입니다.</li>
                <li>방문한 칸은 방문 순서와 함께 표시됩니다.</li>
                <li>실수했다면 '되돌리기' 버튼으로 이전 이동을 취소할 수 있습니다.</li>
                <li>어려울 때는 '힌트' 버튼을 사용해 다음 이동을 추천받을 수 있습니다.</li>
              </ul>
            </InstructionsContainer>
          </GameContainer>
        </ContentSection>
      </MainContent>
      <Footer />
    </PageContainer>
  );
};

// 스타일 컴포넌트
const PageContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

const MainContent = styled.main`
  position: relative;
`;

const HeroSection = styled.section`
  height: 300px;
  background-image: url('/images/knight-tour-hero.svg');
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    height: 200px;
  }
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

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  
  .invalid-move {
    animation: shake 0.3s;
  }
  
  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  }
`;

const GameControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 600px;
`;

const SizeSelector = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const SizeLabel = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text-color);
`;

const SizeOptions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SizeButton = styled.button<{ isActive: boolean }>`
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
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const GameStatus = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const StatusText = styled.div<{ completed?: boolean }>`
  font-size: 1.2rem;
  font-weight: ${props => props.completed ? '600' : '400'};
  color: ${props => props.completed ? 'var(--accent-color)' : 'var(--text-color)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const MoveCounter = styled.span`
  font-size: 1rem;
  color: #aaa;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const ControlButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.2);
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ChessboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const ChessboardContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const Chessboard = styled.div<{ size: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.size}, 1fr);
  grid-template-rows: repeat(${props => props.size}, 1fr);
  gap: 2px;
  width: 100%;
  background: #222;
  border: 2px solid #333;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const Cell = styled(motion.div)<{ color: string; highlighted?: boolean }>`
  background-color: ${props => props.color};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease;
  
  &:before {
    content: "";
    display: block;
    padding-top: 100%;
    float: left;
  }
  
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  
  ${props => props.highlighted && `
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 70%;
      height: 70%;
      transform: translate(-50%, -50%);
      border: 2px dashed rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      animation: rotate 5s linear infinite;
    }
    
    @keyframes rotate {
      from { transform: translate(-50%, -50%) rotate(0deg); }
      to { transform: translate(-50%, -50%) rotate(360deg); }
    }
  `}
  
  &.hint-animation {
    animation: pulse 0.8s ease-in-out infinite alternate;
  }
  
  @keyframes pulse {
    from { box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.5); }
    to { box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.8); }
  }
`;

const GameLegend = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #ccc;
`;

const LegendColor = styled.span<{ color: string }>`
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 3px;
  background-color: ${props => props.color};
`;

const CellNumber = styled.span`
  font-size: clamp(0.6rem, 2vw, 0.8rem);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  position: absolute;
  top: 2px;
  left: 2px;
`;

const KnightIcon = styled.span`
  font-size: clamp(1.5rem, 4vw, 2rem);
  color: white;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
  animation: bounce 1s ease infinite;
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }
`;

const CongratulationsMessage = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(123, 44, 191, 0.1);
  border: 1px solid var(--accent-color);
  border-radius: 10px;
  text-align: center;
  animation: glow 2s infinite alternate;
  
  @keyframes glow {
    from {
      box-shadow: 0 0 5px rgba(123, 44, 191, 0.3);
    }
    to {
      box-shadow: 0 0 15px rgba(123, 44, 191, 0.7);
    }
  }
  
  h2 {
    color: var(--accent-color);
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
`;

const ShareButton = styled.button`
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #9b4dca;
    transform: translateY(-3px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

const HighlightText = styled.span`
  color: rgba(123, 44, 191, 0.8);
  font-weight: 500;
`;

const InstructionsContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  max-width: 600px;
  
  h3 {
    color: var(--text-color);
    margin-bottom: 1rem;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    
    li {
      padding: 0.5rem 0;
      position: relative;
      padding-left: 1.5rem;
      color: #ccc;
      line-height: 1.5;
      
      &:before {
        content: '•';
        position: absolute;
        left: 0;
        color: var(--accent-color);
      }
    }
  }
`;

export default KnightTourPage; 