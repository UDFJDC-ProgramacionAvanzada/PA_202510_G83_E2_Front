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
import { useLanguage } from "../context/LanguageContext";
import { reviews } from "../data/mockData";

const ProviderDashboardPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
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
        <Alert variant="warning">{t("mustBeProvider")}</Alert>
        <Link to="/create-profile" className="btn btn-primary mt-3">
          {t("becomeProviderButton")}
        </Link>
      </Container>
    );
  }

  const profile = user.providerProfile;

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{t("providerDashboardTitle")}</h1>
        <Link to="/edit-profile" className="btn btn-primary">
          {t("editProfile")}
        </Link>
      </div>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">{t("summary")}</h4>
                <Badge
                  bg={profile.isAvailable ? "success" : "dark"}
                  className="availability-badge"
                >
                  {profile.isAvailable ? t("available") : t("notAvailable")}
                </Badge>
              </div>

              <Row className="text-center">
                <Col md={4} className="mb-3 mb-md-0">
                  <div className="border rounded p-3">
                    <h2 className="mb-1">{profile.rating.toFixed(1)}</h2>
                    <p className="text-muted mb-0">{t("averageRating")}</p>
                  </div>
                </Col>
                <Col md={4} className="mb-3 mb-md-0">
                  <div className="border rounded p-3">
                    <h2 className="mb-1">{profile.reviewCount}</h2>
                    <p className="text-muted mb-0">{t("reviewsReceived")}</p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="border rounded p-3">
                    <h2 className="mb-1">{profileViews.month}</h2>
                    <p className="text-muted mb-0">{t("visitsThisMonth")}</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-3">{t("visitStats")}</h4>

              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>{t("period")}</th>
                    <th>{t("visits")}</th>
                    <th>{t("change")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{t("today")}</td>
                    <td>{profileViews.today}</td>
                    <td className="text-success">+2 (20%)</td>
                  </tr>
                  <tr>
                    <td>{t("thisWeek")}</td>
                    <td>{profileViews.week}</td>
                    <td className="text-success">+15 (24%)</td>
                  </tr>
                  <tr>
                    <td>{t("thisMonth")}</td>
                    <td>{profileViews.month}</td>
                    <td className="text-danger">-28 (-7.6%)</td>
                  </tr>
                </tbody>
              </Table>

              <div className="text-center mt-3">
                <Button variant="outline-primary" size="sm">
                  {t("detailedStats")}
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h4 className="mb-3">{t("recentReviews")}</h4>

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
                <Alert variant="info">{t("noReviewsYet")}</Alert>
              )}

              {providerReviews.length > 3 && (
                <div className="text-center mt-3">
                  <Button variant="outline-primary" size="sm">
                    {t("seeAllReviews")}
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-3">{t("publicProfile")}</h4>

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
                <p className="text-muted">
                  {t(`categories.${profile.categoryId}`)}
                </p>
              </div>

              <div className="d-grid gap-2">
                <Link
                  to={`/provider/${user.id}`}
                  className="btn btn-outline-primary"
                >
                  {t("viewPublicProfile")}
                </Link>
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-3">{t("improvementTips")}</h4>

              <ul className="list-group list-group-flush">
                <li className="list-group-item px-0">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  {t("completeProfile")}
                </li>
                <li className="list-group-item px-0">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  {t("addPhotos")}
                </li>
                <li className="list-group-item px-0">
                  <i className="bi bi-exclamation-circle text-warning me-2"></i>
                  {t("addMoreSkills")}
                </li>
                <li className="list-group-item px-0">
                  <i className="bi bi-x-circle text-danger me-2"></i>
                  {t("respondToReviews")}
                </li>
              </ul>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h4 className="mb-3">{t("quickActions")}</h4>

              <div className="d-grid gap-2">
                <Button
                  variant={
                    profile.isAvailable ? "outline-danger" : "outline-success"
                  }
                >
                  {profile.isAvailable
                    ? t("markAsNotAvailable")
                    : t("markAsAvailable")}
                </Button>
                <Button variant="outline-primary">{t("updateSchedule")}</Button>
                <Button variant="outline-primary">{t("addNewPhotos")}</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProviderDashboardPage;
