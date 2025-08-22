"use client";
import React, { useState, useEffect, FormEvent, ChangeEvent } from "react"; // Adicionado: useEffect, FormEvent, ChangeEvent
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

interface TokenResponse {
  access_token: string;
  token_type: string;
}

interface UserResponse {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
}

interface PredictionResult {
  predicted_approval: number;
  probability: number;
}

interface ApiResponse {
  message?: string;
  token?: string;
  result?: PredictionResult;
  detail?: string;
  error?: string;
}

export default function Home() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [income, setIncome] = useState<number>(50000);
  const [yearsFarming, setYearsFarming] = useState<number>(10);
  const [areaHectares, setAreaHectares] = useState<number>(20);

  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setAccessToken(storedToken);
      fetchCurrentUser(storedToken);
    }
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setResponse(null);
    setError(null);
    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const res = await fetch(`${API_BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      const data: TokenResponse | {detail?: string} = await res.json();

      if (res.ok) {
        const tokenData = data as TokenResponse;
        setAccessToken(tokenData.access_token);
        localStorage.setItem('accessToken', tokenData.access_token);
        setResponse({message: 'Login bem-sucedido', token: tokenData.access_token});
        fetchCurrentUser(tokenData.access_token);
      } else {
        const errorData = data as {detail?: string};
        setError(errorData.detail || 'Erro ao fazer login');
        setAccessToken(null);
        localStorage.removeItem('accessToken');
        setCurrentUser(null);
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError('Erro de rede ou na requisição de login. Verifique o console.');
    }
  }

  const handleLogout = () => {
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    setCurrentUser(null);
    setResponse({message: 'Sessão encerrada.'});
    setError(null);
  };

  const fetchCurrentUser = async (token: string) => {
    if (!token) {
      setCurrentUser(null);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data: UserResponse | {detail?: string} = await res.json();
      if (res.ok) {
       setCurrentUser(data as UserResponse);
      } else {
        const errorData = data as {detail?: string};
        setError(errorData.detail || 'Erro ao obter dados do usuário.');
        setCurrentUser(null);
        setAccessToken(null);
        localStorage.removeItem('accessToken');
      }
    } catch (err) {
      console.error('Erro na requisição de dados do usuário:', err);
      setError('Erro de rede ou na requisição de dados do usuário. Verifique o console.');
      setCurrentUser(null);
    }
  };

  const handlePredict = async (e: FormEvent) => {
    e.preventDefault();
    setResponse(null);
    setError(null);

    if(!accessToken) {
      setError('Você precisa estar logado para fazer previsões.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/predict/credit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          income: parseFloat(income.toString()),
          years_farming: parseInt(yearsFarming.toString()),
          area_hectares: parseFloat(areaHectares.toString()),
        }),
      });

      const data: PredictionResult | { detail?: string } = await res.json();
      if (res.ok) {
        setResponse({message: 'Previsão realizada com sucesso', result: data as PredictionResult});
      } else {
        const errorData = data as { detail?: string };
        setError(errorData.detail || 'Erro ao fazer previsão');
      }
    } catch (err) {
      console.error('Erro na requisição de previsão:', err);
      setError('Erro de rede ou na requisição de previsão. Verifique o console.');
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', margin: '20px', maxWidth: '600px', lineHeight: '1.6' }}>
      <h1>Plataforma de Crédito Rural</h1>

      <section style={{ marginBottom: '30px', padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} // Tipar evento
              required
              style={{ width: 'calc(100% - 16px)', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} // Tipar evento
              required
              style={{ width: 'calc(100% - 16px)', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>
            Entrar
          </button>
          <button type="button" onClick={handleLogout} style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Sair
          </button>
        </form>
      </section>

      {currentUser && (
        <section style={{ marginBottom: '30px', padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
          <h2>Dados do Usuário</h2>
          <p><strong>ID:</strong> {currentUser.id}</p>
          <p><strong>Username:</strong> {currentUser.username}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>Ativo:</strong> {currentUser.is_active ? 'Sim' : 'Não'}</p>
        </section>
      )}

      <section style={{ marginBottom: '30px', padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
        <h2>Previsão de Crédito</h2>
        <form onSubmit={handlePredict}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="income" style={{ display: 'block', marginBottom: '5px' }}>Renda Anual:</label>
            <input
              type="number"
              id="income"
              value={income}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setIncome(parseFloat(e.target.value))} // Tipar e converter
              required
              style={{ width: 'calc(100% - 16px)', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="yearsFarming" style={{ display: 'block', marginBottom: '5px' }}>Anos de Experiência:</label>
            <input
              type="number"
              id="yearsFarming"
              value={yearsFarming}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setYearsFarming(parseInt(e.target.value))} // Tipar e converter
              required
              style={{ width: 'calc(100% - 16px)', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="areaHectares" style={{ display: 'block', marginBottom: '5px' }}>Área (Hectares):</label>
            <input
              type="number"
              id="areaHectares"
              value={areaHectares}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAreaHectares(parseFloat(e.target.value))} // Tipar e converter
              required
              style={{ width: 'calc(100% - 16px)', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Prever Crédito
          </button>
        </form>
      </section>

      {/* Exibição de erros e respostas */}
      {error && <div style={{ color: 'red', marginTop: '20px', padding: '10px', border: '1px solid red', borderRadius: '4px' }}>Erro: {error}</div>}
      {response && (
        <section style={{ marginTop: '20px', padding: '20px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h2>Resposta da API</h2>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', backgroundColor: '#e9e9e9', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify(response, null, 2)}
          </pre>
        </section>
      )}
    </div>
  );
}