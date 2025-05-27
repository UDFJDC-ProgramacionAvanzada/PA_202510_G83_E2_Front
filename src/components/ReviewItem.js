import { Card } from "react-bootstrap"
import StarRating from "./StarRating"

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
          <StarRating rating={review.rating} />
        </div>
        <Card.Text>{review.comment}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ReviewItem
