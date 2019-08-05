//Node JS require declaration

const http = require('follow-redirects').http;

//Global Constants

const runningStates = {
	1 : "Vehicle Parked",
	2 : "Vehicle is Idle",
	3 : "Vehicle is Moving"
};

const operatorMapping = {
	BTT : "Bharath Tours and Travels",
	SMNT : "Samantha Travels"
};

//Global variables

var URL = "http://s.yourbus.in/GNn";
var vehicleNo;
var operator;

//HTTP Request function

var httpRequest = function(URL, callBack)
{
	var responseData;
	var request = http.get(URL, function (res) {
	  responseData = "";
	  res.on('data', function (chunk) {
	    responseData += chunk.toString();
	  });
	  res.on('end', function () {
	  	callBack(responseData);
	  });
	  res.on('error', function (err) {
	  	 console.error(err);
	  });
	});
};

//Functions 
var getTrackingLinkFromResponse = function(data)
{
	var startIndex;
	var endIndex;

	var trackingLink;
	var gId;

	if(data.toLocaleLowerCase().includes("the data for this service is available only from"))
	{
		startIndex = data.indexOf("The data for this service is available only from");
		endIndex = data.indexOf("</div>", startIndex);
		errorResp = data.substring(startIndex, endIndex);
		text = errorResp.replace("<br/>", "");;
		console.log("<!------- ******** "+text+" ******** -------!>");
	}
	else
	{
		startIndex = data.indexOf("trackApp");
		endIndex = data.indexOf("\"", startIndex);
		trackingLink = data.substring(startIndex, endIndex);

		console.log("Generated tracking link :- " + trackingLink);
		vehicleNo = trackingLink.substring(trackingLink.indexOf("v=") + 2,trackingLink.indexOf("&"));
		operator = trackingLink.substring(trackingLink.indexOf("o=") + 2,trackingLink.indexOf("g=") - 1);
		gId = trackingLink.substring(trackingLink.indexOf("g=") + 2);

		if(vehicleNo.length() == 0 || operator.length() == 0 || gId.length() == 0)
		{
			text = "Tracking details for this Vehicle is not available";
			console.log("<!------- ******** "+text+" ******** -------!>");
		}
		else
		{
			var trackingLink = "https://reports.yourbus.in/ci/" + trackingLink;
			httpRequest(trackingLink, getTrackingDataFromResponse);
		}
	}
};

var getTrackingDataFromResponse = function(response)
{
	var text = response["msg"];
	var data = response["data"];
	console.log("Tracking data :- " + data);
	vehicleNo = data["vn"];
	if(typeof data["is_stale"] == 1)
	{
		text = text + "The tracking details for the " + operator + " with vehicle number " + vehicleNo + " is not available!";
		return {"output" : {"text" : text}};
		console.log("<!------- ******** "+text+" ******** -------!>");
	}
	else
	{
		if(typeof data["rs"] !== "undefined")
		{
			var runningState = runningStates[Number(data["rs"])];
			var reverseGeocodeRequestURL = "https://api.opencagedata.com/geocode/v1/json?key=601dcb472d7a4cef8a7f5b1d93fc51fe&q=" + data["lt"] + "," + data["lg"] + "&pretty=1&no_annotations=1";
			var callBack = function(geoCodeResponse)
			{
				var place = "undefined";
				if(typeof geoCodeResponse["results"][0]["components"]["city"] !== "undefined")
				{
					place =  geoCodeResponse["results"][0]["components"]["city"];
				}
				else if(typeof geoCodeResponse["results"][0]["components"]["town"] !== "undefined")
				{
					place = geoCodeResponse["results"][0]["components"]["town"];
				}
				else if(typeof geoCodeResponse["results"][0]["components"]["village"] !== "undefined")
				{
					place = geoCodeResponse["results"][0]["components"]["village"];
				}
				else if(typeof geoCodeResponse["results"][0]["components"]["suburb"] !== "undefined")
				{
					place = geoCodeResponse["results"][0]["components"]["suburb"];
				}
				else if(typeof geoCodeResponse["results"][0]["components"]["hamlet"] !== "undefined")
				{
					place = geoCodeResponse["results"][0]["components"]["hamlet"];
				}

				var address = geoCodeResponse["results"][0]["formatted"];
				var output = 
				{
				   "slides":[
				      {
				         "type" : "label",
				         "title" : "Your bus details are,",
				         "data" : [
				            {
				               "Operator" : "Bharath Tours and Travels"
				            },
				            {  
				               "Vehicle number" : vehicleNo
				            },
				            {  
				               "State" : runningStates.get(runningState)
				            },
				            {
				            	"Place" : place
				            },
				            {
				            	"Formatted address" : address
				            }
				         ]
				      }
				   ],
				   "text":"We got something for you :wink:"
				};
			};
			httpRequest(reverseGeocodeRequestURL, callBack);
		}
		console.log("<!------- ******** "+output+" ******** -------!>");
		return {"output" : output};
	}	
}
httpRequest(URL, getTrackingLinkFromResponse);
