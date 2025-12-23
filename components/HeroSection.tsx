import React from "react";
import Image from "next/image"; // Para otimização de imagens

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-green-800 text-white py-20 px-4 md:px-8 lg:py-32 overflow-hidden">
      {/* Fundo com imagem overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/campo-rural.jpg" // Coloque uma imagem sua aqui
          alt="Campo rural brasileiro"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-50"
        />
      </div>
      <div className="relative max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Plataforma de Crédito Rural Inteligente
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Análises precisas com Machine Learning para aprovar créditos rurais de
          forma rápida e segura!
        </p>
        <a
          href="#cadastro" // Ou link para uma página de sign-up
          className="bg-yellow-500 text-green-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
        >
          Comece Agora Gratuitamente
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
