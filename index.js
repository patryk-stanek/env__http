var http = require('http');
var fs = require('fs');
var server = http.createServer();

var content;

server.on('request', function (request, response) {
    // response.write('<body>');
    // response.write('<h1>This is awesome!</h1>')
    // response.write('</body>');
    // response.end();
    //po wywołaniu response.end nie możemy zapisywać niczego do strumienia, to zwróci błąd
    // response.write('<h2>This is less awesome!</h2>');

    //odpowiedzi wymagaja kodowania aby przegladarka wiedziala w jaki sposob odczytac wiadomosc
    if (request.method === 'GET' && request.url === '/') {
        fs.readFile('./index.html', 'utf-8', function(err, data) {
            if (err) throw err;
            response.setHeader('Content-Type', 'text/html');
            response.statusCode = 200;
            response.write(data);
            response.end();
        });
    } else {
        fs.readFile('./cat.jpg', function(err, data) {
            if (err) throw err;
            response.setHeader('Content-Type', 'image/jpeg');
            response.statusCode = 404;
            response.write(data);
            response.end();
        });
    };
});

server.listen(9000);