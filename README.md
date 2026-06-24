# Projeto SGF - Sistema de Gestão de Frota

Uma aplicação full-stack para gerenciamento de empresas, produtos e usuários com autenticação segura.

## 📋 Visão Geral

Este projeto combina um backend Node.js/Express com um frontend React/Vite, utilizando PostgreSQL para armazenamento de dados. O sistema fornece autenticação JWT, gerenciamento de usuários, empresas e produtos com controle de acesso baseado em rotas protegidas.

## 🎯 Funcionalidades Principais

- ✅ **Autenticação JWT** - Login seguro com tokens
- ✅ **Gerenciamento de Usuários** - CRUD completo para usuários
- ✅ **Gerenciamento de Empresas** - Criar, ler, atualizar e deletar empresas
- ✅ **Gerenciamento de Produtos** - Controle de produtos associados a empresas
- ✅ **Rotas Protegidas** - Acesso restrito com middleware de autenticação
- ✅ **Interface Responsiva** - Frontend moderno com React e CSS Modules

## 🏗️ Estrutura do Projeto

```
projeto_SGF/
├── backend/                    # Servidor Node.js/Express
│   ├── app.js                 # Ponto de entrada
│   ├── bcrypt.js              # Configuração de criptografia
│   ├── package.json           # Dependências
│   └── src/
│       ├── config/
│       │   └── database.js     # Configuração PostgreSQL
│       ├── controllers/        # Lógica das operações
│       │   ├── authController.js
│       │   ├── usuarioController.js
│       │   ├── empresaController.js
│       │   └── produtosController.js
│       ├── middleware/         # Middlewares Express
│       │   └── authMiddleware.js
│       ├── models/             # Modelos de dados
│       │   ├── usuarioModel.js
│       │   ├── empresaModel.js
│       │   └── produtosModel.js
│       └── routes/             # Definição de rotas
│           ├── authRoutes.js
│           ├── usuarioRoutes.js
│           ├── empresaRoutes.js
│           └── produtosRoutes.js
│
└── frontend/                   # Aplicação React
    ├── package.json           # Dependências
    ├── vite.config.js         # Configuração Vite
    ├── index.html
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── pages/              # Páginas da aplicação
        │   ├── Home/
        │   ├── Login/
        │   └── ProtectedRoutes/
        └── services/
            └── api.js          # Cliente API
```

## 📋 Requisitos

- **Node.js** 18+ recomendado
- **npm** 9+
- **PostgreSQL** 12+

## 🚀 Começando

### Backend - Instalação e Configuração

1. Navegue até a pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` na raiz do backend com as variáveis de ambiente:
```env
DB_USER=seu_usuario_postgres
DB_HOST=localhost
DB_NAME=seu_banco_dados
DB_PASSWORD=sua_senha_postgres
DB_PORT=5432
NODE_ENV=development
PORT=3000
JWT_SECRET=sua_chave_secreta_jwt
```

4. Inicie o servidor:
```bash
node app.js
```

Ou com nodemon para desenvolvimento (recarregamento automático):
```bash
npx nodemon app.js
```

O backend estará disponível em `http://localhost:3000`

### Frontend - Instalação e Configuração

1. Navegue até a pasta do frontend:
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

4. Abra o navegador no endereço exibido (geralmente `http://localhost:5173`)

## 📡 Endpoints da API

### Autenticação (`/auth`)
- `POST /auth/login` - Login de usuário
- `POST /auth/register` - Registro de novo usuário

### Usuários (`/usuario`)
- `GET /usuario` - Listar todos os usuários
- `GET /usuario/:id` - Obter usuário por ID
- `PUT /usuario/:id` - Atualizar usuário
- `DELETE /usuario/:id` - Deletar usuário

### Empresas (`/empresa`)
- `GET /empresa` - Listar todas as empresas
- `POST /empresa` - Criar nova empresa
- `PUT /empresa/:id` - Atualizar empresa
- `DELETE /empresa/:id` - Deletar empresa

### Produtos (`/produtos`)
- `GET /produtos` - Listar todos os produtos
- `POST /produtos` - Criar novo produto
- `PUT /produtos/:id` - Atualizar produto
- `DELETE /produtos/:id` - Deletar produto

> **Nota:** Todos os endpoints exceto `/auth` requerem autenticação JWT

## 🔐 Autenticação

O projeto utiliza **JSON Web Tokens (JWT)** para autenticação:

1. O usuário faz login em `/auth/login`
2. O servidor retorna um token JWT
3. O token é incluído no header `Authorization: Bearer <token>` nas requisições protegidas
4. O middleware `authMiddleware.js` verifica a validade do token

## 🎨 Stack Tecnológico

### Backend
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados relacional
- **bcryptjs** - Criptografia de senhas
- **jsonwebtoken** - Autenticação JWT
- **dotenv** - Gerenciamento de variáveis de ambiente
- **CORS** - Compartilhamento de recursos entre domínios
- **nodemon** - Desenvolvimento (recarregamento automático)

### Frontend
- **React** 19.2 - Biblioteca UI
- **React Router** 7 - Roteamento entre páginas
- **Vite** - Build tool moderno
- **CSS Modules** - Estilos isolados por componente
- **ESLint** - Linting de código

## 📝 Scripts Disponíveis

### Backend
```bash
npm install  # Instalar dependências
node app.js  # Iniciar servidor
npx nodemon app.js  # Iniciar com auto-reload
```

### Frontend
```bash
npm install      # Instalar dependências
npm run dev      # Iniciar servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build de produção
npm run lint     # Verificar código com ESLint
```

## 🔧 Configuração do Banco de Dados

Certifique-se de que o PostgreSQL está rodando e crie um banco de dados:

```sql
CREATE DATABASE seu_banco_dados;
```

As tabelas serão criadas pelo backend ao conectar. Consulte `src/config/database.js` para detalhes de conexão.

## 📦 Dependências Principais

### Backend
```json
{
  "express": "^5.2.1",
  "pg": "^8.21.0",
  "jsonwebtoken": "^9.0.3",
  "bcryptjs": "^3.0.3",
  "cors": "^2.8.6",
  "dotenv": "^17.4.2"
}
```

### Frontend
```json
{
  "react": "^19.2.6",
  "react-dom": "^19.2.6",
  "react-router-dom": "^7.16.0",
  "vite": "^8.0.12"
}
```

## 🐛 Troubleshooting

### Backend não conecta ao banco
- Verifique se PostgreSQL está rodando
- Confirme credenciais no arquivo `.env`
- Verifique se a porta 5432 está acessível

### Frontend não conecta ao backend
- Verifique se o backend está rodando em `http://localhost:3000`
- Confirme se CORS está habilitado no backend
- Verifique URL da API em `frontend/src/services/api.js`

### Erro de autenticação
- Verifique se o token JWT está sendo enviado corretamente
- Confirme se `JWT_SECRET` está configurado no `.env`
- Verifique expiração do token

## 📄 Licença

ISC

## 👤 Autor

Criado para o projeto SGF

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

## Licença

- ISC
