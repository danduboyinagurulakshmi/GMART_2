import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  text-align: center;
`;

const FooterText = styled.p`
  font-size: 14px;
  opacity: 0.8;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterText>&copy; {currentYear} G-Mart. All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
