#!/bin/bash
set -e
PORT=${PORT:-8080}
echo "Iniciando KRONOS/LINUX na porta $PORT"
PORT=$PORT node server.js
