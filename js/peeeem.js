const https = require('https');
const fs = require('fs');

const p = fs.readFileSync(`C:/Program Files/OpenSSL-Win64/bin/PEM/cert.pem`).toString()
const pri = fs.readFileSync('C:/Program Files/OpenSSL-Win64/bin/PEM/privkey.pem').toString()

const options = {
    key: p,
    cert: pri
  };

const server = https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Hello World!');
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at https://localhost:${port}/`);
});
