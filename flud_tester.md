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


I’ve finished working on my portfolio project and deployed it publicly.

This project started as a personal website, but I decided to turn it into something more practical — a full project where I could improve not only frontend development, but also backend structure, deployment workflow, and basic security practices for a public API.

During the work on this project, I implemented and documented several security-related improvements, including:

* environment-based secret management;
* restricted CORS configuration;
* DTO-based request validation;
* rejection of unexpected request fields;
* rate limiting for the contact endpoint;
* honeypot protection against automated spam;
* security headers;
* request body size limits;
* centralized error handling;
* safer handling of external API requests;
* a simple Bash script for testing repeated requests and checking rate limiting behavior.

For me, this portfolio is not just a visual presentation of my work. It is also a practical learning project where I can continue improving my backend, DevOps, Linux, deployment, and cybersecurity skills.

Links:

Live portfolio:
https://portfolio-azure-iota-17.vercel.app/

GitHub repository:

Security documentation:

Rate limit test script documentation:

My next step is to deploy the project on my own VPS, configure the server environment manually, and continue improving the infrastructure, monitoring, and security side of the project.

#Portfolio #WebDevelopment #CyberSecurity #Backend #DevOps #Linux #Security #React #NestJS
