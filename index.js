
// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');

// // parse application/json
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//    extended: true
//  }));

// //Handle POST request
// app.post('/', function(req, res){

// 	var handler = req.body.handler;
// 	var response = {};
// 	var output = {};
// 	if(handler == 1000)
// 	{
// 		output.text = "Hi navanee ! Slash commands are short cuts to perform tasks. Commands can also provide suggestions, just configure the command suggestion handler! :smile:";
// 	}
// 	response.output = output;
//   	res.send(response);
// });

// app.listen(process.env.PORT || 5000);


var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
 }));

//Handle POST request
app.post('/', function(req, res){

	var handler = req.body.handler;
	var componentName = req.body.name;
	var response = {};
	if(handler == 1000)
	{
		var output = {};
		if(componentName == "normalCommand")
		{
			output.text = "Hi navanee ! Slash commands are short cuts to perform tasks. Commands can also provide suggestions, just configure the command suggestion handler! :smile:";	
		}
		else if(componentName == "suggestionCommand")
		{
			output.text = "Hi you have selected " + req.body.params.selections.length + "suggestions";	
		}
		else if(componentName == "invokeFunctionCommand")
		{
			var inputs = [];
			inputs.push({"type":"text","name":"username","label":"Name","hint":"Please enter your name","placeholder":"Scott Fisher","mandatory":true,"value":"Scott Fisher"});
			inputs.push({"type":"text","format":"email","name":"email","label":"Email","hint":"Enter your email address","placeholder":"scott.fisher@zylker.com","mandatory":true,"value":"scott.fisher@zylker.com"});
			inputs.push({"type":"select","trigger_on_change":true,"name":"asset-type","label":"Asset Type","hint":"Choose your request asset type.","placeholder":"Mobile","mandatory":true,"options":[{"label":"Laptop","value":"laptop"},{"label":"Mobile","value":"mobile"}]});
			var forms = {"type":"form","title":"Asset Request","hint":"Raise your asset request.","name":"ID","version":1,"button_label":"Raise Request","actions":{"submit":{"type":"invoke.function","name":"urlFunForm"}},"inputs":inputs};
			output.forms = forms;
		}
	}
	else if(handler == 1001)
	{
		var output = [];
		var entry = {};
		entry.title = "Tip 1 👋";
		entry.description = "Command suggestions are helpful when you have to choose from a list of entities!";
		entry.imageurl = "https://media3.giphy.com/media/Cmr1OMJ2FN0B2/giphy.gif";
		output.push(entry);
		var entry1 = {};
		entry1.title = "Tip 2 😲";
		entry1.description = "You can show upto a maximum of 50 command suggestions. :surprise:";
		entry1.imageurl = "https://media2.giphy.com/media/8uzVsRzOScAa4/giphy.gif";
		output.push(entry1);
	}
	response.output = output;
  	res.send(response);
});

app.listen(process.env.PORT || 5000);
