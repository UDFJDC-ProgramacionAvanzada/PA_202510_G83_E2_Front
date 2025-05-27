import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-alamano py-5 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5 className="d-flex align-items-center">
              <i className="bi bi-hand-thumbs-up me-2 pe-2">AlaMano</i>
            </h5>
            <p className="text-muted" style={{ color: "#F2F2F2 !important" }}>
              Conectando personas con los mejores proveedores de servicios
              locales. Tu solución está al alcance de tu mano.
            </p>
            <div className="d-flex gap-3">
              <i className="bi bi-facebook fs-4 cursor-pointer"></i>
              <i className="bi bi-twitter fs-4 cursor-pointer"></i>
              <i className="bi bi-instagram fs-4 cursor-pointer"></i>
              <i className="bi bi-linkedin fs-4 cursor-pointer"></i>
            </div>
          </Col>
          <Col md={2} className="mb-3">
            <h6>Enlaces</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/">Inicio</Link>
              </li>
              <li className="mb-2">
                <Link to="/search">Buscar</Link>
              </li>
              <li className="mb-2">
                <Link to="/register">Registrarse</Link>
              </li>
              <li className="mb-2">
                <Link to="/login">Iniciar Sesión</Link>
              </li>
            </ul>
          </Col>
          <Col md={3} className="mb-3">
            <h6>Categorías</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/search?category=hogar">Hogar y Reparaciones</Link>
              </li>
              <li className="mb-2">
                <Link to="/search?category=educacion">Educación</Link>
              </li>
              <li className="mb-2">
                <Link to="/search?category=tecnologia">Tecnología</Link>
              </li>
              <li className="mb-2">
                <Link to="/search?category=mascotas">Mascotas</Link>
              </li>
            </ul>
          </Col>
          <Col md={3} className="mb-3">
            <h6>Contacto</h6>
            <ul className="list-unstyled text-muted">
              <li className="mb-2">
                <i className="bi bi-envelope me-2 pe-2">info@alamano.com</i>
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone me-2 pe-2">(123) 456-7890</i>
              </li>
              <li className="mb-2">
                <i className="bi bi-geo-alt me-2 pe-2">Calle Principal 123</i>
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="separator-alamano my-4" />
        <Row>
          <Col className="text-center">
            <small className="text-muted">
              &copy; {new Date().getFullYear()} AlaMano. Todos los derechos
              reservados. |
              <Link to="/privacy" className="ms-2">
                Política de Privacidad
              </Link>{" "}
              |
              <Link to="/terms" className="ms-2">
                Términos de Servicio
              </Link>
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
