import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "../../context/LanguageContext";
import CategoryCard from "../../components/CategoryCard";

const mockCategory = {
  id: "hogar",
  name: "Hogar y Reparaciones",
  description: "Electricistas, plomeros, carpinteros y más",
  icon: "bi-house-gear",
};

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <LanguageProvider>{children}</LanguageProvider>
  </BrowserRouter>
);

describe("CategoryCard Component", () => {
  test("renders category information correctly", () => {
    render(
      <TestWrapper>
        <CategoryCard category={mockCategory} />
      </TestWrapper>
    );

    expect(screen.getByText("Hogar y Reparaciones")).toBeInTheDocument();
    expect(
      screen.getByText("Electricistas, plomeros, carpinteros y más")
    ).toBeInTheDocument();
  });

  test("renders category icon correctly", () => {
    render(
      <TestWrapper>
        <CategoryCard category={mockCategory} />
      </TestWrapper>
    );

    const icon = document.querySelector(".bi-house-gear");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("bi", "bi-house-gear", "fs-1", "text-primary");
  });

  test("creates correct link to search page", () => {
    render(
      <TestWrapper>
        <CategoryCard category={mockCategory} />
      </TestWrapper>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/search?category=hogar");
    expect(link).toHaveClass("text-decoration-none");
  });

  test("card has proper styling classes", () => {
    render(
      <TestWrapper>
        <CategoryCard category={mockCategory} />
      </TestWrapper>
    );

    const card = document.querySelector(".category-card");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass(
      "h-100",
      "category-card",
      "card-alamano",
      "text-center"
    );
  });
});
