/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const http = require('http');
const next = require('next');
const { parse } = require('url');

const https = require('https');
const fs = require('fs');

const dev = process.env.NODE_ENV === 'development';
const PORT = process.env.PORT || 3000;
const app = next({ dev, port: PORT });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
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
        console.log(`> Ready on http://localhost:${PORT}`);
      });
  }
});
