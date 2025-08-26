import React from "react";
import { AcademicCapIcon, ChartBarIcon } from "@heroicons/react/24/outline"; // Ícones

const AboutSection: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">
          Por Que Crédito Rural Inteligente?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <AcademicCapIcon className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <h3 className="text-xl font-semibold mb-2">O Problema</h3>
            <p>
              No Brasil, milhões de agricultores enfrentam burocracia e riscos
              altos para obter crédito. Análises manuais são lentas e
              imprecisas.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <ChartBarIcon className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <h3 className="text-xl font-semibold mb-2">Nossa Solução</h3>
            <p>
              Usando XGBoost para machine learning, analisamos dados reais de
              safra, clima e finanças para previsões de crédito 30% mais
              precisas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
