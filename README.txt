Anna Arroyo and Nikki Thanapaisal

package.json:
    https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies 
    
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

SSH: (do it step by step)
    keypairs gen -> gitlab https://www.youtube.com/watch?v=svRWcx7dT8g
    virtual server: 
    1. ssh-keygen -> enter file name (press enter)-> skip passphrase specifically for that keypairs (press enter twice)
    2. cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys (this helps ssh in the virtual server find your public keys)
    3. (this is not required but this will fix ssh issue if doesnt work)
        eval $(ssh-agent -s) 
        ssh-add <directory to private SSH key>
        chmod 700 .ssh/
    gitlab:
        add public key .pub to your gitlab account
    ssh using private key:
        explaination: youtube.com/watch?v=mNtQ55quG9M
        1. put your private key that you have generated in virtual machine into ~/.ssh of local
        2. (this is not required but this will fix ssh issue if doesnt work)
            eval $(ssh-agent -s)
            ssh-add <directory to private SSH key> 
            chmod 700 .ssh/
        3. ssh -i ~/.ssh/privatekeyfile abc123@10.100.201.3
    ssh config file:
        add a ~/.ssh/config entry
        here is mine
            Host easel3.cs.utsarr.net
            User git
            Preferredauthentications publickey
            IdentityFile ~/.ssh/fru574_gitlab
        that is what is in my .ssh/config file for my student account fru574 on easel4
        https://linuxize.com/post/using-the-ssh-config-file/
connect:
	https://10.100.201.3:12036/hello
	pm2 start start.sh
	pm2 stop 0

Security testing:
	OWASP ZAP
	OWASP Mutillidae 
