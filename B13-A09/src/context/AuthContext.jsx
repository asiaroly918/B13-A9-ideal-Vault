import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

const DEMO_USER = {
  uid: "demo-uid-123",
  name: "Demo User",
  email: "demo@ideavault.com",
  photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("ideavault-user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  // Login
  const login = async (email) => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const loggedUser = {
      ...DEMO_USER,
      email,
    };

    setUser(loggedUser);
    localStorage.setItem("ideavault-user", JSON.stringify(loggedUser));

    setLoading(false);
  };

  // Google Login
  const loginWithGoogle = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setUser(DEMO_USER);
    localStorage.setItem("ideavault-user", JSON.stringify(DEMO_USER));

    setLoading(false);
  };

  // Register
  const register = async (name, email, photoURL,password) => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newUser = {
      uid: `uid-${Date.now()}`,
      name,
      email,
      photoURL:
        photoURL ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    };

    setUser(newUser);
    localStorage.setItem("ideavault-user", JSON.stringify(newUser));

    setLoading(false);
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("ideavault-user");
  };

  // Update Profile
  const updateProfile = (updatedData) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      ...updatedData,
    };

    setUser(updatedUser);
    localStorage.setItem(
      "ideavault-user",
      JSON.stringify(updatedUser)
    );
  };

  const authInfo = {
    user,
    loading,
    login,
    loginWithGoogle,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};