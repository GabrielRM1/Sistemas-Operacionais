const fs = require('fs');
const required = [
  'README.md','COMO_EXECUTAR.md','server.js','src/index.html','src/style.css','Dockerfile','docker-compose.yml','.github/workflows/ci-cd.yml','k8s/deployment.yaml','k8s/service.yaml','k8s/configmap.yaml','scripts/monitoramento.sh','scripts/backup.sh','scripts/limpeza_logs.sh','scripts/start_app.sh','scripts/healthcheck.sh'
];
let ok = true;
for (const file of required) {
  if (fs.existsSync(file)) console.log(`OK: ${file}`);
  else { console.error(`ERRO: arquivo ausente: ${file}`); ok = false; }
}
if (!ok) process.exit(1);
console.log('Teste estrutural aprovado.');
