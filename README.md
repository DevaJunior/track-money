# TrackMoney | Gestão Financeira Pessoal

Uma aplicação web desenvolvida em React para controle financeiro, permitindo aos usuários rastrear receitas, despesas e visualizar o saldo atual de forma clara e intuitiva.

[Link para o projeto online - Vercel/Netlify]

---

## 🚀 Funcionalidades Principais

* **Controle de Transações:** Adição de entradas (receitas) e saídas (despesas) com categorização e especificação de datas.
* **Dashboard Resumo:** Visualização rápida do total de entradas, saídas e saldo atual consolidado em cartões de destaque.
* **Listagem Histórica:** Tabela interativa com o histórico completo de transações, permitindo a exclusão e gerenciamento dos registros.
* **Persistência de Dados:** Salvamento automático das transações utilizando LocalStorage para garantir que os dados não sejam perdidos ao recarregar a página.

---

## 💻 Tecnologias e Arquitetura

O projeto foi estruturado com foco na componentização inteligente e no gerenciamento de estado eficiente no ecossistema React:

* **React 18:** Construção da interface de usuário orientada a componentes.
* **Vite:** Ferramenta de build de altíssima performance e servidor de desenvolvimento local.
* **Context API / Hooks:** Gerenciamento do estado global das transações financeiras, evitando *prop drilling*.
* **CSS / Estilização:** Estilização componentizada para uma interface moderna, limpa e responsiva.
* **Formatadores Internacionais (Intl):** Formatação nativa e robusta de valores monetários e datas para o padrão brasileiro (PT-BR).

---

## 🛠️ Como Executar o Projeto Localmente

Para rodar este projeto no seu ambiente de desenvolvimento, siga as instruções abaixo:

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/DevaJunior/track-money.git](https://github.com/DevaJunior/track-money.git)