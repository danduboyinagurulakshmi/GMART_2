// src/components/Navbar.js

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {Link, useNavigate } from "react-router-dom"

const Unavbar = () => {
  const navigate = useNavigate();
  const get=localStorage.getItem('user')
  
  const handleLogout = () => {
    localStorage.removeItem('adminJwtToken');
    navigate('/alogin');
  };

  return (
    <Navbar className='bg-green-400' variant="dark" expand="lg" >
      <Container>
        <Navbar.Brand><Link to='/uhome' style={{color:"white",textDecoration:"none"}}>Grocery Web App</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" >
            <Link to="/Admin/dashboard" style={{padding:"8px",color:"white",textDecoration:"none",fontSize:"22px",fontStyle:"italic"}}>Dashboard</Link>
            <Link to="/admin/users" style={{padding:"8px",color:"white",textDecoration:"none",fontSize:"22px",fontStyle:"italic"}}>Users</Link>
            <Link to="/admin/all-products" style={{padding:"8px",color:"white",textDecoration:"none",fontSize:"22px",fontStyle:"italic"}}>Products</Link>
            <Link to="/admin/add-product" style={{padding:"8px",color:"white",textDecoration:"none",fontSize:"22px",fontStyle:"italic"}}>Add product</Link>
            <Link to="/admin/orders" style={{padding:"8px",color:"white",textDecoration:"none",fontSize:"22px",fontStyle:"italic"}}>Orders</Link>

            <button onClick={handleLogout} style={{padding:"8px",color:"white",textDecoration:"none",fontSize:"22px",fontStyle:"italic", background:"none", border:"none", cursor:"pointer"}}>Logout</button>
            {/* <h4 style={{color:"white",paddingTop:"0px"}}>({JSON.parse(get).name} )</h4> */}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Unavbar;
