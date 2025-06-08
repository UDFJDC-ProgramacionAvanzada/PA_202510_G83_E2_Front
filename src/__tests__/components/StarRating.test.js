import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StarRating from "../../components/StarRating";

describe("StarRating Component", () => {
  test("renders correct number of stars", () => {
    render(<StarRating rating={3} />);

    // Should render 5 stars total
    const stars = document.querySelectorAll(".star-rating");
    expect(stars).toHaveLength(5);
  });

  test("displays correct rating visually", () => {
    render(<StarRating rating={4} />);

    const container = screen.getByRole("img", {
      name: /calificación: 4 de 5 estrellas/i,
    });
    expect(container).toBeInTheDocument();

    // Check that 4 stars are filled
    const filledStars = document.querySelectorAll(".bi-star-fill");
    const emptyStars = document.querySelectorAll(".bi-star");
    expect(filledStars).toHaveLength(4);
    expect(emptyStars).toHaveLength(1);
  });

  test("interactive mode works correctly", async () => {
    const user = userEvent.setup();
    const mockOnRatingChange = jest.fn();

    render(
      <StarRating
        rating={0}
        interactive={true}
        onRatingChange={mockOnRatingChange}
      />
    );

    const radioGroup = screen.getByRole("radiogroup");
    expect(radioGroup).toBeInTheDocument();

    const thirdStar = screen.getByRole("radio", { name: /3 estrella/i });
    await user.click(thirdStar);

    expect(mockOnRatingChange).toHaveBeenCalledWith(3);
  });

  test("keyboard navigation works in interactive mode", () => {
    const mockOnRatingChange = jest.fn();

    render(
      <StarRating
        rating={0}
        interactive={true}
        onRatingChange={mockOnRatingChange}
      />
    );

    const secondStar = screen.getByRole("radio", { name: /2 estrella/i });

    fireEvent.keyDown(secondStar, { key: "Enter" });

    expect(mockOnRatingChange).toHaveBeenCalledWith(2);
  });

  test("different sizes render correctly", () => {
    const { rerender } = render(<StarRating rating={3} size="small" />);
    let stars = document.querySelectorAll(".star-rating");
    expect(stars[0]).toHaveClass("fs-6");

    rerender(<StarRating rating={3} size="medium" />);
    stars = document.querySelectorAll(".star-rating");
    expect(stars[0]).toHaveClass("fs-5");

    rerender(<StarRating rating={3} size="large" />);
    stars = document.querySelectorAll(".star-rating");
    expect(stars[0]).toHaveClass("fs-4");
  });

  test("non-interactive mode has correct accessibility", () => {
    render(<StarRating rating={3.5} />);

    const container = screen.getByRole("img", {
      name: /calificación: 3.5 de 5 estrellas/i,
    });
    expect(container).toBeInTheDocument();

    // Should not have interactive elements
    expect(screen.queryByRole("radiogroup")).not.toBeInTheDocument();
    expect(screen.queryByRole("radio")).not.toBeInTheDocument();
  });

  test("handles edge cases correctly", () => {
    const { rerender } = render(<StarRating rating={0} />);
    expect(
      screen.getByRole("img", { name: /calificación: 0 de 5 estrellas/i })
    ).toBeInTheDocument();

    rerender(<StarRating rating={5} />);
    expect(
      screen.getByRole("img", { name: /calificación: 5 de 5 estrellas/i })
    ).toBeInTheDocument();

    rerender(<StarRating rating={2.7} />);
    expect(
      screen.getByRole("img", { name: /calificación: 2.7 de 5 estrellas/i })
    ).toBeInTheDocument();
  });
});
