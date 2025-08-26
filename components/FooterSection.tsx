import React from "react";

const FooterSection: React.FC = () => {
  return (
    <footer className="py-8 px-4 bg-green-800 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">
          Pronto para Revolucionar o Crédito Rural?
        </h2>
        <a
          href="#cadastro"
          className="bg-yellow-500 text-green-900 px-6 py-3 rounded-lg font-semibold"
        >
          Cadastre-se Agora
        </a>
        <div className="mt-8">
          <p>
            © 2025 Plataforma de Crédito Rural. Todos os direitos reservados.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a
              href="https://github.com/WaismanDourado"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a href="mailto:contato@plataforma.com">Contato</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
