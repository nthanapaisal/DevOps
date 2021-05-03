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
        build with dockerfile: docker build . -t newnameofimage
        *after build image with docker file you can run it
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
        see container logs: docker logs id
        DB: 
            docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=hello --mount source=db,destination=/var/lib/mysql mariadb
            *you can shell into mariadb
            *specifice in dockerfile if you have db config ready to copy it over
        prune everything except volumes: docker system prune -a
        compose:
            https://docs.docker.com/compose/
            docker-compose up -d
            docker-compose down
        docker secret:
            https://docs.docker.com/engine/swarm/secrets/
        docker stack rm name -> remove container, network, secret

K8S:
    https://www.youtube.com/watch?v=UE1UqcaSYpM istall on windows
    https://kubernetes.io/docs/home/
    https://www.youtube.com/watch?v=EUitQ8DaZW8&list=PLLasX02E8BPCrIhFrc_ZiINhbRkYMKdPT&index=4
    https://www.youtube.com/watch?v=daVUONZqn88&list=PLLasX02E8BPCrIhFrc_ZiINhbRkYMKdPT&index=5
    https://www.youtube.com/watch?v=mNK14yXIZF4&list=PLLasX02E8BPCrIhFrc_ZiINhbRkYMKdPT&index=6
    https://www.youtube.com/watch?v=xL6lixC4D8Q&list=PLLasX02E8BPCrIhFrc_ZiINhbRkYMKdPT&index=7
    https://www.youtube.com/watch?v=rDCWxkvPlAw&list=PLLasX02E8BPCrIhFrc_ZiINhbRkYMKdPT&index=8
    https://www.youtube.com/watch?v=5irsAdKoEBU&list=PLLasX02E8BPCrIhFrc_ZiINhbRkYMKdPT&index=9
    https://www.youtube.com/watch?v=zd8vYhrFXp4&list=PLLasX02E8BPCrIhFrc_ZiINhbRkYMKdPT&index=10
    https://kubernetes.io/docs/tutorials/
    https://www.youtube.com/watch?v=X48VuDVv0do
    https://kubernetes.io/docs/reference/kubectl/cheatsheet/
    - install kubectl to the machine then add config file to ~/.kube
    - get
        kubectl get deployments 
        kubectl get pods
        kubectl get services
    - make a deployment (my-ngix = docker image!!! replace my-ngix with image u want)(commands belows might have two different my-nginx meaning, one is the pod name and other is image name)
        kubectl create deployment my-nginx --image=nginx
        kubectl get deployments
        kubectl get pods
        * if 1 pod has mult continers, we may need to add container id with pod name 
    - view logs
        kubectl logs <podname>
    - view in browser
        kubectl describe pod <podname>
        http://<pod ip address>
        *if not working then it is still only visible in the cluster
    - expose to deployement
        kubectl expose deployment my-nginx --type="NodePort" --port 80 
    - get ip address and exposed node port
        kubectl get services
        kubectl describe service <service name>
    - using the node IP or cluster IP and exposed node port(can now curl to the exposed pod)
        curl http://easel4.cs.utsarr.net:<exposed node port>
    - delete the nodeport service
        kubectl delete service <name>
    - expose the pod to VPN
        kubectl expose deployment my-ngix --type="loadBalancer" --port 80
        kubectl get services
        https//externalip:80
    - view the deployment's label
            kubectl describe deployment my-ngix
            labels: app=my-nginx
        - we can get pods and services associated with a specific label
            kubectl get pod -l app=my-nginx
            kubectl get services -l app=my-nginx
    - scale the deployment
        see the replica set
            kubectl get rs 
        scale the deployment
            kubectl scale deployment my-nginx --replicas=4
        watch the magic
            kubectl get rs (do it a few times lol)
    - a node is a physical machine that supporting the k8s cluster (like easel4) 
        https://kubernetes.io/docs/concepts/services-networking/service/#nodeport
        NodePort: Exposes the Service on each Node's IP at a static port (the NodePort). 
        A ClusterIP Service, to which the NodePort Service routes, is automatically created. 
        You'll be able to contact the NodePort Service, from outside the cluster, by requesting <NodeIP>:<NodePort>.
    _______________________________________
    starting with empty name space
        kubectl create deployment my-nginx --image=nginx
        kubectl get pods
        kubectl expose deployment my-ngix --type="NodePort" --port 80
        kubectl get services
        **(doenst work kubectl delete service/serName or kubectl delete deployment/name)**
        - get all possible persistant volume
            kubectl get pv 
        - claim by making yaml script (after making file, exe doing: kubectl apply -f pvc.yaml -> check by: kubectl get pvc)
            kind: PersistentVolumeClaim             which kind of resources
            apiVersion: v1                          
            metadata:                               
                name: my-nginx-pvc                  persistent volume name that make sense
            spec:
                accessModes:
                    - ReadWriteOnce                 
                resources:
                    requests:
                        storage: 20M                >= this size
                    storageClassName: "Manual"