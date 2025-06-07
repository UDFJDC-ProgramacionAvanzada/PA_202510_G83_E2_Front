"use client";
import { Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import StarRating from "./StarRating";
import { useLanguage } from "../context/LanguageContext";

const ProviderCard = ({ provider }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(provider.id);
  const { t } = useLanguage();

  return (
    <Card className="h-100 provider-card card-alamano">
      <Card.Header className="d-flex justify-content-between align-items-center bg-light-alamano border-0">
        <Badge
          bg={provider.isAvailable ? "success" : "dark"}
          className="availability-badge"
        >
          {provider.isAvailable ? t("available") : t("notAvailable")}
        </Badge>
        <i
          className={`bi ${
            isFavorite ? "bi-heart-fill" : "bi-heart"
          } favorite-icon ${isFavorite ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(provider.id);
          }}
          role="button"
          tabIndex={0}
          aria-label={
            isFavorite ? t("removeFromFavorites") : t("addToFavorites")
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleFavorite(provider.id);
            }
          }}
        ></i>
      </Card.Header>
      <div className="text-center pt-3">
        <img
          src={
            provider.profileImage || "/assets/images/users/default-avatar.jpg"
          }
          alt={provider.name}
          className="rounded-circle"
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
            border: "3px solid var(--alamano-light)",
          }}
        />
      </div>
      <Card.Body className="text-center pt-2">
        <Card.Title className="accent-alamano">{provider.name}</Card.Title>
        <div className="mb-2">
          <StarRating rating={provider.rating} />
          <span className="ms-2 text-muted small">
            ({provider.reviewCount})
          </span>
        </div>
        <Card.Text className="text-muted small mb-1">
          {t(`categories.${provider.categoryId}`)}
        </Card.Text>
        <Card.Text className="small mb-3">
          <i className="bi bi-geo-alt me-1 accent-secondary-alamano"></i>
          {provider.location}
        </Card.Text>
        <Link to={`/provider/${provider.id}`}>
          <Button variant="primary" size="sm" className="w-100">
            <i className="bi bi-eye me-1"></i>
            {t("viewProfile")}
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProviderCard;
