#!/bin/bash

echo "📦 Instalando dependencias de testing..."

# Instalar dependencias principales
npm install --save-dev @testing-library/jest-dom@^5.16.4
npm install --save-dev @testing-library/react@^13.3.0
npm install --save-dev @testing-library/user-event@^14.4.3
npm install --save-dev jest-environment-jsdom@^29.5.0

# Instalar react-router-dom si no está instalado
npm install react-router-dom@^6.14.0

echo "✅ Dependencias instaladas correctamente"

# Ejecutar tests
echo "🧪 Ejecutando tests..."
npm test -- --watchAll=false --passWithNoTests

echo "🎉 Setup completo!"
