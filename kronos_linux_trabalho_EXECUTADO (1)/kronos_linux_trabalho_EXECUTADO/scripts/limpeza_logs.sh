#!/bin/bash
set -e
mkdir -p logs
find logs -type f -name "*.log" -mtime +7 -print -delete
echo "Limpeza concluída. Logs com mais de 7 dias foram removidos."
