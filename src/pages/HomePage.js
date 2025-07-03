"use client";

import { Container, Row, Col, Card, Button } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import CategoryCard from "../components/CategoryCard";
import ProviderCard from "../components/ProviderCard";
import { Link } from "react-router-dom";
import { popularCategories, featuredProviders } from "../data/mockData";
import { useLanguage } from "../context/LanguageContext";

import { useState, useEffect } from "react";

const HomePage = () => {
  const { t } = useLanguage();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories desde el backend:
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/categorias/get_all");
        if (!response.ok) {
          throw new Error("Error fetching categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []); // [] significa que se ejecuta 1 sola vez al montar

  return (
    <>
      <section className="hero-section text-center" role="banner">
        <Container>
          <div className="fade-in">
            <h1 className="display-4 fw-bold mb-4">
              <i className="bi bi-hand-thumbs-up me-3" aria-hidden="true"></i>
              {t("heroTitle")}
            </h1>
            <p className="lead mb-5">{t("heroSubtitle")}</p>
            <SearchBar className="max-width-md mx-auto" />
          </div>
        </Container>
      </section>

      <Container className="py-5" id="main-content">
        <main>
          <section
            className="mb-5"
            aria-labelledby="popular-categories-heading"
          >
            <div className="text-center mb-5">
              <h2
                id="popular-categories-heading"
                className="accent-alamano mb-3"
              >
                {t("popularCategories")}
              </h2>
              <p className="text-muted">{t("popularCategoriesSubtitle")}</p>
            </div>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4" role="list">
              {categories.map((category) => (
                <Col key={category.id} role="listitem">
                  <CategoryCard
                    category={category}
                    onClick={() => setSelectedCategory(category)}
                  />
                </Col>
              ))}
            </Row>
          </section>

          <section
            className="mb-5"
            aria-labelledby="featured-providers-heading"
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2
                  id="featured-providers-heading"
                  className="accent-alamano mb-2"
                >
                  {t("featuredProviders")}
                </h2>
                <p className="text-muted mb-0">
                  {t("featuredProvidersSubtitle")}
                </p>
              </div>
              <Link to="/search" className="text-decoration-none">
                <Button
                  variant="outline-primary"
                  aria-describedby="featured-providers-heading"
                >
                  {t("seeAll")}{" "}
                  <i className="bi bi-arrow-right ms-1" aria-hidden="true"></i>
                </Button>
              </Link>
            </div>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4" role="list">
              {featuredProviders.map((provider) => (
                <Col key={provider.id} role="listitem">
                  <ProviderCard provider={provider} />
                </Col>
              ))}
            </Row>
          </section>

          <section aria-labelledby="become-provider-heading">
            <Card className="card-alamano border-0 bg-light-alamano">
              <Card.Body className="p-5 text-center">
                <div className="mb-4">
                  <i
                    className="bi bi-briefcase fs-1 accent-alamano"
                    aria-hidden="true"
                  ></i>
                </div>
                <h2
                  id="become-provider-heading"
                  className="accent-alamano mb-3"
                >
                  {t("professionalQuestion")}
                </h2>
                <p className="mb-4 text-muted">
                  {t("professionalDescription")}
                </p>
                <Link to="/create-profile">
                  <Button variant="primary" size="lg">
                    <i
                      className="bi bi-plus-circle me-2"
                      aria-hidden="true"
                    ></i>
                    {t("createProfessionalProfile")}
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </section>

          {/* Aquí podrías mostrar detalles del seleccionado */}
          {selectedCategory && (
            <section>
              <h3>Detalles:</h3>
              <p>{selectedCategory.nombre}</p>
              {/* Más info */}
            </section>
          )}
        </main>
      </Container>
    </>
  );
};

export default HomePage;