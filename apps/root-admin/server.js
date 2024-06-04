const http = require('http');
const { parse } = require('url');
const next = require('next');
const https = require('https');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = 3000;

const httpsOptions = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem'),
};

app.prepare().then(() => {
  if (httpsOptions.key && httpsOptions.cert) {
    https
      .createServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      })
      .listen(PORT, (err) => {
        if (err) {
          console.error('HTTPS Server Error:', err);
          throw err;
        }
        console.log(`> HTTPS: Ready on https://localhost.swifty.kr:${PORT}`);
      });
  } else {
    http
      .createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        console.log('HTTP Request:', req.url);
        handle(req, res, parsedUrl);
      })
      .listen(PORT, (err) => {
        if (err) {
          console.error('HTTP Server Error:', err);
          throw err;
        }
        console.log(
          `> Ready on http://localhost:${PORT} or https://localhost.swifty.kr:${PORT}`,
        );
      });
  }
});
