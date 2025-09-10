// frontend/src/components/Saldo.tsx
import React from 'react';

interface SaldoProps {
  valor: number;
}

const Saldo: React.FC<SaldoProps> = ({ valor }) => {
  return (
    <div className="card">
      <h2>Saldo Atual</h2>
      <p className="saldo">
        {valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </p>
    </div>
  );
};

export default Saldo;