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
	if(handler == 1000)	//Command execution handler reponse
	{
		var output = {};
		if(componentName == "normalCommand")
		{
			output.text = "Hi navanee ! Slash commands are short cuts to perform tasks. Commands can also provide suggestions, just configure the command suggestion handler! :smile:";	
		}
		else if(componentName == "suggestionCommand")
		{
			output.text = "Hi you have selected " + req.body.params.selections.length + " suggestions";	
		}
		else if(componentName == "invokeFunctionComman")
		{
// 			var inputs = [];
// 			inputs.push({"type":"text","name":"username","label":"Name","hint":"Please enter your name","placeholder":"Scott Fisher","mandatory":true,"value":"Scott Fisher"});
// 			inputs.push({"type":"text","format":"email","name":"email","label":"Email","hint":"Enter your email address","placeholder":"scott.fisher@zylker.com","mandatory":true,"value":"scott.fisher@zylker.com"});
// 			inputs.push({"type":"select","trigger_on_change":true,"name":"asset-type","label":"Asset Type","hint":"Choose your request asset type.","placeholder":"Mobile","mandatory":true,"options":[{"label":"Laptop","value":"laptop"},{"label":"Mobile","value":"mobile"}]});
// 			var forms = {"type":"form","title":"Asset Request","hint":"Raise your asset request.","name":"ID","version":1,"button_label":"Raise Request","actions":{"submit":{"type":"invoke.function","name":"urlFunForm"}},"inputs":inputs};
// 			output.forms = forms;
			output = {"version":1,"inputs":[{"label":"Name","name":"username","type":"text","value":"Scott Fisher","mandatory":true,"placeholder":"Scott Fisher","hint":"Please enter your name"},{"label":"Email","name":"email","type":"text","value":"scott.fisher@zylker.com","mandatory":true,"format":"email","placeholder":"scott.fisher@zylker.com","hint":"Enter your email address"},{"label":"Asset Type","name":"asset-type","options":[{"label":"Laptop","value":"laptop"},{"label":"Mobile","value":"mobile"}],"type":"select","trigger_on_change":true,"mandatory":true,"placeholder":"Mobile","hint":"Choose your request asset type."}],"name":"ID","type":"form","button_label":"Raise Request","actions":{"submit":{"name":"function","type":"invoke.function"}},"title":"Asset Request","hint":"Raise your asset request."};
		}
	}
	else if(handler == 1001)	//Command suggestion handler reponse
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
	output = {"version":1,"inputs":[{"label":"Name","name":"username","type":"text","value":"Scott Fisher","mandatory":true,"placeholder":"Scott Fisher","hint":"Please enter your name"},{"label":"Email","name":"email","type":"text","value":"scott.fisher@zylker.com","mandatory":true,"format":"email","placeholder":"scott.fisher@zylker.com","hint":"Enter your email address"},{"label":"Asset Type","name":"asset-type","options":[{"label":"Laptop","value":"laptop"},{"label":"Mobile","value":"mobile"}],"type":"select","trigger_on_change":true,"mandatory":true,"placeholder":"Mobile","hint":"Choose your request asset type."}],"name":"ID","type":"form","button_label":"Raise Request","actions":{"submit":{"name":"function","type":"invoke.function"}},"title":"Asset Request","hint":"Raise your asset request."};
	response.output = output;
  	res.send(response);
});

app.listen(process.env.PORT || 5000);
