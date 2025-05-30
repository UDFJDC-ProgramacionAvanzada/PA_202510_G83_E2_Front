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
  Offcanvas,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const { t } = useLanguage();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);

  return (
    <>
      <Navbar className="navbar-alamano shadow-sm" expand="lg" sticky="top">
        <Container>
          {/* Brand */}
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 me-4">
            <i className="bi bi-hand-thumbs-up me-2"></i>
            <span className="d-none d-sm-inline">AlaMano</span>
          </Navbar.Brand>

          {/* Search Bar - Desktop */}
          <div
            className="d-none d-lg-flex flex-grow-1 mx-4"
            style={{ maxWidth: "500px" }}
          >
            <Form className="d-flex w-100" onSubmit={handleSearch}>
              <div className="input-group">
                <FormControl
                  type="search"
                  placeholder={t("searchPlaceholder")}
                  className="border-end-0"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  variant="outline-light"
                  type="submit"
                  className="border-start-0 px-3"
                >
                  <i className="bi bi-search"></i>
                </Button>
              </div>
            </Form>
          </div>

          {/* Desktop Navigation */}
          <Nav className="d-none d-lg-flex align-items-center ms-auto">
            {isAuthenticated ? (
              <>
                {/* Admin Link */}
                {isAdmin() && (
                  <Nav.Link
                    as={Link}
                    to="/admin"
                    className="nav-link-custom me-2"
                  >
                    <i className="bi bi-shield-check me-1"></i>
                    <span className="d-none d-xl-inline">{t("admin")}</span>
                  </Nav.Link>
                )}

                {/* Favorites */}
                <Nav.Link
                  as={Link}
                  to="/favorites"
                  className="nav-link-custom me-2"
                >
                  <i className="bi bi-heart me-1"></i>
                  <span className="d-none d-xl-inline">{t("favorites")}</span>
                </Nav.Link>

                {/* Provider/Dashboard Link */}
                {user?.isProvider ? (
                  <Nav.Link
                    as={Link}
                    to="/provider-dashboard"
                    className="nav-link-custom me-2"
                  >
                    <i className="bi bi-speedometer2 me-1"></i>
                    <span className="d-none d-xl-inline">{t("dashboard")}</span>
                  </Nav.Link>
                ) : (
                  <Nav.Link
                    as={Link}
                    to="/create-profile"
                    className="nav-link-custom me-2"
                  >
                    <i className="bi bi-plus-circle me-1"></i>
                    <span className="d-none d-xl-inline">
                      {t("becomeProvider")}
                    </span>
                  </Nav.Link>
                )}

                {/* Language Selector */}
                <div className="me-3">
                  <LanguageSelector variant="outline-light" size="sm" />
                </div>

                {/* User Dropdown */}
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="outline-light"
                    className="user-dropdown d-flex align-items-center"
                  >
                    <img
                      src={user?.profileImage || "/user-placeholder.jpg"}
                      alt={user?.name}
                      className="rounded-circle me-2"
                      style={{
                        width: "32px",
                        height: "32px",
                        objectFit: "cover",
                      }}
                    />
                    <span className="d-none d-xl-inline me-1">
                      {user?.name}
                    </span>
                    <i className="bi bi-chevron-down"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdown-menu-custom">
                    <Dropdown.Header className="text-muted">
                      <div className="d-flex align-items-center">
                        <img
                          src={user?.profileImage || "/user-placeholder.jpg"}
                          alt={user?.name}
                          className="rounded-circle me-2"
                          style={{
                            width: "24px",
                            height: "24px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <div className="fw-semibold">{user?.name}</div>
                          <small className="text-muted">{user?.email}</small>
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
                    <Dropdown.Item onClick={logout} className="text-danger">
                      <i className="bi bi-box-arrow-right me-2"></i>
                      {t("logout")}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                {/* Language Selector */}
                <div className="me-3">
                  <LanguageSelector variant="outline-light" size="sm" />
                </div>

                {/* Login/Register Buttons */}
                <div className="d-flex gap-2">
                  <Button
                    as={Link}
                    to="/login"
                    variant="outline-light"
                    size="sm"
                  >
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    {t("login")}
                  </Button>
                  <Button
                    as={Link}
                    to="/register"
                    variant="light"
                    size="sm"
                    className="text-primary"
                  >
                    <i className="bi bi-person-plus me-1"></i>
                    {t("register")}
                  </Button>
                </div>
              </>
            )}
          </Nav>

          {/* Mobile Menu Toggle */}
          <Button
            variant="outline-light"
            className="d-lg-none ms-2"
            onClick={handleShowOffcanvas}
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list fs-5"></i>
          </Button>
        </Container>
      </Navbar>

      {/* Mobile Search Bar */}
      <div className="d-lg-none bg-light border-bottom">
        <Container className="py-2">
          <Form onSubmit={handleSearch}>
            <div className="input-group">
              <FormControl
                type="search"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-end-0"
              />
              <Button
                variant="primary"
                type="submit"
                className="border-start-0"
              >
                <i className="bi bi-search"></i>
              </Button>
            </div>
          </Form>
        </Container>
      </div>

      {/* Mobile Offcanvas Menu */}
      <Offcanvas
        show={showOffcanvas}
        onHide={handleCloseOffcanvas}
        placement="end"
        className="offcanvas-custom"
      >
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title className="d-flex align-items-center">
            <i className="bi bi-hand-thumbs-up me-2 text-primary"></i>
            AlaMano
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          {isAuthenticated ? (
            <>
              {/* User Info */}
              <div className="p-3 bg-light border-bottom">
                <div className="d-flex align-items-center">
                  <img
                    src={user?.profileImage || "/user-placeholder.jpg"}
                    alt={user?.name}
                    className="rounded-circle me-3"
                    style={{
                      width: "48px",
                      height: "48px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <div className="fw-semibold">{user?.name}</div>
                    <small className="text-muted">{user?.email}</small>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <Nav className="flex-column">
                {isAdmin() && (
                  <Nav.Link
                    as={Link}
                    to="/admin"
                    onClick={handleCloseOffcanvas}
                    className="mobile-nav-link"
                  >
                    <i className="bi bi-shield-check me-3 text-danger"></i>
                    {t("admin")}
                  </Nav.Link>
                )}

                <Nav.Link
                  as={Link}
                  to="/profile"
                  onClick={handleCloseOffcanvas}
                  className="mobile-nav-link"
                >
                  <i className="bi bi-person me-3 text-primary"></i>
                  {t("myProfile")}
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/favorites"
                  onClick={handleCloseOffcanvas}
                  className="mobile-nav-link"
                >
                  <i className="bi bi-heart me-3 text-primary"></i>
                  {t("favorites")}
                </Nav.Link>

                {user?.isProvider ? (
                  <Nav.Link
                    as={Link}
                    to="/provider-dashboard"
                    onClick={handleCloseOffcanvas}
                    className="mobile-nav-link"
                  >
                    <i className="bi bi-speedometer2 me-3 text-primary"></i>
                    {t("dashboard")}
                  </Nav.Link>
                ) : (
                  <Nav.Link
                    as={Link}
                    to="/create-profile"
                    onClick={handleCloseOffcanvas}
                    className="mobile-nav-link"
                  >
                    <i className="bi bi-plus-circle me-3 text-success"></i>
                    {t("becomeProvider")}
                  </Nav.Link>
                )}

                <hr className="my-2" />

                {/* Language Selector */}
                <div className="px-3 py-2">
                  <small className="text-muted text-uppercase fw-semibold">
                    {t("language")}
                  </small>
                  <div className="mt-2">
                    <LanguageSelector variant="outline-primary" size="sm" />
                  </div>
                </div>

                <hr className="my-2" />

                {/* Logout */}
                <Nav.Link
                  onClick={() => {
                    logout();
                    handleCloseOffcanvas();
                  }}
                  className="mobile-nav-link text-danger"
                >
                  <i className="bi bi-box-arrow-right me-3"></i>
                  {t("logout")}
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <>
              {/* Guest Navigation */}
              <Nav className="flex-column">
                <Nav.Link
                  as={Link}
                  to="/login"
                  onClick={handleCloseOffcanvas}
                  className="mobile-nav-link"
                >
                  <i className="bi bi-box-arrow-in-right me-3 text-primary"></i>
                  {t("login")}
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/register"
                  onClick={handleCloseOffcanvas}
                  className="mobile-nav-link"
                >
                  <i className="bi bi-person-plus me-3 text-success"></i>
                  {t("register")}
                </Nav.Link>

                <hr className="my-2" />

                {/* Language Selector */}
                <div className="px-3 py-2">
                  <small className="text-muted text-uppercase fw-semibold">
                    {t("language")}
                  </small>
                  <div className="mt-2">
                    <LanguageSelector variant="outline-primary" size="sm" />
                  </div>
                </div>
              </Nav>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;
