import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BOARD_SIZE = 15;

interface CellProps {
  isBlack: boolean;
  isWhite: boolean;
}

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${BOARD_SIZE}, 30px);
  grid-template-rows: repeat(${BOARD_SIZE}, 30px);
  background-color: #dcb35c;
  gap: 0;
  border: 2px solid #333;
  margin-bottom: 20px;
`;

const Cell = styled.div<CellProps>`
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  position: relative;
  
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

const StatusText = styled.h2`
  margin-bottom: 10px;
  color: #333;
`;

const RestartButton = styled.button`
  padding: 10px 20px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  
  &:hover {
    background-color: #3367d6;
  }
`;

const OmokGame: React.FC = () => {
  // null: 비어있음, true: 흑돌, false: 백돌
  const [board, setBoard] = useState<(boolean | null)[][]>(
    Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null))
  );
  const [isBlackTurn, setIsBlackTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null);
  
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
  
  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] !== null || winner) {
      return;
    }
    
    const newBoard = [...board.map(row => [...row])];
    newBoard[row][col] = isBlackTurn;
    setBoard(newBoard);
    
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
  };
  
  return (
    <GameContainer>
      <StatusText>
        {winner ? `${winner}이 이겼습니다!` : `현재 차례: ${isBlackTurn ? '흑돌' : '백돌'}`}
      </StatusText>
      
      <BoardContainer>
        {board.map((row, rowIndex) => 
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              isBlack={cell === true}
              isWhite={cell === false}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            />
          ))
        )}
      </BoardContainer>
      
      <RestartButton onClick={resetGame}>
        게임 다시 시작
      </RestartButton>
    </GameContainer>
  );
};

export default OmokGame; 