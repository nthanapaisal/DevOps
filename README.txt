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


Docker: 
        https://www.youtube.com/watch?v=JSLpG_spOBM
        https://www.docker.com/101-tutorial
        https://docker-curriculum.com/
    Windows:  
        https://docs.docker.com/docker-for-windows/install/
        install WSL -> pick linux distributor -> change WSL version to 2 -> install docker normally
    Commands:
        create: docker run -dit ubuntu:latest
        start: docker start id
        stop: docker stop id
        remove: docker rm -f id
        Show containers: docker ps
        Show all stopped/running container(not remove): docker pw -a
        Show images: docker images
        Show full ID: docker inspect --format="{{.Id}}" container_name
        run bash in docker container: docker exec -it containerIDshort bash
        create new image with exisitng container that has generic ubuntu image: docker commit id newname
        tagging: docker tag localImageName dockerhub/link -> docker login -> docker push dockerhub/link
        build: docker build .
        dockerfile:
            https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
        Volume: 
            https://phoenixnap.com/kb/docker-volumes
            create: docker volume create name
            list: docker volume list
            delete: docker volume rm name
            info: docker inspect name
            delete all volume(dangerous): docker volume prune 
            create container and connect to volume: docker run -dit --mount souce=VolumneName, destination=/VolumneName imageName
            *you can mount volume to multilple containers, even if containers are gone, volume will be ok!
            *you can also mount host dir as a volume
