import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Header';
import Footer from '../Footer';

// Styled Components
const PageWrapper = styled.div`
  width: 100%;
  background: #f9fafb;
`;

const HeroSection = styled.section`
  min-height: 90vh;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
  margin-top: 60px;
  
  &::before {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    top: -100px;
    right: -100px;
    animation: float 20s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(20px);
    }
  }
`;

const HeroContent = styled.div`
  max-width: 700px;
  text-align: center;
  color: white;
  z-index: 2;
  position: relative;
  animation: slideUp 0.8s ease-out;
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -1px;
  line-height: 1.2;
`;

const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  margin-bottom: 2.5rem;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 300;
  line-height: 1.6;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const ShopButton = styled(Link)`
  padding: 1rem 2.5rem;
  background: white;
  color: #10b981;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    color: #059669;
  }
`;

const LearnButton = styled(Link)`
  padding: 1rem 2.5rem;
  background: transparent;
  color: white;
  text-decoration: none;
  border: 2px solid white;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    color: #10b981;
    transform: translateY(-3px);
  }
`;

const FeaturedSection = styled.section`
  max-width: 1400px;
  margin: -100px auto 4rem;
  padding: 0 2rem;
  position: relative;
  z-index: 10;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
  color: #1f2937;
  letter-spacing: -0.5px;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CategoryCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem 1.5rem;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(16, 185, 129, 0.15);
  }
`;

const CategoryIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
`;

const CategoryName = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const FeaturesSection = styled.section`
  background: white;
  padding: 4rem 2rem;
  margin-bottom: 4rem;
`;

const FeaturesContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FeatureBox = styled.div`
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  border-radius: 12px;
  
  &:hover {
    background: #f3f4f6;
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const CTABanner = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 3rem 2rem;
  text-align: center;
  margin: 4rem 2rem;
  border-radius: 20px;
  color: white;
  position: relative;
  overflow: hidden;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  
  &::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    top: -50px;
    right: -50px;
  }
`;

const CTAContent = styled.div`
  position: relative;
  z-index: 2;
`;

const CTATitle = styled.h2`
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 800;
  margin-bottom: 1rem;
`;

const CTAText = styled.p`
  font-size: 1.05rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.95);
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background: white;
  color: #667eea;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 700;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const HomePage = () => {
  const categories = [
    { icon: '🍎', name: 'Fruits', link: '/shopping' },
    { icon: '🥬', name: 'Vegetables', link: '/shopping' },
    { icon: '🥛', name: 'Dairy', link: '/shopping' },
    { icon: '🥜', name: 'Snacks', link: '/shopping' },
    { icon: '🌰', name: 'Dry Fruits', link: '/shopping' },
    { icon: '🥤', name: 'Beverages', link: '/shopping' },
    { icon: '🥩', name: 'Meat & Seafood', link: '/shopping' },
    { icon: '🛒', name: 'More', link: '/shopping' },
  ];

  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast Delivery',
      description: 'Get your groceries in 15-30 minutes with our express delivery service.'
    },
    {
      icon: '✅',
      title: 'Fresh & Quality',
      description: 'Hand-picked fresh products delivered directly to your doorstep.'
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'Compare and save with our competitive pricing and exclusive offers.'
    },
    {
      icon: '🛡️',
      title: 'Guaranteed Safety',
      description: '100% safe and hygienic products with strict quality control.'
    },
  ];

  return (
    <PageWrapper>
      <Header />
      
      <HeroSection>
        <HeroContent>
          <HeroTitle>Groceries delivered in minutes</HeroTitle>
          <HeroSubtitle>
            Fresh products, amazing prices, and fast delivery. G-Mart brings quality groceries right to your home.
          </HeroSubtitle>
          <HeroButtons>
            <ShopButton to="/shopping">🛒 Shop Now</ShopButton>
            <LearnButton to="/about">Learn More</LearnButton>
          </HeroButtons>
        </HeroContent>
      </HeroSection>

      <FeaturedSection>
        <SectionTitle>Popular Categories</SectionTitle>
        <CategoriesGrid>
          {categories.map((category, index) => (
            <CategoryCard key={index} as={Link} to={category.link}>
              <CategoryIcon>{category.icon}</CategoryIcon>
              <CategoryName>{category.name}</CategoryName>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </FeaturedSection>

      <FeaturesSection>
        <FeaturesContainer>
          <SectionTitle>Why Choose G-Mart?</SectionTitle>
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureBox key={index}>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureBox>
            ))}
          </FeaturesGrid>
        </FeaturesContainer>
      </FeaturesSection>

      <CTABanner>
        <CTAContent>
          <CTATitle>Ready to simplify your shopping?</CTATitle>
          <CTAText>Join thousands of happy customers who trust G-Mart for their daily groceries.</CTAText>
          <CTAButton to="/shopping">Start Shopping Today</CTAButton>
        </CTAContent>
      </CTABanner>

      <Footer />
    </PageWrapper>
  );
};

export default HomePage;
