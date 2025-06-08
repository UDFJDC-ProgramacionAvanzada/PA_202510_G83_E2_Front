import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { LanguageProvider } from "../../context/LanguageContext";
import { FavoritesProvider } from "../../context/FavoritesContext";
import ProviderCard from "../../components/ProviderCard";

const mockProvider = {
  id: "1",
  name: "Carlos Rodríguez",
  categoryId: "hogar",
  category: "Hogar y Reparaciones",
  description: "Electricista profesional",
  location: "Ciudad de México",
  rating: 4.8,
  reviewCount: 124,
  isAvailable: true,
  profileImage: "/test-image.jpg",
};

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <LanguageProvider>
      <AuthProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </AuthProvider>
    </LanguageProvider>
  </BrowserRouter>
);

describe("ProviderCard Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders provider information correctly", () => {
    render(
      <TestWrapper>
        <ProviderCard provider={mockProvider} />
      </TestWrapper>
    );

    expect(screen.getByText("Carlos Rodríguez")).toBeInTheDocument();
    expect(screen.getByText("Ciudad de México")).toBeInTheDocument();
    expect(screen.getByText("(124)")).toBeInTheDocument();
  });

  test("shows availability badge correctly for available provider", () => {
    render(
      <TestWrapper>
        <ProviderCard provider={mockProvider} />
      </TestWrapper>
    );

    const availableBadge = screen.getByText(/disponible/i);
    expect(availableBadge).toBeInTheDocument();
    expect(availableBadge).toHaveClass("bg-success");
  });

  test("shows unavailable badge when provider is not available", () => {
    const unavailableProvider = { ...mockProvider, isAvailable: false };

    render(
      <TestWrapper>
        <ProviderCard provider={unavailableProvider} />
      </TestWrapper>
    );

    const unavailableBadge = screen.getByText(/no disponible/i);
    expect(unavailableBadge).toBeInTheDocument();
    expect(unavailableBadge).toHaveClass("bg-dark");
  });

  test("favorite button has correct accessibility attributes", () => {
    render(
      <TestWrapper>
        <ProviderCard provider={mockProvider} />
      </TestWrapper>
    );

    const favoriteButton = screen.getByRole("button", {
      name: /añadir a favoritos/i,
    });
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveAttribute("aria-pressed", "false");
  });

  test("view profile link has correct href", () => {
    render(
      <TestWrapper>
        <ProviderCard provider={mockProvider} />
      </TestWrapper>
    );

    const viewProfileLink = screen.getByRole("link", { name: /ver perfil/i });
    expect(viewProfileLink).toBeInTheDocument();
    expect(viewProfileLink).toHaveAttribute("href", "/provider/1");
  });

  test("card has proper semantic structure", () => {
    render(
      <TestWrapper>
        <ProviderCard provider={mockProvider} />
      </TestWrapper>
    );

    const card = screen.getByRole("article");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("provider-card");
  });
});
