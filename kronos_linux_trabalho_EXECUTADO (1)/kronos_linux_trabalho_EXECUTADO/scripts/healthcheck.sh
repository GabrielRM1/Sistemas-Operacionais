#!/bin/bash
URL=${1:-http://localhost:8080/health}
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
if [ "$STATUS" = "200" ]; then
  echo "OK: aplicação respondendo em $URL"
  exit 0
else
  echo "FALHA: aplicação retornou status $STATUS em $URL"
  exit 1
fi
