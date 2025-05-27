"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"

const UserProfilePage = () => {
  const { user, updateUser } = useAuth()

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    // Validación de contraseñas si se está intentando cambiar
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        setError("Debes ingresar tu contraseña actual")
        return
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setError("Las nuevas contraseñas no coinciden")
        return
      }

      if (formData.newPassword.length < 6) {
        setError("La nueva contraseña debe tener al menos 6 caracteres")
        return
      }
    }

    try {
      setLoading(true)

      // Simulacion de actualizacion
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Actualizar datos del usuario (sin incluir contraseñas)
      const updatedUserData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
      }

      updateUser(updatedUserData)

      // Limpiar campos de contraseña
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))

      setSuccess(true)
    } catch (err) {
      setError("Error al actualizar el perfil")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="warning">Debes iniciar sesión para ver tu perfil</Alert>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Mi Perfil</h1>

      <Row>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <div className="mb-3">
                <img
                  src={user.profileImage || "/user-placeholder.jpg"}
                  alt={user.name}
                  className="rounded-circle"
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                />
              </div>
              <h5>{user.name}</h5>
              <p className="text-muted small">{user.email}</p>
              <Button variant="outline-primary" size="sm" className="mt-2">
                Cambiar foto
              </Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <div className="d-grid gap-2">
                <Button variant="outline-primary" href="/favorites">
                  Mis Favoritos
                </Button>
                {user.isProvider ? (
                  <Button variant="outline-primary" href="/provider-dashboard">
                    Dashboard de Proveedor
                  </Button>
                ) : (
                  <Button variant="outline-success" href="/create-profile">
                    Convertirme en Proveedor
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={9}>
          <Card>
            <Card.Body>
              <h4 className="mb-4">Información Personal</h4>

              {success && <Alert variant="success">Tu perfil ha sido actualizado correctamente</Alert>}

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre completo</Form.Label>
                      <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Correo electrónico</Form.Label>
                      <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Teléfono</Form.Label>
                      <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Ubicación</Form.Label>
                      <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                </Row>

                <hr className="my-4" />

                <h5 className="mb-3">Cambiar Contraseña</h5>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contraseña actual</Form.Label>
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
                      <Form.Label>Nueva contraseña</Form.Label>
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
                      <Form.Label>Confirmar nueva contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end mt-3">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default UserProfilePage
