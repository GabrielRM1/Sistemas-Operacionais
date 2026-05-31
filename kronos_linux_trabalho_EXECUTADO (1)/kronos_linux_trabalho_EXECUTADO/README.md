# KRONOS/LINUX — Dashboard de Monitoramento Linux e DevOps

O KRONOS/LINUX é um sistema web de monitoramento operacional criado para demonstrar, na prática, conceitos de Sistemas Operacionais Linux e DevOps.

## Objetivo

Demonstrar uma aplicação web que monitora recursos de um ambiente Linux, utilizando automação operacional, scripts Shell, logs, Docker, Kubernetes, Git Flow, pipeline CI/CD e testes automatizados.

## O que o sistema mostra

- Uso de CPU
- Uso de memória RAM
- Uso de disco
- Processos ativos
- Containers
- Logs do sistema
- Status da aplicação via endpoint `/health`
- Métricas via endpoint `/api/metrics`

## Critérios atendidos

| Critério | Como foi atendido |
|---|---|
| Git/Git Flow | Estrutura preparada para `main`, `develop`, `feature/*` e `hotfix/*` |
| Linux | Scripts Shell, monitoramento de CPU/RAM/disco/processos, logs e healthcheck |
| Pipeline CI/CD | Workflow em `.github/workflows/ci-cd.yml` |
| Docker | `Dockerfile` e `docker-compose.yml` |
| Kubernetes | `deployment.yaml`, `service.yaml` e `configmap.yaml` |
| Testes Automatizados | Testes em `tests/structure.test.js` e `tests/app.test.js` |
| Documentação | README, COMO_EXECUTAR e roteiro de apresentação |

## Como executar localmente

```bash
npm install
npm test
npm run build
npm start
```

Depois abra:

```text
http://localhost:8080
```

## Scripts Linux

```bash
chmod +x scripts/*.sh
./scripts/monitoramento.sh
./scripts/healthcheck.sh
./scripts/backup.sh
./scripts/limpeza_logs.sh
```

## Docker

```bash
docker build -t kronos-linux .
docker run -p 8080:8080 kronos-linux
```

Ou:

```bash
docker compose up -d
```

## Kubernetes

```bash
kubectl apply -f k8s/
kubectl get pods
kubectl get services
```

## Pipeline CI/CD

O GitHub Actions executa automaticamente:

1. Instalação das dependências
2. Testes automatizados
3. Build
4. Validação dos scripts Shell
5. Build da imagem Docker
6. Simulação de deploy

## Apresentação

Durante a apresentação, mostre primeiro a aplicação rodando no navegador. Depois mostre o terminal com `npm test`, os scripts Linux, o Dockerfile, a pipeline CI/CD e os arquivos Kubernetes.
