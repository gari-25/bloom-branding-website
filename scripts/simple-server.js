const http = require('http');
const port = process.env.PORT || 3002;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
}).listen(port, () => console.log(`listening on ${port}`));
