import React from "react";
import {
  CogIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: CogIcon,
    title: "Análise com XGBoost",
    desc: "Modelos de ML para previsões precisas de crédito baseado em dados reais.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Segurança de Dados",
    desc: "Criptografia e compliance com LGPD para proteger informações rurais.",
  },
  {
    icon: GlobeAltIcon,
    title: "Integração Fácil",
    desc: "Conecte com APIs de clima e safra para análises holísticas.",
  },
  {
    icon: ChartPieIcon,
    title: "Dashboard Personalizado",
    desc: "Visualize riscos e aprovações em tempo real.",
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">
          Recursos que Fazem a Diferença
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-lg shadow-md">
              <feature.icon className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
