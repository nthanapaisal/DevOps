myfunc(){
    curl --insecure --silent -X 'GET' 'https://10.100.201.3:12036/properties' \
        -H 'accept: application/json' > ./curltesting/ExpectedFiles/listproperties.txt  

    recordNum=$(cat ./curltesting/ExpectedFiles/listproperties.txt | \
        grep -P '"property_id":\d+' --only-matching | tail -1 | grep -P '\d+' --only-matching)

    return $recordNum
}

myfunc
echo $recordNum
