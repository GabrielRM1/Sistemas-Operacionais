#!/bin/bash
set -e
mkdir -p backups logs
echo "backup gerado em $(date)" >> logs/backup.log
ARQUIVO="backups/backup_logs_$(date '+%Y%m%d_%H%M%S').tar.gz"
tar -czf "$ARQUIVO" logs/
echo "Backup criado em $ARQUIVO"
