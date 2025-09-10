// frontend/src/components/Extrato.tsx
import React from 'react';

interface Transacao {
  tipo: string;
  valor: number;
}

interface ExtratoProps {
  transacoes: Transacao[];
}

const Extrato: React.FC<ExtratoProps> = ({ transacoes }) => {
  return (
    <div className="card">
      <h2>Extrato</h2>
      {transacoes.length === 0 ? (
        <p>Não foram realizadas movimentações.</p>
      ) : (
        <ul>
          {transacoes.map((item, index) => (
            <li key={index} className={item.tipo === 'Saque' ? 'saque' : 'deposito'}>
              <span>{item.tipo}</span>
              <span>
                {item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Extrato;