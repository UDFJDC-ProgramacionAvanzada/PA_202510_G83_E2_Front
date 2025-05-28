"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Table,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { reviews } from "../data/mockData";

const ProviderDashboardPage = () => {
  const { user } = useAuth();
  const [providerReviews, setProviderReviews] = useState([]);
  const [profileViews] = useState({
    today: 12,
    week: 78,
    month: 342,
  });

  useEffect(() => {
    if (user?.isProvider && user?.providerProfile) {
      // Filtrar reseñas para este proveedor
      const filteredReviews = reviews.filter((r) => r.providerId === user.id);
      setProviderReviews(filteredReviews);
    }
  }, [user]);

  if (!user || !user.isProvider) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="warning">
          Debes ser un proveedor para acceder al dashboard
        </Alert>
        <Link to="/create-profile" className="btn btn-primary mt-3">
          Convertirme en Proveedor
        </Link>
      </Container>
    );
  }

  const profile = user.providerProfile;

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Dashboard de Proveedor</h1>
        <Link to="/edit-profile" className="btn btn-primary">
          Editar Perfil
        </Link>
      </div>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Resumen</h4>
                <Badge
                  bg={profile.isAvailable ? "success" : "dark"}
                  className="availability-badge"
                >
                  {profile.isAvailable ? "Disponible" : "No disponible"}
                </Badge>
              </div>

              <Row className="text-center">
                <Col md={4} className="mb-3 mb-md-0">
                  <div className="border rounded p-3">
                    <h2 className="mb-1">{profile.rating.toFixed(1)}</h2>
                    <p className="text-muted mb-0">Calificación promedio</p>
                  </div>
                </Col>
                <Col md={4} className="mb-3 mb-md-0">
                  <div className="border rounded p-3">
                    <h2 className="mb-1">{profile.reviewCount}</h2>
                    <p className="text-muted mb-0">Reseñas recibidas</p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="border rounded p-3">
                    <h2 className="mb-1">{profileViews.month}</h2>
                    <p className="text-muted mb-0">Visitas este mes</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-3">Estadísticas de Visitas</h4>

              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Período</th>
                    <th>Visitas</th>
                    <th>Cambio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Hoy</td>
                    <td>{profileViews.today}</td>
                    <td className="text-success">+2 (20%)</td>
                  </tr>
                  <tr>
                    <td>Esta semana</td>
                    <td>{profileViews.week}</td>
                    <td className="text-success">+15 (24%)</td>
                  </tr>
                  <tr>
                    <td>Este mes</td>
                    <td>{profileViews.month}</td>
                    <td className="text-danger">-28 (-7.6%)</td>
                  </tr>
                </tbody>
              </Table>

              <div className="text-center mt-3">
                <Button variant="outline-primary" size="sm">
                  Ver estadísticas detalladas
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h4 className="mb-3">Reseñas Recientes</h4>

              {providerReviews.length > 0 ? (
                providerReviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="border-bottom pb-3 mb-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="d-flex align-items-center">
                        <img
                          src={review.userImage || "/placeholder.svg"}
                          alt={review.userName}
                          className="rounded-circle me-2"
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <h6 className="mb-0">{review.userName}</h6>
                          <small className="text-muted">{review.date}</small>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="me-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <i
                              key={i}
                              className={`bi ${
                                i < review.rating ? "bi-star-fill" : "bi-star"
                              } text-warning`}
                            ></i>
                          ))}
                        </div>
                        <span>{review.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="mt-2 mb-0">{review.comment}</p>
                  </div>
                ))
              ) : (
                <Alert variant="info">Aún no has recibido reseñas</Alert>
              )}

              {providerReviews.length > 3 && (
                <div className="text-center mt-3">
                  <Button variant="outline-primary" size="sm">
                    Ver todas las reseñas
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-3">Perfil Público</h4>

              <div className="text-center mb-3">
                <img
                  src={user.profileImage || "/user-placeholder.jpg"}
                  alt={user.name}
                  className="rounded-circle"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <h5 className="mt-2">{user.name}</h5>
                <p className="text-muted">{profile.category}</p>
              </div>

              <div className="d-grid gap-2">
                <Link
                  to={`/provider/${user.id}`}
                  className="btn btn-outline-primary"
                >
                  Ver mi perfil público
                </Link>
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-3">Consejos para mejorar</h4>

              <ul className="list-group list-group-flush">
                <li className="list-group-item px-0">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Completa toda la información de tu perfil
                </li>
                <li className="list-group-item px-0">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Agrega fotos de tus trabajos
                </li>
                <li className="list-group-item px-0">
                  <i className="bi bi-exclamation-circle text-warning me-2"></i>
                  Añade más habilidades a tu perfil
                </li>
                <li className="list-group-item px-0">
                  <i className="bi bi-x-circle text-danger me-2"></i>
                  Responde a las reseñas de tus clientes
                </li>
              </ul>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h4 className="mb-3">Acciones Rápidas</h4>

              <div className="d-grid gap-2">
                <Button
                  variant={
                    profile.isAvailable ? "outline-danger" : "outline-success"
                  }
                >
                  {profile.isAvailable
                    ? "Marcar como No Disponible"
                    : "Marcar como Disponible"}
                </Button>
                <Button variant="outline-primary">Actualizar horario</Button>
                <Button variant="outline-primary">Añadir nuevas fotos</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProviderDashboardPage;
