"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { useFavorites } from "../context/FavoritesContext"
import ProviderCard from "../components/ProviderCard"
import { providers } from "../data/mockData"

const FavoritesPage = () => {
  const { isAuthenticated } = useAuth()
  const { favorites } = useFavorites()
  const [favoriteProviders, setFavoriteProviders] = useState([])

  useEffect(() => {
    if (favorites.length > 0) {
      // Filtrar proveedores que están en la lista de favoritos
      const filtered = providers.filter((provider) => favorites.includes(provider.id))
      setFavoriteProviders(filtered)
    } else {
      setFavoriteProviders([])
    }
  }, [favorites])

  if (!isAuthenticated) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="warning">Debes iniciar sesión para ver tus favoritos</Alert>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Mis Favoritos</h1>

      {favoriteProviders.length > 0 ? (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {favoriteProviders.map((provider) => (
            <Col key={provider.id}>
              <ProviderCard provider={provider} />
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info">
          No tienes proveedores guardados en favoritos. Explora la plataforma y guarda tus proveedores favoritos para
          acceder a ellos rápidamente.
        </Alert>
      )}
    </Container>
  )
}

export default FavoritesPage
