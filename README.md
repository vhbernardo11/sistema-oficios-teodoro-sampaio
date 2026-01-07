# Sistema de Oficios - Teodoro Sampaio

> **Sistema de controle rigoroso de arquivos Word na nuvem para o Almoxarifado**

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow) ![Node](https://img.shields.io/badge/node-18%2B-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue)

## Visao Geral

Sistema full-stack para gerenciar oficios com controle de numeracao (001-999 por ano), armazenamento de arquivos Word (.docx) na nuvem, autenticacao com JWT, e auditoria completa.

**Stack**: React + Vite + Node.js + Express + Prisma + Supabase + Tailwind CSS

---

## Quickstart

### 1. Clonar repositorio
```bash
git clone https://github.com/vhbernardo11/sistema-oficios-teodoro-sampaio.git
cd sistema-oficios-teodoro-sampaio
```

### 2. Rodar script de setup
```bash
# Linux/macOS
bash ./setup.sh

# Windows (PowerShell)
.\\setup.ps1
```

### 3. Configurar variáveis de ambiente
```bash
cp .env.example .env
# Preencha .env com suas chaves Supabase
```

### 4. Rodar migrações e seed
```bash
npm run db:migrate
npm run db:seed
```

### 5. Iniciar desenvolvimento
```bash
npm run dev
```

App disponivel em:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

---

## Credenciais Iniciais

Apos rodar `npm run db:seed`:

| Email | Senha | Perfil |
|-------|-------|--------|
| admin@teodoro.com | Senha123! | Admin |
| operador1@teodoro.com | Senha123! | Operador |
| operador2@teodoro.com | Senha123! | Operador |

**IMPORTANTE**: Altere as senhas no primeiro login!

---

## Funcionalidades

✓ Numeracao automatica ou manual de oficios (001-999 por ano)
✓ Upload/importacao de arquivos .docx para Supabase Storage
✓ Versionamento de arquivos (substituicao mantendo historico)
✓ Download seguro de arquivos
✓ Auditoria completa (logs de todas as acoes)
✓ Autenticacao JWT com perfis (Admin/Operador)
✓ Validacao e prevencao de duplicidade
✓ Interface minimalista (azul marinho + verde-esmeralda)
✓ Busca por numero, ano, descricao, arquivo ou hash

---

## Endpoints da API

### Autenticacao
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Usuario atual

### Oficios
- `GET /api/oficios` - Listar
- `POST /api/oficios` - Criar
- `PUT /api/oficios/:id` - Editar
- `DELETE /api/oficios/:id` - Excluir (Admin only)

### Arquivos
- `POST /api/oficios/:id/file` - Importar Word
- `GET /api/files/:fileId/download` - Baixar
- `DELETE /api/files/:fileId` - Remover

### Auditoria
- `GET /api/audit` - Logs (Admin only)

---

## Configuracao Supabase

1. Criar projeto em https://supabase.com
2. Copiar URL e Anon Key para `.env`
3. Criar bucket `oficios-docx` em Storage
4. Rodar migrações (Prisma sincronizará com seu banco)

---

## Stack Detalhado

### Frontend
- React 18, TypeScript, Vite
- Tailwind CSS (cores corporativas)
- React Router, React Query
- React Hot Toast (notificacoes)

### Backend
- Node.js, Express, TypeScript
- Prisma ORM
- JWT para autenticacao
- bcrypt para hash de senhas
- Multer para upload

### Banco de Dados
- PostgreSQL (Supabase)
- Prisma Migrations
- Tabelas: users, oficios, oficio_files, audit_logs

---

## Troubleshooting

**Port 3000 ja em uso?**
```bash
APP_PORT=3001 npm run dev
```

**Erro Supabase?**
- Verify .env com chaves corretas
- Certifique que projeto esta ativo no Supabase

**Erro migracao?**
```bash
npm run db:reset
npm run db:seed
```

---

## Deploy

### Frontend (Vercel)
```bash
npm run build:client
# Conectar repo no https://vercel.com
```

### Backend (Render/Railway/Heroku)
```bash
npm run build:server
# Deploy com variáveis de ambiente
```

---

## Seguranca

- .env nao é comitado (.gitignore)
- HTTPS em producao obrigatorio
- Validacao rigorosa de uploads (.docx only)
- Rate limiting em auth
- JWT com expiracão

---

## Licenca

MIT - Sinta-se livre para usar e modificar!
