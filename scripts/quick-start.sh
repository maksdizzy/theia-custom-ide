#!/bin/bash

# Quick Start Script for Flexbe IDE
# Быстрый запуск без проверок (предполагается, что всё уже собрано)

set -e

echo "⚡ Flexbe IDE - Quick Start"
echo ""

# Stop server if running
if lsof -Pi :4000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  Останавливаю существующий процесс..."
    lsof -ti :4000 | xargs kill
    sleep 2
fi

echo "🚀 Запуск IDE на http://localhost:4000"
echo ""
echo "Для остановки нажмите Ctrl+C"
echo ""

# Start directly to avoid Turbo cache issues
cd browser-app
node lib/backend/main.js ../workspace -p 4000 --plugins=local-dir:../plugins
