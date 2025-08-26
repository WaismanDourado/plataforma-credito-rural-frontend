// components/prediction/PredictionForm.tsx
"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext"; // Pega o accessToken do contexto
import { PredictionResult, ApiResponse } from "@/lib/types"; // Importa os tipos
import { API_BASE_URL } from "@/lib/constants"; // Importa a URL base

export default function PredictionForm() {
  const { accessToken, currentUser, error: authError } = useAuth(); // Pega o token e o usuário do contexto
  const [income, setIncome] = useState<number>(50000);
  const [yearsFarming, setYearsFarming] = useState<number>(10);
  const [areaHectares, setAreaHectares] = useState<number>(20);
  const [predictionResponse, setPredictionResponse] =
    useState<ApiResponse | null>(null);
  const [localError, setLocalError] = useState<string | null>(null); // Erros específicos da previsão

  // Se não estiver logado, não mostra o formulário ou pede para logar
  if (!accessToken) {
    return (
      <div className="text-center p-8 bg-white rounded shadow-md mt-8">
        <h2 className="text-2xl mb-4">Acesso Negado</h2>
        <p>
          Por favor, faça login para acessar o formulário de previsão de
          crédito.
        </p>
        {authError && <p className="text-red-500 mt-2">{authError}</p>}
      </div>
    );
  }

  const handlePredict = async (e: FormEvent) => {
    e.preventDefault();
    setPredictionResponse(null);
    setLocalError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/predict/credit`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Usa o token do contexto
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          income: parseFloat(income.toString()),
          years_farming: parseInt(yearsFarming.toString()),
          area_hectares: parseFloat(areaHectares.toString()),
        }),
      });

      const data: PredictionResult | { detail?: string } = await res.json();
      if (res.ok) {
        setPredictionResponse({
          message: "Previsão realizada com sucesso",
          result: data as PredictionResult,
        });
      } else {
        const errorData = data as { detail?: string };
        setLocalError(errorData.detail || "Erro ao fazer previsão");
      }
    } catch (err) {
      console.error("Erro na requisição de previsão:", err);
      setLocalError(
        "Erro de rede ou na requisição de previsão. Verifique o console."
      );
    }
  };

  return (
    <div className="p-8 bg-white rounded shadow-md mt-8">
      <h2 className="text-2xl mb-4">
        Previsão de Crédito para {currentUser?.username || "Usuário"}
      </h2>
      <form onSubmit={handlePredict}>
        <div className="mb-4">
          <label
            htmlFor="income"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Renda Anual:
          </label>
          <input
            type="number"
            id="income"
            value={income}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setIncome(parseFloat(e.target.value))
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="yearsFarming"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Anos de Experiência:
          </label>
          <input
            type="number"
            id="yearsFarming"
            value={yearsFarming}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setYearsFarming(parseInt(e.target.value))
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="areaHectares"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Área (Hectares):
          </label>
          <input
            type="number"
            id="areaHectares"
            value={areaHectares}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAreaHectares(parseFloat(e.target.value))
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Prever Crédito
        </button>
      </form>

      {localError && (
        <div className="text-red-500 mt-4 p-2 border border-red-500 rounded">
          Erro: {localError}
        </div>
      )}
      {predictionResponse && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold">Resposta da Previsão:</h3>
          <pre className="whitespace-pre-wrap break-words text-sm bg-gray-200 p-2 rounded mt-2">
            {JSON.stringify(predictionResponse, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
