# Como executar o KRONOS/LINUX para apresentar

## 1. Abrir a pasta no terminal

```bash
cd kronos_linux_trabalho_EXECUTADO
```

## 2. Instalar dependências

```bash
npm install
```

## 3. Rodar os testes

```bash
npm test
```

Resultado esperado: todos os arquivos obrigatórios aparecem como OK e os testes da tela são aprovados.

## 4. Rodar o build

```bash
npm run build
```

Resultado esperado: a pasta `dist/` é criada.

## 5. Iniciar a aplicação

```bash
npm start
```

Depois abra no navegador:

```text
http://localhost:8080
```

## 6. Testar o healthcheck

Em outro terminal, rode:

```bash
./scripts/healthcheck.sh
```

Resultado esperado:

```text
OK: aplicação respondendo em http://localhost:8080/health
```

## 7. Rodar o monitoramento Linux

```bash
./scripts/monitoramento.sh
```

Esse comando mostra carga de CPU, memória, disco e processos.

## 8. Rodar backup e limpeza de logs

```bash
./scripts/backup.sh
./scripts/limpeza_logs.sh
```

## 9. O que mostrar ao professor

1. Aplicação aberta no navegador.
2. README no GitHub.
3. Testes rodando com `npm test`.
4. Script Linux rodando com `./scripts/monitoramento.sh`.
5. Healthcheck funcionando.
6. Dockerfile e docker-compose.
7. Pasta `k8s`.
8. GitHub Actions em `.github/workflows/ci-cd.yml`.

## Observação sobre porta ocupada

Se a porta 8080 já estiver ocupada, execute em outra porta:

```bash
PORT=3000 npm start
```

E teste com:

```bash
./scripts/healthcheck.sh http://localhost:3000/health
```
