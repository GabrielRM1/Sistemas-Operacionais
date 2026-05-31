#!/bin/bash
set -e
mkdir -p logs
DATA=$(date '+%Y-%m-%d %H:%M:%S')
CPU_LOAD=$(awk '{print $1}' /proc/loadavg 2>/dev/null || echo "0.00")
MEM_TOTAL=$(free -m | awk '/Mem:/ {print $2}')
MEM_USED=$(free -m | awk '/Mem:/ {print $3}')
DISK_USED=$(df -h / | awk 'NR==2 {print $5}')
PROCESSOS=$(ps -e --no-headers | wc -l | tr -d ' ')
LINHA="[$DATA] CPU_LOAD=$CPU_LOAD MEM_USED=${MEM_USED}MB/${MEM_TOTAL}MB DISK_USED=$DISK_USED PROCESSOS=$PROCESSOS"
echo "$LINHA" | tee -a logs/monitoramento.log
echo "Top 5 processos por uso de CPU:"
ps aux --sort=-%cpu | head -n 6
