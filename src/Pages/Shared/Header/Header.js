import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import './Header.css';

const Header = () => {
    return (
        <div>
        <Navbar
        className="pt-0 mb-5"
        variant="light"
        fixed="top"
        collapseOnSelect
        expand="lg"
      >
        <Container fluid className="nav-detail">
          <Navbar.Brand href="#home">
            <h3 className="title title-logo px-1">E-Commerce</h3>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link as={HashLink} to="/home#home">
              Home
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        </div>
    );
};

export default Header;