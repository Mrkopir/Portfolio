# Simple API Rate Limit Tester

This Bash script is used for basic testing of an API endpoint against repeated requests.  
It can help check whether rate limiting, request blocking, or basic endpoint availability works correctly.

> Use this script only on your own APIs or systems where you have permission to test.

## What the script does

The script:

- asks for an API URL;
- asks for an HTTP method: `GET` or `POST`;
- converts the method to uppercase automatically;
- sends up to 30 requests;
- waits 2 seconds between requests;
- checks the server response using `grep`;
- stops when the expected response is not found.

## Script

```bash
#!/bin/bash

read -p "INPUT URL: " url
read -p "INPUT METHOD: " method

method=$(echo "$method" | tr '[:lower:]' '[:upper:]')

for i in {1..30}
do
    echo "Request #$i"

    if [ "$method" = "POST" ]; then
        if curl -s -X POST "$url" \
            -H "Content-Type: application/json" \
            -d '{"name":"John","email":"attacker@gmail.com","message":"Test message"}' \
            | grep -q "success"; then
            echo "Success"
        else
            echo "Failed or blocked"
            break
        fi

    elif [ "$method" = "GET" ]; then
        if curl -s -X GET "$url" | grep -q "ok"; then
            echo "Success"
        else
            echo "Failed or blocked"
            break
        fi

    else
        echo "Unsupported method: $method"
        break
    fi

    sleep 2
done