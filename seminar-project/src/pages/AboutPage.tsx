import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

// 이미지 경로
const aboutHeroImage = '/images/about-hero.png';
const aboutStoryImage = '/images/about-story.png';
const milestone2022Image = '/images/milestone-2022.png';
const milestone2023Image = '/images/milestone-2023.png';
const milestone2024Image = '/images/milestone-2024.png';
const educationProgramImage = '/images/education-program.png';
const environmentCampaignImage = '/images/environment-campaign.png';
const digitalInclusionImage = '/images/digital-inclusion.png';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState('story');

  const milestones = [
    {
      year: 2022,
      title: '경환랜드 설립',
      description: '게임 개발 및 배급을 위한 경환랜드가 설립되었습니다.',
      image: milestone2022Image
    },
    {
      year: 2023,
      title: '첫 게임 출시',
      description: '경환랜드의 첫 번째, 몬티홀 게임이 출시되었습니다.',
      image: milestone2023Image
    },
    {
      year: 2024,
      title: '스튜디오 확장',
      description: '여러 개발 스튜디오를 인수하며 사업을 확장했습니다.',
      image: milestone2024Image
    }
  ];

  const values = [
    {
      title: '창의성',
      description: '게임 개발의 핵심은 창의성입니다. 우리는 새로운 아이디어와 혁신을 추구합니다.'
    },
    {
      title: '열정',
      description: '게임을 향한 끊임없는 열정으로 최고의 게임 경험을 만들어냅니다.'
    },
    {
      title: '도전',
      description: '새로운 도전을 두려워하지 않고 게임 산업의 한계를 뛰어넘고자 합니다.'
    },
    {
      title: '팀워크',
      description: '다양한 배경과 경험을 가진 구성원들이 함께 협력하여 최상의 결과를 만들어냅니다.'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'story':
        return (
          <TabContent>
            <TabTitle>경환랜드 이야기</TabTitle>
            <AboutText>
              경환랜드는 게이머들에게 최고의 게임 경험을 제공하기 위해 2022년에 설립된 게임 개발 및 배급 회사입니다. 
              짧은 역사에도 불구하고, 경환랜드는 혁신적인 게임과 새로운 기술을 도입하며 게임 산업에 큰 영향을 미치고 있습니다.
            </AboutText>
            <AboutText>
              우리는 게임이 단순한 오락거리를 넘어 문화, 예술, 기술의 융합체라고 믿습니다. 
              모든 게이머가 즐길 수 있는 다양한 장르의 게임을 개발하고, 항상 새로운 경험을 제공하기 위해 노력하고 있습니다.
            </AboutText>
            <AboutImageContainer>
              <AboutImage 
                src={aboutStoryImage} 
                alt="경환랜드 스토리" 
              />
            </AboutImageContainer>
          </TabContent>
        );
      case 'history':
        return (
          <TabContent>
            <TabTitle>도전의 역사</TabTitle>
            <TimelineContainer>
              {milestones.map((milestone, index) => (
                <TimelineItem 
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  isEven={index % 2 === 0}
                >
                  <TimelineYear isEven={index % 2 === 0}>{milestone.year}</TimelineYear>
                  <TimelineContent isEven={index % 2 === 0}>
                    <TimelineImageContainer>
                      <TimelineImage src={milestone.image} alt={milestone.title} />
                    </TimelineImageContainer>
                    <TimelineInfo>
                      <TimelineTitle>{milestone.title}</TimelineTitle>
                      <TimelineDescription>{milestone.description}</TimelineDescription>
                    </TimelineInfo>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </TimelineContainer>
          </TabContent>
        );
      case 'values':
        return (
          <TabContent>
            <TabTitle>경환랜드의 가치</TabTitle>
            <AboutText>
              경환랜드는 게임을 통해 더 나은 세상을 만들기 위해 노력합니다. 
              우리는 다음과 같은 핵심 가치를 바탕으로 모든 활동을 전개합니다.
            </AboutText>
            <ValuesGrid>
              {values.map((value, index) => (
                <ValueCard 
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ValueTitle>{value.title}</ValueTitle>
                  <ValueDescription>{value.description}</ValueDescription>
                </ValueCard>
              ))}
            </ValuesGrid>
          </TabContent>
        );
      case 'csr':
        return (
          <TabContent>
            <TabTitle>사회공헌 활동</TabTitle>
            <AboutText>
              경환랜드는 사회적 책임을 다하기 위해 다양한 CSR 활동을 진행하고 있습니다.
              교육, 환경, 사회 통합 등 다양한 분야에서 긍정적인 변화를 만들어가고 있습니다.
            </AboutText>
            <CSRGrid>
              <CSRCard>
                <CSRImage 
                  src={educationProgramImage} 
                  alt="게임 교육 프로그램" 
                />
                <CSRTitle>게임 교육 프로그램</CSRTitle>
                <CSRDescription>
                  미래의 게임 개발자를 위한 교육 프로그램을 운영하고 있습니다.
                </CSRDescription>
              </CSRCard>
              <CSRCard>
                <CSRImage 
                  src={environmentCampaignImage} 
                  alt="환경 보호 캠페인" 
                />
                <CSRTitle>환경 보호 캠페인</CSRTitle>
                <CSRDescription>
                  게임을 통한 환경 보호 인식 확산에 앞장서고 있습니다.
                </CSRDescription>
              </CSRCard>
              <CSRCard>
                <CSRImage 
                  src={digitalInclusionImage} 
                  alt="디지털 포용 이니셔티브" 
                />
                <CSRTitle>디지털 포용 이니셔티브</CSRTitle>
                <CSRDescription>
                  모든 사람이 디지털 경험에 접근할 수 있도록 노력하고 있습니다.
                </CSRDescription>
              </CSRCard>
            </CSRGrid>
          </TabContent>
        );
      default:
        return <TabContent>내용을 찾을 수 없습니다.</TabContent>;
    }
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
              소개
            </HeroTitle>
            <HeroDescription
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              게임의 새로운 미래를 만들어갑니다
            </HeroDescription>
          </HeroOverlay>
        </HeroSection>

        <ContentSection>
          <TabsContainer>
            <TabButton 
              isActive={activeTab === 'story'} 
              onClick={() => setActiveTab('story')}
            >
              경환랜드 이야기
            </TabButton>
            <TabButton 
              isActive={activeTab === 'history'} 
              onClick={() => setActiveTab('history')}
            >
              도전의 역사
            </TabButton>
            <TabButton 
              isActive={activeTab === 'values'} 
              onClick={() => setActiveTab('values')}
            >
              핵심 가치
            </TabButton>
            <TabButton 
              isActive={activeTab === 'csr'} 
              onClick={() => setActiveTab('csr')}
            >
              사회공헌
            </TabButton>
          </TabsContainer>
          
          {renderTabContent()}
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
  background-image: url(${aboutHeroImage});
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

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  overflow-x: auto;
  
  @media (max-width: 768px) {
    flex-wrap: nowrap;
    justify-content: flex-start;
    padding-bottom: 1rem;
  }
`;

const TabButton = styled.button<{ isActive: boolean }>`
  padding: 1rem 2rem;
  background: transparent;
  color: ${props => props.isActive ? 'var(--primary-color)' : 'var(--text-color)'};
  border: none;
  font-size: 1.1rem;
  font-weight: ${props => props.isActive ? '600' : '400'};
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: var(--primary-color);
    transform: scaleX(${props => props.isActive ? '1' : '0'});
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: scaleX(1);
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`;

const TabContent = styled.div`
  animation: fadeIn 0.5s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const TabTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--text-color);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const AboutText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #bbb;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const AboutImageContainer = styled.div`
  margin: 2rem 0;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
`;

const AboutImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const TimelineContainer = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    background-color: rgba(255, 255, 255, 0.1);
    
    @media (max-width: 768px) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled(motion.div)<{ isEven: boolean }>`
  display: flex;
  justify-content: ${props => props.isEven ? 'flex-start' : 'flex-end'};
  padding: 2rem 0;
  position: relative;
  
  @media (max-width: 768px) {
    justify-content: flex-end;
    padding-left: 60px;
  }
`;

const TimelineYear = styled.div<{ isEven: boolean }>`
  position: absolute;
  top: 2rem;
  ${props => props.isEven ? 'right: 55%' : 'left: 55%'};
  transform: translateX(${props => props.isEven ? '50%' : '-50%'});
  background-color: var(--primary-color);
  color: white;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  z-index: 1;
  
  @media (max-width: 768px) {
    left: 30px;
    transform: translateX(-50%);
  }
`;

const TimelineContent = styled.div<{ isEven: boolean }>`
  width: 45%;
  background: rgba(26, 26, 26, 0.6);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TimelineImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const TimelineImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TimelineInfo = styled.div`
  padding: 1.5rem;
`;

const TimelineTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-color);
`;

const TimelineDescription = styled.p`
  font-size: 1rem;
  color: #aaa;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ValueCard = styled(motion.div)`
  background: rgba(26, 26, 26, 0.6);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    background: rgba(50, 50, 50, 0.6);
  }
`;

const ValueTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const ValueDescription = styled.p`
  font-size: 1rem;
  color: #bbb;
  line-height: 1.6;
`;

const CSRGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const CSRCard = styled.div`
  background: rgba(26, 26, 26, 0.6);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const CSRImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CSRTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin: 1rem;
  color: var(--text-color);
`;

const CSRDescription = styled.p`
  font-size: 1rem;
  color: #aaa;
  line-height: 1.6;
  padding: 0 1rem 1.5rem;
`;

export default AboutPage; 