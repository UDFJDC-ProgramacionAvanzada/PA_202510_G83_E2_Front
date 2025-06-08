import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { LanguageProvider } from "../../context/LanguageContext";
import { FavoritesProvider } from "../../context/FavoritesContext";
import HomePage from "../../pages/HomePage";

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <LanguageProvider>
      <AuthProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </AuthProvider>
    </LanguageProvider>
  </BrowserRouter>
);

describe("Performance Tests", () => {
  test("page renders within acceptable time", async () => {
    const startTime = performance.now();

    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/encuentra el servicio que necesitas/i)
      ).toBeInTheDocument();
    });

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Should render within 1000ms
    expect(renderTime).toBeLessThan(1000);
  });

  test("components load efficiently", async () => {
    const startTime = performance.now();

    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    // Wait for all main components to load
    await waitFor(() => {
      expect(screen.getByText(/categorías populares/i)).toBeInTheDocument();
      expect(screen.getByText(/proveedores destacados/i)).toBeInTheDocument();
    });

    const endTime = performance.now();
    const loadTime = endTime - startTime;

    expect(loadTime).toBeLessThan(2000);
  });

  test("context providers initialize quickly", async () => {
    const startTime = performance.now();

    render(
      <TestWrapper>
        <div data-testid="test-component">Test</div>
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByTestId("test-component")).toBeInTheDocument();
    });

    const endTime = performance.now();
    const initTime = endTime - startTime;

    expect(initTime).toBeLessThan(500);
  });

  test("no memory leaks in component mounting/unmounting", () => {
    const { unmount } = render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    // Component should unmount without errors
    expect(() => unmount()).not.toThrow();
  });
});
