myfunc(){
    curl --insecure --silent -X 'GET' 'https://10.100.201.3:12036/properties' \
        -H 'accept: application/json' > ./curltesting/ExpectedFiles/listproperties.txt  

    recordNum=$(cat ./curltesting/ExpectedFiles/listproperties.txt | \
        grep -P '"property_id":\d+' --only-matching | tail -1 | grep -P '\d+' --only-matching)

    return $recordNum
}

#myfunc
#echo $recordNum

#curl --insecure --silent -X 'GET' 'https://10.100.201.3:12036/properties/'${recordNum}'' \
    #-H 'accept: application/json' 



curl -I --insecure --silent -X 'PUT' \
  'https://10.100.201.3:12036/properties/26' \
  -H 'accept: application/json' \
  -H 'api_key: cs4783ftw!' \
  -H 'Content-Type: application/json' \
  -d '{
  "address": "Turtleland",
  "city": "Valhiem",
  "state": "VA",
  "zip": "12345"
  }' > ./curltesting/propertiesPUT.txt