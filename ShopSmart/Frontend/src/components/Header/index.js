import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookies';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

// Styled Components
const NavbarWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0.75rem 2rem;
  background: ${props => props.isAdmin 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : 'linear-gradient(135deg, #10b981 0%, #059669 100%)'};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const NavContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const BrandLink = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  letter-spacing: -1px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  
  &:hover {
    transform: scale(1.05);
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  flex: 1;
  justify-content: center;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    flex-direction: column;
    padding: 1.5rem;
    gap: 1rem;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  position: relative;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: rgba(255, 255, 255, 0.8);
    transition: width 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    color: rgba(255, 255, 255, 0.95);
    
    &::after {
      width: 100%;
    }
  }
  
  &.active {
    color: rgba(255, 255, 255, 1);
    
    &::after {
      width: 100%;
    }
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 0.75rem;
  }
`;

const AuthButton = styled(Link)`
  padding: 0.65rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  white-space: nowrap;
  border: 2px solid;
  
  ${props => props.primary ? `
    background: rgba(255, 255, 255, 0.25);
    color: white;
    border-color: white;
    backdrop-filter: blur(10px);
    
    &:hover {
      background: rgba(255, 255, 255, 0.35);
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }
  ` : `
    background: transparent;
    color: white;
    border-color: rgba(255, 255, 255, 0.6);
    
    &:hover {
      border-color: white;
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-2px);
    }
  `}
`;

const HamburgerMenu = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Divider = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-weight: 300;
`;

// Profile Section Styled Components
const ProfileSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
`;

const ProfileAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  border: 2px solid rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%);
    border-color: white;
    transform: scale(1.1);
  }
`;

const ProfileName = styled.span`
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ProfileDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  min-width: 220px;
  margin-top: 1rem;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.3s ease;
  z-index: 2000;
  overflow: hidden;
  
  @media (max-width: 768px) {
    position: fixed;
    top: auto;
    bottom: 20px;
    right: 20px;
    left: 20px;
    width: auto;
    max-width: none;
  }
`;

const DropdownMenu = styled.div`
  padding: 0.5rem 0;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.25rem;
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  
  &:hover {
    background: #f3f4f6;
    color: #10b981;
    border-left-color: #10b981;
    padding-left: 1.5rem;
  }
  
  &.logout {
    color: #ef4444;
    border-top: 1px solid #e5e7eb;
    
    &:hover {
      background: #fee2e2;
      color: #dc2626;
      border-left-color: #dc2626;
    }
  }
`;

const DropdownItemButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.25rem;
  color: #ef4444;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  cursor: pointer;
  border-top: 1px solid #e5e7eb;
  background: none;
  
  &:hover {
    background: #fee2e2;
    color: #dc2626;
    border-left-color: #dc2626;
    padding-left: 1.5rem;
  }
`;

const Icon = styled.span`
  font-size: 1.1rem;
`;

const Header = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const profileRef = useRef(null);
    
    const token = Cookies.getItem("jwtToken");
    const adminToken = localStorage.getItem("adminJwtToken");
    const navigate = useNavigate();

    useEffect(() => {
        setIsAdmin(!!adminToken);
        
        // Fetch user data from cookies
        const storedUserName = Cookies.getItem('userName');
        console.log('Retrieved userName from cookies:', storedUserName);
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, [adminToken, token]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const onLogout = () => {
        const res = window.confirm("Are you sure you want to log out?");
        if (res) {
            localStorage.clear();
            Cookies.removeItem('jwtToken');
            Cookies.removeItem('adminJwtToken');
            Cookies.removeItem('userId');
            Cookies.removeItem('userName');
            Cookies.removeItem('userEmail');
            navigate('/');
            setProfileDropdownOpen(false);
            setMenuOpen(false);
        }
    };

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleProfileDropdown = () => setProfileDropdownOpen(!profileDropdownOpen);

    if (isAdmin) {
        return (
            <NavbarWrapper isAdmin={true}>
                <NavContent>
                    <BrandLink to="/admin/dashboard">
                        <span>📦</span> G-Mart
                    </BrandLink>
                    
                    <HamburgerMenu onClick={toggleMenu}>☰</HamburgerMenu>
                    
                    <NavMenu isOpen={menuOpen}>
                        <NavLink to="/admin/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
                        <NavLink to="/admin/all-products" onClick={() => setMenuOpen(false)}>Products</NavLink>
                        <NavLink to="/admin/orders" onClick={() => setMenuOpen(false)}>Orders</NavLink>
                        <NavLink to="/admin/users" onClick={() => setMenuOpen(false)}>Users</NavLink>
                    </NavMenu>

                    <AuthButtons>
                        <ProfileAvatar onClick={toggleProfileDropdown} title="Admin Menu">
                            👨‍💼
                        </ProfileAvatar>
                        
                        <ProfileDropdown isOpen={profileDropdownOpen}>
                            <DropdownMenu>
                                <DropdownItemButton 
                                    className="logout"
                                    onClick={onLogout}
                                >
                                    <Icon>🚪</Icon>
                                    Logout
                                </DropdownItemButton>
                            </DropdownMenu>
                        </ProfileDropdown>
                    </AuthButtons>
                </NavContent>
            </NavbarWrapper>
        );
    }

    return (
        <NavbarWrapper isAdmin={false}>
            <NavContent>
                <BrandLink to="/">
                    <span>🛒</span> G-Mart
                </BrandLink>
                
                <HamburgerMenu onClick={toggleMenu}>☰</HamburgerMenu>
                
                <NavMenu isOpen={menuOpen}>
                    <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
                    <NavLink to="/about" onClick={() => setMenuOpen(false)}>About Us</NavLink>
                    <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
                    {token && (
                        <>
                            <NavLink to="/my-cart" onClick={() => setMenuOpen(false)}>My Cart</NavLink>
                            <NavLink to="/my-history" onClick={() => setMenuOpen(false)}>History</NavLink>
                        </>
                    )}
                </NavMenu>

                <AuthButtons>
                    {!token ? (
                        <>
                            <AuthButton as={Link} to="/login" primary onClick={() => setMenuOpen(false)}>
                                User Login
                            </AuthButton>
                            <Divider>/</Divider>
                            <AuthButton as={Link} to="/alogin" onClick={() => setMenuOpen(false)}>
                                Admin
                            </AuthButton>
                        </>
                    ) : (
                        <ProfileSection ref={profileRef}>
                            <ProfileAvatar onClick={toggleProfileDropdown} title="User Menu">
                                👤
                            </ProfileAvatar>
                            {userName && userName !== 'undefined' && userName.trim() !== '' && (
                                <ProfileName onClick={toggleProfileDropdown}>
                                    {userName.split(' ')[0]}
                                </ProfileName>
                            )}
                            
                            <ProfileDropdown isOpen={profileDropdownOpen}>
                                <DropdownMenu>
                                    <DropdownItem 
                                        to="/my-orders" 
                                        onClick={() => {
                                            setProfileDropdownOpen(false);
                                            setMenuOpen(false);
                                        }}
                                    >
                                        <Icon>📦</Icon>
                                        My Orders
                                    </DropdownItem>
                                    
                                    <DropdownItemButton 
                                        className="logout"
                                        onClick={onLogout}
                                    >
                                        <Icon>🚪</Icon>
                                        Logout
                                    </DropdownItemButton>
                                </DropdownMenu>
                            </ProfileDropdown>
                        </ProfileSection>
                    )}
                </AuthButtons>
            </NavContent>
        </NavbarWrapper>
    );
};

export default Header;
