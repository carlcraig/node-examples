const http = require('http');
const querystring = require('querystring');

const server = http.createServer();

let homepageCounter = 0;

server.on('request', (request, response) => {
  const headers = request.headers;
  const method = request.method;

  const rawUrl = request.url;
  const urlParts = rawUrl.split('?');
  const url = urlParts[0];

  const rawQuery = urlParts.length > 1 ? urlParts[1] : '';
  const query = querystring.decode(rawQuery);

  let body = [];

  request
    .on('error', (err) => {
      console.error(err);
    })
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      //this is raw body.. could be urlencoded or form data or json etc... lots of libraries to help with that
      body = Buffer.concat(body).toString();

      // DO STUFF

      response.on('error', (err) => {
        console.error(err);
      });


      if (url === '/echo/') {

        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');

        const responseBody = {
          headers: headers,
          method: method,
          url: url,
          query: query,
          body: body
        };

        response.end(JSON.stringify(responseBody, null, 2));

      } else if (url === '/') {

        homepageCounter++;

        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain');
        response.end(`Hello Homepage Visitor Number ${homepageCounter}`);

      } else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/plain');
        response.end('404 Not Found');
      }



      // END DO STUFF

    });

});

server.on('error', (error) => {
  console.error(error);
});

console.log('Server running at http://localhost:8080');

server.listen(8080);
