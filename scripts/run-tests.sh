#!/bin/bash

echo "🧪 Ejecutando Test Suite Completo de AlaMano..."
echo "================================================"

# Verificar que las dependencias estén instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Limpiar cache de Jest
echo "🧹 Limpiando cache..."
npm test -- --clearCache --passWithNoTests

# Ejecutar todos los tests con coverage
echo "🚀 Ejecutando tests con coverage..."
npm run test:coverage

# Ejecutar tests específicos si se proporciona un parámetro
if [ "$1" != "" ]; then
    echo "🎯 Ejecutando tests específicos: $1"
    npm test -- --testPathPattern="$1" --verbose --passWithNoTests
fi

echo "✅ Tests completados!"
