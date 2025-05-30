"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const CreateEditProfilePage = () => {
  const { user, updateUser } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const isEditing = user?.isProvider;

  const [formData, setFormData] = useState({
    category: "",
    description: "",
    skills: "",
    location: user?.location || "",
    phone: user?.phone || "",
    email: user?.email || "",
    website: "",
    isAvailable: true,
    weekdaysStart: "09:00",
    weekdaysEnd: "18:00",
    saturdayStart: "10:00",
    saturdayEnd: "14:00",
    sundayStart: "",
    sundayEnd: "",
  });

  const [images, setImages] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && user.providerProfile) {
      // Si estamos editando, cargar los datos del perfil de proveedor
      const profile = user.providerProfile;
      setFormData({
        category: profile.categoryId || "",
        description: profile.description || "",
        skills: profile.skills?.join(", ") || "",
        location: profile.location || user.location || "",
        phone: profile.phone || user.phone || "",
        email: profile.email || user.email || "",
        website: profile.website || "",
        isAvailable: profile.isAvailable !== false,
        weekdaysStart: profile.schedule?.weekdaysStart || "09:00",
        weekdaysEnd: profile.schedule?.weekdaysEnd || "18:00",
        saturdayStart: profile.schedule?.saturdayStart || "10:00",
        saturdayEnd: profile.schedule?.saturdayEnd || "14:00",
        sundayStart: profile.schedule?.sundayStart || "",
        sundayEnd: profile.schedule?.sundayEnd || "",
      });

      // Cargar imágenes si existen
      if (profile.gallery && profile.gallery.length > 0) {
        setImages(profile.gallery);
      }
    }
  }, [isEditing, user]);

  const categories = [
    { id: "hogar", name: t("categories.hogar") },
    { id: "educacion", name: t("categories.educacion") },
    { id: "tecnologia", name: t("categories.tecnologia") },
    { id: "mascotas", name: t("categories.mascotas") },
    { id: "belleza", name: t("categories.belleza") },
    { id: "transporte", name: t("categories.transporte") },
    { id: "eventos", name: t("categories.eventos") },
    { id: "legal", name: t("categories.legal") },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // Simulación de carga de imágenes
    const newImages = files.map((file) => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      alt: file.name,
      title: file.name,
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (imageId) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!formData.category) {
      setError(t("selectCategory"));
      return;
    }

    if (!formData.description) {
      setError(t("provideDescription"));
      return;
    }

    try {
      setLoading(true);

      // Simulación de creación/actualización de perfil
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Preparar datos del perfil
      const skills = formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill);

      const providerProfile = {
        categoryId: formData.category,
        category: categories.find((c) => c.id === formData.category)?.name,
        description: formData.description,
        skills,
        location: formData.location,
        phone: formData.phone,
        email: formData.email,
        website: formData.website,
        isAvailable: formData.isAvailable,
        schedule: {
          weekdaysStart: formData.weekdaysStart,
          weekdaysEnd: formData.weekdaysEnd,
          saturdayStart: formData.saturdayStart,
          saturdayEnd: formData.saturdayEnd,
          sundayStart: formData.sundayStart,
          sundayEnd: formData.sundayEnd,
          weekdays: `${formData.weekdaysStart} - ${formData.weekdaysEnd}`,
          saturday: formData.saturdayStart
            ? `${formData.saturdayStart} - ${formData.saturdayEnd}`
            : t("closed"),
          sunday: formData.sundayStart
            ? `${formData.sundayStart} - ${formData.sundayEnd}`
            : t("closed"),
        },
        gallery: images,
        rating: isEditing ? user.providerProfile.rating || 0 : 0,
        reviewCount: isEditing ? user.providerProfile.reviewCount || 0 : 0,
      };

      // Actualizar usuario
      updateUser({
        isProvider: true,
        providerProfile,
      });

      const statusText = isEditing
        ? t("profileUpdatedStatus")
        : t("profileCreated");
      setSuccess(t("profileSaveSuccess", { status: statusText }));

      // Redirigir después de un breve retraso
      setTimeout(() => {
        navigate("/provider-dashboard");
      }, 2000);
    } catch (err) {
      setError(t("profileSaveError"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="warning">{t("mustLoginCreateProfile")}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">
        {isEditing ? t("editProviderProfile") : t("createProviderProfile")}
      </h1>

      {success && <Alert variant="success">{success}</Alert>}

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={8}>
            <Card className="mb-4">
              <Card.Body>
                <h4 className="mb-3">{t("basicInfo")}</h4>

                <Form.Group className="mb-3">
                  <Form.Label>{t("serviceCategory")}</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{t("selectCategory")}</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>{t("serviceDescription")}</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder={t("serviceDescription")}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>{t("skillsCommaSeparated")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder={t("skillsPlaceholder")}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>{t("location")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Ciudad, Región"
                    required
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <h4 className="mb-3">{t("contactInfo")}</h4>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t("phone")}</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
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

                <Form.Group className="mb-3">
                  <Form.Label>
                    {t("website")} ({t("optional")})
                  </Form.Label>
                  <Form.Control
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder={t("websitePlaceholder")}
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <h4 className="mb-3">{t("workGalleryTitle")}</h4>

                <div className="mb-3">
                  <Form.Label>{t("uploadPhotos")}</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                  <Form.Text className="text-muted">
                    {t("uploadMultiple")}
                  </Form.Text>
                </div>

                {images.length > 0 && (
                  <Row className="mt-3">
                    {images.map((image) => (
                      <Col xs={6} md={4} key={image.id} className="mb-3">
                        <div className="position-relative">
                          <img
                            src={image.url || "/placeholder.svg"}
                            alt={image.alt}
                            className="img-thumbnail"
                            style={{
                              width: "100%",
                              height: "150px",
                              objectFit: "cover",
                            }}
                          />
                          <Button
                            variant="danger"
                            size="sm"
                            className="position-absolute top-0 end-0 m-1"
                            onClick={() => removeImage(image.id)}
                          >
                            <i className="bi bi-x"></i>
                          </Button>
                        </div>
                      </Col>
                    ))}
                  </Row>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="mb-4">
              <Card.Body>
                <h4 className="mb-3">{t("availability")}</h4>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="availability-switch"
                    label={t("availableToWork")}
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={handleChange}
                  />
                </Form.Group>

                <h5 className="mt-4 mb-2">{t("scheduleTitle")}</h5>

                <Form.Group className="mb-3">
                  <Form.Label>{t("mondayFriday")}</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="time"
                        name="weekdaysStart"
                        value={formData.weekdaysStart}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col xs="auto" className="d-flex align-items-center">
                      a
                    </Col>
                    <Col>
                      <Form.Control
                        type="time"
                        name="weekdaysEnd"
                        value={formData.weekdaysEnd}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>{t("saturday")}</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="time"
                        name="saturdayStart"
                        value={formData.saturdayStart}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col xs="auto" className="d-flex align-items-center">
                      a
                    </Col>
                    <Col>
                      <Form.Control
                        type="time"
                        name="saturdayEnd"
                        value={formData.saturdayEnd}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>{t("sunday")}</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="time"
                        name="sundayStart"
                        value={formData.sundayStart}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col xs="auto" className="d-flex align-items-center">
                      a
                    </Col>
                    <Col>
                      <Form.Control
                        type="time"
                        name="sundayEnd"
                        value={formData.sundayEnd}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Form.Text className="text-muted">
                    {t("closedSunday")}
                  </Form.Text>
                </Form.Group>
              </Card.Body>
            </Card>

            <div className="d-grid gap-2">
              <Button
                variant="primary"
                type="submit"
                size="lg"
                disabled={loading}
              >
                {loading
                  ? t("saving")
                  : isEditing
                  ? t("updateProfile")
                  : t("createProfile")}
              </Button>

              {isEditing && (
                <Button variant="outline-danger" type="button">
                  {t("deactivateProfile")}
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CreateEditProfilePage;
