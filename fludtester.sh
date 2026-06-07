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
