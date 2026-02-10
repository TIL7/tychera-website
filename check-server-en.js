const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/en',
  method: 'GET',
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.on('data', () => {});
  res.on('end', () => console.log('Done'));
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.end();