import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { LanguageProvider } from "../../context/LanguageContext";
import Header from "../../components/Header";

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Test wrapper component
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <LanguageProvider>
      <AuthProvider>{children}</AuthProvider>
    </LanguageProvider>
  </BrowserRouter>
);

describe("Header Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    localStorage.clear();
  });

  test("renders header with logo", () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    expect(screen.getByText("AlaMano")).toBeInTheDocument();
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  test("renders search form with correct placeholder", () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    const searchInput = screen.getByPlaceholderText(/buscar servicios/i);
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("type", "search");
  });

  test("search functionality works correctly", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    const searchInput = screen.getByPlaceholderText(/buscar servicios/i);
    const searchButton = screen.getByRole("button", { name: /buscar/i });

    await user.type(searchInput, "electricista");
    await user.click(searchButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/search?q=electricista");
    });
  });

  test("shows login and register buttons when not authenticated", () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    expect(
      screen.getByRole("link", { name: /iniciar sesión/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /registrarse/i })
    ).toBeInTheDocument();
  });

  test("mobile toggle button has correct accessibility attributes", () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    const toggleButton = screen.getByRole("button", {
      name: /alternar navegación/i,
    });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  });

  test("skip link is present and accessible", () => {
    render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    const skipLink = screen.getByText(/saltar al contenido principal/i);
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveClass("skip-link");
    expect(skipLink).toHaveAttribute("href", "#main-content");
  });
});
