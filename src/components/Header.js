"use client";

import { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Navbar className="navbar-alamano" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          <i className="bi bi-hand-thumbs-up me-2"></i>
          AlaMano
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex mx-auto" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Buscar servicios o proveedores..."
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ minWidth: "300px" }}
            />
            <Button variant="outline-light" type="submit">
              <i className="bi bi-search"></i>
            </Button>
          </Form>
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/favorites"
                  className="d-flex align-items-center"
                >
                  <i className="bi bi-heart me-1"></i>
                  Favoritos
                </Nav.Link>
                {user?.isProvider ? (
                  <Nav.Link
                    as={Link}
                    to="/provider-dashboard"
                    className="d-flex align-items-center"
                  >
                    <i className="bi bi-speedometer2 me-1"></i>
                    Dashboard
                  </Nav.Link>
                ) : (
                  <Nav.Link
                    as={Link}
                    to="/create-profile"
                    className="d-flex align-items-center"
                  >
                    <i className="bi bi-plus-circle me-1"></i>
                    Ser Proveedor
                  </Nav.Link>
                )}
                <Nav.Link
                  as={Link}
                  to="/profile"
                  className="d-flex align-items-center"
                >
                  <i className="bi bi-person me-1"></i>
                  Mi Perfil
                </Nav.Link>
                <Button
                  variant="outline-danger"
                  onClick={logout}
                  className="ms-2"
                  size="sm"
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Salir
                </Button>
              </>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="d-flex align-items-center"
                >
                  <i className="bi bi-box-arrow-in-right me-1"></i>
                  Iniciar Sesión
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/register"
                  className="d-flex align-items-center"
                >
                  <i className="bi bi-person-plus me-1"></i>
                  Registrarse
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
