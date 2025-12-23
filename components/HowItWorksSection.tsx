import React from "react";

const steps = [
  {
    number: 1,
    title: "Cadastro Rápido",
    desc: "Insira dados de safra e finanças.",
  },
  {
    number: 2,
    title: "Análise com IA",
    desc: "XGBoost processa e prevê riscos.",
  },
  {
    number: 3,
    title: "Relatório Instantâneo",
    desc: "Aprovação ou sugestões em segundos.",
  },
  {
    number: 4,
    title: "Aprovação de Crédito",
    desc: "Integre com bancos para liberação.",
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-green-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl text-green-700 font-bold mb-8">
          Como Funciona?
        </h2>
        <div className="space-y-8 md:space-y-0 md:flex md:justify-between md:gap-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-4 bg-white rounded-lg shadow-md flex-1"
            >
              <div className="text-4xl font-bold text-green-600 mb-2">
                {step.number}
              </div>
              <h3 className="text-xl text-gray-900 font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
