Gerenciador Solar

Um sistema moderno e responsivo para a gestão e acompanhamento de contratos de compensação de energia solar, conectando Usinas Geradoras e Unidades Consumidoras.

# Integrantes do Grupo

- Anthony Vinicius Vieira da Silva
- Vinicius Esser Marques
- Pedro Henrique de Almeida Marques

# Descrição Resumida do Sistema

O **Gerenciador Solar** é uma plataforma web desenvolvida para facilitar a administração comercial de negócios focados em energia solar por assinatura ou compensação de créditos. O sistema permite o cadastro de usinas produtoras, clientes (consumidores) e a gestão financeira do faturamento mensal. Através de um painel visual dinâmico, é possível acompanhar o saldo de energia na concessionária, calcular o faturamento e analisar métricas de performance e lucratividade (spread).

O foco da aplicação é entregar uma interface de alta usabilidade (UX/UI) voltada para o setor B2B, eliminando o uso de planilhas complexas.

# Tecnologias Utilizadas

A aplicação foi construída utilizando um ecossistema moderno de desenvolvimento Front-end:

- React (com Vite): Biblioteca principal para construção da interface de usuário com alta performance.
- TypeScript: Adiciona tipagem estática ao JavaScript, garantindo maior segurança e previsibilidade no código.
- Tailwind CSS: Framework utilitário de CSS utilizado para a estilização completa, garantindo responsividade e design moderno.
- Lucide React: Biblioteca de ícones vetoriais modernos.
- Recharts: Biblioteca para a construção do Dashboard e renderização gráfica dos dados financeiros e operacionais.
- React Hot Toast: Gerenciamento de notificações amigáveis (toasts) para o usuário.
- Local Storage (Web Storage API): Utilizado para a persistência estruturada dos dados no navegador, simulando um banco de dados real em tempo de execução.

---

# Funcionalidades Implementadas

# 1. Painel de Indicadores (Dashboard)

- Visualização consolidada do total de usinas, consumidores e contratos ativos.
- Gráficos exibindo a evolução financeira anual (Receitas vs Custos vs Lucro).
- Apuração do resultado operacional (Geração vs Consumo e Saldo de kWh).

# 2. Gestão de Entidades

- Usinas Fornecedoras: Cadastro de fontes geradoras e tarifa de repasse.
- Consumidores: Cadastro de clientes e tarifa de venda fixa contratada.

# 3. Módulo de Vínculos (Contratos)

- Interface para conectar Usinas e Consumidores.
- Organização por status (Ativo, Pendente, Encerrado).
- Busca inteligente de contratos por nome de usuário ou usina.

# 4. Controle de Faturamento (Faturas e Lançamentos)

- Lançamento de faturas mensais registrando a Unidade Consumidora (UC) e o Mês de Referência.
- Inserção manual de Consumo Abatido (kWh) e Saldo Acumulado na concessionária (kWh).
- Cálculo automático financeiro: Faturamento Bruto, Custo Operacional e Lucro Líquido por fatura.
- Histórico tabular consolidado de todos os faturamentos vinculados ao contrato.

---

# Instruções para Execução

Siga os passos abaixo para rodar o projeto localmente em sua máquina.

# Pré-requisitos

- Ter o **Node.js** instalado (versão 18.x ou superior).
- Ter o gerenciador de pacotes **npm** (ou yarn/pnpm) instalado.

# Passo a passo

# Como Executar o Projeto

Siga os passos abaixo para rodar a aplicação localmente na sua máquina:

Clonar o repositório:

git clone <link-do-repositorio>

Entrar na pasta do projeto via terminal:

cd <GERENCIDORDEUSINAS>
cd <codigo-fonte>
cd <frontend>

Instalar as dependências:

npm install

Iniciar o servidor de desenvolvimento:

npm run dev

## 🎥 Demonstração em Vídeo

Você pode assistir à demonstração do fluxo completo do sistema neste link: [Assista ao vídeo no YouTube](https://youtu.be/Z_R6A9vAYYY)
