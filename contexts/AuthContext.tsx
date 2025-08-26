// contexts/AuthContext.tsx
"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/constants"; // Importa a URL base
import { TokenResponse, UserResponse, ApiResponse } from "@/lib/types"; // Importa os tipos

// 1. Define o tipo para o contexto (o que ele vai prover)
interface AuthContextType {
  accessToken: string | null;
  currentUser: UserResponse | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  fetchCurrentUser: (token: string) => Promise<void>;
  clearError: () => void;
}

// 2. Cria o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Cria o provedor do contexto
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Para gerenciar o carregamento inicial
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Limpa erros
  const clearError = () => setError(null);

  // Efeito para carregar token do localStorage ao iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setAccessToken(storedToken);
      fetchCurrentUser(storedToken);
    } else {
      setIsLoading(false); // Não há token, não está carregando usuário
    }
  }, []); // Executa apenas uma vez ao montar

  // Função de Login
  const login = async (email: string, password: string): Promise<boolean> => {
    clearError();
    setIsLoading(true);
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const res = await fetch(`${API_BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const data: TokenResponse | { detail?: string } = await res.json();

      if (res.ok) {
        const tokenData = data as TokenResponse;
        setAccessToken(tokenData.access_token);
        localStorage.setItem("accessToken", tokenData.access_token);
        await fetchCurrentUser(tokenData.access_token); // Busca usuário após login
        setIsLoading(false);
        return true;
      } else {
        const errorData = data as { detail?: string };
        setError(errorData.detail || "Erro ao fazer login");
        setAccessToken(null);
        localStorage.removeItem("accessToken");
        setCurrentUser(null);
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError("Erro de rede ou na requisição de login. Verifique o console.");
      setIsLoading(false);
      return false;
    }
  };

  // Função de Logout
  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    setCurrentUser(null);
    setError(null);
    router.push("/login"); // Redireciona para a página de login após o logout
  };

  // Função para buscar dados do usuário logado
  const fetchCurrentUser = async (token: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data: UserResponse | { detail?: string } = await res.json();
      if (res.ok) {
        setCurrentUser(data as UserResponse);
      } else {
        const errorData = data as { detail?: string };
        setError(errorData.detail || "Erro ao obter dados do usuário.");
        setCurrentUser(null);
        setAccessToken(null);
        localStorage.removeItem("accessToken"); // Remove token inválido
      }
    } catch (err) {
      console.error("Erro na requisição de dados do usuário:", err);
      setError("Erro de rede ou na requisição de dados do usuário.");
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        currentUser,
        isLoading,
        error,
        login,
        logout,
        fetchCurrentUser,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 4. Hook customizado para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
