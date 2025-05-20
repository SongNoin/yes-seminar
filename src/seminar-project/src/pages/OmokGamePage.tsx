import React from 'react';
import styled from 'styled-components';
import OmokGame from '../components/OmokGame';
import Navbar from '../components/Navbar';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.5;
  max-width: 800px;
  margin: 0 auto;
`;

const GameSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const RulesSection = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const RulesTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 15px;
`;

const RulesList = styled.ul`
  padding-left: 20px;
  
  li {
    margin-bottom: 10px;
    line-height: 1.6;
  }
`;

const OmokGamePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <PageContainer>
        <Header>
          <Title>오목 게임</Title>
          <Description>
            전통적인 오목 게임을 온라인으로 즐겨보세요. 
            흑돌과 백돌을 번갈아 놓으며 5개의 돌을 연속으로 놓으면 승리합니다.
          </Description>
        </Header>
        
        <GameSection>
          <OmokGame />
        </GameSection>
        
        <RulesSection>
          <RulesTitle>게임 규칙</RulesTitle>
          <RulesList>
            <li><strong>게임 목표:</strong> 자신의 돌 5개를 가로, 세로, 대각선으로 연속해서 놓으면 승리합니다.</li>
            <li><strong>턴 진행:</strong> 흑돌이 먼저 시작하며, 이후 흑백이 번갈아가며 돌을 놓습니다.</li>
            <li><strong>착수:</strong> 바둑판의 빈 자리에만 돌을 놓을 수 있습니다.</li>
            <li><strong>승리 조건:</strong> 자신의 돌이 5개 연속으로 놓이면 즉시 승리합니다.</li>
            <li><strong>무승부:</strong> 바둑판이 모두 채워지고 승자가 없으면 무승부입니다.</li>
          </RulesList>
        </RulesSection>
      </PageContainer>
    </>
  );
};

export default OmokGamePage; 