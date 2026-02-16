import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookies';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header';

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

const AdminLink = styled(Link)`
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

const Login = () => {
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
            const response = await fetch('http://localhost:5100/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.token) {
                    Cookies.setItem('jwtToken', data.token);
                    Cookies.setItem('userId', data.user._id);
                    Cookies.setItem('userName', data.user.firstname);
                    navigate('/');
                } else if (data.jwtToken) {
                    localStorage.setItem('adminJwtToken', data.jwtToken);
                    Cookies.setItem('userName', data.user.firstname);
                    navigate('/admin/dashboard');
                }
            } else {
                setError(data.message || "Email or password didn't match");
            }
        } catch (error) {
            setError('Error during login. Please try again.');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setError('');
    };

    return (
        <div>
            <Header />
            <LoginWrapper>
                <LoginCard>
                    <LogoSection>
                        <LogoIcon>🛒</LogoIcon>
                        <Title>Welcome Back</Title>
                        <Subtitle>Sign in to access your account</Subtitle>
                    </LogoSection>

                    {error && (
                        <div style={{
                            background: '#fee2e2',
                            border: '1px solid #fecaca',
                            color: '#dc2626',
                            padding: '0.75rem 1rem',
                            borderRadius: '8px',
                            marginBottom: '1.5rem',
                            fontSize: '0.9rem'
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="email">Email Address</Label>
                            <InputWrapper>
                                <InputIcon>📧</InputIcon>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    disabled={loading}
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
                                    disabled={loading}
                                />
                            </InputWrapper>
                        </FormGroup>

                        <LoginButton type="submit" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </LoginButton>
                    </form>

                    <SignUpLink>
                        <p>Don't have an account?</p>
                        <SignUpButton to="/signup">Create Account</SignUpButton>
                    </SignUpLink>

                    <AdminLink to="/alogin">
                        Admin Login →
                    </AdminLink>
                </LoginCard>
            </LoginWrapper>
        </div>
    );
};

export default Login;




// import React, { useEffect, useState } from 'react';
// import { Container, Form, Button, Card } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';

// const commonFields = [
//     { controlId: 'email', label: 'Email', type: 'email' },
//     { controlId: 'password', label: 'Password', type: 'password' },
// ];

// const Login = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//     });

//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = Cookies.getItem('jwtToken');
//         const adminToken = Cookies.getItem('adminJwtToken');
//         if (token !== null) {
//             navigate('/'); // Redirect to home if a user token exists
        // } else if (adminToken !== null) {
        //     navigate('/admin/all-products'); // Redirect to admin if an admin token exists
        // }
//     }, [navigate]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:5100/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (response.ok) {
//                 const data = await response.json();

                // if (data.token) {
                //     Cookies.setItem('jwtToken', data.token, { expires: 30 });
                //     Cookies.setItem('userId', data.user._id);
                //     Cookies.setItem('userName', data.user.firstname);
                //     navigate('/');
                // } else if (data.jwtToken) {
                //     Cookies.setItem('adminJwtToken', data.jwtToken, { expires: 30 });
                //     Cookies.setItem('userName', data.user.firstname);
                //     navigate('/admin/all-products');
                // }
//             } else {
//                 alert("Email or Password didn't match");
//             }
//         } catch (error) {
//             alert('Error during login: ' + error); // Corrected alert message
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     return (
//         <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', paddingTop: '10vh' }}>
//             <Card className="shadow p-4" style={{ width: '400px' }}>
//                 <Card.Body>
//                     <h2 className="mb-4">Login</h2>
//                     <Form onSubmit={handleSubmit}>
//                         {commonFields.map((field) => (
//                             <Form.Group style={{ textAlign: 'start', marginBottom: '10px' }} controlId={field.controlId} key={field.controlId}>
//                                 <Form.Label>{field.label}</Form.Label>
//                                 <Form.Control
//                                     type={field.type}
//                                     placeholder={`Enter ${field.label.toLowerCase()}`}
//                                     name={field.controlId}
//                                     value={formData[field.controlId]}
//                                     onChange={handleInputChange}
//                                     required
//                                 />
//                             </Form.Group>
//                         ))}
//                         <Button type="submit" className="btn-primary w-100 mt-3">Login</Button>
//                     </Form>
//                     <p>
//                         Don't have an account? <Link to="/signup">Sign Up</Link>
//                     </p>
//                 </Card.Body>
//             </Card>
//         </Container>
//     );
// };

// export default Login;
