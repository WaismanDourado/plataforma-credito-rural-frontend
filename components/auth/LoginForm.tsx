"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Mail, Lock, UserPlus, LogIn } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const endpoint = isRegister ? "register" : "login";
      const response = await axios.post(
        `http://localhost:8000/auth/${endpoint}`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Erro na autenticação. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center mb-6">
        <div
          className={`p-2 rounded-full ${
            isRegister ? "bg-green-700" : "bg-green-600"
          } border-2 border-white/20`}
        >
          {isRegister ? (
            <UserPlus className="w-6 h-6 text-green-900" />
          ) : (
            <LogIn className="w-6 h-6 text-white" />
          )}
        </div>
        <h2 className="text-2xl font-bold ml-3 text-gray-200">
          {isRegister ? "Criar Conta" : "Entrar"}
        </h2>
      </div>
      {error && (
        <div className="bg-red-900/80 border border-red-600/50 text-red-100 px-4 py-3 rounded-lg mb-4 backdrop-blur-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-gray-200 text-sm font-bold mb-2 flex items-center"
          >
            <Mail className="w-4 h-4 mr-2 text-green-400" />
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className="shadow appearance-none bg-white border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            placeholder="seu@email.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-gray-200 text-sm font-bold mb-2 flex items-center"
          >
            <Lock className="w-4 h-4 mr-2 text-green-400" />
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="shadow appearance-none bg-white border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-400 w-full transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processando...
            </>
          ) : isRegister ? (
            "Criar Conta"
          ) : (
            "Entrar"
          )}
        </button>
      </form>
      <p className="text-center mt-6 text-sm text-green-200">
        {isRegister ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
        <button
          type="button"
          onClick={() => {
            setIsRegister(!isRegister);
            setError("");
          }}
          className="text-green-300 font-semibold hover:text-green-100 transition-colors underline"
        >
          {isRegister ? "Entrar" : "Criar uma"}
        </button>
      </p>
    </>
  );
}
