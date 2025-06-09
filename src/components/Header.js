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

const Header = () => {
  // --- Estados y Hooks ---
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const { t } = useLanguage();

  // --- Manejadores de Eventos ---
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // --- Renderizado del Componente ---
  return (
    <>
      {/* --- Enlace para Saltar al Contenido Principal --- */}
      <a href="#main-content" className="skip-link sr-only sr-only-focusable">
        {t("skipToMainContent")}
      </a>

      <Navbar className="navbar-alamano" expand="lg" sticky="top">
        <Container>
          {/* --- Logo de la Marca --- */}
          <Navbar.Brand as={Link} to="/" className="fw-bold me-0">
            <i className="bi bi-hand-thumbs-up me-2"></i>
            AlaMano
          </Navbar.Brand>

          {/* --- Botón Toggle para Menú Móvil --- */}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="ms-auto d-lg-none"
            aria-label={t("toggleNavigation")}
            aria-expanded="false"
          />

          {/* --- Barra de Búsqueda (Escritorio) --- */}
          <Form
            className="d-none d-lg-flex mx-auto search-form-container"
            onSubmit={handleSearch}
            role="search"
          >
            <div className="search-container">
              <FormControl
                type="search"
                placeholder={t("searchPlaceholder")}
                className="search-input"
                aria-label={t("searchServices")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="desktop-search"
              />
              <Button
                variant="outline-light"
                type="submit"
                className="search-button"
                aria-label={t("searchButton")}
                aria-describedby="desktop-search"
              >
                <i className="bi bi-search" aria-hidden="true"></i>
              </Button>
            </div>
          </Form>

          {/* --- Navegación Principal y Acciones --- */}
          <Navbar.Collapse id="basic-navbar-nav">
            {/* --- Barra de Búsqueda (Móvil) --- */}
            <div className="d-lg-none mb-3 w-100">
              <Form
                className="search-form-mobile"
                onSubmit={handleSearch}
                role="search"
              >
                <div className="search-container-mobile">
                  <FormControl
                    type="search"
                    placeholder={t("searchPlaceholder")}
                    className="search-input-mobile"
                    aria-label={t("searchServices")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    id="mobile-search"
                  />
                  <Button
                    variant="primary"
                    type="submit"
                    className="search-button-mobile"
                    aria-label={t("searchButton")}
                    aria-describedby="mobile-search"
                  >
                    <i className="bi bi-search" aria-hidden="true"></i>
                  </Button>
                </div>
              </Form>
            </div>

            <Nav className="ms-auto nav-links">
              {isAuthenticated ? (
                // --- Enlaces para Usuarios Autenticados ---
                <div className="d-flex align-items-center nav-group-container">
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

                  {/* Separador vertical */}
                  <div className="nav-separator d-none d-lg-block"></div>

                  {/* Usuario */}
                  <Nav.Link
                    as={Link}
                    to="/profile"
                    className="nav-link-custom user-profile-link"
                  >
                    <img
                      src={user?.profileImage || "/user-placeholder.jpg"}
                      alt={user?.name}
                      className="user-avatar-small"
                    />
                    <span className="nav-text d-none d-xl-inline">
                      {user?.name}
                    </span>
                  </Nav.Link>

                  <Button
                    variant="outline-light"
                    size="sm"
                    onClick={logout}
                    className="logout-btn"
                  >
                    <i className="bi bi-box-arrow-right me-1"></i>
                    <span className="d-none d-lg-inline">{t("logout")}</span>
                  </Button>
                </div>
              ) : (
                // --- Botones para Usuarios No Autenticados ---
                <div className="d-flex align-items-center auth-buttons-container">
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
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
