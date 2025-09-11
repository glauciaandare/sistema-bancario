# Sistema Bancário Simples (Full-Stack)

Este é um projeto de um sistema bancário simples, desenvolvido como parte de um desafio técnico. A aplicação é construída com uma arquitetura full-stack, utilizando Python e FastAPI para o backend e React com TypeScript para o frontend.

O projeto implementa as operações básicas de depósito, saque e extrato, seguindo regras de negócio específicas.

## Funcionalidades

-   **Depósito:** Permite adicionar valores positivos ao saldo da conta.
-   **Saque:** Permite sacar valores, com as seguintes regras:
    -   Limite de 3 saques diários.
    -   Valor máximo de R$ 500,00 por saque.
    -   Não permite saque se o saldo for insuficiente.
-   **Extrato:** Exibe todo o histórico de transações (depósitos e saques) e o saldo final da conta.

## Tecnologias Utilizadas

-   **Backend:**
    -   Python 3.10+
    -   FastAPI
    -   Uvicorn
-   **Frontend:**
    -   React 18+
    -   TypeScript
    -   Axios
  

## Pré-requisitos

Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:
-   [Git](https://git-scm.com)
-   [Node.js (versão LTS)](https://nodejs.org/en/)
-   [Python (versão 3.8 ou superior)](https://www.python.org/)

## Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente.

**1. Clone o Repositório**

```bash
git clone https://github.com/glauciaandare/sistema-bancario.git
cd seu-repositorio
```

**2. Configurando e Rodando o Backend**

O servidor backend é responsável por toda a lógica de negócio.

```bash
# Navegue até a pasta do backend
cd backend

# Crie e ative um ambiente virtual
# No Windows:
python -m venv venv
.\venv\Scripts\activate
# No macOS/Linux:
# python3 -m venv venv
# source venv/bin/activate

# Instale as dependências do Python
# (Certifique-se de ter um arquivo requirements.txt ou instale manualmente)
pip install fastapi "uvicorn[standard]"

# Rode o servidor
uvicorn main:app --reload
```
> 🚀 O servidor backend estará rodando em `http://127.0.0.1:8000`

**3. Configurando e Rodando o Frontend**

O frontend é a interface com a qual o usuário interage. Abra um **novo terminal** para estes passos.

```bash
# Navegue até a pasta do frontend
cd frontend

# Instale as dependências do Node.js
npm install

# Rode a aplicação React
npm start
```
> 🚀 A aplicação frontend abrirá automaticamente no seu navegador em `http://localhost:3000`

Com ambos os servidores rodando, a aplicação estará totalmente funcional para testes locais.

---
_Este README foi gerado para auxiliar na configuração do ambiente de desenvolvimento._







