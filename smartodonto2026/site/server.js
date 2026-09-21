const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 4173;
const ROOT = __dirname;
const clinic = {
  name: 'SmartOdonto',
  phone: '+5562993823589',
  whatsapp: 'https://wa.me/5562993823589',
  instagram: 'https://instagram.com/smartodontogyn',
  address: {
    street: 'Av. Afonso Pena, Qd 20 - Lt 22',
    neighborhood: 'Vila Jardim São Judas Tadeu',
    city: 'Goiânia',
    state: 'GO',
    postalCode: '74685-020',
  },
};

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

function sendJson(response, status, payload) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload));
}

const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);

  if (pathname === '/api/health') return sendJson(response, 200, { status: 'ok' });
  if (pathname === '/api/clinic') return sendJson(response, 200, clinic);

  const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const filePath = path.resolve(ROOT, relativePath);
  if (!filePath.startsWith(ROOT)) return sendJson(response, 403, { error: 'Acesso negado' });

  fs.readFile(filePath, (error, content) => {
    if (error) return sendJson(response, error.code === 'ENOENT' ? 404 : 500, { error: 'Arquivo não encontrado' });
    response.writeHead(200, {
      'Content-Type': mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': path.extname(filePath) === '.html' ? 'no-cache' : 'public, max-age=86400',
    });
    response.end(content);
  });
});

server.listen(PORT, () => console.log(`SmartOdonto disponível em http://localhost:${PORT}`));
