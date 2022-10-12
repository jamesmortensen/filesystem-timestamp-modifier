#!/bin/sh

uname -a
echo "Node version $(node -v)"
echo "npm version $(npm -v)"

npm install
npm link

touch /tmp/testfile && echo "hello world" > /tmp/testfile

lastmod --file /tmp/testfile --time "Aug 15, 2017"

MONTH=`ls -l /tmp/testfile | awk '{print $6}'`
DAY=`ls -l /tmp/testfile | awk '{print $7}'`
YEAR=`ls -l /tmp/testfile | awk '{print $8}'`

rm /tmp/testfile

if [[ "$MONTH" == "Aug" && "$DAY" == "15" && "$YEAR" == "2017" ]]; then
    echo "Test passes"
else
    echo "Test fails"
    echo "MONTH=$MONTH"
    echo "DAY=$DAY"
    echo "YEAR=$YEAR"
    exit 1
fi

