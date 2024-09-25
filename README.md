# VExpense - Desafio Técnico

Este projeto é um desafio técnico para a VExpense, construído com React, TypeScript e Vite.


## Sobre

Esse projeto é um sistema de gerenciamento de fornecedores que permite aos usuários criar, visualizar e gerenciar informações de fornecedores. 

## Pré-requisits

Antes de começar, certifique-se de ter o seguinte instalado no seu sistema:

- Node.js (versão 14 ou superior)
- npm (geralmente vem com o Node.js)

## Instalação

Siga estes passos para configurar o projeto:

1. Clone o repositório:
   ```
   git clone <repository-url>
   cd vexpense-desafio-tecnico
   ```

2. Instale as dependências:
   ```
   npm install
   ```

## Executando a Aplicação

Para rodar a aplicação, você precisará iniciar tanto o servidor de desenvolvimento do frontend quanto o json-server para o backend simulado.

1. Inicie o json-server:
   ```
   npm run server
   ```
   This will start json-server on port 3000 with a 700ms delay to simulate network latency.

2. Em uma nova janela do terminal, inicie o servidor de desenvolvimento do frontend:
   ```
   npm run dev
   ```
3. OAbra seu navegador e navegue até a URL fornecida pelo servidor Vite.


## Estrutura do Projeto

- `/src`: Contém o código-fonte da aplicação React.
- `/public`: Recursos públicos.
- `db.json`: O arquivo de banco de dados utilizado pelo json-server.


## Notas Adicionais

- A aplicação utiliza integração com o Google Maps. Talvez seja necessário fornecer uma chave de API válida do Google Maps no arquivo de configuração apropriado.
