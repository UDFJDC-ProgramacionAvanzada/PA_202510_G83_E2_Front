"use client"
import { Card, Badge, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useFavorites } from "../context/FavoritesContext"
import StarRating from "./StarRating"

const ProviderCard = ({ provider }) => {
  const { favorites, toggleFavorite } = useFavorites()
  const isFavorite = favorites.includes(provider.id)

  return (
    <Card className="h-100 provider-card">
      <Card.Header className="d-flex justify-content-between align-items-center bg-white border-bottom-0">
        <Badge bg={provider.isAvailable ? "success" : "danger"}>
          {provider.isAvailable ? "Disponible" : "No disponible"}
        </Badge>
        <i
          className={`bi ${isFavorite ? "bi-heart-fill text-danger" : "bi-heart"} favorite-icon`}
          onClick={(e) => {
            e.preventDefault()
            toggleFavorite(provider.id)
          }}
        ></i>
      </Card.Header>
      <div className="text-center pt-2">
        <img
          src={provider.profileImage || "/placeholder.svg"}
          alt={provider.name}
          className="rounded-circle"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />
      </div>
      <Card.Body className="text-center pt-2">
        <Card.Title>{provider.name}</Card.Title>
        <div className="mb-2">
          <StarRating rating={provider.rating} />
          <span className="ms-2 text-muted small">({provider.reviewCount})</span>
        </div>
        <Card.Text className="text-muted small mb-1">{provider.category}</Card.Text>
        <Card.Text className="small mb-3">
          <i className="bi bi-geo-alt me-1"></i>
          {provider.location}
        </Card.Text>
        <Link to={`/provider/${provider.id}`}>
          <Button variant="outline-primary" size="sm" className="w-100">
            Ver perfil
          </Button>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default ProviderCard
