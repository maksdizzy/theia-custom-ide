#!/bin/bash

# Full Start Script for Flexbe IDE
# Автоматически проверяет состояние проекта и запускает IDE

set -e  # Exit on error

echo "🚀 Flexbe IDE - Full Start Script"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if running from project root
if [ ! -f "package.json" ]; then
    error "Запустите скрипт из корневой директории проекта!"
    exit 1
fi

# Check if port 4000 is in use
info "Проверка порта 4000..."
if lsof -Pi :4000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    warning "Порт 4000 уже занят!"
    echo -n "Остановить существующий процесс? (y/n): "
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        info "Останавливаю процесс на порту 4000..."
        lsof -ti :4000 | xargs kill
        sleep 2
        success "Процесс остановлен"
    else
        error "Невозможно запустить на занятом порту"
        exit 1
    fi
else
    success "Порт 4000 свободен"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    warning "node_modules не найдена"
    info "Установка зависимостей..."
    npm install
    success "Зависимости установлены"
else
    success "node_modules найдена"
fi

# Check if custom-ui is built (need both frontend and backend)
if [ ! -d "custom-ui/lib/backend" ] || [ ! -d "custom-ui/lib/frontend" ]; then
    warning "custom-ui не полностью собран (отсутствует backend или frontend)"
    info "Сборка custom-ui..."
    npm run build --workspace=custom-ui
    success "custom-ui собран"
else
    # Check if source is newer than build
    NEWEST_SRC=$(find custom-ui/src -type f -name "*.ts" -newer custom-ui/lib/backend 2>/dev/null | head -1)
    if [ -n "$NEWEST_SRC" ]; then
        warning "Исходники custom-ui новее сборки"
        info "Пересборка custom-ui..."
        npm run build --workspace=custom-ui
        success "custom-ui пересобран"
    else
        success "custom-ui актуален"
    fi
fi

# Check if browser-app is built (need both frontend and backend)
if [ ! -d "browser-app/lib/frontend" ] || [ ! -f "browser-app/lib/backend/main.js" ]; then
    warning "browser-app не полностью собран"
    info "Сборка browser-app (это может занять ~2 минуты)..."
    npm run build --workspace=browser-app
    success "browser-app собран"
else
    # Check if custom-ui lib is newer than browser-app lib
    CUSTOM_UI_NEWER=$(find custom-ui/lib -type f -newer browser-app/lib/backend/main.js 2>/dev/null | head -1)
    if [ -n "$CUSTOM_UI_NEWER" ]; then
        warning "custom-ui новее browser-app"
        info "Пересборка browser-app..."
        npm run build --workspace=browser-app
        success "browser-app пересобран"
    else
        success "browser-app актуален"
    fi
fi

# Check if plugins exist
if [ ! -d "plugins" ] || [ -z "$(ls -A plugins 2>/dev/null)" ]; then
    warning "Плагины не найдены"
    echo -n "Скачать плагины? (y/n): "
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        info "Скачивание плагинов..."
        npm run download:plugins
        success "Плагины скачаны"
    else
        warning "Запуск без плагинов"
    fi
else
    success "Плагины найдены"
fi

echo ""
echo "=================================="
success "Все проверки пройдены!"
echo "=================================="
echo ""

# Start the server
info "Запуск IDE на http://localhost:4000"
echo ""
echo "Для остановки нажмите Ctrl+C"
echo ""

# Start directly to avoid Turbo cache issues
cd browser-app
node lib/backend/main.js ../workspace -p 4000 --plugins=local-dir:../plugins
