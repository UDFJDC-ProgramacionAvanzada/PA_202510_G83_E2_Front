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

  test("complete login flow works using test account button", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <Header />
        <LoginPage />
      </TestWrapper>
    );

    const testAdminButton = screen
      .getAllByRole("button")
      .find(
        (btn) =>
          btn.textContent?.toLowerCase().includes("usar") &&
          btn.innerHTML.includes("shield-check")
      );

    await user.click(testAdminButton);

    const submitButton = screen
      .getAllByRole("button")
      .find((btn) => btn.textContent?.toLowerCase().includes("iniciar"));

    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText((text) => text.toLowerCase().includes("alamano"))
      ).toBeInTheDocument();
    });
  });

  test("login validation works when fields are empty", async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>
    );

    const submitButton = screen
      .getAllByRole("button")
      .find((btn) => btn.textContent?.toLowerCase().includes("iniciar"));

    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/completa|complete all fields/i)
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

    const emailInput = screen.getByRole("textbox");
    const passwordInput = screen.getByRole("textbox", {
      name: /contraseña|password/i,
    });

    const submitButton = screen
      .getAllByRole("button")
      .find((btn) => btn.textContent?.toLowerCase().includes("iniciar"));

    await user.type(emailInput, "no@existe.com");
    await user.type(passwordInput, "wrongpass");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/credenciales|incorrectas|invalid/i)
      ).toBeInTheDocument();
    });
  });
});
