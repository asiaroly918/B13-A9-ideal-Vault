import { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (name: string, email: string, photoURL: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  login: async () => {},
  loginWithGoogle: async () => {},
  register: async () => {},
  logout: () => {},
  updateProfile: () => {},
});

// Mock user for demonstration (in real app, this would be Firebase)
const DEMO_USER: User = {
  uid: "demo-uid-123",
  name: "Demo User",
  email: "demo@ideavault.com",
  photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("ideavault-user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email: string, _password: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    const loggedUser = { ...DEMO_USER, email };
    setUser(loggedUser);
    localStorage.setItem("ideavault-user", JSON.stringify(loggedUser));
    setLoading(false);
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setUser(DEMO_USER);
    localStorage.setItem("ideavault-user", JSON.stringify(DEMO_USER));
    setLoading(false);
  };

  const register = async (name: string, email: string, photoURL: string, _password: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    const newUser: User = {
      uid: `uid-${Date.now()}`,
      name,
      email,
      photoURL: photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    };
    setUser(newUser);
    localStorage.setItem("ideavault-user", JSON.stringify(newUser));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ideavault-user");
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem("ideavault-user", JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
