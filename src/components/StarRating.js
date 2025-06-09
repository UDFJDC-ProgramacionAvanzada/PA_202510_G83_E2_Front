"use client";

const StarRating = ({
  rating,
  size = "small",
  interactive = false,
  onRatingChange = null,
}) => {
  const stars = [1, 2, 3, 4, 5];

  const handleClick = (rating) => {
    if (interactive && onRatingChange) {
      onRatingChange(rating);
    }
  };

  const handleKeyDown = (event, rating) => {
    if (interactive && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      handleClick(rating);
    }
  };

  const fontSize =
    size === "small" ? "fs-6" : size === "medium" ? "fs-5" : "fs-4";

  return (
    <div
      className="d-inline-block"
      role={interactive ? "radiogroup" : "img"}
      aria-label={
        interactive
          ? "Selecciona una calificación"
          : `Calificación: ${rating} de 5 estrellas`
      }
    >
      {stars.map((star) =>
        interactive ? (
          <button
            key={star}
            type="button"
            tabIndex={0}
            className={`btn btn-link p-0 star-rating-button ${fontSize}`}
            onClick={() => handleClick(star)}
            onKeyDown={(e) => handleKeyDown(e, star)}
            aria-label={`${star} estrella${star !== 1 ? "s" : ""}`}
            role="radio"
            aria-checked={star <= rating}
          >
            <i
              className={`bi ${
                star <= rating ? "bi-star-fill" : "bi-star"
              } ${fontSize} star-rating`}
              aria-hidden="true"
            ></i>
          </button>
        ) : (
          <i
            key={star}
            className={`bi ${
              star <= rating ? "bi-star-fill" : "bi-star"
            } ${fontSize} star-rating`}
            aria-hidden="true"
          ></i>
        )
      )}
    </div>
  );
};

export default StarRating;
