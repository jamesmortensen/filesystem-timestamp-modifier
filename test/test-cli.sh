#!/bin/sh

uname -a
echo "Node version $(node -v)"
echo "npm version $(npm -v)"

if [ "$CI" = "true" ]; then
    echo "CI is true. Link package and testing as globally installed CLI tool."
    npm link
    lastmd='lastmod'
else
    echo "CI is false. Testing with 'node ../cli.js' instead of linking package to global scope."
    lastmd='node ../cli.js'
fi

touch /tmp/testfile && echo "hello world" > /tmp/testfile

$lastmd --file /tmp/testfile --time "Aug 15, 2017"

MONTH=`ls -l /tmp/testfile | awk '{print $6}'`
DAY=`ls -l /tmp/testfile | awk '{print $7}'`
YEAR=`ls -l /tmp/testfile | awk '{print $8}'`

rm /tmp/testfile

if [ "$MONTH" = "Aug" ] && [ "$DAY" = "15" ] && [ "$YEAR" = "2017" ]; then
    echo " Test passes"
else
    echo " Test fails: "
    echo "   MONTH=$MONTH"
    echo "   DAY=$DAY"
    echo "   YEAR=$YEAR"
    echo ""
    exit 1
fi

