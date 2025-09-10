// frontend/src/App.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Importando os componentes
import Header from './components/Header';
import Saldo from './components/Saldo';
import Operacoes from './components/Operacoes';
import Extrato from './components/Extrato';

import './App.css';

// Definindo os tipos para o TypeScript
interface Transacao {
  tipo: string;
  valor: number;
}

function App() {
  // Estados principais da aplicação
  const [saldo, setSaldo] = useState<number>(0);
  const [extrato, setExtrato] = useState<Transacao[]>([]);
  const [mensagem, setMensagem] = useState<string>('');

  // Configuração base do Axios para a nossa API
  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
  });

  // Função para buscar os dados mais recentes do backend
  const fetchDados = async () => {
    try {
      const response = await api.get('/extrato');
      setSaldo(response.data.saldo);
      setExtrato(response.data.extrato);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setMensagem("Erro de conexão com o servidor. Verifique se o backend está rodando.");
    }
  };

  // useEffect com array vazio [], roda a função UMA VEZ quando o componente é montado
  useEffect(() => {
    fetchDados();
  }, []);

  // Função que será chamada pelo componente Operacoes
  const handleOperacao = async (tipo: 'deposito' | 'saque', valor: number) => {
    try {
      // Faz a chamada POST para o endpoint correspondente
      await api.post(`/${tipo}`, { valor });
      setMensagem(`Operação de ${tipo} realizada com sucesso!`);
      fetchDados(); // Atualiza saldo e extrato na tela após a operação
    } catch (error: any) {
      // Exibe a mensagem de erro vinda da API
      setMensagem(error.response?.data?.detail || `Erro ao realizar ${tipo}.`);
    }
  };

  return (
    <div className="App">
      <Header />
      <main>
        <Saldo valor={saldo} />

        {/* Exibe a mensagem de status/erro apenas se ela existir */}
        {mensagem && <p className="mensagem">{mensagem}</p>}
        
        <Operacoes onOperacao={handleOperacao} />
        <Extrato transacoes={extrato} />
      </main>
    </div>
  );
}

export default App;