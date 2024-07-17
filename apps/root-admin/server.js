const http = require('http');
const { parse } = require('url');
const next = require('next');
const https = require('https');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3001;

app.prepare().then(() => {
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
});
