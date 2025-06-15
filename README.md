# Projeto NestJS JWT + RBAC

Este projeto é uma API RESTful desenvolvida com [NestJS](https://nestjs.com/) que implementa autenticação baseada em JWT (JSON Web Token) e controle de acesso baseado em papéis (RBAC - Role-Based Access Control). O objetivo é demonstrar como proteger rotas e recursos sensíveis utilizando autenticação e autorização robustas.

---

## Sumário

- [Descrição Geral](#descrição-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Principais Funcionalidades](#principais-funcionalidades)
- [Rotas da API](#rotas-da-api)
- [Destaques: JWT e RBAC](#destaques-jwt-e-rbac)
- [Testes](#testes)
- [Referências](#referências)

---

## Descrição Geral

A API permite o cadastro e autenticação de usuários, atribuindo papéis (roles) como `USER` ou `ADMIN`. Usuários autenticados recebem um token JWT, que deve ser enviado nas requisições subsequentes para acessar rotas protegidas. O RBAC garante que apenas usuários com o papel adequado possam acessar determinados endpoints.

---

## Tecnologias Utilizadas

- **NestJS**: Framework Node.js para aplicações escaláveis.
- **Prisma ORM**: Mapeamento objeto-relacional para banco SQLite.
- **JWT**: Autenticação stateless.
- **Passport**: Middleware de autenticação.
- **BcryptJS**: Hash de senhas.
- **Class-validator**: Validação de DTOs.
- **SQLite**: Banco de dados leve para desenvolvimento.

---

## Como Rodar o Projeto

```bash
# Instale as dependências
npm install

# Rode as migrações do Prisma
npx prisma migrate dev

# Inicie o servidor em modo desenvolvimento
npm run start:dev
```

A API estará disponível em `http://localhost:3000`.

---

## Principais Funcionalidades

- **Cadastro de Usuário** com papel (`role`) definido.
- **Login** com geração de token JWT.
- **Proteção de rotas** usando JWT.
- **Controle de acesso** por papel (RBAC) usando decorators e guards.
- **CRUD de usuários** (restrito a ADMIN).

---

## Rotas da API

### Autenticação

- **POST `/auth/register`**  
  Cadastra um novo usuário.  
  **Body:**

  ```json
  {
    "name": "Nome",
    "email": "email@exemplo.com",
    "password": "senha",
    "role": "USER" // ou "ADMIN"
  }
  ```

- **POST `/auth/login`**  
  Realiza login e retorna um token JWT.  
  **Body:**
  ```json
  {
    "email": "email@exemplo.com",
    "password": "senha"
  }
  ```
  **Resposta:**
  ```json
  {
    "access_token": "JWT_TOKEN"
  }
  ```

### Usuários (Acesso restrito a ADMIN)

> Todas as rotas abaixo exigem o envio do token JWT no header:  
> `Authorization: Bearer JWT_TOKEN`

- **GET `/user`**  
  Lista todos os usuários.

- **GET `/user/:id`**  
  Busca usuário por ID.

- **PATCH `/user/:id`**  
  Atualiza dados do usuário.

- **DELETE `/user/:id`**  
  Remove usuário.

---

## Destaques: JWT e RBAC

### JWT (JSON Web Token)

- Após o login, o usuário recebe um token JWT assinado.
- O token deve ser enviado no header `Authorization` para acessar rotas protegidas.
- O payload do token inclui informações como `sub` (id do usuário), `username` e `role`.

### RBAC (Role-Based Access Control)

- O projeto utiliza decorators (`@Roles`) e guards (`RolesGuard`) para restringir o acesso a rotas com base no papel do usuário.
- Exemplo de uso:
  ```ts
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  ```
- Apenas usuários com o papel `ADMIN` podem acessar rotas de gerenciamento de usuários.

---

## Testes

- **Unitários:**  
  `npm run test`
- **E2E:**  
  `npm run test:e2e`

---

## Referências

- [Documentação NestJS](https://docs.nestjs.com/)
- [Documentação Prisma](https://www.prisma.io/docs/)
- [JWT.io](https://jwt.io/)
- [RBAC - Wikipedia](https://en.wikipedia.org/wiki/Role-based_access_control)

---

**Observação:**  
Este projeto é um exemplo didático para demonstrar autenticação JWT e RBAC com NestJS. Para ambientes de produção, utilize variáveis de ambiente para segredos e siga as melhores práticas de segurança.
