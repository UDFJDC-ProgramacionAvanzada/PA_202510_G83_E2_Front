"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const CreateEditProfilePage = () => {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()
  const isEditing = user?.isProvider

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
  })

  const [images, setImages] = useState([])
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isEditing && user.providerProfile) {
      // En caso de editar, cargar datos del perfil
      const profile = user.providerProfile
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
      })

      // Cargar imágenes (en caso de que hayan)
      if (profile.gallery && profile.gallery.length > 0) {
        setImages(profile.gallery)
      }
    }
  }, [isEditing, user])

  const categories = [
    { id: "hogar", name: "Hogar y Reparaciones" },
    { id: "educacion", name: "Educación y Tutoría" },
    { id: "tecnologia", name: "Tecnología" },
    { id: "mascotas", name: "Cuidado de Mascotas" },
    { id: "belleza", name: "Belleza y Bienestar" },
    { id: "transporte", name: "Transporte" },
    { id: "eventos", name: "Eventos" },
    { id: "legal", name: "Servicios Legales" },
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)

    // Simulacion de carga de imágenes
    const newImages = files.map((file) => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      alt: file.name,
      title: file.name,
    }))

    setImages((prev) => [...prev, ...newImages])
  }

  const removeImage = (imageId) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!formData.category) {
      setError("Por favor, selecciona una categoría")
      return
    }

    if (!formData.description) {
      setError("Por favor, proporciona una descripción de tus servicios")
      return
    }

    try {
      setLoading(true)

      // Simulacion de creación/actualización de perfil
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Preparar datos del perfil
      const skills = formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill)

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
          saturday: formData.saturdayStart ? `${formData.saturdayStart} - ${formData.saturdayEnd}` : "Cerrado",
          sunday: formData.sundayStart ? `${formData.sundayStart} - ${formData.sundayEnd}` : "Cerrado",
        },
        gallery: images,
        rating: isEditing ? user.providerProfile.rating || 0 : 0,
        reviewCount: isEditing ? user.providerProfile.reviewCount || 0 : 0,
      }

      // Actualizar usuario
      updateUser({
        isProvider: true,
        providerProfile,
      })

      setSuccess(true)

      // Redirigir después de un momento
      setTimeout(() => {
        navigate("/provider-dashboard")
      }, 2000)
    } catch (err) {
      setError("Error al guardar el perfil")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="warning">Debes iniciar sesión para crear un perfil de proveedor</Alert>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">{isEditing ? "Editar Perfil de Proveedor" : "Crear Perfil de Proveedor"}</h1>

      {success && (
        <Alert variant="success">
          Tu perfil ha sido {isEditing ? "actualizado" : "creado"} correctamente. Redirigiendo...
        </Alert>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={8}>
            <Card className="mb-4">
              <Card.Body>
                <h4 className="mb-3">Información Básica</h4>

                <Form.Group className="mb-3">
                  <Form.Label>Categoría de servicio</Form.Label>
                  <Form.Select name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">Selecciona una categoría</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Descripción de tus servicios</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe detalladamente los servicios que ofreces..."
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Habilidades (separadas por comas)</Form.Label>
                  <Form.Control
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Ej: Carpintería, Plomería, Instalaciones eléctricas"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Ubicación</Form.Label>
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
                <h4 className="mb-3">Información de Contacto</h4>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Teléfono</Form.Label>
                      <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Correo electrónico</Form.Label>
                      <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Sitio web (opcional)</Form.Label>
                  <Form.Control
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://ejemplo.com"
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <h4 className="mb-3">Galería de Trabajos</h4>

                <div className="mb-3">
                  <Form.Label>Sube fotos de tus trabajos anteriores</Form.Label>
                  <Form.Control type="file" accept="image/*" multiple onChange={handleImageUpload} />
                  <Form.Text className="text-muted">Puedes subir múltiples imágenes a la vez</Form.Text>
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
                            style={{ width: "100%", height: "150px", objectFit: "cover" }}
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
                <h4 className="mb-3">Disponibilidad</h4>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="availability-switch"
                    label="Disponible para trabajar"
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={handleChange}
                  />
                </Form.Group>

                <h5 className="mt-4 mb-2">Horario de atención</h5>

                <Form.Group className="mb-3">
                  <Form.Label>Lunes a Viernes</Form.Label>
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
                  <Form.Label>Sábados</Form.Label>
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
                  <Form.Label>Domingos</Form.Label>
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
                      <Form.Control type="time" name="sundayEnd" value={formData.sundayEnd} onChange={handleChange} />
                    </Col>
                  </Row>
                  <Form.Text className="text-muted">Deja en blanco si no trabajas los domingos</Form.Text>
                </Form.Group>
              </Card.Body>
            </Card>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" size="lg" disabled={loading}>
                {loading ? "Guardando..." : isEditing ? "Actualizar Perfil" : "Crear Perfil"}
              </Button>

              {isEditing && (
                <Button variant="outline-danger" type="button">
                  Desactivar Perfil
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default CreateEditProfilePage
