// app/dashboard/page.tsx
"use client"; // Necessário porque usaremos hooks do React (useAuth, useRouter)

import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import PredictionForm from "@/components/prediction/PredictionForm"; // Importe o formulário de previsão
import Image from "next/image"; // Para otimização de imagem, se for usar

export default function DashboardPage() {
  const { currentUser, isLoading, accessToken, logout } = useAuth(); // Pegamos o estado de autenticação
  const router = useRouter();

  // Efeito para proteger a rota: se não estiver logado, redireciona para a página de login
  useEffect(() => {
    // Se ainda está carregando, não faça nada
    if (isLoading) {
      return;
    }
    // Se não há accessToken e não estamos carregando, significa que não está logado
    if (!accessToken) {
      router.push("/login"); // Redireciona para a página de login
    }
  }, [accessToken, isLoading, router]);

  // Se o usuário ainda está carregando, mostra um loader
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">Carregando dashboard...</p>
      </div>
    );
  }

  // Se não há usuário (e não está mais carregando), significa que o useEffect vai redirecionar
  // ou que houve algum erro de autenticação. Por segurança, não renderizamos nada aqui.
  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-700">
          Bem-vindo(a) ao Dashboard, {currentUser.username}!
        </h1>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Sair
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Seção de Dados do Usuário */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Seus Dados
          </h2>
          <div className="space-y-2">
            <p className="text-gray-700">
              <strong>ID:</strong> {currentUser.id}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {currentUser.email}
            </p>
            <p className="text-gray-700">
              <strong>Status:</strong>{" "}
              {currentUser.is_active ? "Ativo" : "Inativo"}
            </p>
          </div>
          {/* Você pode adicionar mais informações do usuário aqui, como um avatar, etc. */}
        </section>

        {/* Seção de Previsão de Crédito */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Ferramenta de Previsão de Crédito
          </h2>
          <PredictionForm /> {/* Renderiza o formulário de previsão */}
        </section>
      </div>

      {/* Adicione outras seções do dashboard conforme necessário */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>
          &copy; 2025 Plataforma de Crédito Rural. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
