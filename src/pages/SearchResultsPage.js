"use client";

import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ProviderCard from "../components/ProviderCard";
import { providers } from "../data/mockData";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [sortBy, setSortBy] = useState("rating");

  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const location = searchParams.get("location") || "";

  useEffect(() => {
    // Filtrar proveedores según los parámetros de búsqueda
    let results = [...providers];

    if (query) {
      const searchTerms = query.toLowerCase().split(" ");
      results = results.filter((provider) => {
        return searchTerms.some(
          (term) =>
            provider.name.toLowerCase().includes(term) ||
            provider.description.toLowerCase().includes(term) ||
            provider.skills.some((skill) => skill.toLowerCase().includes(term))
        );
      });
    }

    if (category) {
      results = results.filter((provider) => provider.categoryId === category);
    }

    if (location) {
      results = results.filter((provider) =>
        provider.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Ordenar resultados
    sortResults(results, sortBy);
  }, [query, category, location, sortBy]);

  const sortResults = (results, sortCriteria) => {
    const sortedResults = [...results];

    switch (sortCriteria) {
      case "rating":
        sortedResults.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        sortedResults.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "name_asc":
        sortedResults.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        sortedResults.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredProviders(sortedResults);
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4 accent-alamano">Resultados de búsqueda</h1>

      <Row className="mb-4">
        <Col>
          <SearchBar showAdvanced={true} />
        </Col>
      </Row>

      <Row>
        <Col md={3} className="mb-4">
          <Card className="card-alamano">
            <Card.Header className="bg-light-alamano">
              <h5 className="mb-0">
                <i className="bi bi-funnel me-2"></i>
                Filtros
              </h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Disponibilidad</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Solo disponibles"
                  id="availability-check"
                  className="text-primary"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Calificación mínima</Form.Label>
                <Form.Select>
                  <option value="">Cualquier calificación</option>
                  <option value="4">4+ estrellas</option>
                  <option value="3">3+ estrellas</option>
                  <option value="2">2+ estrellas</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Range />
                <div className="d-flex justify-content-between">
                  <small className="text-muted">Económico</small>
                  <small className="text-muted">Premium</small>
                </div>
              </Form.Group>

              <Button variant="primary" className="w-100">
                <i className="bi bi-check-circle me-1"></i>
                Aplicar filtros
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={9}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="mb-0 accent-alamano">
              <strong>{filteredProviders.length}</strong> resultados encontrados
            </p>
            <Form.Select
              style={{ width: "auto" }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Mejor calificados</option>
              <option value="reviews">Más reseñas</option>
              <option value="name_asc">Nombre (A-Z)</option>
              <option value="name_desc">Nombre (Z-A)</option>
            </Form.Select>
          </div>

          {filteredProviders.length > 0 ? (
            <Row xs={1} md={2} lg={3} className="g-4">
              {filteredProviders.map((provider) => (
                <Col key={provider.id}>
                  <ProviderCard provider={provider} />
                </Col>
              ))}
            </Row>
          ) : (
            <Card className="text-center p-5 card-alamano">
              <Card.Body>
                <i className="bi bi-search fs-1 text-muted mb-3"></i>
                <h4 className="accent-alamano">No se encontraron resultados</h4>
                <p className="text-muted">
                  Intenta con otros términos de búsqueda o filtros
                </p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SearchResultsPage;
