# 🧠 Projeto FullStack - CRUD de Usuários com Login 🔐 + Painel Admin 🛠️

Este é um projeto fullstack completo com **autenticação JWT**, **painel de controle**, **bloqueio por tentativas**, **recuperação simulada**, **CRUD de usuários**, **seed automática com admin**, e **frontend funcional com React + Vite**.

---

## 📁 Tecnologias Utilizadas

### 🔙 Backend:
- Node.js + Express
- TypeScript
- Prisma ORM + PostgreSQL
- JWT para autenticação
- Bcrypt para hash de senha
- Dotenv para variáveis de ambiente

### 🌐 Frontend:
- React com Vite
- React Router DOM
- Axios para requisições

---

## ⚙️ Clonando o Projeto

```bash
git clone https://github.com/SEU_USUARIO/seu_repositorio.git
cd seu_repositorio

🔧 Setup do Backend (/backend)

1️⃣ Instalar dependências
cd backend
npm install


2️⃣ Configurar .env
Crie um arquivo .env na raiz de /backend com:
DATABASE_URL="postgresql://usuario:senha@localhost:5432/meu_crud"
JWT_SECRET=segredo123
📝 Altere usuario, senha e o nome do banco conforme seu PostgreSQL local.

3️⃣ Rodar migrations e gerar o cliente Prisma
npx prisma generate
npx prisma migrate dev --name init


4️⃣ Criar usuário admin automaticamente
npx prisma db seed
📌 Isso cria um admin com:
email: admin@email.com
senha: admin123

5️⃣ Rodar o servidor
npm run dev
Servidor rodando em http://localhost:3000

🧪 Testes via Terminal (cURL)
📥 Registrar
curl -X POST http://localhost:3000/api/users/register \
-H "Content-Type: application/json" \
-d "{\"username\":\"gustavo\",\"email\":\"gustavo@email.com\",\"password\":\"123456\"}"

🔐 Login
curl -X POST http://localhost:3000/api/users/login \
-H "Content-Type: application/json" \
-d "{\"email\":\"admin@email.com\",\"password\":\"admin123\"}"

👤 Buscar dados do usuário autenticado
curl -X GET http://localhost:3000/api/users/me \
-H "Authorization: Bearer SEU_TOKEN"


📋 Listar usuários (admin)
curl -X GET http://localhost:3000/api/users \
-H "Authorization: Bearer SEU_TOKEN"

🔁 Recuperar senha (simulado)
curl -X POST http://localhost:3000/api/users/recover \
-H "Content-Type: application/json" \
-d "{\"email\":\"admin@email.com\"}"

🐘 Acesso direto via PgAdmin
Caso deseje desbloquear usuário manualmente, execute no SQL do seu banco:
UPDATE "User" SET "status" = 'A', "tentativas" = 0 WHERE "email" = 'admin@email.com';


💻 Setup do Frontend (/frontend)

1️⃣ Criar projeto com Vite + React + TS
cd frontend
npm install

2️⃣ Instalar bibliotecas necessárias
npm install axios react-router-dom

3️⃣ CAdicionar .env (provavelmente)
touch .env
VITE_API_URL=http://localhost:3000/api

4️⃣  Rodar projeto React
npm run dev
Acesse http://localhost:5173

🧭 Funcionalidades
 Autenticação com JWT

 Cadastro de usuários

 Painel pessoal do usuário

 Atualização de perfil

 Logout

 Painel admin com listagem de usuários

 Exclusão de usuários (apenas admin)

 Bloqueio após 3 tentativas

 Contador de acessos

 Recuperação de senha (simulada)

 Paginação no GET /users

 Proteção de rotas (PrivateRoute no frontend)

 Estilização global com container

 Navegação entre páginas (Home, Login, Cadastro, Dashboard, Lista, Recuperação)

🧪 Usuário para Teste
Tipo	Email	Senha
Admin	admin@email.com	admin123
Usuário	gustavo@email.com	123456

🔖 Estrutura de Diretórios
css
Copiar
Editar
📦meu_crud/
 ┣ 📂backend/
 ┃ ┣ 📂prisma/
 ┃ ┃ ┗ 📜schema.prisma
 ┃ ┣ 📂src/
 ┃ ┃ ┣ 📂controllers/
 ┃ ┃ ┣ 📂middlewares/
 ┃ ┃ ┣ 📂services/
 ┃ ┃ ┗ 📜index.ts
 ┃ ┗ 📜.env
 ┣ 📂frontend/
 ┃ ┣ 📂src/
 ┃ ┃ ┣ 📂components/
 ┃ ┃ ┣ 📂pages/
 ┃ ┃ ┣ 📂services/
 ┃ ┃ ┣ 📜App.tsx
 ┃ ┃ ┗ 📜main.tsx
 ┃ ┗ 📜.env



📌 Créditos e Observações
Este projeto foi desenvolvido como parte de um trabalho acadêmico para aplicação prática dos conhecimentos em Desenvolvimento Web FullStack, focando em autenticação, autorização, rotas protegidas e integração entre backend e frontend.

Feito com 💻 por Gustavo Pereira dos Santos Villela – FATEC São José dos Campos – 4º Semestre ADS.
