#!/bin/bash
curl --silent -X 'GET' \
  'https://10.100.201.3:12036/hello' \
  -H 'accept: application/json' --insecure > actual.txt
if grep -f get_hello_expected.txt actual.txt > /dev/null; then
  #pass
  echo "Pass"
  exit 0
fi
  #fail
  echo "Fail"
  exit 1