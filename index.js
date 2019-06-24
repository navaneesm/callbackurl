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
	console.log("Given params :- ");
	for(param in req.body.params)
	{
		console.log(param);
	}
	var type = req.body.type;
	var handler = req.body.handler;
	var componentName = req.body.name;
	var response = {};
	if(type == "command")	//Command handlers
	{
		if(handler == "execution_handler")		//Command execution handler reponse
		{
			console.log("inside command execution handler");
			var output = {};
			if(componentName == "normalcommand")	//required consents  -- user
			{
				output = {"text":"Hi " + req.body.params.user.first_name + " ! Slash commands are short cuts to perform tasks. Commands can also provide suggestions, just configure the command suggestion handler! :smile:"};
			}
			else if(componentName == "suggestioncommand")	//required consents  -- 
			{
				output = {"text":"Hi you have selected " + req.body.params.selections.length + " suggestions and first title is " + req.body.params.selections[0].title};	
			}
			else if(componentName == "invokefunctioncmd")	//required consents  -- 	//reqired a function named "function"
			{
				output = {"version":1,"inputs":[{"label":"Name","name":"username","type":"text","value":"Scott Fisher","mandatory":true,"placeholder":"Scott Fisher","hint":"Please enter your name"},{"label":"Email","name":"email","type":"text","value":"scott.fisher@zylker.com","mandatory":true,"format":"email","placeholder":"scott.fisher@zylker.com","hint":"Enter your email address"},{"label":"Asset Type","name":"asset-type","options":[{"label":"Laptop","value":"laptop"},{"label":"Mobile","value":"mobile"}],"type":"select","trigger_on_change":true,"mandatory":true,"placeholder":"Mobile","hint":"Choose your request asset type."}],"name":"ID","type":"form","button_label":"Raise Request","actions":{"submit":{"name":"function","type":"invoke.function"}},"title":"Asset Request","hint":"Raise your asset request."};
			}
			else if(componentName == "invokebtn")	//required consents  --  		//invoke's button function
			{
				//output = {"text":"[What's this?](invoke.function|dreButtonFunction)"};
				output = {"buttons":[{"label":"Create Webhook","type":"+","action":{"confirm":{"description":"Connect to GitLab Projects from within Cliq","title":"Generate Webhooks for a GitLab Project"},"type":"invoke.function","data":{"name":"authentication"}}}],"text":"Click on the token generation button below!"};
			}
			else if(componentName == "attachfuncmd")
			{
				output = {"type":"form","title":"Upload a file","name":"ID","version":1,"button_label":"Upload","actions":{"submit":{"type":"invoke.function","name":"attachForm"}},"inputs":[{"type":"file","name":"file","label":"File to share","hint":"File will be posted in the same chat","placeholder":"","mandatory":true,"multiple":"true"}]};
			}
			else if(componentName == "banner")
			{
				output = {"text":"Testing banner through URL invoke extension","status":"Success","type":"banner"};
			}
		}
		else if(handler == "suggestion_handler")	//Command suggestion handler response.     			//required consents  -- 
		{
			console.log("inside command suggestion handler");
			output = [{"description":"Command suggestions are helpful when you have to choose from a list of entities!","imageurl":"https://media3.giphy.com/media/Cmr1OMJ2FN0B2/giphy.gif","title":"Tip 1 👋"},{"description":"You can show upto a maximum of 50 command suggestions. :surprise:","imageurl":"https://media2.giphy.com/media/8uzVsRzOScAa4/giphy.gif","title":"Tip 2 😲"}];
		}
	}
	
	else if(type == "function")	//function handlers
	{
		if(handler == "button_handler")	//Funciton button handler
		{
			output = {"text" : "Isn't the instant button super fantabulous? 😲\nFunctions work with buttons. There are two types of buttons - Message Card Buttons and Instant Buttons."};
		}
		else if(handler == "form_handler")	//Form submit handler response
		{
			console.log("inside form submit handler");
			form = req.body.params.form;
			formValues = form.values;
			if(formValues["asset-type"].value == "mobile")
			{
				output = {"text":"Hi " + formValues.username + ", thanks for raising your request. Your request will be processed based on the device availability.","card":{"title":"Asset Request"},"slides":[{"type":"label","title":"","data":[{"Asset Type":formValues["asset-type"].label},{"Preferred OS ":formValues["mobile-os"].label},{"Preferred Device":formValues["mobile-list"].label}]}]};
			}
			else
			{
				output = {"text":"Hi " + formValues.username + ", thanks for raising your request. Your request will be processed based on the device availability.","card":{"title":"Asset Request"},"slides":[{"type":"label","title":"","data":[{"Asset Type":formValues["asset-type"].label},{"OS/Device Preferred":formValues["os-type"].label}]}]};
			}
		}
		else if(handler == "form_change_handler")	//Form change handler response
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
		else if(handler == "form_values_handler")	//Form dynamic input handler response
		{
			console.log("inside dynamic input handler");
			var target = req.body.params.target;
			var form = req.body.params.form;
			var searchValue = target.query;
			if(target.name == "mobile-list" && form.values["mobile-os"])
			{
				var typeList = [];
				var androidDevicesList = ["One Plus 6T","One Plus 6","Google Pixel 3","Google Pixel 2XL"];
				var iOSDevicesList = ["IPhone XR","IPhone XS","IPhone X","Iphone 8 Plus"];
				var deviceType = form.values["mobile-os"].value;
				if(deviceType == "android")
				{
					
					androidDevicesList.forEach(function(androidDevice) {
				        if(androidDevice.includes(searchValue))
				        {
					        console.log(androidDevice);
				        	typeList.push({"label":androidDevice,"value":androidDevice.replace(/\s+/g,"_")});
				        }
				    });
				}
				else
				{
					iOSDevicesList.forEach(function(iOSDevice) {
				        if(iOSDevice.includes(searchValue))
				        {
						console.log(iOSDevice);
				        	typeList.push({"label":iOSDevice,"value":iOSDevice.replace(/\s+/g,"_")});
				        }
				    });
				}
			}
			console.log("Dynamic type list  " + typeList);
			output = {"options" : typeList};
		}
	}

	else if(type == "bot")	//Bot handlers
	{
		if(handler == "welcome_handler")	//Bot welcome handler
		{
			console.log("inside bot welcome handler");
			output = {"text" : req.body.name + " bot welcomes you!"};
		}
		else if(handler == "message_handler")	//Bot message handler. 		//required consents  --  message
		{
			console.log("inside bot message handler");
			var message = req.body.params.message;
			if(message == "context")
			{
				output = {"context":{"timeout":"300","params":[{"question":"Please enter your name.","name":"name"},{"question":"How old are you? :smile:","name":"age"},{"suggestions":{"list":[{"text":"Male"},{"text":"Female"}]},"question":"Gender:","name":"sex"}],"id":"personal_details"},"text":"Welcome to the Zylker Ticket Booking Portal! I'll need a few details to book the ticket."};
			}	
			else
			{
				output = {"text" : "You said " + message};
			}
		}
		else if(handler == "mention_handler")	//Bot mention handler
		{
			console.log("inside bot mention handler");
			output = {"text" : "You mentioned me!"};
		}
		else if(handler == "context_handler")	//Bot context
		{
			console.log("inside bot context handler");
			var answers = req.body.params.answers;
			var msgString = "Name : " + answers.name.text + "\n";
			msgString = msgString + "Age : " + answers.age.text + "\n";
			msgString = msgString + "Sex : " + answers.sex.text + "\n";
			output = {"text" : "Great! I've got all the info: \n" + msgString};
		}
		else if(handler == "action_handler")	//Bot actions
		{
			console.log("inside bot action handler");
			output = {"text" : req.body.handler_name + " bot action performed"};
		}
	}

	else if(type == "messageaction")	//Message action
	{
		console.log("inside message action handler");
		output = {"text" : " Message action performed"};
	}

	else if(handler == "installation_handler")	//Installation handler
	{
		console.log("inside installation handler");
		output = {"status" : "200","note":["1. for testing.","2. for testing"],"message":"for testing","title":"Success!","footer":"Contact support@zoho.com for any related help / support."};
	}

	else if(handler == "installation_validator")	//Installation validator
	{
		console.log("inside intallation validator");
		output = {"status" : "200"};
	}

	response.output = output;
	console.log("Execution response " + JSON.stringify(response));
  	res.send(response);
});

app.listen(process.env.PORT || 5000);
