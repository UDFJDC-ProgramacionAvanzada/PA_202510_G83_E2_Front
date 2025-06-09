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

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  test("skip link is present and functional", () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    const skipLink = screen.getByRole("link", {
      name: /skip to main content/i, // Usa la traducción inglesa del DOM real
    });

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

    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toBeInTheDocument();
    expect(h1.textContent?.toLowerCase()).toContain("find the service");

    const h2s = screen.getAllByRole("heading", { level: 2 });
    expect(h2s.length).toBeGreaterThan(0);
  });

  test("form controls have proper labels", () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    const inputs = screen.getAllByRole("searchbox");
    inputs.forEach((input) => {
      expect(input).toHaveAttribute("aria-label");
    });

    const buttons = screen.getAllByRole("button", {
      name: /search/i,
    });
    expect(buttons.length).toBeGreaterThan(0);
  });

  test("ARIA attributes are properly used", () => {
    render(
      <TestWrapper>
        <Header />
        <HomePage />
      </TestWrapper>
    );

    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();

    const searchForms = screen.getAllByRole("search");
    expect(searchForms.length).toBeGreaterThan(0);

    const toggle = screen.getByRole("button", {
      name: /toggle navigation/i,
    });
    expect(toggle).toHaveAttribute("aria-expanded");
  });
});
