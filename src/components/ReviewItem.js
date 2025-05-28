import { Card } from "react-bootstrap";

const ReviewItem = ({ review }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex align-items-center">
            <img
              src={review.userImage || "/placeholder.svg"}
              alt={review.userName}
              className="rounded-circle me-2"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
            <div>
              <h6 className="mb-0">{review.userName}</h6>
              <small className="text-muted">{review.date}</small>
            </div>
          </div>
          <div>
            {Array.from({ length: 5 }).map((_, i) => (
              <i
                key={i}
                className={`bi ${
                  i < review.rating ? "bi-star-fill" : "bi-star"
                } text-secondary`}
              ></i>
            ))}
          </div>
        </div>
        <Card.Text>{review.comment}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ReviewItem;
