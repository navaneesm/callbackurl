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
	console.log("Request body" + JSON.stringify(req.body));
	var handler = req.body.handler;
	var componentName = req.body.name;
	var response = {};
	if(handler == 1000)		//Command execution handler reponse
	{
		console.log("inside command execution handler");
		var output = {};
		if(componentName == "normalCommand")	//required consents  -- user
		{
			output = {"text":"Hi " + req.body.params.user.first_name + " ! Slash commands are short cuts to perform tasks. Commands can also provide suggestions, just configure the command suggestion handler! :smile:"};
		}
		else if(componentName == "suggestionCommand")	//required consents  -- 
		{
			output = {"text":"Hi you have selected " + req.body.params.selections.length + " suggestions and first title is " + req.body.params.selections[0].title};	
		}
		else if(componentName == "invokeFunctionCmd")	//required consents  -- 
		{
			output = {"version":1,"inputs":[{"label":"Name","name":"username","type":"text","value":"Scott Fisher","mandatory":true,"placeholder":"Scott Fisher","hint":"Please enter your name"},{"label":"Email","name":"email","type":"text","value":"scott.fisher@zylker.com","mandatory":true,"format":"email","placeholder":"scott.fisher@zylker.com","hint":"Enter your email address"},{"label":"Asset Type","name":"asset-type","options":[{"label":"Laptop","value":"laptop"},{"label":"Mobile","value":"mobile"}],"type":"select","trigger_on_change":true,"mandatory":true,"placeholder":"Mobile","hint":"Choose your request asset type."}],"name":"ID","type":"form","button_label":"Raise Request","actions":{"submit":{"name":"function","type":"invoke.function"}},"title":"Asset Request","hint":"Raise your asset request."};
		}
	}
	else if(handler == 1001)	//Command suggestion handler response.     			//required consents  -- 
	{
		console.log("inside command suggestion handler");
		output = [{"description":"Command suggestions are helpful when you have to choose from a list of entities!","imageurl":"https://media3.giphy.com/media/Cmr1OMJ2FN0B2/giphy.gif","title":"Tip 1 👋"},{"description":"You can show upto a maximum of 50 command suggestions. :surprise:","imageurl":"https://media2.giphy.com/media/8uzVsRzOScAa4/giphy.gif","title":"Tip 2 😲"}];
	}
	else if(handler == 2001)	//Form submit handler response
	{
		console.log("inside form submit handler");
		form = req.body.params.form;
		formValues = form.values;
		if(formValues["asset-type"].value == "mobile")
		{
			output = {"text":"Hi " + formValues.username + ", thanks for raising your request. Your request will be processed based on the device availability.","card":{"title":"Asset Request"},"slides":[{"type":"label","title":"","data":[{"Asset Type":formValues.asset-type.label},{"Preferred OS ":formValues.mobile-os.label},{"Preferred Device":formValues.mobile-list.label}]}]};
		}
		else
		{
			output = {"text":"Hi " + formValues.username + ", thanks for raising your request. Your request will be processed based on the device availability.","card":{"title":"Asset Request"},"slides":[{"type":"label","title":"","data":[{"Asset Type":formValues.asset-type.label},{"OS/Device Preferred":formValues.os-type.label}]}]};
		}
	}
	else if(handler == 2002)	//Form change handler response
	{
		console.log("inside form change handler");
		var targetName = req.body.params.target.name;
		var inputValues = req.body.params.form.values;
		console.log("form values " + JSON.stringify(targetName));
		console.log("form target values " + JSON.stringify(inputValues));
		var actions = [];
		if(targetName  == "asset-type")
		{
			fieldValue = inputValues["asset-type"].value;
			if(fieldValue == "laptop")
			{
				actions.push({"type":"add_after","name":"asset-type","input":{"type":"select","name":"os-type","label":"Laptop Type","hint":"Choose your preferred OS Type","placeholder":"Ubuntu","mandatory":true,"options":[{"label":"Mac OS X","value":"mac"},{"label":"Windows","value":"windows"},{"label":"Ubuntu","value":"ubuntu"}]}});
				actions.push({"type":"remove","name":"mobile-os"});
				actions.push({"type":"remove","name":"mobile-list"});
			}
			else if(fieldValue == "mobile")
			{
				actions.push({"type":"add_after","name":"asset-type","input":{"type":"select","name":"mobile-os","label":"Mobile OS","hint":"Choose your preferred mobile OS","mandatory":true,"placeholder":"Android","options":[{"label":"Android","value":"android"},{"label":"iOS","value":"ios"}],"trigger_on_change":true}});
				actions.push({"type":"remove","name":"os-type"});
			}
		}
		else if(targetName == "mobile-os")
		{
			fieldValue = inputValues["asset-type"].value;
			if(typeof fieldValue !== "undefined")
			{
				actions.push({"type":"add_after","name":"mobile-os","input":{"type":"dynamic_select","name":"mobile-list","label":"Mobile Device","mandatory":true,"placeholder":"Choose your preferred mobile device"}});
			}
			else
			{
				actions.push({"type":"remove","name":"mobile-list"});
			}
		}
		output = {"type":"form_modification","actions":actions};
	}
	else if(handler == 2003)	//Form dynamic input handler response
	{
		console.log("inside dynamic input handler");
		var target = req.body.params.target;
		var form = req.body.params.form;
		var searchValue = target.query;
		if(target.name == "mobile-list" && form.values["mobile-os"])
		{
			var androidDevicesList = ["One Plus 6T","One Plus 6","Google Pixel 3","Google Pixel 2XL"];
			var iOSDevicesList = ["IPhone XR","IPhone XS","IPhone X","Iphone 8 Plus"];
			var deviceType = form.values.["mobile-os"].value;
			if(deviceType == "android")
			{
				var typeList = [];
				androidDevicesList.forEach(function(elem) {
			        console.log(elem);
			        if(elem == searchValue)
			        {
			        	typeList.push({"label":androidDevice,"value":androidDevice.replaceAll(" ","_")});
			        }
			    });
			}
			else
			{
				var typeList = [];
				iOSDevicesList.forEach(function(elem) {
			        console.log(elem);
			        if(elem == searchValue)
			        {
			        	typeList.push({"label":iOSDevice,"value":iOSDevice.replaceAll(" ","_")});
			        }
			    });
			}
		}
		output = {"options",typeList};
	}

	response.output = output;
  	res.send(response);
});

app.listen(process.env.PORT || 5000);
