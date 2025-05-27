import { Container, Row, Col, Card, Button } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import CategoryCard from "../components/CategoryCard";
import ProviderCard from "../components/ProviderCard";
import { Link } from "react-router-dom";
import { popularCategories, featuredProviders } from "../data/mockData";

const HomePage = () => {
  return (
    <>
      <section className="hero-section text-center">
        <Container>
          <div className="fade-in">
            <h1 className="display-4 fw-bold mb-4">
              <i className="bi bi-hand-thumbs-up me-3"></i>
              Encuentra el servicio que necesitas
            </h1>
            <p className="lead mb-5">
              Conectamos a personas con los mejores proveedores de servicios
              locales. Tu solución está al alcance de tu mano.
            </p>
            <SearchBar className="max-width-md mx-auto" />
          </div>
        </Container>
      </section>

      <Container className="py-5">
        <section className="mb-5">
          <div className="text-center mb-5">
            <h2 className="accent-alamano mb-3">Categorías populares</h2>
            <p className="text-muted">
              Descubre los servicios más solicitados en tu área
            </p>
          </div>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {popularCategories.map((category) => (
              <Col key={category.id}>
                <CategoryCard category={category} />
              </Col>
            ))}
          </Row>
        </section>

        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="accent-alamano mb-2">Proveedores destacados</h2>
              <p className="text-muted mb-0">
                Los mejores profesionales de nuestra plataforma
              </p>
            </div>
            <Link to="/search" className="text-decoration-none">
              <Button variant="outline-primary">
                Ver todos <i className="bi bi-arrow-right ms-1"></i>
              </Button>
            </Link>
          </div>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {featuredProviders.map((provider) => (
              <Col key={provider.id}>
                <ProviderCard provider={provider} />
              </Col>
            ))}
          </Row>
        </section>

        <section>
          <Card className="card-alamano border-0 bg-light-alamano">
            <Card.Body className="p-5 text-center">
              <div className="mb-4">
                <i className="bi bi-briefcase fs-1 accent-alamano"></i>
              </div>
              <h2 className="accent-alamano mb-3">¿Eres un profesional?</h2>
              <p className="mb-4 text-muted">
                Únete a nuestra plataforma y comienza a ofrecer tus servicios a
                miles de personas. Crea tu perfil profesional y haz crecer tu
                negocio.
              </p>
              <Link to="/create-profile">
                <Button variant="primary" size="lg">
                  <i className="bi bi-plus-circle me-2"></i>
                  Crear perfil profesional
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </section>
      </Container>
    </>
  );
};

export default HomePage;
