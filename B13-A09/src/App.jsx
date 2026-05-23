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
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>

          <Routes>

            {/* Layout wrapper routes */}
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/ideas" element={<IdeasPage />} />
            </Route>

            {/* Private routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/ideas/:id" element={<IdeaDetailsPage />} />
              <Route path="/add-idea" element={<AddIdeaPage />} />
              <Route path="/my-ideas" element={<MyIdeasPage />} />
              <Route path="/my-interactions" element={<MyInteractionsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            {/* Auth routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />

          </Routes>

        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}