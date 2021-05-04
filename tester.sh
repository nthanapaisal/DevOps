#!/bin/bash

echo 'hello '${CURL_IP}'sadasd'

curl -X 'GET' \
  'https://'${CURL_IP}':12036/hello' \
  -H 'accept: application/json' --insecure