const fs = require('fs');
const html = fs.readFileSync('src/index.html','utf8');
const checks = ['KRONOS/LINUX','CPU LOAD','RAM USAGE','DISK STORAGE','TOP PROCESSES','CONTAINERS','RECENT LOGS'];
for (const c of checks) {
  if (!html.includes(c)) {
    console.error(`ERRO: tela não possui o item obrigatório: ${c}`);
    process.exit(1);
  }
  console.log(`OK tela: ${c}`);
}
console.log('Teste da aplicação aprovado.');
