"use client";

import { useState } from "react";
import { Form, Button, Row, Col, Collapse } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const SearchBar = ({ className, showAdvanced = false }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [showFilters, setShowFilters] = useState(showAdvanced);
  const navigate = useNavigate();
  const { t } = useLanguage();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (query) params.append("q", query);
    if (category) params.append("category", category);
    if (location) params.append("location", location);

    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className={className}>
      <Form onSubmit={handleSubmit}>
        <Row className="g-2">
          <Col xs={12} md={showFilters ? 12 : 9}>
            <Form.Control
              type="text"
              placeholder={t("whatServiceNeed")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Col>
          {!showFilters && (
            <Col xs={12} md={3}>
              <Button variant="primary" type="submit" className="w-100">
                {t("search")}
              </Button>
            </Col>
          )}
        </Row>

        <div className="mt-2">
          <Button
            variant="link"
            onClick={() => setShowFilters(!showFilters)}
            className="p-0 text-decoration-none"
          >
            {showFilters ? t("hideFilters") : t("showAdvancedFilters")}
          </Button>
        </div>

        <Collapse in={showFilters}>
          <div>
            <Row className="mt-3 g-2">
              <Col xs={12} md={6}>
                <Form.Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">{t("allCategories")}</option>
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
                  placeholder={t("location")}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Col>
              <Col xs={12} className="mt-3">
                <Button variant="primary" type="submit" className="w-100">
                  {t("search")}
                </Button>
              </Col>
            </Row>
          </div>
        </Collapse>
      </Form>
    </div>
  );
};

export default SearchBar;
