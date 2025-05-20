import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TOTAL_DOORS = 3;

enum GameState {
  START = 'start',
  FIRST_CHOICE = 'first_choice',
  REVEAL = 'reveal',
  FINAL_CHOICE = 'final_choice',
  RESULT = 'result',
}

const MontyHallGame = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [doors, setDoors] = useState<number[]>([]);
  const [prizeDoor, setPrizeDoor] = useState<number | null>(null);
  const [selectedDoor, setSelectedDoor] = useState<number | null>(null);
  const [revealedDoor, setRevealedDoor] = useState<number | null>(null);
  const [finalChoice, setFinalChoice] = useState<number | null>(null);
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [gamesPlayed, setGamesPlayed] = useState<number>(0);
  const [switchWins, setSwitchWins] = useState<number>(0);
  const [stayWins, setStayWins] = useState<number>(0);
  const [didSwitch, setDidSwitch] = useState<boolean | null>(null);

  // 게임 초기화
  const startNewGame = () => {
    const doors = Array.from({ length: TOTAL_DOORS }, (_, i) => i);
    const prize = Math.floor(Math.random() * TOTAL_DOORS);

    setDoors(doors);
    setPrizeDoor(prize);
    setSelectedDoor(null);
    setRevealedDoor(null);
    setFinalChoice(null);
    setIsWinner(false);
    setDidSwitch(null);
    setGameState(GameState.FIRST_CHOICE);
  };

  // 첫 번째 선택 처리
  const handleFirstChoice = (doorIndex: number) => {
    setSelectedDoor(doorIndex);
    
    // 보여줄 문 선택 (선택된 문도, 상금이 있는 문도 아닌 문 중 하나)
    const availableDoors = doors.filter(
      (d) => d !== doorIndex && d !== prizeDoor
    );
    
    const doorToReveal = availableDoors[Math.floor(Math.random() * availableDoors.length)];
    setRevealedDoor(doorToReveal);
    setGameState(GameState.REVEAL);
  };

  // 최종 선택 처리
  const handleFinalChoice = (choice: 'switch' | 'stay') => {
    let finalDoor;
    
    if (choice === 'switch') {
      // 선택되지 않았고, 공개되지 않은 문으로 전환
      finalDoor = doors.find(
        (door) => door !== selectedDoor && door !== revealedDoor
      ) || selectedDoor;
      setDidSwitch(true);
    } else {
      finalDoor = selectedDoor;
      setDidSwitch(false);
    }
    
    setFinalChoice(finalDoor);
    const win = finalDoor === prizeDoor;
    setIsWinner(win);
    
    // 통계 업데이트
    setGamesPlayed(prev => prev + 1);
    if (win) {
      if (choice === 'switch') {
        setSwitchWins(prev => prev + 1);
      } else {
        setStayWins(prev => prev + 1);
      }
    }
    
    setGameState(GameState.RESULT);
  };

  // 문 색상 결정
  const getDoorColor = (doorIndex: number) => {
    if (gameState === GameState.RESULT) {
      if (doorIndex === prizeDoor) {
        return 'var(--accent-color)';
      }
      if (doorIndex === finalChoice && doorIndex !== prizeDoor) {
        return 'red';
      }
    }
    
    if (doorIndex === selectedDoor) {
      return 'var(--primary-color)';
    }
    
    if (doorIndex === revealedDoor) {
      return 'gray';
    }
    
    return 'var(--card-bg-color)';
  };

  // 문 클릭 핸들러
  const handleDoorClick = (doorIndex: number) => {
    if (gameState === GameState.FIRST_CHOICE) {
      handleFirstChoice(doorIndex);
    }
  };

  // 게임 상태에 따른 메시지
  const getMessage = () => {
    switch (gameState) {
      case GameState.START:
        return '몬티홀 문제 게임에 오신 것을 환영합니다!';
      case GameState.FIRST_CHOICE:
        return '문을 하나 선택하세요!';
      case GameState.REVEAL:
        return `문 ${revealedDoor! + 1}번 뒤에는 아무것도 없습니다. 선택을 바꾸시겠습니까?`;
      case GameState.RESULT:
        if (isWinner) {
          return '축하합니다! 당신이 이겼습니다! 🎉';
        } else {
          return `아쉽습니다! 상금은 문 ${prizeDoor! + 1}번 뒤에 있었습니다. 😢`;
        }
      default:
        return '';
    }
  };

  // 게임 시작 시 초기화
  useEffect(() => {
    startNewGame();
  }, []);

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <GameTitle>몬티홀 문제</GameTitle>
        <GameDescription>
          세 개의 문 중 하나를 선택하세요. 한 문 뒤에는 상금이 있고, 나머지 두 문 뒤에는 아무것도 없습니다.
          문을 선택하면, 진행자가 남은 두 문 중 상금이 없는 문 하나를 보여줍니다.
          그런 다음 당신은 선택을 유지하거나 남은 다른 문으로 바꿀 수 있습니다.
          과연 선택을 바꾸는 것이 유리할까요?
        </GameDescription>

        <MessageBox>{getMessage()}</MessageBox>

        <DoorsContainer>
          <AnimatePresence>
            {doors.map((door) => (
              <DoorWrapper key={door}>
                <Door
                  initial={{ rotateY: 0 }}
                  animate={{ 
                    rotateY: (gameState === GameState.RESULT || door === revealedDoor) ? 70 : 0,
                    backgroundColor: getDoorColor(door)
                  }}
                  transition={{ duration: 0.5 }}
                  onClick={() => handleDoorClick(door)}
                  $clickable={gameState === GameState.FIRST_CHOICE && selectedDoor === null}
                >
                  <DoorNumber>{door + 1}</DoorNumber>
                  <DoorContent visible={gameState === GameState.RESULT || door === revealedDoor}>
                    {door === prizeDoor ? (
                      <PrizeIcon>🏆</PrizeIcon>
                    ) : (
                      <EmptyIcon>❌</EmptyIcon>
                    )}
                  </DoorContent>
                </Door>
                <DoorShadow />
              </DoorWrapper>
            ))}
          </AnimatePresence>
        </DoorsContainer>

        {gameState === GameState.REVEAL && (
          <ButtonContainer>
            <ActionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFinalChoice('stay')}
            >
              유지하기
            </ActionButton>
            <ActionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFinalChoice('switch')}
            >
              바꾸기
            </ActionButton>
          </ButtonContainer>
        )}

        {gameState === GameState.RESULT && (
          <ResultContainer>
            <ResultInfo>
              {didSwitch !== null && (
                <ResultText>
                  당신은 선택을 {didSwitch ? '바꾸었고' : '유지했고'}, {isWinner ? '이겼습니다!' : '졌습니다!'}
                </ResultText>
              )}
            </ResultInfo>
            <ActionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startNewGame}
            >
              다시 시작
            </ActionButton>
          </ResultContainer>
        )}

        <StatisticsContainer>
          <StatTitle>통계</StatTitle>
          <StatItem>총 게임 수: {gamesPlayed}</StatItem>
          <StatItem>
            바꿨을 때 승률: {gamesPlayed ? ((switchWins / (gamesPlayed - stayWins || 1)) * 100).toFixed(1) : 0}%
            ({switchWins}승)
          </StatItem>
          <StatItem>
            유지했을 때 승률: {gamesPlayed ? ((stayWins / (gamesPlayed - switchWins || 1)) * 100).toFixed(1) : 0}%
            ({stayWins}승)
          </StatItem>
        </StatisticsContainer>
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
  padding: 120px 5% 50px;
  max-width: 1200px;
  margin: 0 auto;
