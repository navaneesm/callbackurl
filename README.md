# callbackurl
For testing cliq call back execution by hosting a server in heroku

# Pre required softwares in machine 
1. Node (To download - https://nodejs.org/en/download/)
2. npm	
3. git ( To dowload - https://git-scm.com/download/win)
4. heroku (To download - https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)

# To check the installations of each software, enter the commands 
1. "node --version"     ( Should return the version )
2. "npm --version"      ( Should return the version )
3. "git --version"      ( Should return the version )

# To host a server in heroku
1. Create an account in heroku
2. In terminal make a directory for heroku and move inside the folder
3. enter the command "heroku login" - this will ask to press any key, 
on pressing a key you will be redirected to a browser to authenticate your heroku account.
4. enter the command "git clone https://github.com/navaneesm/callbackurl.git" to clone the repository, 
which has default node.js code which gives a default response for every handler
5. enter the command "cd callbackurl" to move inside the cloned folder
6. enter "heroku create" to create a create a server in heroku
7. enter "git push heroku master" to push the cloned code to the server, this initiates the build generation
8. The server URL will be produced in the step 6, use that URL as the callback URL while creating the extension

# To check HEROKU logs 
1. Enter the command "heroku logs --tail"

# The payload in body sent on component execution in cliq 
{
  type : command | bot,
	handler : welcome_handler | execution_handler,
  name : $component name ,
	unique_name : $unique name (if available),
  handler_name : help ( applicable for action handlers of bots alone),
  params : { developer enabled params ( user | message | location | chat ) }
}

# Respose structure 
{
  output : {"text" : "execution from call back url"}
}
