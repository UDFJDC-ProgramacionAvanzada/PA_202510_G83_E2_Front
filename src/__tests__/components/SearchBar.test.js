import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "../../context/LanguageContext";
import SearchBar from "../../components/SearchBar";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <LanguageProvider>{children}</LanguageProvider>
  </BrowserRouter>
);

describe("SearchBar Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renders basic search form", () => {
    render(
      <TestWrapper>
        <SearchBar />
      </TestWrapper>
    );

    const searchInput = screen.getByRole("searchbox");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute(
      "placeholder",
      "¿Qué servicio necesitas?"
    );
  });

  test("basic search functionality works", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <SearchBar />
      </TestWrapper>
    );

    const searchInput = screen.getByRole("searchbox");
    const searchButton = screen.getByRole("button", { name: /buscar/i });

    await user.type(searchInput, "plomero");
    await user.click(searchButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/search?q=plomero");
    });
  });

  test("advanced filters toggle works", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <SearchBar />
      </TestWrapper>
    );

    const toggleButton = screen.getByRole("button", {
      name: /mostrar filtros avanzados/i,
    });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");

    await user.click(toggleButton);

    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
  });

  test("form has proper accessibility attributes", () => {
    render(
      <TestWrapper>
        <SearchBar />
      </TestWrapper>
    );

    const form = screen.getByRole("search");
    expect(form).toBeInTheDocument();

    const searchInput = screen.getByRole("searchbox");
    expect(searchInput).toHaveAttribute("aria-label", "Buscar servicios");
  });
});
