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
import { useLanguage } from "../context/LanguageContext";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const { t } = useLanguage();

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
              placeholder={t("searchPlaceholder")}
              className="me-2 search-input"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ minWidth: "300px" }}
            />
            <Button
              variant="outline-light"
              type="submit"
              className="search-button"
            >
              <i className="bi bi-search"></i>
            </Button>
          </Form>
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                {isAdmin() && (
                  <Nav.Link as={Link} to="/admin" className="nav-link-custom">
                    <i className="bi bi-shield-check me-1"></i>
                    {t("admin")}
                  </Nav.Link>
                )}
                <Nav.Link as={Link} to="/favorites" className="nav-link-custom">
                  <i className="bi bi-heart me-1"></i>
                  {t("favorites")}
                </Nav.Link>
                {user?.isProvider ? (
                  <Nav.Link
                    as={Link}
                    to="/provider-dashboard"
                    className="nav-link-custom"
                  >
                    <i className="bi bi-speedometer2 me-1"></i>
                    {t("dashboard")}
                  </Nav.Link>
                ) : (
                  <Nav.Link
                    as={Link}
                    to="/create-profile"
                    className="nav-link-custom"
                  >
                    <i className="bi bi-plus-circle me-1"></i>
                    {t("becomeProvider")}
                  </Nav.Link>
                )}
                <Nav.Link as={Link} to="/profile" className="nav-link-custom">
                  <i className="bi bi-person me-1"></i>
                  {t("myProfile")}
                </Nav.Link>
                <LanguageSelector />
                <Button
                  variant="outline-light"
                  onClick={logout}
                  className="ms-2 logout-button"
                  size="sm"
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  {t("logout")}
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="nav-link-custom">
                  <i className="bi bi-box-arrow-in-right me-1"></i>
                  {t("login")}
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="nav-link-custom">
                  <i className="bi bi-person-plus me-1"></i>
                  {t("register")}
                </Nav.Link>
                <LanguageSelector />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
