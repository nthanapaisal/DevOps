#Run: run this from the top level of the project for it to work
#myfunc(): this is to get most recent record so we don't have to manually edit DELETE

#!/bin/bash

myfunc(){
    curl --insecure --silent -X 'GET' 'https://10.100.201.3:12036/properties' \
        -H 'accept: application/json' > ./curltesting/ExpectedFiles/listproperties.txt  

    recordNum=$(cat ./curltesting/ExpectedFiles/listproperties.txt | \
        grep -P '"property_id":\d+' --only-matching | tail -1 | grep -P '\d+' --only-matching)

    return $recordNum
}


########################## hello end point ##########################
curl --silent -X 'GET' \
  'https://10.100.201.3:12036/hello' \
  -H 'accept: application/json' --insecure > ./curltesting/hello.txt
if grep -f ./curltesting/ExpectedFiles/get_hello_expected.txt ./curltesting/hello.txt > /dev/null; then
  #pass
  echo "GET Hello: Pass"
else
  #fail
  echo "GET Hello: Fail"
  exit 1
fi

########################## get prop ##########################
curl -I --insecure --silent -X 'GET' 'https://10.100.201.3:12036/properties' \
-H 'accept: application/json' > ./curltesting/properties.txt
if [[ $(head -1 ./curltesting/ExpectedFiles/get_properties_expected.txt) == $(head -1 ./curltesting/properties.txt) ]]; then
  #pass
  echo "GET Properties: Pass"
else
  #fail
  echo "GET Properties: Fail"
  exit 1
fi

########################## get id 1 ##########################
curl -i --insecure --silent -X 'GET' 'https://10.100.201.3:12036/properties/1' \
-H 'accept: application/json' > ./curltesting/propertiesid.txt
if [[ $(head -1 ./curltesting/ExpectedFiles/get_propertiesid_expected.txt) == $(head -1 ./curltesting/propertiesid.txt) ]]; then
  #pass
  echo "GET Properties/Id: Pass"
else
  #fail
  echo "GET Properties/Id: Fail"
  exit 1
fi

########################## post ##########################
curl -i --insecure --silent -X 'POST' \
 'https://10.100.201.3:12036/properties?address=New%20Address&city=San%20Antonio&state=TX&zip=11111' \
 -H 'accept: application/json' \
 -H 'api_key: cs4783ftw!' > ./curltesting/propertiesPOST.txt
if [[ $(head -1 ./curltesting/ExpectedFiles/post_properties_expected.txt) == $(head -1 ./curltesting/propertiesPOST.txt) ]]; then
  #pass
  echo "POST Properties: Pass"
else
  #fail
  echo "POST Properties: Fail"
  exit 1
fi


##########################  before put/delete I will pull out the record that is recently added. ##########################
myfunc
echo "Getting the most recent id:"${recordNum}""



########################## put ##########################
curl --insecure --silent -X 'PUT' \
  'https://10.100.201.3:12036/properties/2' \
  -H 'accept: application/json' \
  -H 'api_key: cs4783ftw!' \
  -H 'Content-Type: application/json' \
  -d '{
  "address": "Turtleland",
  "city": "Valhiem",
  "state": "VA",
  "zip": "12345"
  }' -i > ./curltesting/propertiesPUT.txt
if [[ $(head -1 ./curltesting/ExpectedFiles/put_properties_expected.txt) == $(head -1 ./curltesting/propertiesPUT.txt) ]]; then
  #pass
  echo "PUT Properties/Id: Pass"
else
  #fail
  echo "PUT Properties/Id: Fail"
  #exit 1
fi


########################## del ##########################
curl -i --insecure --silent -X 'DELETE' 'https://10.100.201.3:12036/properties/'${recordNum}'' \
-H 'accept: application/json' \
-H 'api_key: cs4783ftw!' > ./curltesting/propertiesDEL.txt
if [[ $(head -1 ./curltesting/ExpectedFiles/del_properties_expected.txt) == $(head -1 ./curltesting/propertiesDEL.txt) ]]; then
  #pass
  echo "DELETE Properties/Id: Pass"
   
else
  #fail
  echo "DELETE Properties/Id: Fail"
  exit 1
fi


########################## non exisiting GET ##########################
curl -i --insecure --silent -X 'GET' 'https://10.100.201.3:12036/properties/0' \
-H 'accept: application/json' > ./curltesting/GETnonExists.txt
if [[ $(head -1 ./curltesting/ExpectedFiles/get_nonExists_expected.txt) == $(head -1 ./curltesting/GETnonExists.txt) ]]; then
  #pass
  echo "GET NonExisting Properties/Id: Pass"
else
  #fail
  echo "GET NonExisting Properties/Id: Fail"
  exit 1
fi

########################## non exisiting DEL ##########################
curl -i --insecure --silent -X 'DELETE' 'https://10.100.201.3:12036/properties/0' \
-H 'accept: application/json' \
-H 'api_key: cs4783ftw!' > ./curltesting/DELnonExists.txt
if [[ $(head -1 ./curltesting/ExpectedFiles/del_nonExists_expected.txt) == $(head -1 ./curltesting/DELnonExists.txt) ]]; then
  #pass
  echo "DELETE NonExisting Properties/Id: Pass"
   
else
  #fail
  echo "DELETE NonExisting Properties/Id: Fail"
  exit 1
fi


########################## invalid api key POST ##########################
curl -i --insecure --silent -X 'POST' \
 'https://10.100.201.3:12036/properties?address=New%20Address&city=San%20Antonio&state=TX&zip=11111' \
 -H 'accept: application/json' > ./curltesting/POSTinvalidApi.txt
if [[ $(head -1 ./curltesting/ExpectedFiles/post_invalidApi_expected.txt) == $(head -1 ./curltesting/POSTinvalidApi.txt) ]]; then
  #pass
  echo "POST Invalid API: Pass"
else
  #fail
  echo "POST Invalid API: Fail"
  exit 1
fi

########################## invalid api key DEL ##########################
curl -i --insecure --silent -X 'DELETE' 'https://10.100.201.3:12036/properties/2' \
-H 'accept: application/json' > ./curltesting/DELinvalidApi.txt
if [[ $(head -1 ./curltesting/ExpectedFiles/del_invalidApi_expected.txt) == $(head -1 ./curltesting/DELinvalidApi.txt) ]]; then
  #pass
  echo "DELETE Invalid API: Pass"
   
else
  #fail
  echo "DELETE Invalid API: Fail"
  exit 1
fi