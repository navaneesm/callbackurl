const http = require('http');

const port = process.env.PORT || 5000
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
    res.send(JSON.stringify(response));
});

server.listen(port, (err) => {
    if (err) return console.log(`Something bad happened: ${err}`);
    console.log(`Node.js server listening on ${port}`);

});


// ----------------- Express -----------------

// var express = require('express');
// var app = express();
// // parse application/json
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//    extended: true
//  }))
// //app.use(express.json());


// app.post('/', function(req, res){
//   res.json(req.body);
// });

// app.listen(process.env.PORT || 5000);
