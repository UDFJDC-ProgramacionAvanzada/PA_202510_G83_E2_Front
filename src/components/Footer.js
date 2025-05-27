import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5>AlaMano</h5>
            <p className="text-muted">Conectando personas con los mejores proveedores de servicios locales.</p>
          </Col>
          <Col md={2} className="mb-3">
            <h5>Enlaces</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-muted">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-muted">
                  Buscar
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-muted">
                  Registrarse
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted">
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={3} className="mb-3">
            <h5>Categorías</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/search?category=hogar" className="text-muted">
                  Hogar
                </Link>
              </li>
              <li>
                <Link to="/search?category=educacion" className="text-muted">
                  Educación
                </Link>
              </li>
              <li>
                <Link to="/search?category=tecnologia" className="text-muted">
                  Tecnología
                </Link>
              </li>
              <li>
                <Link to="/search?category=mascotas" className="text-muted">
                  Mascotas
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={3} className="mb-3">
            <h5>Contacto</h5>
            <ul className="list-unstyled text-muted">
              <li>Email: info@alamano.com</li>
              <li>Teléfono: (123) 456-7890</li>
              <li>Dirección: Calle Principal 123</li>
            </ul>
          </Col>
        </Row>
        <hr className="my-3 bg-secondary" />
        <Row>
          <Col className="text-center text-muted">
            <small>&copy; {new Date().getFullYear()} AlaMano. Todos los derechos reservados.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
