const http = require('http');
const ngrok = require('ngrok');

const port = 8080;
const server = http.createServer((req, res) => {
	var text = {
		text : "ngrok"
	}
	var output = {
		output : text
	}
	var response = {
		status : "Success",
		result : output
	}
	console.log(`incoming`);
    res.end(JSON.stringify(response));
});

server.listen(port, (err) => {
    if (err) return console.log(`Something bad happened: ${err}`);
    console.log(`Node.js server listening on ${port}`);

    ngrok.connect(port, function (err, url) {
        console.log(`Node.js local server is publicly-accessible at ${url}`);
    });

});