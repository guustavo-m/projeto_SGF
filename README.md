# Projeto Final Física SENAI

## Visão geral

Este projeto é uma plataforma de estudos de Física chamada **BUSCFÍSICA**, criada para prática de questões de vestibular e consulta de fórmulas. A solução combina:

- **Frontend** em React com Vite
- **Backend** em Node.js/Express
- **Banco de dados PostgreSQL** para armazenar questões, usuários, matérias, tópicos, vestibulares e respostas

## Funcionalidades principais

- Login com autenticação via JWT
- Página inicial com navegação para questões e fórmulas
- Tela de questões com filtros por vestibular, matéria e tópico
- Página de fórmulas com fórmulas essenciais de Mecânica, Termologia, Ondulatória e Eletricidade
- Logout e navegação entre rotas usando React Router

## Estrutura do repositório

- `backend/` - servidor Express e rotas da API
  - `app.js` - ponto de entrada do servidor
  - `src/config/database.js` - configuração PostgreSQL
  - `src/routes/` - rotas da API
  - `src/controllers/` - lógica das operações
  - `src/models/` - modelos de dados
- `frontend/` - aplicação React
  - `src/pages/` - páginas da aplicação
  - `src/components/` - componentes compartilhados
  - `src/services/api.js` - URL base da API

## Requisitos

- Node.js 18+ recomendado
- PostgreSQL
- NPM

## Configuração do backend

1. Acesse a pasta do backend:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` com as variáveis do PostgreSQL:

```env
DB_USER=seu_usuario
DB_HOST=localhost
DB_NAME=seu_banco
DB_PASSWORD=sua_senha
DB_PORT=5432
NODE_ENV=development
```

4. Execute o servidor:

```bash
node app.js
```

ou, se desejar usar `nodemon`:

```bash
npx nodemon app.js
```

5. O backend ficará disponível em `http://localhost:3000`.

## Configuração do frontend

1. Acesse a pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Abra o endereço exibido no terminal (por padrão `http://localhost:5173`).

## Endpoints principais da API

- `POST /auth/login` - autenticar usuário
- `GET /questoes` - listar todas as questões
- `GET /questoes/:id` - buscar questão por id
- `GET /questoes/vestibular/:vestibular` - filtrar por vestibular
- `GET /questoes/materia/:materia` - filtrar por matéria
- `GET /questoes/topico/:topico` - filtrar por tópico
- `GET /vestibulares` - listar vestibulares
- `GET /materia` - listar matérias
- `GET /topico` - listar tópicos
- `GET /dificuldade` - listar dificuldades
- `GET /resposta` - listar respostas
- `GET /usuario` - listar usuários
- `GET /usuario/:id` - buscar usuário por id
- `POST /usuario` - criar usuário
- `PUT /usuario/:id` - atualizar usuário
- `DELETE /usuario/:id` - excluir usuário

> Observação: o frontend consome `http://localhost:3000` como URL base da API.

## Uso do frontend

- Acesse `/` para o login
- Após autenticar, acesse `/home` para navegar
- Use `/questoes` para visualizar e filtrar questões
- Use `/formulas` para consultar fórmulas de Física

## Observações

- O projeto armazena o token JWT no `localStorage`
- Garanta que o backend esteja rodando antes de abrir o frontend
- Ajuste `API_URL` em `frontend/src/services/api.js` se mudar a porta do servidor

## Autores

- Ayla Cristina da Silva Vilela
- Gabriella Camacho Stavareno
- Gustavo Millamonte
- Maria Vitória Guedes Ferreira
- Manuella da Silva Piva

## Licença

- ISC
