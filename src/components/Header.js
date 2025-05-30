"use client";

import { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Form,
  FormControl,
  Dropdown,
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
        {/* Sección 1: Brand/Logo */}
        <div className="header-section brand-section">
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            <i className="bi bi-hand-thumbs-up me-2"></i>
            AlaMano
          </Navbar.Brand>
        </div>

        {/* Sección 2: Barra de búsqueda (Desktop) */}
        <div className="header-section search-section d-none d-lg-flex">
          <Form className="search-form" onSubmit={handleSearch}>
            <div className="search-container">
              <FormControl
                type="search"
                placeholder={t("searchPlaceholder")}
                className="search-input"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant="outline-light"
                type="submit"
                className="search-button"
              >
                <i className="bi bi-search"></i>
              </Button>
            </div>
          </Form>
        </div>

        {/* Toggle para móvil */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="d-lg-none" />

        {/* Sección 3: Navegación y acciones */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Barra de búsqueda móvil */}
          <div className="header-section search-section-mobile d-lg-none mb-3">
            <Form className="search-form-mobile" onSubmit={handleSearch}>
              <div className="search-container-mobile">
                <FormControl
                  type="search"
                  placeholder={t("searchPlaceholder")}
                  className="search-input-mobile"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  variant="primary"
                  type="submit"
                  className="search-button-mobile"
                >
                  <i className="bi bi-search"></i>
                </Button>
              </div>
            </Form>
          </div>

          <div className="header-section nav-section">
            <Nav className="nav-links">
              {isAuthenticated ? (
                <>
                  {/* Grupo 1: Enlaces principales */}
                  <div className="nav-group main-links">
                    {isAdmin() && (
                      <Nav.Link
                        as={Link}
                        to="/admin"
                        className="nav-link-custom admin-link"
                      >
                        <i className="bi bi-shield-check me-1"></i>
                        <span className="nav-text">{t("admin")}</span>
                      </Nav.Link>
                    )}
                    <Nav.Link
                      as={Link}
                      to="/favorites"
                      className="nav-link-custom"
                    >
                      <i className="bi bi-heart me-1"></i>
                      <span className="nav-text">{t("favorites")}</span>
                    </Nav.Link>
                    {user?.isProvider ? (
                      <Nav.Link
                        as={Link}
                        to="/provider-dashboard"
                        className="nav-link-custom"
                      >
                        <i className="bi bi-speedometer2 me-1"></i>
                        <span className="nav-text">{t("dashboard")}</span>
                      </Nav.Link>
                    ) : (
                      <Nav.Link
                        as={Link}
                        to="/create-profile"
                        className="nav-link-custom provider-link"
                      >
                        <i className="bi bi-plus-circle me-1"></i>
                        <span className="nav-text">{t("becomeProvider")}</span>
                      </Nav.Link>
                    )}
                  </div>

                  {/* Grupo 2: Configuración y usuario */}
                  <div className="nav-group user-controls">
                    <div className="language-wrapper">
                      <LanguageSelector variant="outline-light" size="sm" />
                    </div>

                    <Dropdown align="end" className="user-dropdown-wrapper">
                      <Dropdown.Toggle
                        variant="outline-light"
                        className="user-dropdown-toggle"
                      >
                        <img
                          src={user?.profileImage || "/user-placeholder.jpg"}
                          alt={user?.name}
                          className="user-avatar"
                        />
                        <span className="user-name d-none d-xl-inline">
                          {user?.name}
                        </span>
                        <i className="bi bi-chevron-down ms-1"></i>
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="user-dropdown-menu">
                        <Dropdown.Header>
                          <div className="user-info">
                            <img
                              src={
                                user?.profileImage || "/user-placeholder.jpg"
                              }
                              alt={user?.name}
                              className="user-avatar-small"
                            />
                            <div className="user-details">
                              <div className="user-name-dropdown">
                                {user?.name}
                              </div>
                              <small className="user-email">
                                {user?.email}
                              </small>
                            </div>
                          </div>
                        </Dropdown.Header>
                        <Dropdown.Divider />
                        <Dropdown.Item as={Link} to="/profile">
                          <i className="bi bi-person me-2"></i>
                          {t("myProfile")}
                        </Dropdown.Item>
                        {user?.isProvider && (
                          <Dropdown.Item as={Link} to="/provider-dashboard">
                            <i className="bi bi-speedometer2 me-2"></i>
                            {t("dashboard")}
                          </Dropdown.Item>
                        )}
                        <Dropdown.Item as={Link} to="/favorites">
                          <i className="bi bi-heart me-2"></i>
                          {t("favorites")}
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={logout} className="logout-item">
                          <i className="bi bi-box-arrow-right me-2"></i>
                          {t("logout")}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </>
              ) : (
                <>
                  {/* Grupo para usuarios no autenticados */}
                  <div className="nav-group guest-controls">
                    <div className="language-wrapper">
                      <LanguageSelector variant="outline-light" size="sm" />
                    </div>
                    <div className="auth-buttons">
                      <Button
                        as={Link}
                        to="/login"
                        variant="outline-light"
                        size="sm"
                        className="login-btn"
                      >
                        <i className="bi bi-box-arrow-in-right me-1"></i>
                        {t("login")}
                      </Button>
                      <Button
                        as={Link}
                        to="/register"
                        variant="light"
                        size="sm"
                        className="register-btn"
                      >
                        <i className="bi bi-person-plus me-1"></i>
                        {t("register")}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
