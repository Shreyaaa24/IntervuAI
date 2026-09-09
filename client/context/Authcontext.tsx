"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios"; // Change path if needed

// ── User Type ─────────────────────────────────────────────
export interface StoredUser {
  id: string;
  name: string;
  email: string;
}

// ── LocalStorage Helpers ──────────────────────────────────
const getToken = () => localStorage.getItem("token");

const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

const getStoredUser = (): StoredUser | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const setStoredUser = (user: StoredUser) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ── Context Type ──────────────────────────────────────────
interface AuthContextValue {
  user: StoredUser | null;
  token: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

// ── Context ───────────────────────────────────────────────
export const AuthContext = createContext<AuthContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────
export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [user, setUser] = useState<StoredUser | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load auth data from localStorage
  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getStoredUser();

    if (storedToken && storedUser) {
      setTokenState(storedToken);
      setUser(storedUser);
    }

    setIsLoading(false);
  }, []);

  // ── Login ───────────────────────────────────────────────
  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);

      try {
        const { data } = await axiosInstance.post("/api/auth/login", {
          email,
          password,
        });

        setToken(data.token);
        setStoredUser(data.user);

        setTokenState(data.token);
        setUser(data.user);

        router.push("/dashboard");
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  // ── Register ────────────────────────────────────────────
  const register = useCallback(
    async (name: string, email: string, password: string) => {
      setIsLoading(true);

      try {
        const { data } = await axiosInstance.post("/api/auth/register", {
          name,
          email,
          password,
        });

        setToken(data.token);
        setStoredUser(data.user);

        setTokenState(data.token);
        setUser(data.user);

        router.push("/dashboard");
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  // ── Logout ──────────────────────────────────────────────
  const logout = useCallback(() => {
    clearAuth();
    setTokenState(null);
    setUser(null);
    router.push("/");
  }, [router]);

  // ── Refresh Logged-in User ──────────────────────────────
  const refreshUser = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get("/api/auth/me");

      setStoredUser(data.user);
      setUser(data.user);
    } catch {
      logout();
    }
  }, [logout]);

  // ── Context Value ───────────────────────────────────────
  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      isLoggedIn: !!token && !!user,
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, token, isLoading, login, register, logout, refreshUser]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}