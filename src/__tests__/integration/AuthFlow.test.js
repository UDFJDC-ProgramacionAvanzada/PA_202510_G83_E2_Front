import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { LanguageProvider } from "../../context/LanguageContext";
import LoginPage from "../../pages/LoginPage";
import Header from "../../components/Header";

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <LanguageProvider>
      <AuthProvider>{children}</AuthProvider>
    </LanguageProvider>
  </BrowserRouter>
);

describe("Authentication Flow Integration", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("complete login flow works correctly", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <Header />
        <LoginPage />
      </TestWrapper>
    );

    // Initially should show login/register buttons
    expect(
      screen.getByRole("link", { name: /iniciar sesión/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /registrarse/i })
    ).toBeInTheDocument();

    // Fill login form
    const emailInput = screen.getByRole("textbox", {
      name: /correo electrónico/i,
    });
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const loginButton = screen.getByRole("button", { name: /iniciar sesión/i });

    await user.type(emailInput, "admin@alamano.com");
    await user.type(passwordInput, "admin123");
    await user.click(loginButton);

    // Wait for login to complete
    await waitFor(
      () => {
        expect(screen.getByText(/administrador alamano/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  test("login validation works correctly", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>
    );

    const loginButton = screen.getByRole("button", { name: /iniciar sesión/i });
    await user.click(loginButton);

    await waitFor(() => {
      expect(
        screen.getByText(/completa todos los campos/i)
      ).toBeInTheDocument();
    });
  });

  test("invalid credentials show error", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>
    );

    const emailInput = screen.getByRole("textbox", {
      name: /correo electrónico/i,
    });
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const loginButton = screen.getByRole("button", { name: /iniciar sesión/i });

    await user.type(emailInput, "invalid@email.com");
    await user.type(passwordInput, "wrongpassword");
    await user.click(loginButton);

    await waitFor(
      () => {
        expect(
          screen.getByText(/credenciales incorrectas/i)
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
