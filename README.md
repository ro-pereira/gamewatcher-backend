# GameWatcher — Backend

API REST do **GameWatcher**, plataforma de consulta de transmissões de jogos de futebol. Este serviço é responsável por persistir e disponibilizar os dados de partidas e opções de transmissão consumidos pelo [`gamewatcher-frontend`](https://github.com/ro-pereira/gamewatcher-frontend).

## Sobre o projeto

O GameWatcher foi desenvolvido para facilitar a consulta de partidas de futebol e suas respectivas opções de transmissão, reunindo em um só lugar informações que normalmente estão espalhadas em diferentes fontes.

Principais funcionalidades e aspectos técnicos do projeto como um todo:

- Interface desenvolvida em React.js e TypeScript
- API REST construída com Node.js e Express
- Persistência e consulta de dados com PostgreSQL
- Web scraping com Selenium para coleta automatizada de informações sobre jogos e transmissões
- Integração entre front-end e API para consumo e apresentação dos dados
- Configuração de CORS para comunicação entre as aplicações
- Interface responsiva e focada na experiência do usuário

## Stack (backend)

- [Node.js](https://nodejs.org) + [TypeScript](https://www.typescriptlang.org)
- [Express](https://expressjs.com) 5 — API REST
- [PostgreSQL](https://www.postgresql.org) (via [`pg`](https://node-postgres.com))
- [`cors`](https://www.npmjs.com/package/cors) — comunicação com o front-end
- [`dotenv`](https://www.npmjs.com/package/dotenv) — variáveis de ambiente

## Pré-requisitos

- Node.js 18+
- Uma instância PostgreSQL acessível

## Como rodar localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/ro-pereira/gamewatcher-backend.git
   cd gamewatcher-backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente (crie um arquivo `.env` na raiz do projeto):

   ```bash
   PORT=3333
   DATABASE_URL=postgres://usuario:senha@localhost:5432/gamewatcher
   ```

4. Compile o projeto:

   ```bash
   npm run build
   ```

5. Inicie o servidor:

   ```bash
   npm start
   ```

## Scripts disponíveis

| Script | Descrição |
| --- | --- |
| `npm run build` | Compila o TypeScript para `dist/` |
| `npm start` | Inicia o servidor a partir do build (`dist/index.js`) |
| `npm test` | Ainda não configurado |

## Estrutura do projeto

```
├── src/                # Código-fonte (rotas, controllers, acesso ao banco, scraping)
├── tsconfig.json        # Configuração do TypeScript
└── package.json
```

## Repositórios relacionados

- [`gamewatcher-frontend`](https://github.com/ro-pereira/gamewatcher-frontend) — interface web em Next.js/React que consome esta API

## Objetivo do projeto

Desenvolver uma aplicação full-stack completa, integrando desenvolvimento front-end, criação de APIs, persistência de dados e automação de coleta de informações.
