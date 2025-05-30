"use client";

import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useLanguage } from "../context/LanguageContext";
import StarRating from "./StarRating";

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { t } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert(t("selectRating"));
      return;
    }

    onSubmit({ rating, comment });
    setRating(0);
    setComment("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>{t("yourRating")}</Form.Label>
        <div>
          <StarRating
            rating={rating}
            size="medium"
            interactive={true}
            onRatingChange={setRating}
          />
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t("yourComment")}</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t("shareExperience")}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {t("submitReview")}
      </Button>
    </Form>
  );
};

export default ReviewForm;
