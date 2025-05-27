"use client"

import { useState } from "react"
import { Form, Button, Row, Col, Collapse } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const SearchBar = ({ className, showAdvanced = false }) => {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("")
  const [showFilters, setShowFilters] = useState(showAdvanced)
  const navigate = useNavigate()

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()

    if (query) params.append("q", query)
    if (category) params.append("category", category)
    if (location) params.append("location", location)

    navigate(`/search?${params.toString()}`)
  }

  return (
    <div className={className}>
      <Form onSubmit={handleSubmit}>
        <Row className="g-2">
          <Col xs={12} md={showFilters ? 12 : 9}>
            <Form.Control
              type="text"
              placeholder="¿Qué servicio necesitas?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Col>
          {!showFilters && (
            <Col xs={12} md={3}>
              <Button variant="primary" type="submit" className="w-100">
                Buscar
              </Button>
            </Col>
          )}
        </Row>

        <div className="mt-2">
          <Button variant="link" onClick={() => setShowFilters(!showFilters)} className="p-0 text-decoration-none">
            {showFilters ? "Ocultar filtros" : "Mostrar filtros avanzados"}
          </Button>
        </div>

        <Collapse in={showFilters}>
          <div>
            <Row className="mt-3 g-2">
              <Col xs={12} md={6}>
                <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Todas las categorías</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={12} md={6}>
                <Form.Control
                  type="text"
                  placeholder="Ubicación"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Col>
              <Col xs={12} className="mt-3">
                <Button variant="primary" type="submit" className="w-100">
                  Buscar
                </Button>
              </Col>
            </Row>
          </div>
        </Collapse>
      </Form>
    </div>
  )
}

export default SearchBar
