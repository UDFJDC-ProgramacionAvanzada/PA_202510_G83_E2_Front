"use client"

import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import StarRating from "./StarRating"

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (rating === 0) {
      alert("Por favor, selecciona una calificación")
      return
    }

    onSubmit({ rating, comment })
    setRating(0)
    setComment("")
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Tu calificación</Form.Label>
        <div>
          <StarRating rating={rating} size="medium" interactive={true} onRatingChange={setRating} />
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Tu comentario</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comparte tu experiencia con este proveedor..."
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Enviar reseña
      </Button>
    </Form>
  )
}

export default ReviewForm
