import { Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import ProviderProfilePage from "./pages/ProviderProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfilePage from "./pages/UserProfilePage";
import CreateEditProfilePage from "./pages/CreateEditProfilePage";
import FavoritesPage from "./pages/FavoritesPage";
import ProviderDashboardPage from "./pages/ProviderDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/provider/:id" element={<ProviderProfilePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route
                path="/create-profile"
                element={<CreateEditProfilePage />}
              />
              <Route path="/edit-profile" element={<CreateEditProfilePage />} />
              <Route
                path="/provider-dashboard"
                element={<ProviderDashboardPage />}
              />
              <Route path="/admin" element={<AdminDashboardPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
