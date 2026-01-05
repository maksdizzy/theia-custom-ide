#!/bin/bash

# Rebuild All Script for Flexbe IDE
# Полная пересборка custom-ui и browser-app

set -e

echo "🔨 Flexbe IDE - Rebuild All"
echo "============================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Stop server if running
if lsof -Pi :4000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    info "Останавливаю сервер на порту 4000..."
    lsof -ti :4000 | xargs kill
    sleep 2
fi

# Rebuild custom-ui
info "Сборка custom-ui..."
cd custom-ui
npm run build
cd ..
success "custom-ui собран"

# Rebuild browser-app
info "Сборка browser-app (это займёт ~2 минуты)..."
cd browser-app
npm run build
cd ..
success "browser-app собран"

echo ""
echo "============================"
success "Пересборка завершена!"
echo "============================"
echo ""
echo "Запустите сервер командой:"
echo "  npm run start"
echo "или:"
echo "  ./scripts/full-start.sh"
