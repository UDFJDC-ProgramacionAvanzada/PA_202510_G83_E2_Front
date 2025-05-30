"use client";

import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const UserProfilePage = () => {
  const { user, updateUser } = useAuth();
  const { t, language, changeLanguage } = useLanguage(); // Añadir language y changeLanguage

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validación de contraseñas si se está intentando cambiar
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        setError(t("enterCurrentPassword"));
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setError(t("newPasswordsDontMatch"));
        return;
      }

      if (formData.newPassword.length < 6) {
        setError(t("newPasswordMinLength"));
        return;
      }
    }

    try {
      setLoading(true);

      // Simulación de actualización de perfil
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Actualizar datos del usuario (sin incluir contraseñas en el objeto)
      const updatedUserData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
      };

      updateUser(updatedUserData);

      // Limpiar campos de contraseña
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      setSuccess(true);
    } catch (err) {
      setError(t("profileUpdateError"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="warning">{t("mustLogin")}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">{t("myProfileTitle")}</h1>

      <Row>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <div className="mb-3">
                <img
                  src={user.profileImage || "/user-placeholder.jpg"}
                  alt={user.name}
                  className="rounded-circle"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <h5>{user.name}</h5>
              <p className="text-muted small">{user.email}</p>
              <Button variant="outline-primary" size="sm" className="mt-2">
                {t("changePhoto")}
              </Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <div className="d-grid gap-2">
                <Button variant="outline-primary" href="/favorites">
                  {t("myFavorites")}
                </Button>
                {user.isProvider ? (
                  <Button variant="outline-primary" href="/provider-dashboard">
                    {t("providerDashboard")}
                  </Button>
                ) : (
                  <Button variant="outline-success" href="/create-profile">
                    {t("becomeProviderButton")}
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={9}>
          <Card>
            <Card.Body>
              <h4 className="mb-4">{t("personalInfo")}</h4>

              {success && (
                <Alert variant="success">{t("profileUpdated")}</Alert>
              )}

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t("fullName")}</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t("email")}</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t("phone")}</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t("location")}</Form.Label>
                      <Form.Control
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <hr className="my-4" />

                <h5 className="mb-3">{t("changePassword")}</h5>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t("currentPassword")}</Form.Label>
                      <Form.Control
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t("newPassword")}</Form.Label>
                      <Form.Control
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t("confirmNewPassword")}</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <hr className="my-4" />

                <h5 className="mb-3">{t("preferences")}</h5>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t("language")}</Form.Label>
                      <Form.Select
                        value={language}
                        onChange={(e) => changeLanguage(e.target.value)}
                      >
                        <option value="es">Español</option>
                        <option value="en">English</option>
                      </Form.Select>
                      <Form.Text className="text-muted">
                        {t("languageChangeNote")}
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end mt-3">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? t("saving") : t("saveChanges")}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfilePage;
