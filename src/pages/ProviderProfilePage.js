"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Tabs,
  Tab,
  Alert,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";
import StarRating from "../components/StarRating";
import ReviewItem from "../components/ReviewItem";
import ReviewForm from "../components/ReviewForm";
import ImageGallery from "../components/ImageGallery";
import ReportModal from "../components/ReportModal";
import { providers, reviews } from "../data/mockData";

const ProviderProfilePage = () => {
  const { id } = useParams();
  const { favorites, toggleFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  const [provider, setProvider] = useState(null);
  const [providerReviews, setProviderReviews] = useState([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  useEffect(() => {
    // Simulación de carga de datos del proveedor
    const foundProvider = providers.find((p) => p.id === id);
    if (foundProvider) {
      setProvider(foundProvider);

      // Filtrar reseñas para este proveedor
      const filteredReviews = reviews.filter((r) => r.providerId === id);
      setProviderReviews(filteredReviews);
    }
  }, [id]);

  const handleReviewSubmit = (reviewData) => {
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para dejar una reseña");
      return;
    }

    // Simulación de envío de reseña
    const newReview = {
      id: Date.now().toString(),
      providerId: id,
      userId: "current-user",
      userName: "Usuario Actual",
      userImage: "/user-placeholder.jpg",
      rating: reviewData.rating,
      comment: reviewData.comment,
      date: new Date().toLocaleDateString(),
    };

    setProviderReviews([newReview, ...providerReviews]);
  };

  const handleReportSubmit = (reportData) => {
    // Simulación de envío de reporte
    console.log("Reporte enviado:", reportData);
    setReportSuccess(true);
    setTimeout(() => setReportSuccess(false), 5000);
  };

  if (!provider) {
    return (
      <Container className="py-5 text-center">
        <h2>Cargando perfil...</h2>
      </Container>
    );
  }

  const isFavorite = favorites.includes(provider.id);

  return (
    <>
      <div className="profile-header">
        <Container>
          <Row className="align-items-center">
            <Col md={3} className="text-center text-md-start">
              <img
                src={provider.profileImage || "/placeholder.svg"}
                alt={provider.name}
                className="profile-image mb-3 mb-md-0"
              />
            </Col>
            <Col md={6}>
              <h1 className="mb-2">{provider.name}</h1>
              <p className="text-muted mb-2">
                <i className="bi bi-briefcase me-2"></i>
                {provider.category}
              </p>
              <p className="mb-2">
                <i className="bi bi-geo-alt me-2"></i>
                {provider.location}
              </p>
              <div className="d-flex align-items-center mb-3">
                <StarRating rating={provider.rating} size="medium" />
                <span className="ms-2">
                  {provider.rating.toFixed(1)} ({provider.reviewCount} reseñas)
                </span>
              </div>
              <Badge
                bg={provider.isAvailable ? "success" : "dark"}
                className="availability-badge"
              >
                {provider.isAvailable
                  ? "Disponible para trabajar"
                  : "No disponible actualmente"}
              </Badge>
            </Col>
            <Col md={3} className="mt-3 mt-md-0 text-center text-md-end">
              <Button
                variant={isFavorite ? "outline-secondary" : "outline-primary"}
                className="mb-2 w-100"
                onClick={() => toggleFavorite(provider.id)}
              >
                <i
                  className={`bi ${
                    isFavorite ? "bi-heart-fill" : "bi-heart"
                  } me-2`}
                ></i>
                {isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
              </Button>
              <Button variant="primary" className="w-100">
                <i className="bi bi-chat-dots me-2"></i>
                Contactar
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-4">
        {reportSuccess && (
          <Alert variant="success" className="mb-4">
            Gracias por tu reporte. Lo revisaremos lo antes posible.
          </Alert>
        )}

        <Tabs defaultActiveKey="about" className="mb-4">
          <Tab eventKey="about" title="Acerca de">
            <Row>
              <Col md={8}>
                <h3 className="mb-3">Descripción</h3>
                <p>{provider.description}</p>

                <h3 className="mb-3 mt-4">Habilidades</h3>
                <div className="mb-4">
                  {provider.skills.map((skill, index) => (
                    <Badge bg="secondary" className="me-2 mb-2" key={index}>
                      {skill}
                    </Badge>
                  ))}
                </div>

                <h3 className="mb-3">Galería de trabajos</h3>
                <ImageGallery images={provider.gallery} />
              </Col>

              <Col md={4}>
                <div className="card mb-4">
                  <div className="card-body">
                    <h4 className="card-title mb-3">Información de contacto</h4>
                    <p className="mb-2">
                      <i className="bi bi-telephone me-2"></i>
                      {provider.phone}
                    </p>
                    <p className="mb-2">
                      <i className="bi bi-envelope me-2"></i>
                      {provider.email}
                    </p>
                    <p className="mb-2">
                      <i className="bi bi-globe me-2"></i>
                      <a
                        href={provider.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {provider.website}
                      </a>
                    </p>

                    <h5 className="mt-4 mb-2">Horario de atención</h5>
                    <p className="small mb-1">
                      Lunes a Viernes: {provider.schedule.weekdays}
                    </p>
                    <p className="small mb-1">
                      Sábados: {provider.schedule.saturday}
                    </p>
                    <p className="small">
                      Domingos: {provider.schedule.sunday}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline-danger"
                  size="sm"
                  className="w-100"
                  onClick={() => setShowReportModal(true)}
                >
                  <i className="bi bi-flag me-2"></i>
                  Reportar perfil
                </Button>
              </Col>
            </Row>
          </Tab>

          <Tab eventKey="reviews" title={`Reseñas (${providerReviews.length})`}>
            <Row>
              <Col md={8}>
                <h3 className="mb-4">Reseñas de clientes</h3>

                {providerReviews.length > 0 ? (
                  providerReviews.map((review) => (
                    <ReviewItem key={review.id} review={review} />
                  ))
                ) : (
                  <Alert variant="info">
                    Este proveedor aún no tiene reseñas. ¡Sé el primero en dejar
                    una!
                  </Alert>
                )}
              </Col>

              <Col md={4}>
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title mb-3">Deja tu reseña</h4>
                    <ReviewForm onSubmit={handleReviewSubmit} />
                  </div>
                </div>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </Container>

      <ReportModal
        show={showReportModal}
        handleClose={() => setShowReportModal(false)}
        onSubmit={handleReportSubmit}
      />
    </>
  );
};

export default ProviderProfilePage;