`;

const GameTitle = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const GameDescription = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #aaa;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const MessageBox = styled.div`
  background-color: var(--card-bg-color);
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 3rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 1rem;
  }
`;

const DoorsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 576px) {
    gap: 1rem;
  }
`;

const DoorWrapper = styled.div`
  position: relative;
  perspective: 1000px;
`;

const Door = styled(motion.div)<{ $clickable: boolean }>`
  width: 200px;
  height: 350px;
  background-color: var(--card-bg-color);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  transform-origin: left;
  cursor: ${(props) => (props.$clickable ? 'pointer' : 'default')};
  border: 3px solid var(--accent-color);
  transition: border 0.3s ease;

  &:hover {
    ${(props) => props.$clickable && `
      border-color: var(--primary-color);
      transform: scale(1.02);
    `}
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 250px;
  }

  @media (max-width: 576px) {
    width: 100px;
    height: 180px;
  }
`;

const DoorNumber = styled.span`
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-color);

  @media (max-width: 576px) {
    font-size: 2rem;
  }
`;

const DoorContent = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.3s ease;
  z-index: -1;
`;

const PrizeIcon = styled.span`
  font-size: 6rem;
  animation: pulse 1.5s infinite alternate;

  @keyframes pulse {
    from {
      transform: scale(1);
      filter: drop-shadow(0 0 0px gold);
    }
    to {
      transform: scale(1.1);
      filter: drop-shadow(0 0 20px gold);
    }
  }

  @media (max-width: 576px) {
    font-size: 4rem;
  }
`;

const EmptyIcon = styled.span`
  font-size: 4rem;
  color: #ff5555;

  @media (max-width: 576px) {
    font-size: 3rem;
  }
`;

const DoorShadow = styled.div`
  position: absolute;
  top: 5px;
  left: 10px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  z-index: -2;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 576px) {
    gap: 1rem;
    flex-direction: column;
    align-items: center;
  }
`;

const ActionButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 50px;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  color: white;
  border: none;
  box-shadow: 0 5px 15px rgba(123, 44, 191, 0.3);
  cursor: pointer;
  min-width: 200px;

  @media (max-width: 576px) {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
  }
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin: 2rem 0;
`;

const ResultInfo = styled.div`
  text-align: center;
`;

const ResultText = styled.p`
  font-size: 1.3rem;
  margin-bottom: 1rem;

  @media (max-width: 576px) {
    font-size: 1.1rem;
  }
`;

const StatisticsContainer = styled.div`
  background-color: var(--card-bg-color);
  padding: 2rem;
  border-radius: 10px;
  margin-top: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const StatTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StatItem = styled.p`
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  color: #ddd;
`;

export default MontyHallGame; 