import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { LanguageProvider } from "../../context/LanguageContext";
import { FavoritesProvider } from "../../context/FavoritesContext";
import HomePage from "../../pages/HomePage";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <LanguageProvider>
      <AuthProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </AuthProvider>
    </LanguageProvider>
  </BrowserRouter>
);

describe("Accessibility Tests", () => {
  test("page has proper semantic structure", () => {
    render(
      <TestWrapper>
        <Header />
        <HomePage />
        <Footer />
      </TestWrapper>
    );

    // Check for main landmarks
    expect(screen.getByRole("banner")).toBeInTheDocument(); // Header
    expect(screen.getByRole("main")).toBeInTheDocument(); // Main content
    expect(screen.getByRole("contentinfo")).toBeInTheDocument(); // Footer
    expect(screen.getByRole("navigation")).toBeInTheDocument(); // Nav
  });

  test("skip link is present and functional", () => {
    render(
      <TestWrapper>
        <Header />
        <HomePage />
      </TestWrapper>
    );

    const skipLink = screen.getByText(/saltar al contenido principal/i);
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveClass("skip-link");
    expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  test("headings have proper hierarchy", () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    // Check for proper heading structure
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toBeInTheDocument();

    const h2s = screen.getAllByRole("heading", { level: 2 });
    expect(h2s.length).toBeGreaterThan(0);

    // Main heading should be descriptive
    expect(h1).toHaveTextContent(/encuentra el servicio que necesitas/i);
  });

  test("form controls have proper labels", () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    const searchInput = screen.getByRole("searchbox");
    expect(searchInput).toHaveAttribute("aria-label");

    const searchButton = screen.getByRole("button", { name: /buscar/i });
    expect(searchButton).toHaveAccessibleName();
  });

  test("ARIA attributes are properly used", () => {
    render(
      <TestWrapper>
        <Header />
        <HomePage />
      </TestWrapper>
    );

    // Check for proper ARIA usage
    const navigation = screen.getByRole("navigation");
    expect(navigation).toBeInTheDocument();

    // Search form should have proper ARIA
    const searchForm = screen.getByRole("search");
    expect(searchForm).toBeInTheDocument();

    // Buttons should have proper ARIA states
    const toggleButton = screen.getByRole("button", {
      name: /alternar navegación/i,
    });
    expect(toggleButton).toHaveAttribute("aria-expanded");
  });
});
