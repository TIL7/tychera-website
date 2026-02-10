const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/fr',
  method: 'GET',
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  res.on('end', () => {
    console.log('Body length:', body.length);
    if (res.statusCode >= 400) {
        console.log('Body:', body.substring(0, 500));
    }
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.end();