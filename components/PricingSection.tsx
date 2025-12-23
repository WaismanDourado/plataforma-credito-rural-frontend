import React from "react";

const plans = [
  {
    name: "Básico",
    price: "Grátis",
    features: ["Análises Simples", "1 Usuário"],
  },
  {
    name: "Pro",
    price: "R$49/mês",
    features: ["XGBoost Avançado", "Dashboard Full", "Suporte Prioritário"],
  },
];

const PricingSection: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl text-green-700 font-bold mb-8">
          Planos Acessíveis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-2xl text-gray-700 font-bold mb-2">
                {plan.name}
              </h3>
              <p className="text-xl text-green-700 font-bold mb-4">
                {plan.price}
              </p>
              <ul className="list-disc text-gray-500 pl-6 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a
                href="#assinar"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Assinar
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
