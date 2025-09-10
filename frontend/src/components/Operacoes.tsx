// frontend/src/components/Operacoes.tsx
import React, { useState } from 'react';

interface OperacoesProps {
  onOperacao: (tipo: 'deposito' | 'saque', valor: number) => void;
}

const Operacoes: React.FC<OperacoesProps> = ({ onOperacao }) => {
  const [valorInput, setValorInput] = useState('');

  const handleAction = (tipo: 'deposito' | 'saque') => {
    const valor = parseFloat(valorInput);
    if (!isNaN(valor) && valor > 0) {
      onOperacao(tipo, valor);
      setValorInput(''); // Limpa o input após a operação
    } else {
      alert("Por favor, insira um valor positivo válido.");
    }
  };

  return (
    <div className="card">
      <h2>Realizar Operação</h2>
      <input
        type="number"
        value={valorInput}
        onChange={(e) => setValorInput(e.target.value)}
        placeholder="Digite o valor"
      />
      <div className="buttons">
        <button onClick={() => handleAction('deposito')}>Depositar</button>
        <button onClick={() => handleAction('saque')}>Sacar</button>
      </div>
    </div>
  );
};

export default Operacoes;