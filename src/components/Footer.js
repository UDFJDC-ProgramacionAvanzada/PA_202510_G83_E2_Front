"use client";

import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-alamano py-5 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5 className="d-flex align-items-center">
              <i className="bi bi-hand-thumbs-up me-2"></i>
              AlaMano
            </h5>
            <p className="text-muted">{t("footerDescription")}</p>
            <div className="d-flex gap-3">
              <i className="bi bi-facebook fs-4 cursor-pointer"></i>
              <i className="bi bi-twitter fs-4 cursor-pointer"></i>
              <i className="bi bi-instagram fs-4 cursor-pointer"></i>
              <i className="bi bi-linkedin fs-4 cursor-pointer"></i>
            </div>
          </Col>
          <Col md={2} className="mb-3">
            <h6>{t("links")}</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/">{t("home")}</Link>
              </li>
              <li className="mb-2">
                <Link to="/search">{t("search")}</Link>
              </li>
              <li className="mb-2">
                <Link to="/register">{t("register")}</Link>
              </li>
              <li className="mb-2">
                <Link to="/login">{t("login")}</Link>
              </li>
            </ul>
          </Col>
          <Col md={3} className="mb-3">
            <h6>{t("popularCategories")}</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/search?category=hogar">{t("categories.hogar")}</Link>
              </li>
              <li className="mb-2">
                <Link to="/search?category=educacion">
                  {t("categories.educacion")}
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/search?category=tecnologia">
                  {t("categories.tecnologia")}
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/search?category=mascotas">
                  {t("categories.mascotas")}
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={3} className="mb-3">
            <h6>{t("contactUs")}</h6>
            <ul className="list-unstyled text-muted">
              <li className="mb-2">
                <i className="bi bi-envelope me-2"></i>
                info@alamano.com
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone me-2"></i>
                (123) 456-7890
              </li>
              <li className="mb-2">
                <i className="bi bi-geo-alt me-2"></i>
                Calle Principal 123
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="separator-alamano my-4" />
        <Row>
          <Col className="text-center">
            <small className="text-muted">
              &copy; {currentYear} AlaMano. {t("allRightsReserved")} |
              <Link to="/privacy" className="ms-2">
                {t("privacyPolicy")}
              </Link>{" "}
              |
              <Link to="/terms" className="ms-2">
                {t("termsOfService")}
              </Link>
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
