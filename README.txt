Anna Arroyo and Nikki Thanapaisal

Gitlab set up:
	GIT_SSL_NO_VERIFY=true git clone http://easel3.cs.utsarr.net/iaf873/cs4783-project-spring2021.git

If you want to get rid of 'GIT_SSL_NO_VERIFY=true': 
	
	git config http.sslVerify "false"

Creating a branch:
	git checkout -b "name of branch"

Merging to master:
	git checkout master
	git merge "name of branch you want to merge"

Push new changes to remote:
	GIT_SSL_NO_VERIFY=true git push origin master	

If you messed up the password part:
	Go to > Control Panel\User Accounts\Credential Manager > Manage Windows Credentials and remove all generic credentials involving Git. 

Set up SSH key
	https://www.youtube.com/watch?v=mNtQ55quG9M

SSL set up:
	https://flaviocopes.com/express-https-self-signed-certificate/

DB setup:
	https://codeforgeek.com/nodejs-mysql-tutorial/
	https://flaviocopes.com/express-get-query-variables/
	https://expressjs.com/en/api.html#req

SSH:
	ssh-keygen
	youtube.com/watch?v=mNtQ55quG9M
	eval $(ssh-agent -s)
	ssh-add <directory to private SSH key>

connect:
	https://10.100.201.3:12036/hello