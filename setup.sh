#!/bin/bash
set -e

echo "=================================================="
echo "Sistema de Oficios - Setup de Desenvolvimento"
echo "=================================================="
echo ""

# 1. Criar estrutura de diretorios
echo "[1/6] Criando estrutura de diretorios..."
mkdir -p src/{server,client}/{routes,controllers,services,middlewares,types,components,pages,hooks}
mkdir -p prisma/migrations

echo "✓ Diretorios criados"
echo ""

# 2. Instalar dependencias
echo "[2/6] Instalando dependencias npm..."
npm install

echo "✓ Dependencias instaladas"
echo ""

# 3. Criar arquivo .env se nao existir
echo "[3/6] Configurando variaveis de ambiente..."

if [ ! -f .env ]; then
  cp .env.example .env
  echo "✓ Arquivo .env criado. Por favor, preencha com suas credenciais Supabase"
else
  echo "✓ Arquivo .env ja existe"
fi

echo ""
echo "=================================================="
echo "Setup concluido!"
echo ""
echo "Proximos passos:"
echo "1. Preencha suas credenciais Supabase no arquivo .env"
echo "2. Execute: npm run db:migrate"
echo "3. Execute: npm run db:seed"
echo "4. Execute: npm run dev"
echo ""
echo "App estara disponivel em:"
echo "  Frontend: http://localhost:5173"
echo "  Backend API: http://localhost:3000"
echo ""
echo "Credenciais padrao (trocar no primeiro login):"
echo "  Email: admin@teodoro.com"
echo "  Senha: Senha123!"
echo "=================================================="
