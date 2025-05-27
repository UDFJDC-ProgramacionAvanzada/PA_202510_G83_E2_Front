"use client"

const StarRating = ({ rating, size = "small", interactive = false, onRatingChange = null }) => {
  const stars = [1, 2, 3, 4, 5]

  const handleClick = (rating) => {
    if (interactive && onRatingChange) {
      onRatingChange(rating)
    }
  }

  const fontSize = size === "small" ? "fs-6" : size === "medium" ? "fs-5" : "fs-4"

  return (
    <div className="d-inline-block">
      {stars.map((star) => (
        <i
          key={star}
          className={`bi ${star <= rating ? "bi-star-fill" : "bi-star"} ${fontSize} star-rating`}
          style={{ cursor: interactive ? "pointer" : "default" }}
          onClick={() => handleClick(star)}
        ></i>
      ))}
    </div>
  )
}

export default StarRating
