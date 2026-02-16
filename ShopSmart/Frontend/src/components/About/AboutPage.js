import React from 'react';
import styled from 'styled-components';
import Header from '../Header';
import Footer from '../Footer';

// Styled Components
const PageWrapper = styled.div`
  width: 100%;
  background: #f9fafb;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  padding: 6rem 2rem 4rem;
  text-align: center;
  color: white;
  margin-top: 60px;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
`;

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.95);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const ContentSection = styled.section`
  padding: 4rem 2rem;
  background: white;
  margin: 3rem 0;
  border-radius: 16px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 1.5rem;
  letter-spacing: -0.5px;
`;

const ContentText = styled.p`
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const HighlightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const HighlightCard = styled.div`
  padding: 2.5rem 2rem;
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  
  &:hover {
    transform: translateY(-5px);
    border-color: #10b981;
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.15);
  }
`;

const HighlightIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1rem;
`;

const HighlightTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.75rem;
`;

const HighlightDescription = styled.p`
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const MissionBox = styled.div`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 3rem;
  border-radius: 16px;
  margin: 3rem 0;
  
  h3 {
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.95);
  }
`;

const ValuesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  
  li {
    padding: 0.75rem 0;
    padding-left: 2rem;
    position: relative;
    color: #374151;
    font-size: 1rem;
    line-height: 1.6;
    
    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #10b981;
      font-weight: 700;
      font-size: 1.2rem;
    }
  }
`;

const StatsSection = styled.section`
  background: white;
  padding: 4rem 2rem;
  margin: 3rem 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const StatBox = styled.div`
  text-align: center;
  padding: 2rem;
`;

const StatNumber = styled.h3`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 800;
  color: #10b981;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.p`
  color: #6b7280;
  font-size: 1rem;
  font-weight: 600;
`;

const AboutPage = () => {
  const highlights = [
    {
      icon: '⚡',
      title: 'Fast & Reliable',
      description: 'Same-day delivery with real-time order tracking for complete peace of mind.'
    },
    {
      icon: '🍃',
      title: 'Fresh Products',
      description: 'Hand-picked fresh groceries sourced from trusted suppliers daily.'
    },
    {
      icon: '💰',
      title: 'Affordable Pricing',
      description: 'Competitive prices without compromising on quality or freshness.'
    },
  ];

  const values = [
    'Quality products at fair prices',
    'Reliable and prompt delivery',
    'Customer satisfaction is our priority',
    'Sustainable and eco-friendly practices',
    'Transparent business operations',
    'Community-focused approach',
  ];

  return (
    <PageWrapper>
      <Header />
      
      <HeroSection>
        <HeroTitle>About G-Mart</HeroTitle>
        <HeroSubtitle>
          Your trusted partner for fresh groceries and everyday essentials delivered right to your doorstep.
        </HeroSubtitle>
      </HeroSection>

      <Container>
        <ContentSection>
          <SectionTitle>Our Story</SectionTitle>
          <ContentText>
            G-Mart was founded with a simple mission: to make grocery shopping convenient, affordable, and accessible to everyone. 
            We understand that busy lifestyles leave little time for traditional grocery shopping, so we've created a platform 
            that brings quality products directly to your home in minutes.
          </ContentText>
          <ContentText>
            Starting as a small initiative, G-Mart has grown to serve thousands of satisfied customers across multiple regions. 
            Our commitment to excellence and customer satisfaction drives everything we do.
          </ContentText>
        </ContentSection>

        <MissionBox>
          <h3>Our Mission</h3>
          <p>
            To provide fast, reliable, and affordable grocery delivery services that simplify daily shopping and enhance 
            the quality of life for our customers. We aim to be the most trusted name in grocery delivery.
          </p>
        </MissionBox>

        <ContentSection>
          <SectionTitle>Our Vision</SectionTitle>
          <ContentText>
            We envision a world where quality groceries are accessible to everyone, regardless of their location or schedule. 
            Through innovation and customer-centric service, G-Mart strives to revolutionize the grocery shopping experience 
            and become the preferred choice for millions of households.
          </ContentText>
        </ContentSection>

        <ContentSection>
          <SectionTitle>What Makes G-Mart Different</SectionTitle>
          <HighlightsGrid>
            {highlights.map((item, index) => (
              <HighlightCard key={index}>
                <HighlightIcon>{item.icon}</HighlightIcon>
                <HighlightTitle>{item.title}</HighlightTitle>
                <HighlightDescription>{item.description}</HighlightDescription>
              </HighlightCard>
            ))}
          </HighlightsGrid>
        </ContentSection>

        <ContentSection>
          <SectionTitle>Our Core Values</SectionTitle>
          <ValuesList>
            {values.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ValuesList>
        </ContentSection>

        <StatsSection>
          <SectionTitle style={{ textAlign: 'center' }}>By The Numbers</SectionTitle>
          <StatsGrid>
            <StatBox>
              <StatNumber>50K+</StatNumber>
              <StatLabel>Happy Customers</StatLabel>
            </StatBox>
            <StatBox>
              <StatNumber>1000+</StatNumber>
              <StatLabel>Products Available</StatLabel>
            </StatBox>
            <StatBox>
              <StatNumber>50+</StatNumber>
              <StatLabel>Delivery Locations</StatLabel>
            </StatBox>
            <StatBox>
              <StatNumber>15min</StatNumber>
              <StatLabel>Average Delivery Time</StatLabel>
            </StatBox>
          </StatsGrid>
        </StatsSection>
      </Container>

      <Footer />
    </PageWrapper>
  );
};

export default AboutPage;
