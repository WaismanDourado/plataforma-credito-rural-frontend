// components/auth/LoginForm.tsx
"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext"; // Importa o hook de autenticação
import { useRouter } from "next/navigation"; // Para redirecionar após login

export default function LoginForm() {
  const { login, currentUser, error, clearError, isLoading } = useAuth(); // Pega funções e estados do contexto
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  // Redireciona se o usuário já estiver logado (útil para quando acessam /login diretamente)
  React.useEffect(() => {
    if (currentUser) {
      router.push("/dashboard"); // ou para onde o usuário logado deve ir
    }
  }, [currentUser, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError(); // Limpa erros anteriores do contexto
    const success = await login(email, password);
    if (success) {
      // O redirecionamento já acontece no useEffect acima quando currentUser é atualizado
      // ou você pode colocar um router.push('/dashboard') aqui também.
      // router.push("/dashboard");
    }
  };

  if (isLoading) {
    return <p>Carregando dados de autenticação...</p>; // Ou um spinner
  }

  // Se já estiver logado, não mostra o formulário, redireciona pelo useEffect
  if (currentUser) {
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Senha:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          disabled={isLoading}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
