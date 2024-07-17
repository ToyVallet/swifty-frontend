/* eslint-disable no-console */
import http from 'http';
import next from 'next';
import { parse } from 'url';

const dev = process.env.NODE_ENV !== 'development';
const PORT = process.env.PORT || 3000;
const app = next({ dev, port: PORT });
const handle = app.getRequestHandler();

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
      console.log(`> Ready on http://localhost:${PORT}`);
    });
});
