const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const root = path.join(__dirname, 'src');
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg'
};

function systemMetrics() {
  const memTotal = Math.round(require('os').totalmem() / 1024 / 1024);
  const memFree = Math.round(require('os').freemem() / 1024 / 1024);
  const memUsed = memTotal - memFree;
  const load = require('os').loadavg()[0].toFixed(2);
  return {
    app: 'KRONOS/LINUX',
    status: 'RUNNING',
    uptime_seconds: Math.round(require('os').uptime()),
    cpu_load: load,
    memory: { total_mb: memTotal, used_mb: memUsed, free_mb: memFree },
    platform: require('os').platform(),
    arch: require('os').arch()
  };
}

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({ status: 'ok', service: 'kronos-linux' }));
  }
  if (req.url === '/api/metrics') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify(systemMetrics(), null, 2));
  }

  const requested = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  const safePath = path.normalize(requested).replace(/^\/+/, '');
  const filePath = path.join(root, safePath);

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    return res.end('Acesso negado');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Arquivo não encontrado');
    }
    res.writeHead(200, { 'Content-Type': mimeTypes[path.extname(filePath)] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`KRONOS/LINUX executando em http://localhost:${PORT}`);
});
