// app/page.tsx
"use client"; // Mantenha se suas seções da landing page usarem hooks ou interatividade

import React from "react";
import { useAuth } from "@/contexts/AuthContext"; // Para pegar o status do usuário

// Importe as seções da sua landing page
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import FooterSection from "@/components/FooterSection";

// Opcional: Importe o PredictionForm se quiser ele diretamente na landing (ex: para usuários logados)
import PredictionForm from "@/components/prediction/PredictionForm";

export default function HomePage() {
  const { currentUser, isLoading, logout } = useAuth(); // Apenas para mostrar status e logout

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header da Landing Page (que agora pode ter Login/Logout) */}
      <header className="bg-green-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Plataforma de Crédito Rural</h1>
        <nav>
          {isLoading ? (
            <span>Carregando...</span>
          ) : currentUser ? (
            <>
              <span className="mr-4">Olá, {currentUser.username}!</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              >
                Sair
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
            >
              Login
            </a>
          )}
        </nav>
      </header>

      {/* Seções da Landing Page */}
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />

        {/* Opcional: Mostre o formulário de previsão apenas se o usuário estiver logado */}
        {currentUser && (
          <div className="container mx-auto px-4 py-8">
            <PredictionForm />
          </div>
        )}
      </main>

      <FooterSection />
    </div>
  );
}
