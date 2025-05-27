"use client"

import { useState } from "react"
import { Navbar, Nav, Container, Button, Form, FormControl } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
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
            />
            <Button variant="outline-primary" type="submit">
              Buscar
            </Button>
          </Form>
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/favorites">
                  Favoritos
                </Nav.Link>
                {user?.isProvider ? (
                  <Nav.Link as={Link} to="/provider-dashboard">
                    Dashboard
                  </Nav.Link>
                ) : (
                  <Nav.Link as={Link} to="/create-profile">
                    Convertirse en proveedor
                  </Nav.Link>
                )}
                <Nav.Link as={Link} to="/profile">
                  Mi Perfil
                </Nav.Link>
                <Button variant="outline-danger" onClick={logout} className="ms-2">
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Iniciar Sesión
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Registrarse
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
