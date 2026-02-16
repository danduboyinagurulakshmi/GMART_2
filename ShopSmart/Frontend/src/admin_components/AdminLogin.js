import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookies';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';

// Styled Components
const LoginWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  padding-top: 15vh;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    top: -50px;
    left: -50px;
    animation: float 20s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 50%;
    bottom: -100px;
    right: -100px;
    animation: float 25s ease-in-out infinite reverse;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(30px);
    }
  }
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  padding: 3rem;
  width: 100%;
  max-width: 420px;
  z-index: 10;
  position: relative;
  backdrop-filter: blur(10px);
  animation: slideUp 0.6s ease-out;
  
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
  
  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
    margin: 1rem;
  }
`;

const LogoSection = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const LogoIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: bounce 2s ease-in-out infinite;
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.65rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.span`
  position: absolute;
  left: 1rem;
  font-size: 1.1rem;
  color: #9ca3af;
  z-index: 2;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1rem 0.9rem 2.8rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: #f9fafb;
  color: #1f2937;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: #d1d5db;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 1.5rem;
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
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

const ErrorMessage = styled.div`
  background: #fee2e2;
  color: #dc2626;
  padding: 0.9rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
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

const SignUpLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
  
  p {
    margin: 0;
    color: #6b7280;
    font-size: 0.9rem;
  }
`;

const SignUpButton = styled(Link)`
  color: #667eea;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s ease;
  display: inline-block;
  margin-top: 0.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 2px;
    background: #667eea;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #764ba2;
    
    &::after {
      width: 100%;
    }
  }
`;

const UserLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #667eea;
  }
`;

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const token = Cookies.getItem('jwtToken');
    const adminToken = localStorage.getItem('adminJwtToken');

    useEffect(() => {
        if (token) {
            navigate('/');
        } else if (adminToken) {
            navigate('/admin/dashboard');
        }
    }, [navigate, token, adminToken]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5100/adminlogin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('adminJwtToken', data.jwtToken);
                navigate('/admin/dashboard');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            setError('Server error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <>
            <Header />
            <LoginWrapper>
            <LoginCard>
                <LogoSection>
                    <LogoIcon>👨‍💼</LogoIcon>
                    <Title>Admin Portal</Title>
                    <Subtitle>Manage your store efficiently</Subtitle>
                </LogoSection>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="email">Email Address</Label>
                        <InputWrapper>
                            <InputIcon>📧</InputIcon>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="admin@example.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </InputWrapper>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <InputWrapper>
                            <InputIcon>🔒</InputIcon>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </InputWrapper>
                    </FormGroup>

                    <LoginButton type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Admin Login'}
                    </LoginButton>
                </form>

                <SignUpLink>
                    <p>Don't have an account?</p>
                    <SignUpButton to="/asignup">Create Admin Account</SignUpButton>
                </SignUpLink>

                <UserLink to="/login">← Back to User Login</UserLink>
            </LoginCard>
        </LoginWrapper>
        </>
    );
};

export default AdminLogin;


