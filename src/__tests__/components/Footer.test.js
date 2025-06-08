import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "../../context/LanguageContext";
import Footer from "../../components/Footer";

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <LanguageProvider>{children}</LanguageProvider>
  </BrowserRouter>
);

describe("Footer Component", () => {
  test("renders footer with brand information", () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    );

    expect(screen.getByText("AlaMano")).toBeInTheDocument();
    expect(
      screen.getByText(/conectando personas con los mejores proveedores/i)
    ).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    );

    expect(screen.getByRole("link", { name: /inicio/i })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: /buscar/i })).toHaveAttribute(
      "href",
      "/search"
    );
    expect(screen.getByRole("link", { name: /registrarse/i })).toHaveAttribute(
      "href",
      "/register"
    );
    expect(
      screen.getByRole("link", { name: /iniciar sesión/i })
    ).toHaveAttribute("href", "/login");
  });

  test("renders contact information", () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    );

    expect(screen.getByText("info@alamano.com")).toBeInTheDocument();
    expect(screen.getByText("(123) 456-7890")).toBeInTheDocument();
    expect(screen.getByText("Calle Principal 123")).toBeInTheDocument();
  });

  test("footer has proper semantic structure", () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    );

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass("footer-alamano");
  });

  test("renders copyright information with current year", () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    );

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${currentYear} AlaMano`))
    ).toBeInTheDocument();
    expect(
      screen.getByText(/todos los derechos reservados/i)
    ).toBeInTheDocument();
  });
});
