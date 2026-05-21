import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

// Pages
import HomePage from "./pages/HomePage";
import IdeasPage from "./pages/IdeasPage";
import IdeaDetailsPage from "./pages/IdeaDetailsPage";
import AddIdeaPage from "./pages/AddIdeaPage";
import MyIdeasPage from "./pages/MyIdeasPage";
import MyInteractionsPage from "./pages/MyInteractionsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes with Layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/ideas" element={<IdeasPage />} />

              {/* Private routes */}
              <Route
                path="/ideas/:id"
                element={
                  <PrivateRoute>
                    <IdeaDetailsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/add-idea"
                element={
                  <PrivateRoute>
                    <AddIdeaPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/my-ideas"
                element={
                  <PrivateRoute>
                    <MyIdeasPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/my-interactions"
                element={
                  <PrivateRoute>
                    <MyInteractionsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Auth routes (no Layout) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
