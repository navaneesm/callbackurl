# URL Invoke type execution.
For testing URL Invoke type extensions.

Server - heroku
Language - Node.js


# Pre required softwares in machine 
1. Node (https://nodejs.org/en/download/)
2. npm	
3. git (https://git-scm.com/download)
4. heroku (https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)

# To check the installation of softwares, enter the commands
1. "node --version"     ( Should return the version )
2. "npm --version"      ( Should return the version )
3. "git --version"      ( Should return the version )

# To host a server in heroku
1. Create an account in heroku
2. In terminal make a directory for heroku and move inside the folder
3. Enter the command "heroku login" - this will ask to press any key, 
on pressing a key you will be redirected to a browser to authenticate your heroku account.
4. Enter the command "git clone https://github.com/navaneesm/callbackurl.git" to clone the repository, 
which has default node.js code.
5. Enter the command "cd callbackurl" to move inside the cloned folder
6. Enter "heroku create" to create a create a server in heroku
7. Enter "git push heroku master" to push the cloned code to the server, this initiates the build generation
8. The server URL will be produced in the step 6, use that URL as the callback URL while creating the extension

# To check HEROKU logs 
1. Enter the command "heroku logs --tail" or you can login to heroku in the browser and select the respective server and check the logs.

# The payload in body sent on component execution in cliq 
{<br/>
	&nbsp;signature : signature of the body with RSA,<br/>
	&nbsp;name : $component name ,<br/>
	&nbsp;handler : welcome_handler | execution_handler,<br/>
	&nbsp;type : command | bot,<br/>
	&nbsp;unique_name : $unique name (for bots alone),<br/>
	&nbsp;handler_name : help (applicable for action handlers of bots alone),<br/>
	&nbsp;params : { developer enabled params (user | message | location | chat | internal_attachments) }<br/>
}<br/>

# Sample Request
{<br/>
	&nbsp;"signature":"m+cGF3dj8uJBqK5fRo7XuPswxvdOJ97FALQeHuFkPQrDORMm3h6byxctgbbmz1CCmibEMTthCwEf2l4x+KDMg+VmdvXIRmmYefFSRhWG3p374bIIIxDNQKsVVRh8T2j/IPacnRJtJZsBI4SjvvI0Ij9IPAEDlNG6Z+grMe0oqxcH+SoIeYp7bvfivyQTUTwbe6W5LP8ms9dIDnUvutlsCrveDh66+vcM26kL6/u/MMx0/U+OyCg5SbQddm21r3IgDug89or9x5LphV58KB2HmTnKe+5AQnCoP+N2pwsmGDZyR/WJmOPSfm6Lc9fO8OnFMTSD6D5riSbhzjlfQ6RH7A==",<br/>
	&nbsp;"name":"demo",<br/>
	&nbsp;"handler":"execution_handler",<br/>
	&nbsp;"type":"command",<br/>
	&nbsp;"params":<br/>
	&nbsp;{<br/>
		&nbsp;"environment":{"data_center":""},"access":{"user_id":"6389294","user_agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36","chat_id":"CT_1256251565849467071_6391133-B1"},<br/>
		&nbsp;"mentions":[],<br/>
		&nbsp;"options":{},<br/>
		&nbsp;"selections":[],<br/>
		&nbsp;"arguments":"",<br/>
		&nbsp;"internal_attachments":[]<br/>
	&nbsp;}<br/>
}<br/>

# Respose structure 
{<br/>
	&nbsp;output : {"text" : "execution from call back url"}<br/>
}<br/>
