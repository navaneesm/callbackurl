// const http = require('http');

// const port = process.env.PORT || 5000
// const server = http.createServer((req, res) => {
// 	var text = {
// 		text : "ngrok"
// 	}
// 	var output = {
// 		output : text
// 	}
// 	var response = {
// 		status : "Success",
// 		result : output
// 	}
// 	console.log(`incoming`);
//     res.end(JSON.stringify(response));
// });

// server.listen(port, (err) => {
//     if (err) return console.log(`Something bad happened: ${err}`);
//     console.log(`Node.js server listening on ${port}`);

// });


// ----------------- Express -----------------

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
 }))
//app.use(express.json());

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

app.post('/', function(req, res){
  res.send(response);
});

app.listen(process.env.PORT || 5000);
