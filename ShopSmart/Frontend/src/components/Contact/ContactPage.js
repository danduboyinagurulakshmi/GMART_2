import React, { useState } from 'react';
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
  padding: 4rem 2rem;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FormSection = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
`;

const ContactInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 2rem;
  letter-spacing: -0.5px;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const Input = styled.input`
  padding: 0.9rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.3s ease;
  background: #f9fafb;
  
  &:focus {
    outline: none;
    border-color: #10b981;
    background: white;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  
  &::placeholder {
    color: #d1d5db;
  }
`;

const Textarea = styled.textarea`
  padding: 0.9rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.95rem;
  font-family: inherit;
  resize: vertical;
  min-height: 150px;
  transition: all 0.3s ease;
  background: #f9fafb;
  
  &:focus {
    outline: none;
    border-color: #10b981;
    background: white;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
  
  &::placeholder {
    color: #d1d5db;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 35px rgba(16, 185, 129, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  background: #dcfce7;
  color: #166534;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  font-weight: 500;
  animation: slideDown 0.3s ease-out;
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ErrorMessage = styled.div`
  background: #fee2e2;
  color: #991b1b;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  font-weight: 500;
  animation: slideDown 0.3s ease-out;
`;

const ContactCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.15);
  }
`;

const ContactIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const ContactTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const ContactValue = styled.p`
  color: #10b981;
  font-weight: 600;
  font-size: 0.95rem;
  margin: 0;
  word-break: break-all;
`;

const ContactDescription = styled.p`
  color: #6b7280;
  font-size: 0.85rem;
  margin-top: 0.5rem;
`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.message.trim()) {
      setError('Please enter your message');
      return false;
    }
    if (formData.message.trim().length < 10) {
      setError('Message must be at least 10 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    // Simulate form submission (in production, this would send to a backend)
    setTimeout(() => {
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      setLoading(false);
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <PageWrapper>
      <Header />
      
      <HeroSection>
        <HeroTitle>Get in Touch</HeroTitle>
        <HeroSubtitle>
          Have questions or feedback? We'd love to hear from you. Contact us anytime!
        </HeroSubtitle>
      </HeroSection>

      <Container>
        <ContentGrid>
          <FormSection>
            <SectionTitle>Send us a Message</SectionTitle>
            
            {submitted && (
              <SuccessMessage>
                ✓ Thank you for your message! We'll get back to you soon.
              </SuccessMessage>
            )}
            
            {error && (
              <ErrorMessage>
                ⚠ {error}
              </ErrorMessage>
            )}
            
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  disabled={loading}
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </SubmitButton>
            </form>
          </FormSection>

          <ContactInfoSection>
            <div>
              <SectionTitle>Contact Information</SectionTitle>
            </div>

            <ContactCard>
              <ContactIcon>📧</ContactIcon>
              <ContactTitle>Email</ContactTitle>
              <ContactValue>support@gmart.com</ContactValue>
              <ContactDescription>We'll respond within 24 hours</ContactDescription>
            </ContactCard>

            <ContactCard>
              <ContactIcon>📞</ContactIcon>
              <ContactTitle>Phone</ContactTitle>
              <ContactValue>+91 1234567890</ContactValue>
              <ContactDescription>Available Monday to Friday, 9 AM - 6 PM</ContactDescription>
            </ContactCard>

            <ContactCard>
              <ContactIcon>📍</ContactIcon>
              <ContactTitle>Address</ContactTitle>
              <ContactValue>G-Mart Headquarters<br/>Krishnapuram, Kadapa<br/>Andhra Pradesh 516172</ContactValue>
              <ContactDescription>Visit our main office</ContactDescription>
            </ContactCard>

            <ContactCard>
              <ContactIcon>🕐</ContactIcon>
              <ContactTitle>Business Hours</ContactTitle>
              <ContactValue>24/7 Customer Support</ContactValue>
              <ContactDescription>Available round the clock for your convenience</ContactDescription>
            </ContactCard>
          </ContactInfoSection>
        </ContentGrid>
      </Container>

      <Footer />
    </PageWrapper>
  );
};

export default ContactPage;
