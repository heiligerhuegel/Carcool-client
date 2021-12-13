import { useContext } from "react";
import { Link } from "react-router-dom";

import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";

import { AuthContext } from "../../context/auth.context";
import Logo from "./carcoollogo.png";

function NavbarComponent() {
  // Get the value from the context
  const { isLoggedIn, user, logOutUser, isAdmin } = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand>
          <Nav.Link className="navbar-brand" href="/">
            <img src={Logo} alt="" width="150px" />
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/allcars">All Cars</Nav.Link>
            <Nav.Link href="/newrating">New Rating</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              {!isLoggedIn && (
                <NavDropdown.Item href="#action/3.1">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </NavDropdown.Item>
              )}
              {!isLoggedIn && (
                <NavDropdown.Item href="#action/3.2">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </NavDropdown.Item>
              )}
              {user && (
                <NavDropdown.Item href="#action/3.3">
                  <Link className="nav-link" to="/user">
                    {user.name}
                  </Link>
                </NavDropdown.Item>
              )}
              {isLoggedIn && (
                <NavDropdown.Item href="#action/3.4">
                  <Link className="nav-link" to="/" onClick={logOutUser}>
                    Logout
                  </Link>
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
