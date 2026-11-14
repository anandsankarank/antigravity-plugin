import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 4388;
const WORKSPACE_DIR = process.cwd();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png'
};

function findMduiFiles(dir, maxDepth = 4, currentDepth = 0) {
  let results = [];
  if (currentDepth > maxDepth) return results;

  try {
    const list = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of list) {
      if (item.name.startsWith('.') || item.name === 'node_modules' || item.name === '.build') continue;
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        results = results.concat(findMduiFiles(fullPath, maxDepth, currentDepth + 1));
      } else if (item.name.endsWith('.mdui')) {
        results.push(path.relative(WORKSPACE_DIR, fullPath));
      }
    }
  } catch {
    // Ignore unreadable dirs
  }
  return results;
}

function getCorsHeaders(req) {
  const origin = req.headers.origin;
  if (!origin) return {};
  try {
    const parsed = new URL(origin);
    if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') {
      return {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      };
    }
  } catch {}
  return {};
}

const server = http.createServer((req, res) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    return res.end();
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  // List workspace .mdui files
  if (url.pathname === '/api/list') {
    const files = findMduiFiles(WORKSPACE_DIR);
    res.writeHead(200, {
      'Content-Type': 'application/json',
      ...corsHeaders
    });
    return res.end(JSON.stringify({ files }));
  }

  // Read .mdui file content
  if (url.pathname === '/api/file') {
    const requestedPath = url.searchParams.get('path');
    if (!requestedPath) {
      res.writeHead(400);
      return res.end('Missing path');
    }
    const safePath = path.resolve(WORKSPACE_DIR, requestedPath);
    const isContained = safePath === WORKSPACE_DIR || safePath.startsWith(WORKSPACE_DIR + path.sep);
    if (!isContained || !fs.existsSync(safePath)) {
      res.writeHead(404);
      return res.end('File not found');
    }

    const ext = path.extname(safePath).toLowerCase();
    if (ext !== '.mdui' && ext !== '.md') {
      res.writeHead(403);
      return res.end('Access denied: only .mdui and .md files permitted');
    }

    const content = fs.readFileSync(safePath, 'utf8');
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      ...corsHeaders
    });
    return res.end(content);
  }

  // Serve static assets from public/
  const publicDir = path.join(__dirname, 'public');
  let relPath = url.pathname === '/' ? 'index.html' : url.pathname.replace(/^\//, '');
  let filePath = path.join(publicDir, relPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      ...corsHeaders
    });
    return fs.createReadStream(filePath).pipe(res);
  }

  // Fallback to index.html for client routes
  const indexPath = path.join(publicDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return fs.createReadStream(indexPath).pipe(res);
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[A-MDUI Studio] Sidecar server running on http://127.0.0.1:${PORT}`);
});

