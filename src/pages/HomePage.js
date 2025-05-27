import { Container, Row, Col, Card } from "react-bootstrap"
import SearchBar from "../components/SearchBar"
import CategoryCard from "../components/CategoryCard"
import ProviderCard from "../components/ProviderCard"
import { Link } from "react-router-dom"
import { popularCategories, featuredProviders } from "../data/mockData"

const HomePage = () => {
  return (
    <>
      <section className="hero-section text-center">
        <Container>
          <h1 className="display-4 fw-bold mb-4">Encuentra el servicio que necesitas</h1>
          <p className="lead mb-5">Conectamos a personas con los mejores proveedores de servicios locales</p>
          <SearchBar className="max-width-md mx-auto" />
        </Container>
      </section>

      <Container className="py-5">
        <section className="mb-5">
          <h2 className="text-center mb-4">Categorías populares</h2>
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
            <h2>Proveedores destacados</h2>
            <Link to="/search" className="text-decoration-none">
              Ver todos
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
          <Card className="bg-light border-0">
            <Card.Body className="p-4 text-center">
              <h2 className="mb-3">¿Eres un profesional?</h2>
              <p className="mb-4">Únete a nuestra plataforma y comienza a ofrecer tus servicios a miles de personas.</p>
              <Link to="/create-profile" className="btn btn-primary">
                Crear perfil profesional
              </Link>
            </Card.Body>
          </Card>
        </section>
      </Container>
    </>
  )
}

export default HomePage
