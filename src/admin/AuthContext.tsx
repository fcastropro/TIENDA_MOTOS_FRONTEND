import React, { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

type UserRole = {
  name?: string;
};

export type AuthUser = {
  email?: string;
  username?: string;
  is_staff?: boolean;
  is_superuser?: boolean;
  role?: UserRole | string;
  [key: string]: unknown;
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = "admin_user";

const isAdminRoleName = (role?: UserRole | string) => {
  if (!role) {
    return false;
  }
  if (typeof role === "string") {
    return role.toLowerCase() === "administrador";
  }
  return role.name?.toLowerCase() === "administrador";
};

export const isAdminUser = (user: AuthUser | null) => {
  if (!user) {
    return false;
  }
  return Boolean(user.is_staff || user.is_superuser || isAdminRoleName(user.role));
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/me/`, {
        credentials: "include",
      });
      if (!response.ok) {
        return;
      }
      const data = (await response.json()) as AuthUser;
      setUser(data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      // keep existing user if request fails
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      let errorDetail = "Credenciales incorrectas.";
      try {
        const data = await response.json();
        if (data && typeof data === "object") {
          errorDetail = JSON.stringify(data);
        }
      } catch (parseError) {
        try {
          const text = await response.text();
          if (text) {
            errorDetail = text;
          }
        } catch (textError) {
          errorDetail = "Credenciales incorrectas.";
        }
      }
      throw new Error(errorDetail);
    }

    try {
      const data = (await response.json()) as AuthUser;
      if (data && typeof data === "object") {
        setUser(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return;
      }
    } catch (parseError) {
      // Ignore parse errors, fallback to /api/me/
    }

    await refresh();
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/logout/`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      // ignore network errors on logout
    } finally {
      setUser(null);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  useEffect(() => {
    const bootstrap = async () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (error) {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
      setLoading(true);
      await refresh();
      setLoading(false);
    };

    bootstrap();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
