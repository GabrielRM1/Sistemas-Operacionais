const sections = document.querySelectorAll('.section');
const menuItems = document.querySelectorAll('.menu-item');
const toast = document.getElementById('toast');

function mostrarToast(mensagem) {
  toast.textContent = mensagem;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

function abrirSecao(id) {
  sections.forEach(section => {
    section.classList.remove('active');
  });

  menuItems.forEach(item => {
    item.classList.remove('active');
  });

  document.getElementById(id).classList.add('active');
  document.querySelector(`[data-section="${id}"]`).classList.add('active');

  mostrarToast(`Seção aberta: ${id.toUpperCase()}`);
}

async function carregarMetricas() {
  try {
    const resposta = await fetch('/api/metrics');
    const dados = await resposta.json();

    const memoriaTotal = dados.memory.total_mb;
    const memoriaUsada = dados.memory.used_mb;
    const memoriaPercentual = Math.min((memoriaUsada / memoriaTotal) * 100, 100);

    const cpuLoad = Number(dados.cpu_load);
    const cpuPercentual = Math.min(cpuLoad * 100, 100);

    document.getElementById('cpu-value').textContent = `${cpuPercentual.toFixed(1)}%`;
    document.getElementById('cpu-bar').style.width = `${cpuPercentual}%`;

    document.getElementById('ram-value').textContent = `${memoriaUsada} MB`;
    document.getElementById('ram-bar').style.width = `${memoriaPercentual}%`;

    document.getElementById('platform-value').textContent = dados.platform.toUpperCase();
    document.getElementById('arch-value').textContent = `Arquitetura: ${dados.arch}`;
    document.getElementById('uptime-value').textContent = `${dados.uptime_seconds}s`;

    document.getElementById('api-output').textContent = JSON.stringify(dados, null, 2);

    mostrarToast('Métricas atualizadas pela API /api/metrics');
  } catch (erro) {
    mostrarToast('Erro ao carregar métricas');
    console.error(erro);
  }
}

async function verificarServico() {
  try {
    const resposta = await fetch('/health');
    const dados = await resposta.json();

    mostrarToast(`Serviço ${dados.service}: ${dados.status}`);
    alert(`Serviço verificado com sucesso!\n\nStatus: ${dados.status}\nServiço: ${dados.service}`);
  } catch (erro) {
    mostrarToast('Erro ao verificar serviço');
    console.error(erro);
  }
}

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    abrirSecao(item.dataset.section);
  });
});

document.getElementById('btn-refresh').addEventListener('click', carregarMetricas);
document.getElementById('btn-health').addEventListener('click', verificarServico);

carregarMetricas();
