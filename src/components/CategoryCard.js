"use client";

import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const CategoryCard = ({ category }) => {
  const { t } = useLanguage();

  return (
    <Link
      to={`/search?category=${category.id}`}
      className="text-decoration-none"
    >
      <Card className="h-100 category-card card-alamano text-center">
        <div className="py-4">
          <i className={`bi ${category.icon} fs-1 text-primary`}></i>
        </div>
        <Card.Body>
          <Card.Title className="accent-alamano">
            {t(`categories.${category.nombre}`)}
          </Card.Title>
          <Card.Text className="text-muted small">
            {t(`categoryDescriptions.${category.id}`)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default CategoryCard;
