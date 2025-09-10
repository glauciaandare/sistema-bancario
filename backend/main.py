# backend/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
from fastapi.middleware.cors import CORSMiddleware # Importante para conectar com o frontend

app = FastAPI()

# Configuração do CORS para permitir que o frontend (rodando em outra porta) acesse a API
origins = [
    "http://localhost:3000", # Endereço do seu app React
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Regra de Negócio e "Banco de Dados" em Memória ---
# Como é um projeto simples, vamos guardar os dados em variáveis.
# Em um projeto real, isso estaria em um banco de dados.

saldo_conta = 0.0
extrato_conta: List[Dict[str, any]] = []
numero_saques_diarios = 0
LIMITE_SAQUES_DIARIOS = 3
LIMITE_VALOR_SAQUE = 500.0

# Modelo de dados para as requisições
class Transacao(BaseModel):
    valor: float

# --- Endpoints da API ---

@app.get("/extrato")
def get_extrato():
    """Retorna o extrato completo e o saldo atual."""
    return {"extrato": extrato_conta, "saldo": saldo_conta}

@app.post("/deposito")
def post_deposito(transacao: Transacao):
    """Realiza um depósito na conta."""
    global saldo_conta # Avisa que vamos modificar a variável global

    valor = transacao.valor
    if valor <= 0:
        raise HTTPException(status_code=400, detail="O valor do depósito deve ser positivo.")

    saldo_conta += valor
    extrato_conta.append({"tipo": "Depósito", "valor": valor})
    return {"mensagem": "Depósito realizado com sucesso!", "novo_saldo": saldo_conta}

@app.post("/saque")
def post_saque(transacao: Transacao):
    """Realiza um saque da conta, validando as regras."""
    global saldo_conta, numero_saques_diarios

    valor = transacao.valor

    if valor <= 0:
        raise HTTPException(status_code=400, detail="O valor do saque deve ser positivo.")
    if valor > saldo_conta:
        raise HTTPException(status_code=400, detail="Saldo insuficiente para realizar o saque.")
    if valor > LIMITE_VALOR_SAQUE:
        raise HTTPException(status_code=400, detail=f"Limite de R$ {LIMITE_VALOR_SAQUE:.2f} por saque excedido.")
    if numero_saques_diarios >= LIMITE_SAQUES_DIARIOS:
        raise HTTPException(status_code=400, detail="Limite de saques diários atingido.")

    saldo_conta -= valor
    numero_saques_diarios += 1
    extrato_conta.append({"tipo": "Saque", "valor": valor})
    return {"mensagem": "Saque realizado com sucesso!", "novo_saldo": saldo_conta}