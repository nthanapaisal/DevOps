#run this from the top level of the project for it to work
#!/bin/bash
########################## hello end point
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

########################## get prop
curl -I --insecure --silent -X 'GET' 'https://10.100.201.3:12036/properties' > ./curltesting/properties.txt
if [[ $(head -1 ./curltesting/ExpectedFiles/get_properties_expected.txt) == $(head -1 ./curltesting/properties.txt) ]]; then
  #pass
  echo "GET Properties: Pass"
else
  #fail
  echo "GET Properties: Fail"
  exit 1
fi

########################## get id 1
curl -I --insecure --silent -X 'GET' 'https://10.100.201.3:12036/properties/1' > ./curltesting/propertiesid.txt
if [[ $(head -1 ./curltesting/ExpectedFiles/get_propertiesid_expected.txt) == $(head -1 ./curltesting/propertiesid.txt) ]]; then
  #pass
  echo "GET Properties/Id: Pass"
else
  #fail
  echo "GET Properties/Id: Fail"
  exit 1
fi

########################## put
curl -I --insecure --silent -X 'POST' \
 'https://10.100.201.3:12036/properties?address=New%20Address&city=San%20Antonio&state=TX&zip=11111' \
 -H 'api_key: cs4783ftw!' > ./curltesting/propertiesPOST.txt
if [[ $(head -1 ./curltesting/ExpectedFiles/post_properties_expected.txt) == $(head -1 ./curltesting/propertiesPOST.txt) ]]; then
  #pass
  echo "POST Properties: Pass"
else
  #fail
  echo "POST Properties: Fail"
  exit 1
fi

########################## del
curl -I --insecure --silent -X 'DELETE' 'https://10.100.201.3:12036/properties/31' \
-H 'api_key: cs4783ftw!' > ./curltesting/propertiesDEL.txt
if [[ $(head -1 ./curltesting/ExpectedFiles/del_properties_expected.txt) == $(head -1 ./curltesting/propertiesDEL.txt) ]]; then
  #pass
  echo "DELETE Properties/Id: Pass"
else
  #fail
  echo "DEL Properties/Id: Fail"
  exit 1
fi

########################## post
#curl --insecure --silent -X 'POST' \
 #'https://10.100.201.3:12036/properties?property_id=100&address=New%20Address&city=San%20Antonio&state=TX&zip=11111' \
 #-H 'api_key: cs4783ftw!'
########################## non exisiting

########################## invalid api key
